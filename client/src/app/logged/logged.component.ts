import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Game } from '../../../../system-shared/models/specific-events.model';
import {
  UsersDataMap,
  UserSocketSessionDataWithSocket,
  UserSocketSessionDataWithSocketID,
} from '../../../../system-shared/models/user.model';
import { SocketioService } from '../services/socketio.service';
import { AppState } from '../state/app-state';
import { selectUser } from '../state/user/user.selectors';
import { UserState } from '../state/user/user.state';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss'],
})
export class LoggedComponent implements OnInit {
  games$: Observable<Game[]> = this.socketService.games$;
  users$: Observable<Readonly<UserSocketSessionDataWithSocketID[]>> =
    this.socketService.users$;
  authUser$: Observable<UserState | undefined> = this.store.select(selectUser);
  activeGame: Game | undefined;

  constructor(
    public socketService: SocketioService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.socketService.setupSocketClient();
  }

  ngOnDestroy() {
    this.socketService.disconnectAll();
  }

  createGame(name: string) {
    this.socketService.createGame(name).subscribe((v) => (this.activeGame = v));
  }

  joinGame(game: Game) {
    this.socketService.joinGame(game).subscribe((v) => (this.activeGame = v));
  }
}
