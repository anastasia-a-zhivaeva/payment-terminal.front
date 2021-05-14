import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { Provider } from '@core/models';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared';
import { HomeFacade } from '@home/home.facade';
import { ProviderCardComponent } from '@home/components';
import { HomeComponent } from '@home/containers';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let debugElement;
  let fixture;
  const providers: Provider[] = [
    {
      id: '1',
      name: 'MTS',
      image: 'assets/images/mts.png',
    },
    {
      id: '2',
      name: 'Beeline',
      image: 'assets/images/beeline.png',
    },
    {
      id: '3',
      name: 'MegaFon',
      image: 'assets/images/megafon.png',
    },
  ];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          CoreModule,
          SharedModule, // In real project should be used mocked SharedModule
        ],
        declarations: [HomeComponent, ProviderCardComponent],
        providers: [
          {
            provide: HomeFacade,
            useValue: {
              getProviders: () => of(providers),
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
    }),
  );

  it('should create the component', () => {
    expect(component).toBeDefined();
  });

  it('after ngOnInit should has providers', fakeAsync(() => {
    expect(component.providers).toBeUndefined();
    component.ngOnInit();
    component.providers.subscribe((data: Provider[]) => expect(data).toBe(providers));
    tick(1000);
    fixture.detectChanges();

    expect(component.providers).toBeDefined();
    expect(fixture.nativeElement.querySelectorAll('app-provider-card').length).toBe(providers.length);
  }));

  it('after choosing operator navigate should be called', fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();

    const router = debugElement.injector.get(Router);
    const navigateSpy = spyOn(router, 'navigate');

    fixture.nativeElement.querySelector('app-provider-card > mat-card').click();

    expect(navigateSpy).toHaveBeenCalledWith(['refill', '1']);
  }));
});
