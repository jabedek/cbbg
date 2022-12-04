import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <!-- <app-header></app-header> -->
    <!-- <app-sidebar></app-sidebar> -->
    <div class="wrapper">
      <!-- <router-outlet></router-outlet> -->
      <!-- <app-footer></app-footer> -->
    </div>
  `,
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
