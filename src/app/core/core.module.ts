import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HammerModule } from '@angular/platform-browser';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [],
  imports: [CommonModule, HammerModule, NgxMaskModule.forRoot(), MatToolbarModule],
  exports: [NgxMaskModule, HammerModule, MatToolbarModule],
})
export class CoreModule {}
