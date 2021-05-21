import { Injectable } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { concatMap, filter, map } from 'rxjs/operators';

import { ProvidersState } from '@store/providers/providers.state';
import { ProvidersStateModel } from '@store/providers/providers.model';
import { RefillForm } from '@refill/intefaces';
import { ID, Provider } from '@core/interfaces';
import { Refill } from '@refill/store/refill/refill.actions';
import { RefillStateModel } from '@refill/store/refill/refill.model';
import { RefillState } from '@refill/store/refill/refill.state';

@Injectable({ providedIn: 'root' })
export class RefillFacade {
  @Select(RefillState) private _refill$: Observable<RefillStateModel>;

  constructor(private store: Store) {}

  get refill$(): Observable<RefillStateModel> {
    return this._refill$;
  }

  getProviderById(id: ID): Observable<Provider> {
    return this.store.select<ProvidersStateModel>(ProvidersState).pipe(
      filter((providers: ProvidersStateModel) => !!providers.length),
      concatMap((_) => this.store.select(ProvidersState.provider).pipe(map((filterFn) => filterFn(id)))),
    );
  }

  refill(refillForm: RefillForm) {
    this.store.dispatch(new Refill.Refill(refillForm));
  }

  clear() {
    this.store.dispatch(new Refill.Clear());
  }
}
