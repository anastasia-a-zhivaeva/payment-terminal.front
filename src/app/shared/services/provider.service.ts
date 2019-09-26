import { Injectable } from '@angular/core';

import { Observable, of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Provider } from '../models';

@Injectable()
export class ProviderService {

  private mockProviders: Provider[] = [{
    id: '1',
    name: 'MTS',
    image: 'assets/images/mts.png',
  }, {
    id: '2',
    name: 'Beeline',
    image: 'assets/images/beeline.png',
  }, {
    id: '3',
    name: 'MegaFon',
    image: 'assets/images/megafon.png',
  }];

  constructor() {
  }

  public get(): Observable<Provider[]> {
    return timer(1000)
      .pipe(
        switchMap(() => of(this.mockProviders)),
      );
  }

  public getById(id: string): Observable<Provider> {
    return timer(1000)
      .pipe(
        switchMap(() => of(this.mockProviders.find((provider: Provider) => provider.id === id))),
      );
  }
}
