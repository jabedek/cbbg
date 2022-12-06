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
  @Output() create = new EventEmitter<string>();

  constructor(public socketService: SocketioService) {}

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
