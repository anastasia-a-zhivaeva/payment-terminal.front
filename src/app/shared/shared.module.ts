import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
}
