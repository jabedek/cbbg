import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedComponent } from './logged.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',

        children: [
          { path: '', pathMatch: 'full', component: LoggedComponent },
          // { path: 'game/:id', component: GameComponent },
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
export class LoggedRoutingModule {}
