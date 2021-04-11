import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalanceFormComponent, BalanceFormRoutingModule } from '@balance-form';
import { SharedModule } from '@shared';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    BalanceFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BalanceFormRoutingModule,
    NgxMaskModule.forChild()
  ]
})
export class BalanceFormModule { }
