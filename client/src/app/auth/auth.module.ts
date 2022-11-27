import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginRegisterFormComponent } from './components/login-register-form/login-register-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginRegisterFormComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
  exports: [LoginRegisterFormComponent],
})
export class AuthModule {}
