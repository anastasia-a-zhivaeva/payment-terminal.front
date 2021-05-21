import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsModule } from '@ngxs/store';
import { NgxMaskModule } from 'ngx-mask';

import { RefillRoutingModule } from '@refill/refill-routing.module';
import { RefillFormComponent } from '@refill/containers';
import { RefillState } from '@refill/store/refill/refill.state';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [RefillFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RefillRoutingModule,
    NgxMaskModule.forChild(),
    NgxsModule.forFeature([RefillState]),
  ],
})
export class RefillModule {}
