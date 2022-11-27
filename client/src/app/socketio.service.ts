import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import {
  SE_Basic,
  SE_Direction,
  SE_SubjectAction,
} from '../../../system-shared/models/socket-events.model';
import { CustomEmitter } from '../../../system-shared/custom-emitter';
import { UserData } from '../../../system-shared/models/user.model';
import { RoomOpen } from '../../../system-shared/models/specific-events.model';

@Injectable({
  providedIn: 'root',
})
export class SocketioService implements OnDestroy {
  private static createdRooms = 0;
  mockUserId = 1000;
  private socket: Socket = io(environment.SOCKET_ENDPOINT, {
    query: {
      socketUserId: `user:${this.mockUserId}`,
    },
  });
  private emitter = new CustomEmitter(SE_Direction.FROM_CLIENT);
  rooms: any[] = [];

  constructor() {}

  ngOnDestroy(): void {
    this.disconnectAll();
    console.log('destroy');
  }

  disconnectAll(): void {
    this.socket.removeAllListeners();
    this.socket.disconnect();
  }

  setupSocketClient() {
    this.listenToEventsFromServer(this.socket);
  }

  createRoom() {
    const room = `${this.mockUserId}-${SocketioService.createdRooms++}`;

    this.emitter.emit<RoomOpen>(
      this.socket,
      SE_SubjectAction.user_create_room,
      {
        socketUserId: `user:${this.mockUserId}`,
        roomId: `room:${room}`,
      }
    );
  }

  private listenToEventsFromServer(socket: Socket) {
    socket.on(
      `${SE_Direction.FROM_SERVER}#${SE_SubjectAction.general_update_client}`,
      ({ rooms }) => {
        console.log(rooms);
        this.rooms = rooms.length;
      }
    );

    socket.on(SE_Basic.disconnect, () => {
      this.socket.removeAllListeners();
    });
  }
}
