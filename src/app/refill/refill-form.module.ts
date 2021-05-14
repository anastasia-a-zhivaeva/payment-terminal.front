import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefillFormRoutingModule } from './/refill-form-routing.module';
import { RefillFormComponent } from './/containers';
import { SharedModule } from '@shared';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [RefillFormComponent],
  imports: [CommonModule, SharedModule, RefillFormRoutingModule, NgxMaskModule.forChild()],
})
export class RefillFormModule {}
