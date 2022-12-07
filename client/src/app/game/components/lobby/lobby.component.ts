import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketioService } from 'src/app/services/socketio.service';
import { Game } from '../../../../../../system-shared/models/specific-events.model';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  games$: Observable<Game[]> = this.socketService.games$;

  constructor(public socketService: SocketioService) {}

  ngOnInit() {
    this.socketService.setupSocketClient();
  }

  ngOnDestroy() {
    this.socketService.disconnectAll();
  }

  createRoom(name: string) {
    this.socketService.createRoom(name).subscribe((v) => console.log(v));
  }
}
