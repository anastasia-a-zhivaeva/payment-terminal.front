import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Provider } from '@core/interfaces';
import { ProviderService } from '@core/services';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public providers: Observable<Provider[]>;

  constructor(private router: Router, private providerService: ProviderService) {}

  ngOnInit() {
    this.providers = this.providerService.get();
  }

  public refill(id: string) {
    this.router.navigate(['refill', id]);
  }
}
