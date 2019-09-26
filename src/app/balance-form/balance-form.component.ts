import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Provider } from '../shared/models';
import { ProviderService, RefillService } from '../shared/services';

@Component({
  selector: 'app-balance-form',
  templateUrl: './balance-form.component.html',
  styleUrls: ['./balance-form.component.scss'],
})
export class BalanceFormComponent implements OnInit {
  public provider: Provider;
  public refillForm: FormGroup;
  public errorMessage: string;
  public successMessage: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
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
      });
  }

  public submit() {
    if (this.refillForm.invalid) {
      return;
    }
    this.errorMessage = null;
    this.refillService.refill(this.refillForm.value)
      .subscribe(
        (successMessage: string) => {
          this.successMessage  = successMessage;
          timer(2000)
            .subscribe(() => this.router.navigate(['home']));
        },
        (errorMessage: string) => {
          this.errorMessage = errorMessage;
        });
  }

  get amount(): AbstractControl {
    return this.refillForm.get('amount');
  }

}
