import { Injectable } from '@angular/core';

import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ProvidersStateModel } from '@store/providers/providers.model';

@Injectable({ providedIn: 'root' })
export class HomeFacade {
  @Select((state) => state.providers) private _providers$: Observable<ProvidersStateModel>;

  get providers$(): Observable<ProvidersStateModel> {
    return this._providers$;
  }
}
