import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MaterialModule,
  OverlayContainer,
  FullscreenOverlayContainer,
  MdSelectionModule, MdButtonModule, MdCheckboxModule
} from '@angular/material';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IndexComponent } from './index/index.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NavService } from './nav/nav.service';
import { AppRoutingModule } from "./app-routing.module";
import { CustomerLayoutModule } from './customer-layout/customer-layout.module';
import { LoginModule } from './login/login.module';
import { GlobalEventsManager } from './shared/services/global-events-manager';
import { UberModule } from './uber/uber.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule.forRoot(),
    AppRoutingModule,
    NgbModule.forRoot(),
    CustomerLayoutModule,
    LoginModule,
    UberModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, NavService, GlobalEventsManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
