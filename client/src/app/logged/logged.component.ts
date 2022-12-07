import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Game } from '../../../../system-shared/models/specific-events.model';
import { SocketioService } from '../services/socketio.service';
import { AppState } from '../state/app-state';
import { selectUser } from '../state/user/user.selectors';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss'],
})
export class LoggedComponent implements OnInit {
  games$: Observable<Game[]> = this.socketService.games$;
  user$ = this.store.select(selectUser);
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

  createRoom(name: string) {
    this.socketService.createRoom(name).subscribe((v) => (this.activeGame = v));
  }
}
