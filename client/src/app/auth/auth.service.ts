import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, first, Observable, Subject, tap } from 'rxjs';
import { BackendMessage } from '../../../../system-shared/models/backend-message';
import { UserData } from '../../../../system-shared/models/user.model';
import { getItemExpireDate } from '../shared/utils';
import { AppState } from '../state/app-state';
import { login, logout } from '../state/user/user.actions';

interface LocalStorageAuthItem {
  userId: string;
  storageItemExpiresAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoading$ = new Subject<boolean>();
  currentUser: UserData | undefined;
  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private router: Router
  ) {}

  signup(data: { username: string; password: string }): Observable<any> {
    this.isLoading$.next(true);
    return this.http
      .post<BackendMessage>(`http://localhost:4200/api/auth/signup`, data)
      .pipe(
        finalize(() => {
          this.isLoading$.next(false);
        })
      );
  }

  signin(data: { username: string; password: string }): Observable<any> {
    this.isLoading$.next(true);
    return this.http
      .post<UserData>(`http://localhost:4200/api/auth/signin`, data)
      .pipe(
        tap((data) => {
          this.currentUser = data;
          if (data?._id && data?.accessToken) {
            const userId = data._id.toString();
            const item: LocalStorageAuthItem = {
              userId,
              storageItemExpiresAt: getItemExpireDate(),
            };
            localStorage.setItem('auth', JSON.stringify(item));
            console.log('logout', userId, JSON.stringify(item));

            this.store.dispatch(login({ data }));
            this.router.navigate(['/logged']);
          }
        }),
        finalize(() => {
          this.isLoading$.next(false);
        })
      );
  }

  signout(): Observable<any> {
    this.isLoading$.next(true);
    return this.http
      .post(`http://localhost:4200/api/auth/signout`, {
        _id: this.currentUser?._id,
      })
      .pipe(
        tap((v) => {
          const userId = this.currentUser?._id;
          console.log('logout', userId);

          localStorage.removeItem('auth');
          this.store.dispatch(logout());
        }),
        finalize(() => {
          this.isLoading$.next(false);
          this.router.navigate(['/']);
        })
      );
  }

  private getUserData(userId: string): Observable<UserData> {
    return this.http.get<UserData>(`http://localhost:4200/api/auth/${userId}`);
  }

  checkIfLoggedInLocalStorage() {
    const storageItem: string = `${localStorage.getItem('auth')}`;

    if (storageItem) {
      const parsedItem: LocalStorageAuthItem = JSON.parse(storageItem);
      const expiresAt = new Date(parsedItem.storageItemExpiresAt);

      if (expiresAt.getTime() > new Date().getTime()) {
        this.getUserData(parsedItem.userId)
          .pipe(first())
          .subscribe((data) => {
            this.store.dispatch(login({ data }));
            this.router.navigate(['/logged']);
          });
        console.log('here');
      } else {
        localStorage.removeItem('auth');
      }
    }
  }
}
