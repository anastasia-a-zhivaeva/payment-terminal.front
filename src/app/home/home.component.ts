import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Provider } from '../shared/models';
import { ProviderService } from '../shared/services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public providers: Observable<Provider[]>;

  constructor(private router: Router,
              private providerService: ProviderService) {
  }

  ngOnInit() {
    this.providers = this.providerService.get();
  }

  public choose(provider: Provider) {
    this.router.navigate(['refill', provider.id]);
  }

}
