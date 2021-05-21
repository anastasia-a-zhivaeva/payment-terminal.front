import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { EMPTY } from 'rxjs';
import { concatMap, filter, takeUntil } from 'rxjs/operators';

import { Provider } from '@core/interfaces';
import { Unsubscribe } from '@core/utils';
import { RefillFacade } from '@refill/refill.facade';
import { RefillStateModel } from '@refill/store/refill/refill.model';

@Component({
  selector: 'app-refill-form',
  templateUrl: './refill-form.component.html',
  styleUrls: ['./refill-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefillFormComponent extends Unsubscribe implements OnInit {
  provider: Provider;
  refillForm: FormGroup;
  refill$ = this.refillFacade.refill$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private ref: ChangeDetectorRef,
    private refillFacade: RefillFacade,
  ) {
    super();

    this.refillForm = new FormGroup({
      providerId: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}/)]),
      amount: new FormControl(null, [Validators.min(1), Validators.max(1000), Validators.required]),
    });
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.unsubscribe),
        concatMap((params: Params) => this.refillFacade.getProviderById(params.id)),
      )
      .subscribe((provider: Provider) => {
        this.provider = provider;
        this.refillForm.get('providerId').setValue(this.provider.id);
        this.ref.markForCheck();
      });

    const snackBarConfig: MatSnackBarConfig = {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };

    this.refill$
      .pipe(
        takeUntil(this.unsubscribe),
        filter((refill: RefillStateModel) => !!refill),
        concatMap((refill: RefillStateModel) => {
          if (refill.errorMessage) {
            this.snackBar.open(refill.errorMessage, '', snackBarConfig);
            return EMPTY;
          }
          return this.snackBar.open(refill.successMessage, '', snackBarConfig).afterDismissed();
        }),
      )
      .subscribe((_) => {
        if (!_) return;

        this.refillFacade.clear();
        return this.router.navigate(['home']);
      });
  }

  public submit() {
    if (this.refillForm.invalid) {
      return;
    }
    this.refillFacade.refill(this.refillForm.value);
  }

  get amount(): AbstractControl {
    return this.refillForm.get('amount');
  }
}
