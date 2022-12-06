import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterFormComponent } from './components/login-register-form/login-register-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        // component: AuthLayoutComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: LoginRegisterFormComponent,
          },
          // { path: 'details/:id', component: UserComponent },
          // { path: 'add', component: UserComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
