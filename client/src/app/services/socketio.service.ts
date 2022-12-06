import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import {
  SE_Basic,
  SE_Source,
  SE_Message,
} from '../../../../system-shared/models/socket-events.model';
import { CustomSocketEmitter } from '../../../../system-shared/custom-emitter';
import { Game } from '../../../../system-shared/models/specific-events.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app-state';
import { selectUserId } from '../state/user/user.selectors';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SocketioService implements OnDestroy {
  private destroy = new Subject<void>();
  userId: string | undefined;
  private socket: Socket | undefined;
  private emitter = new CustomSocketEmitter(SE_Source.CLIENT);

  games$ = new BehaviorSubject<Game[]>([]);

  constructor(private store: Store<AppState>, private router: Router) {
    this.store
      .select(selectUserId)
      .pipe(takeUntil(this.destroy))
      .subscribe((id) => (this.userId = id?.toString()));
  }

  ngOnDestroy(): void {
    this.disconnectAll();
    this.destroy.next();
    this.destroy.complete();
    console.log('destroy');
  }

  disconnectAll(): void {
    this.socket?.removeAllListeners();
    this.socket?.disconnect();
  }

  setupSocketClient() {
    this.socket = io(environment.SOCKET_ENDPOINT, {
      query: {
        userId: `user:${this.userId}`,
      },
    });
    this.listenToSocketEvents(this.socket);
  }

  createRoom(name: string) {
    const nameRandom = `${name}-${Math.randomInt(1000, 9999)}`;
    const game: Game = {
      createdByUserId: `user:${this.userId}`,
      gameId: `game:${this.userId}-${nameRandom}`,
      name: nameRandom,
      connectedSockets: [],
    };
    console.log(game);

    if (this.socket) {
      this.emitter.emit<Game>(this.socket, SE_Message.user_create_game, game);

      this.socket.on(
        `${SE_Source.SERVER}#${SE_Message.user_create_game_response}`,
        (result: string) => {
          if (result === 'created') {
            this.router.navigate([`/play/game`, game.gameId], { state: game });
          }
        }
      );
    }
  }

  private listenToSocketEvents(socket: Socket) {
    socket.on(
      `${SE_Source.SERVER}#${SE_Message.send_active_games}`,
      (games: Game[]) => {
        console.log(games);
        this.games$.next(games);
      }
    );

    socket.on(SE_Basic.disconnect, () => {
      console.log('callback');

      this.socket?.removeAllListeners();
    });
  }
}
