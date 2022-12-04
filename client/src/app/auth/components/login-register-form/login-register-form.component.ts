import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-register-form',
  templateUrl: './login-register-form.component.html',
  styleUrls: ['./login-register-form.component.scss'],
})
export class LoginRegisterFormComponent {
  form: FormGroup = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
        Validators.pattern('[a-zA-Z]*'),
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(10)],
    ],
  });
  registrationResult: 'success' | 'failure' | undefined;

  constructor(public fb: FormBuilder, private auth: AuthService) {}

  submitUser(): void {
    this.auth.signup(this.form.value).subscribe((v) => {
      console.log(v);
    });
  }
}
