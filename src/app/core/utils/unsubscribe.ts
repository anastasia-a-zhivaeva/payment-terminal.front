import { Directive, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class Unsubscribe implements OnDestroy {
  protected unsubscribe: Subject<void> = new Subject();

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
