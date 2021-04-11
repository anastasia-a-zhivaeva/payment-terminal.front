import { Injectable } from '@angular/core';

import { Observable, throwError, timer } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Refill } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RefillService {

  constructor() {
  }

  public refill(refill: Refill): Observable<string> {
    return timer(1000)
      .pipe(
        map((_) => {
            if (Math.floor((Math.random() * 10) + 1) > 5) {
              return `Successful refill. Phone number: ${refill.phoneNumber}. Amount: ${refill.amount}`;
            } else {
              throw new Error('Refill is unsuccessful. Please try again.');
            }
          }
        )
      );
  }
}
