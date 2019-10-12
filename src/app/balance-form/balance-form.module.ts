import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalanceFormComponent, BalanceFormRoutingModule } from '@balance-form';
import { SharedModule } from '@shared';


@NgModule({
  declarations: [
    BalanceFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BalanceFormRoutingModule,
  ]
})
export class BalanceFormModule { }
