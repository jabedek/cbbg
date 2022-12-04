import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        // component: MainLayoutComponent,
        children: [
          { path: '', pathMatch: 'full', component: AccountComponent },
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
export class AccountRoutingModule {}
