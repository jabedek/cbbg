import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../../../../../system-shared/models/specific-events.model';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent {
  @Input() games: Game[] = [];
  @Output() createGame = new EventEmitter<string>();
  @Output() joinGame = new EventEmitter<Game>();
  popoverVisible = false;
  selectedGame: Game | undefined;

  popupJoinGame(game: Game) {
    this.selectedGame = game;
    this.popoverVisible = true;
  }

  join() {
    if (this.selectedGame) {
      this.joinGame.emit(this.selectedGame);
      this.popoverVisible = false;
      this.selectedGame = undefined;
    }
  }
}
