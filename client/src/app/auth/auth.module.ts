import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginRegisterFormComponent } from './components/login-register-form/login-register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { WrongPageComponent } from './components/wrong-page/wrong-page.component';

@NgModule({
  declarations: [LoginRegisterFormComponent, WrongPageComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SharedModule],
  exports: [LoginRegisterFormComponent],
})
export class AuthModule {}
