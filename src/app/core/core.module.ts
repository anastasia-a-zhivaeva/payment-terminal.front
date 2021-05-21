import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HammerModule } from '@angular/platform-browser';

import { throwIfAlreadyLoaded } from '@core/guards';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [HammerModule, NgxMaskModule.forRoot(), MatToolbarModule],
  exports: [HammerModule, NgxMaskModule, MatToolbarModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
