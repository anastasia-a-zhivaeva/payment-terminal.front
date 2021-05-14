import { Injectable } from '@angular/core';

import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { Provider } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private mockProviders: Provider[] = [
    {
      id: '1',
      name: 'MTS',
      image: 'assets/images/mts.png',
    },
    {
      id: '2',
      name: 'Beeline',
      image: 'assets/images/beeline.png',
    },
    {
      id: '3',
      name: 'MegaFon',
      image: 'assets/images/megafon.png',
    },
  ];

  constructor() {}

  public get(): Observable<Provider[]> {
    return timer(1000).pipe(map((_) => this.mockProviders));
  }

  public getById(id: string): Observable<Provider> {
    return timer(1000).pipe(map((_) => this.mockProviders.find((provider: Provider) => provider.id === id)));
  }
}
