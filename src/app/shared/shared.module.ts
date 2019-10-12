import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule, MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
/**
 * Third-party modules
 */
import { NgxMaskModule } from 'ngx-mask';
/**
 * Components
 */

/**
 * Services
 */
import { ProviderService, RefillService } from './services';

const components = [
];

const matModules = [
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
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
    ReactiveFormsModule,
    RouterModule,
    NgxMaskModule.forRoot(),
    ...matModules,
  ],
  exports: [
    ReactiveFormsModule,
    RouterModule,
    NgxMaskModule,
    ...components,
    ...matModules,
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
