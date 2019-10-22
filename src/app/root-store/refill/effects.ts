import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import * as featureActions from './actions';
import { RefillService } from '@shared/services';


@Injectable()
export class MyFeatureStoreEffects {
  constructor(private dataService: RefillService, private actions$: Actions) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadRequestAction>(
      featureActions.ActionTypes.LOAD_REQUEST
    ),
    startWith(new featureActions.LoadRequestAction()),
    switchMap(action =>
      this.dataService
        .refill()
        .pipe(
          map(
            items =>
              new featureActions.LoadSuccessAction({
                items
              })
          ),
          catchError(error =>
            of(new featureActions.LoadFailureAction({ error }))
          )
        )
    )
  );
}
