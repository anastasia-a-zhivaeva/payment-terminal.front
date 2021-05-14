import { Injectable } from '@angular/core';
import { Provider } from '@core/models';
import { ProviderService } from '@core/services';
import { RefillForm } from './/models';

import { RefillService } from './/services';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RefillFormFacade {
  constructor(private providerService: ProviderService, private refillService: RefillService) {}

  getProviderById(id: string): Observable<Provider> {
    return this.providerService.getById(id);
  }

  refill(refillForm: RefillForm): Observable<string> {
    return this.refillService.refill(refillForm);
  }
}
