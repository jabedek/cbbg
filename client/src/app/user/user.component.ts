import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RoomData,
  RoomOpen,
} from '../../../../system-shared/models/specific-events.model';
import { SocketioService } from '../services/socketio.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  constructor(public socketService: SocketioService) {}
  rooms$: Observable<RoomData[]> = this.socketService.rooms$;

  ngOnInit() {
    this.socketService.setupSocketClient();
  }

  ngOnDestroy() {
    this.socketService.disconnectAll();
    console.log('destroy');
  }

  createRoom(name: string) {
    console.log(name);

    this.socketService.createRoom(name);
  }
}
