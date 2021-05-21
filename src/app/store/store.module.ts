import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

import { environment } from '@environment';
import { ProvidersState } from '@store/providers/providers.state';

@NgModule({
  imports: [
    CommonModule,
    NgxsFormPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({ logger: console, collapsed: false }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    NgxsRouterPluginModule.forRoot(),
    NgxsModule.forRoot([ProvidersState], {
      developmentMode: !environment.production,
    }),
  ],
  exports: [NgxsFormPluginModule, NgxsLoggerPluginModule, NgxsReduxDevtoolsPluginModule, NgxsModule],
})
export class StoreModule {}
