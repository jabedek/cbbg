import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './components/game/game.component';
import { LobbyComponent } from './components/lobby/lobby.component';

@NgModule({
  declarations: [LobbyComponent, GameComponent],
  imports: [CommonModule, GameRoutingModule],
  exports: [LobbyComponent, GameComponent],
})
export class GameModule {}
