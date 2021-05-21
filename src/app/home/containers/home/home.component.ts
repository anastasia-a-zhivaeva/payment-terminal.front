import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Provider } from '@core/interfaces';
import { HomeFacade } from '@home/home.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public providers$: Observable<Provider[]>;

  constructor(private router: Router, private homeFacade: HomeFacade) {
    this.providers$ = this.homeFacade.providers$;
  }

  public refill(id: string) {
    this.router.navigate(['refill', id]);
  }
}
