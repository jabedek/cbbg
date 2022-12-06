import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, Observable, Subject, tap } from 'rxjs';
import { BackendMessage } from '../../../../system-shared/models/backend-message';
import { UserData } from '../../../../system-shared/models/user.model';
import { AppState } from '../state/app-state';
import { login, logout } from '../state/user/user.actions';

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
          if (data?.accessToken) {
            localStorage.setItem('token', data.accessToken);
            this.store.dispatch(login({ data }));
            this.router.navigate(['/game']);
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
          localStorage.setItem('token', '');
          this.store.dispatch(logout());
        }),
        finalize(() => {
          this.isLoading$.next(false);
          this.router.navigate(['/']);
        })
      );
  }
}
