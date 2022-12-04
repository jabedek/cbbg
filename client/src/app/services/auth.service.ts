import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoading$ = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  signup(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`http://localhost:4200/api/auth/signup`, data).pipe(
      tap(() => {
        this.isLoading$.next(true);
      }),
      finalize(() => {
        this.isLoading$.next(false);
      })
    );
  }

  signin(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`http://localhost:4200/api/auth/signin`, data).pipe(
      tap(() => {
        this.isLoading$.next(true);
      }),
      finalize(() => {
        this.isLoading$.next(false);
      })
    );
  }
}
