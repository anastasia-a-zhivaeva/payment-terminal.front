import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { catchError, concatMap, takeUntil } from 'rxjs/operators';

import { Provider } from '@core/interfaces';
import { ProviderService, RefillService } from '@core/services';
import { Unsubscribe } from '@core/utils';

@Component({
  selector: 'app-balance-form',
  templateUrl: './balance-form.component.html',
  styleUrls: ['./balance-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceFormComponent extends Unsubscribe implements OnInit {
  public provider: Provider;
  public refillForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private ref: ChangeDetectorRef,
    private providerService: ProviderService,
    private refillService: RefillService,
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
        concatMap((params: Params) => this.providerService.getById(params.id)),
      )
      .subscribe((provider: Provider) => {
        this.provider = provider;
        this.refillForm.get('providerId').setValue(this.provider.id);
        this.ref.markForCheck();
      });
  }

  public submit() {
    if (this.refillForm.invalid) {
      return;
    }
    const snackBarConfig: MatSnackBarConfig = {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };
    this.refillService
      .refill(this.refillForm.value)
      .pipe(
        takeUntil(this.unsubscribe),
        concatMap((successMessage: string) => this.snackBar.open(successMessage, '', snackBarConfig).afterDismissed()),
      )
      .subscribe(
        () => this.router.navigate(['home']),
        (error) => this.snackBar.open(error.message, '', snackBarConfig),
      );
  }

  get amount(): AbstractControl {
    return this.refillForm.get('amount');
  }
}
