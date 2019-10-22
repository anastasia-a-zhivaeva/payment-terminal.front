import { Injectable } from '@angular/core';

import { Observable, of, throwError, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { SharedModule } from '@shared';
import { Refill } from '../models';

@Injectable({
  providedIn: SharedModule,
})
export class RefillService {

  constructor() {
  }

  public refill(refill: Refill): Observable<string> {
    return timer(1000)
      .pipe(
        switchMap(() => Math.floor((Math.random() * 10) + 1) > 5 ?
          of(`Successful refill. Phone number: ${refill.phoneNumber}. Amount: ${refill.amount}`) :
          throwError('Refill is unsuccessful. Please try again.'),
        ),
      );
  }
}
