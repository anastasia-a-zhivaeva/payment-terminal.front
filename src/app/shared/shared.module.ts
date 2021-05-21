import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const components = [];

const pipes = [];

const directives = [];

const matModules = [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule];

@NgModule({
  declarations: [...components, ...pipes, ...directives],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, ...matModules],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...components,
    ...pipes,
    ...directives,
    ...matModules,
  ],
})
export class SharedModule {}
