import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`http://localhost:4200/api/auth/signup`, data);
  }
}
