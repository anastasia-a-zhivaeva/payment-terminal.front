import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { mergeMap } from 'rxjs/operators';

import { Provider } from '@shared/models';
import { ProviderService, RefillService } from '@shared/services';

@Component({
  selector: 'app-balance-form',
  templateUrl: './balance-form.component.html',
  styleUrls: ['./balance-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceFormComponent implements OnInit {
  public provider: Provider;
  public refillForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private ref: ChangeDetectorRef,
              private providerService: ProviderService,
              private refillService: RefillService) {
    this.refillForm = new FormGroup({
      providerId: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}/)]),
      amount: new FormControl(null, [Validators.min(1), Validators.max(1000), Validators.required]),
    });
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        mergeMap((params: Params) => this.providerService.getById(params.id)),
      )
      .subscribe((provider: Provider) => {
        this.provider = provider;
        this.refillForm.get('providerId').setValue(this.provider.id);
        this.ref.detectChanges();
      });
  }

  public submit() {
    if (this.refillForm.invalid) {
      return;
    }
    this.refillService.refill(this.refillForm.value)
      .subscribe(
        (successMessage: string) => {
          this.snackBar.open(successMessage, '', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          })
            .afterDismissed()
            .subscribe(() => this.router.navigate(['home']));
        },
        (errorMessage: string) => {
          this.snackBar.open(errorMessage, '', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        });
  }

  get amount(): AbstractControl {
    return this.refillForm.get('amount');
  }

}
