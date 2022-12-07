import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../../../../../system-shared/models/specific-events.model';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent {
  @Input() games: Game[] = [];
  @Output() createRoom = new EventEmitter<string>();
  popoverVisible = false;
  selectedGame: Game | undefined;

  joinRoom(game: Game) {
    console.log(game);
    this.selectedGame = game;
    this.popoverVisible = true;
  }
}
