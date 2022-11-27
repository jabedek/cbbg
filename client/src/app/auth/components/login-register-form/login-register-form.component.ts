import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-register-form',
  templateUrl: './login-register-form.component.html',
  styleUrls: ['./login-register-form.component.scss'],
})
export class LoginRegisterFormComponent {
  form: FormGroup = this.fb.group({ name: '', password: '' });

  constructor(public fb: FormBuilder) {}

  submitUser(): void {}
}
