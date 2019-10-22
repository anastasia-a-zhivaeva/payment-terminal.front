import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvidersModule } from './providers/providers.module';
import { RefillModule } from './refill/refill.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProvidersModule,
    RefillModule
  ]
})
export class RootStoreModule { }
