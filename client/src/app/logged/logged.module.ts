import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { LobbyComponent } from './lobby/lobby.component';
import { LoggedComponent } from './logged.component';
import { LoggedRoutingModule } from './logged-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { AnswerCardComponent } from './game/components/answer-card/answer-card.component';

@NgModule({
  declarations: [GameComponent, LobbyComponent, LoggedComponent, AnswerCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoggedRoutingModule,
    SharedModule,
    LayoutModule,
  ],
  exports: [GameComponent, LobbyComponent],
})
export class LoggedModule {}
