import { Injectable } from '@angular/core';

import { Action, State, StateContext } from '@ngxs/store';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { RefillService } from '@refill/services';
import { Refill } from '@refill/store/refill/refill.actions';
import { RefillStateModel } from '@refill/store/refill/refill.model';

const refillDefault = null;

@State<RefillStateModel>({
  name: 'refill',
  defaults: refillDefault,
})
@Injectable()
export class RefillState {
  constructor(private refillService: RefillService) {}

  @Action(Refill.Refill)
  refill({ setState }: StateContext<RefillStateModel>, { refillForm }: Refill.Refill) {
    return this.refillService.refill(refillForm).pipe(
      tap((successMessage: string) => setState({ ...refillForm, successMessage })),
      catchError((error: Error) => {
        setState({ ...refillForm, errorMessage: error.message });
        return EMPTY;
      }),
    );
  }

  @Action(Refill.Clear)
  clear({ setState }: StateContext<RefillStateModel>) {
    setState(refillDefault);
  }
}
