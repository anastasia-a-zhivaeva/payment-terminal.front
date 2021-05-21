import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { Providers } from '@store/providers/providers.actions';
import { ProvidersStateModel } from '@store/providers/providers.model';
import { ID, Provider } from '@core/interfaces';
import { ProviderService } from '@core/services';

@State<ProvidersStateModel>({
  name: 'providers',
  defaults: [],
})
@Injectable()
export class ProvidersState {
  constructor(private providerService: ProviderService) {}

  @Selector()
  static provider(state: ProvidersStateModel): (id: ID) => Provider {
    return (id: ID) => state.find((provider) => provider.id === id);
  }

  @Action(Providers.Get)
  setProviders({ setState }: StateContext<ProvidersStateModel>) {
    return this.providerService.get().pipe(tap((providers: Provider[]) => setState(providers)));
  }
}
