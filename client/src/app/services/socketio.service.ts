import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import {
  SE_Basic,
  SE_Source,
  SE_Message,
} from '../../../../system-shared/models/socket-events.model';
import { CustomSocketEmitter } from '../../../../system-shared/custom-emitter';
import {
  RoomData,
  RoomHash,
  RoomOpen,
} from '../../../../system-shared/models/specific-events.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app-state';
import { selectUserId } from '../state/user/user.selectors';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketioService implements OnDestroy {
  private destroy = new Subject<void>();
  private static createdRooms = 0;
  userId: string | undefined;
  private socket: Socket | undefined;
  private emitter = new CustomSocketEmitter(SE_Source.CLIENT);

  rooms$ = new BehaviorSubject<RoomData[]>([]);

  constructor(private store: Store<AppState>) {
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
    if (this.socket) {
      this.emitter.emit<RoomOpen>(this.socket, SE_Message.user_create_room, {
        createdByUserId: `user:${this.userId}`,
        roomId: `room:${this.userId}-${SocketioService.createdRooms++}-${name}`,
        name,
      });
    }
  }

  private listenToSocketEvents(socket: Socket) {
    socket.on(
      `${SE_Source.SERVER}#${SE_Message.update_rooms}`,
      (rooms: RoomData[]) => {
        console.log(rooms);
        this.rooms$.next(rooms);
      }
    );

    socket.on(SE_Basic.disconnect, () => {
      this.socket?.removeAllListeners();
    });
  }
}
