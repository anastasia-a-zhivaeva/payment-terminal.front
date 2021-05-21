import { CommonModule } from '@angular/common';
import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NgxMaskModule } from 'ngx-mask';
import { of, Subject } from 'rxjs';

import { Provider } from '@core/interfaces';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared';
import { RefillFacade } from '@refill/refill.facade';
import { RefillFormComponent } from '@refill/containers';

describe('RefillFormComponent', () => {
  let component: RefillFormComponent;
  let debugElement;
  let fixture;
  const provider: Provider = {
    id: '1',
    name: 'MTS',
    image: 'assets/images/mts.png',
  };
  const snackBarConfig: MatSnackBarConfig = {
    duration: 2000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          CoreModule,
          NgxMaskModule.forChild(),
          SharedModule, // In real project should be used mocked SharedModule
        ],
        declarations: [RefillFormComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              params: of({ id: '1' }),
            },
          },
          {
            provide: RefillFacade,
            useValue: {
              getProviderById: () => of(provider),
              refill: () => '',
              clear: () => undefined,
              refill$: new Subject(),
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(RefillFormComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
    }),
  );

  it('should create the component', () => {
    expect(component).toBeDefined();
  });

  it('refillForm should be defined', () => {
    expect(component.refillForm).toBeDefined();
  });

  it('after ngOnInit should has provider, refillForm should has provider id', fakeAsync(() => {
    expect(component.provider).toBeUndefined();
    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();

    expect(component.provider).toBe(provider);
    expect(component.refillForm.get('providerId').value).toBe('1');
    expect(fixture.nativeElement.querySelector('form')).toBeDefined();
  }));

  it('refillFrom amount value should be grater than 0 and less than 1001, mask should work', fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();

    expect(component.amount.value).toBeNull();
    expect(component.amount.errors.min).toBeUndefined();
    expect(component.amount.errors.max).toBeUndefined();
    expect(fixture.nativeElement.querySelector('mat-hint')).toBeNull();

    component.amount.setValue(100.111);
    fixture.detectChanges();
    tick(1000);
    expect(component.amount.errors).toBeNull();
    expect(fixture.nativeElement.querySelector('#amount').value).toBe('100.11');
    expect(fixture.nativeElement.querySelector('mat-hint')).toBeNull();

    component.amount.setValue(0);
    component.refillForm.markAllAsTouched();
    fixture.detectChanges();
    tick(1000);
    expect(component.amount.errors.min).toBeTruthy();
    expect(component.amount.errors.max).toBeUndefined();
    expect(fixture.nativeElement.querySelector('mat-hint').textContent).toBe(
      ' Refill amount must be greater than or equal to 1 RUB ',
    );

    component.amount.setValue(1001);
    component.refillForm.markAllAsTouched();
    fixture.detectChanges();
    tick(1000);
    expect(component.amount.errors.min).toBeUndefined();
    expect(component.amount.errors.max).toBeTruthy();
    expect(fixture.nativeElement.querySelector('mat-hint').textContent).toBe(
      ' Refill amount must be less than or equal 1000 RUB ',
    );
  }));

  it('refillFrom phoneNumber value should match regex, mask should work', fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();

    expect(component.refillForm.get('phoneNumber').value).toBeNull();
    expect(component.refillForm.get('phoneNumber').errors.pattern).toBeUndefined();

    component.refillForm.get('phoneNumber').setValue('11');
    fixture.detectChanges();
    tick(1000);
    expect(component.refillForm.get('phoneNumber').errors.pattern).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#phoneNumber').value).toBe('+1 (1');

    component.refillForm.get('phoneNumber').setValue('11111111111');
    fixture.detectChanges();
    tick(1000);
    expect(fixture.nativeElement.querySelector('#phoneNumber').value).toBe('+1 (111) 111-11-11');
  }));

  it('refillForm invalid when required fields are empty', fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();

    expect(component.refillForm.invalid).toBeTruthy();
    expect(fixture.nativeElement.querySelector('button[type=submit]').getAttribute('disabled')).toBe('true');

    component.amount.setValue(10);
    fixture.detectChanges();
    tick(1000);
    expect(component.refillForm.invalid).toBeTruthy();
    expect(fixture.nativeElement.querySelector('button[type=submit]').getAttribute('disabled')).toBe('true');

    component.refillForm.get('phoneNumber').setValue('+1 (111) 111-11-11');
    fixture.detectChanges();
    tick(1000);
    expect(component.refillForm.invalid).toBeFalsy();
    expect(fixture.nativeElement.querySelector('button[type=submit]').getAttribute('disabled')).toBeNull();
  }));

  it('if refillForm invalid, refill method should not be called', () => {
    const refillFormFacade = debugElement.injector.get(RefillFacade);
    const refillSpy = spyOn(refillFormFacade, 'refill');

    component.submit();

    expect(refillSpy).not.toHaveBeenCalled();
  });

  it('if refill is successful, snack bar should be opened with Success message', fakeAsync(() => {
    component.amount.setValue(10);
    component.refillForm.get('phoneNumber').setValue('+1 (111) 111-11-11');
    component.refillForm.get('providerId').setValue('1');
    expect(component.refillForm.valid).toBe(true);
    fixture.detectChanges();

    const snackBar = debugElement.injector.get(MatSnackBar);
    const snackByOpenSpy = spyOn(snackBar, 'open').and.returnValue({
      afterDismissed: () => of(),
    });

    const refillFormFacade = debugElement.injector.get(RefillFacade);
    const successMessage = 'Success';
    refillFormFacade.refill$.next({ ...component.refillForm.value, successMessage });
    const refillSpy = spyOn(refillFormFacade, 'refill');

    component.submit();
    expect(refillSpy).toHaveBeenCalledWith(component.refillForm.value);
    tick(3000);
    expect(snackByOpenSpy).toHaveBeenCalledWith(successMessage, '', snackBarConfig);
  }));

  it('if refill is unsuccessful, snack bar should be opened with Error message', fakeAsync(() => {
    component.amount.setValue(10);
    component.refillForm.get('phoneNumber').setValue('+1 (111) 111-11-11');
    component.refillForm.get('providerId').setValue('1');
    fixture.detectChanges();

    const snackBar = debugElement.injector.get(MatSnackBar);
    const snackByOpenSpy = spyOn(snackBar, 'open');

    const refillFormFacade = debugElement.injector.get(RefillFacade);
    const errorMessage = 'Error';
    refillFormFacade.refill$.next({ ...component.refillForm.value, errorMessage });
    const refillSpy = spyOn(refillFormFacade, 'refill');

    component.submit();
    expect(refillSpy).toHaveBeenCalledWith(component.refillForm.value);
    tick(3000);
    expect(snackByOpenSpy).toHaveBeenCalledWith(errorMessage, '', snackBarConfig);
  }));
});
