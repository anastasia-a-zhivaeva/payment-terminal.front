import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from '@home/home-routing.module';
import { ProviderCardComponent } from '@home/components';
import { HomeComponent } from '@home/containers';

@NgModule({
  declarations: [HomeComponent, ProviderCardComponent],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
