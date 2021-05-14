import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const components = [];

const matModules = [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ReactiveFormsModule, ...matModules],
  exports: [CommonModule, ReactiveFormsModule, ...components, ...matModules],
})
export class SharedModule {}
