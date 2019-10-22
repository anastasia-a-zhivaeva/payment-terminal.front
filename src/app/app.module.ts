import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent, AppRoutingModule } from '@app';
import { SharedModule } from '@shared';
import { RootStoreModule } from './root-store/root-store.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    RootStoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
