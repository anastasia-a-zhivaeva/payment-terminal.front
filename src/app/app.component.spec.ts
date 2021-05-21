import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppFacade } from '@app/app.facade';
import { CoreModule } from '@core/core.module';
import { StoreModule } from '@store/store.module';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, CoreModule],
        declarations: [AppComponent],
        providers: [
          {
            provide: AppFacade,
            useValue: {
              getProviders: (_) => undefined,
            },
          },
        ],
      }).compileComponents();
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
