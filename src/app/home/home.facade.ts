import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Provider } from '@core/models';
import { ProviderService } from '@core/services';

@Injectable({ providedIn: 'root' })
export class HomeFacade {
  constructor(private providerService: ProviderService) {}

  getProviders(): Observable<Provider[]> {
    return this.providerService.get();
  }
}
