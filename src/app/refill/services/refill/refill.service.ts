import { Injectable } from '@angular/core';

import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { RefillForm } from '@refill/intefaces';

@Injectable({
  providedIn: 'root',
})
export class RefillService {
  constructor() {}

  public refill(refillForm: RefillForm): Observable<string> {
    return timer(1000).pipe(
      map((_) => {
        if (Math.floor(Math.random() * 10 + 1) > 5) {
          return `Successful refill. Phone number: ${refillForm.phoneNumber}. Amount: ${refillForm.amount}`;
        } else {
          throw new Error('Refill is unsuccessful. Please try again.');
        }
      }),
    );
  }
}
