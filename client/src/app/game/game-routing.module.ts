import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '../layout/auth-layout/auth-layout.component';
import { LobbyComponent } from './components/lobby/lobby.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AuthLayoutComponent,

        children: [
          { path: '', pathMatch: 'full', component: LobbyComponent },
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
export class GameRoutingModule {}
