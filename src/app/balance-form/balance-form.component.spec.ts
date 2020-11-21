import { CommonModule } from '@angular/common';
import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { of, throwError } from 'rxjs';

import { Provider } from '@shared/models';
import { ProviderService, RefillService } from '../shared/services';
import { SharedModule } from '@shared';
import { BalanceFormComponent } from './balance-form.component';

describe('BalanceFormComponent', () => {
  let component: BalanceFormComponent;
  let debugElement;
  let fixture;
  const provider: Provider = {
    id: '1',
    name: 'MTS',
    image: 'assets/images/mts.png',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        SharedModule, // In real project should be used mocked SharedModule
      ],
      declarations: [
        BalanceFormComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            params: of({ id: '1' }),
          },
        },
        {
          provide: ProviderService, useValue: {
            getById: (id: string) => of(provider),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  }));

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

  it('refillFrom amount value should be grater than 0 and less than 1001', fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();

    expect(component.amount.value).toBeNull();
    expect(component.amount.errors.min).toBeUndefined();
    expect(component.amount.errors.max).toBeUndefined();
    expect(fixture.nativeElement.querySelector('mat-hint')).toBeNull();

    component.amount.setValue(100.111);
    fixture.detectChanges();
    expect(component.amount.errors).toBeNull();
    expect(component.amount.value).toBe(100.111);
    expect(fixture.nativeElement.querySelector('mat-hint')).toBeNull();

    component.amount.setValue(0);
    component.refillForm.markAllAsTouched();
    fixture.detectChanges();
    expect(component.amount.errors.min).toBeTruthy();
    expect(component.amount.errors.max).toBeUndefined();
    expect(fixture.nativeElement.querySelector('mat-hint').textContent).toBe(' Refill amount must be greater than or equal to 1 RUB ');

    component.amount.setValue(1001);
    component.refillForm.markAllAsTouched();
    fixture.detectChanges();
    expect(component.amount.errors.min).toBeUndefined();
    expect(component.amount.errors.max).toBeTruthy();
    expect(fixture.nativeElement.querySelector('mat-hint').textContent).toBe(' Refill amount must be less than or equal 1000 RUB ');
  }));

  it('refillFrom phoneNumber value should match regex, mask should work', fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();

    expect(component.refillForm.get('phoneNumber').value).toBeNull();
    expect(component.refillForm.get('phoneNumber').errors.pattern).toBeUndefined();

    component.refillForm.get('phoneNumber').setValue('11');
    component.refillForm.markAllAsTouched();
    fixture.detectChanges();
    expect(component.refillForm.get('phoneNumber').errors.pattern).toBeTruthy();
    expect(component.refillForm.get('phoneNumber').value).toBe('+1 (1');
    expect(fixture.nativeElement.querySelector('#phoneNumber').value).toBe('+1 (1');

    component.refillForm.get('phoneNumber').setValue('11111111111');
    component.refillForm.markAllAsTouched();
    fixture.detectChanges();
    expect(component.refillForm.get('phoneNumber').errors).toBeNull();
    expect(component.refillForm.get('phoneNumber').value).toBe('+1 (111) 111-11-11');
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
    expect(component.refillForm.invalid).toBeTruthy();
    expect(fixture.nativeElement.querySelector('button[type=submit]').getAttribute('disabled')).toBe('true');

    component.refillForm.get('phoneNumber').setValue('+1 (111) 111-11-11');
    fixture.detectChanges();
    expect(component.refillForm.invalid).toBeFalsy();
    expect(fixture.nativeElement.querySelector('button[type=submit]').getAttribute('disabled')).toBeNull();
  }));

  it('if refillForm invalid refill method should not be called', () => {
    const refillService = debugElement.injector.get(RefillService);
    const refillSpy = spyOn(refillService, 'refill');

    component.submit();

    expect(refillSpy).not.toHaveBeenCalled();
  });

  it('if refill is successful navigate should be called', fakeAsync(() => {
    component.amount.setValue(10);
    component.refillForm.get('phoneNumber').setValue('+1 (111) 111-11-11');
    component.refillForm.get('providerId').setValue('1');
    expect(component.refillForm.valid).toBe(true);
    fixture.detectChanges();

    const refillService = debugElement.injector.get(RefillService);
    const refillSpy = spyOn(refillService, 'refill').and.returnValue(of('Success'));

    const router = debugElement.injector.get(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.submit();
    expect(refillSpy).toHaveBeenCalledWith(component.refillForm.value);
    tick(2000);
    expect(navigateSpy).toHaveBeenCalledWith(['home']);
  }));

  it('if refill is unsuccessful navigate should not be called', fakeAsync(() => {
    component.amount.setValue(10);
    component.refillForm.get('phoneNumber').setValue('+1 (111) 111-11-11');
    component.refillForm.get('providerId').setValue('1');
    fixture.detectChanges();

    const refillService = debugElement.injector.get(RefillService);
    const refillSpy = spyOn(refillService, 'refill').and.returnValue(throwError('Error'));

    const router = debugElement.injector.get(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.submit();
    expect(refillSpy).toHaveBeenCalledWith(component.refillForm.value);
    tick(2000);
    expect(navigateSpy).not.toHaveBeenCalled();
  }));
});
