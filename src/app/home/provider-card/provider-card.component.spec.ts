import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@shared';
import { ProviderCardComponent } from './provider-card.component';

describe('ProviderCardComponent', () => {
  let component: ProviderCardComponent;
  let fixture: ComponentFixture<ProviderCardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProviderCardComponent],
        imports: [BrowserAnimationsModule, SharedModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderCardComponent);
    component = fixture.componentInstance;
    component.provider = {
      id: '1',
      image: 'image',
      name: 'name',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
