import { Component, OnInit } from '@angular/core';

import { AppFacade } from '@app/app.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private appFacade: AppFacade) {}

  ngOnInit(): void {
    this.appFacade.getProviders();
  }
}
