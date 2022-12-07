import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginRegisterFormComponent } from './auth/components/login-register-form/login-register-form.component';
import { WrongPageComponent } from './auth/components/wrong-page/wrong-page.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
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

  {
    path: 'logged',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./logged/logged.module').then((m) => m.LoggedModule),
  },
  {
    path: '**',
    component: WrongPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
