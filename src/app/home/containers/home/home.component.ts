import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Provider } from '@core/models';
import { HomeFacade } from '@home/home.facade';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public providers: Observable<Provider[]>;

  constructor(private router: Router, private homeFacade: HomeFacade) {}

  ngOnInit() {
    this.providers = this.homeFacade.getProviders();
  }

  public refill(id: string) {
    this.router.navigate(['refill', id]);
  }
}
