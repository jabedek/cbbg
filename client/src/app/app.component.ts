import { Component, OnDestroy } from '@angular/core';

import { SocketioService } from './socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'cbbg';
  constructor(public socketService: SocketioService) {}

  ngOnInit() {
    this.socketService.setupSocketClient();
  }

  ngOnDestroy() {
    this.socketService.disconnectAll();
    console.log('destroy');
  }

  newRoom() {
    this.socketService.createRoom();
  }
}
