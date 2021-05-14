import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent, AppRoutingModule } from '@app';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule, BrowserAnimationsModule, CoreModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
