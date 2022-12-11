import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import {
  B,
  S,
  M,
  GT,
  G,
} from '../../../../system-shared/models/socket-events.model';
import { CustomSocketEmitter } from '../../../../system-shared/custom-emitter';
import { Game } from '../../../../system-shared/models/specific-events.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app-state';
import { selectUserId } from '../state/user/user.selectors';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import {
  UsersDataMap,
  UserSocketSessionDataWithSocket,
  UserSocketSessionDataWithSocketID,
} from '../../../../system-shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SocketioService implements OnDestroy {
  private destroy = new Subject<void>();
  userId: string | undefined;
  private socket: Socket | undefined;
  private emitter: CustomSocketEmitter | undefined;

  users$ = new BehaviorSubject<Readonly<UserSocketSessionDataWithSocketID[]>>(
    []
  );
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

    this.emitter = new CustomSocketEmitter(S.CLIENT, this.socket);

    this.listenToSocketEvents(this.socket);
  }

  createGame(name: string): Observable<Game> {
    const nameRandom = `${name}-${Math.randomInt(1000, 9999)}`;
    const game: Game = {
      createdByUserId: `user:${this.userId}`,
      gameId: `game:${this.userId}-${nameRandom}`,
      name: nameRandom,
      connectedSockets: [],
    };
    return new Observable((subscriber) => {
      if (this.socket) {
        this.socket.on(
          `${S.SERVER}#${M.user_create_game_response}`,
          (result: Game) => {
            this.listenToGameEvents(result);

            subscriber.next(result);
            subscriber.complete();
          }
        );
        this.emitter?.emit<Game>(M.user_create_game, game);
      } else {
        subscriber.error(new Error('No socket.'));
      }
    });
  }

  joinGame(game: Game): Observable<Game> {
    return new Observable((subscriber) => {
      if (this.socket) {
        this.socket.on(
          `${S.SERVER}#${M.user_joined_game_response}`,
          (result: Game) => {
            this.listenToGameEvents(result);
            subscriber.next(result);
            subscriber.complete();
          }
        );
        this.emitter?.emit(M.user_joined_game, { game, userId: this.userId });
      } else {
        subscriber.error(new Error('No socket.'));
      }
    });
  }

  listenToGameEvents(game: Game) {
    const messageType: GT = `${game.gameId}_${G.game_broadcast_hello}`;

    this.socket?.on(messageType, (event) => {
      console.log(event);
    });
  }

  private listenToSocketEvents(socket: Socket) {
    socket.on(`${S.SERVER}#${M.send_active_games}`, (games: Game[]) => {
      console.log(games);
      this.games$.next(games);
    });

    socket.on(
      `${S.SERVER}#${M.send_active_users}`,
      (users: UserSocketSessionDataWithSocketID[]) => {
        console.log(users);
        this.users$.next(users);
      }
    );

    socket.on(B.disconnect, () => {
      console.log('callback');

      this.socket?.removeAllListeners();
    });
  }
}
