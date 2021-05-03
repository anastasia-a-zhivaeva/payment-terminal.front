import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { HomeComponent, HomeRoutingModule } from '@home';
import { ProviderCardComponent } from '@home/provider-card';

@NgModule({
  declarations: [HomeComponent, ProviderCardComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule],
})
export class HomeModule {}
