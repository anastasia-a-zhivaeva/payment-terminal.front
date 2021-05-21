import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent, AppRoutingModule } from '@app';
import { CoreModule } from '@core/core.module';
import { StoreModule } from '@store/store.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, CoreModule, StoreModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
