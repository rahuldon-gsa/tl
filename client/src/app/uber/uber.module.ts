import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MaterialModule,
  OverlayContainer,
  FullscreenOverlayContainer,
  MdSelectionModule, MdButtonModule, MdCheckboxModule
} from '@angular/material';
import { UberComponent } from './uber.component';
import { UberRoutingModule } from './uber-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule.forRoot(),
    UberRoutingModule,
    DashboardModule
  ],
  declarations: [UberComponent]
})
export class UberModule { }
