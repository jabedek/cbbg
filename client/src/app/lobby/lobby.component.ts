import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  RoomData,
  RoomOpen,
} from '../../../../system-shared/models/specific-events.model';
import { SocketioService } from '../services/socketio.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  @Input() rooms: RoomData[] = [];
  @Output() create = new EventEmitter<string>();

  ngOnInit(): void {}
}
