import { Injectable } from '@angular/core';

import { Store } from '@ngxs/store';

import { Providers } from '@store/providers/providers.actions';

@Injectable({ providedIn: 'root' })
export class AppFacade {
  constructor(private store: Store) {}

  getProviders() {
    this.store.dispatch(new Providers.Get());
  }
}
