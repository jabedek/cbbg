import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MainLayoutComponent,

        children: [
          { path: '', pathMatch: 'full', component: UserComponent },
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
export class UserRoutingModule {}
