import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { LobbyModule } from '../lobby/lobby.module';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, LobbyModule, UserRoutingModule],
})
export class UserModule {}
