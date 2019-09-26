import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
/**
 * Third-party modules
 */
import { NgxMaskModule } from 'ngx-mask';
/**
 * Components
 */
import { HeaderComponent } from './components';
/**
 * Services
 */
import { ProviderService, RefillService } from './services';

const components = [
  HeaderComponent,
];

const services = [
  ProviderService,
  RefillService,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskModule,
    ...components,
  ],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ...services,
      ],
    };
  }
}
