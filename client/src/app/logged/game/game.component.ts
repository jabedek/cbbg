import { Component, Input, OnInit } from '@angular/core';
import { UserState } from 'src/app/state/user/user.state';
import { Game } from '../../../../../system-shared/models/specific-events.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input() activeGame: Game | undefined;
  @Input() user: UserState | undefined;

  ngOnInit() {
    console.log(this.activeGame);
    console.log(this.user);
  }
}
