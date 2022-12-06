import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent {
  constructor(private auth: AuthService) {}

  signout(): void {
    this.auth.signout().subscribe((v) => console.log(v));
  }
}
