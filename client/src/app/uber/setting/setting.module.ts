import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
    MaterialModule,
    OverlayContainer,
    FullscreenOverlayContainer,
    MdSelectionModule, MdButtonModule, MdCheckboxModule
} from '@angular/material';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';

@NgModule({
    imports: [
        CommonModule,
        SettingRoutingModule,
        NgbModule.forRoot(),
        MaterialModule.forRoot(),
        PageHeaderModule
    ],
    declarations: [SettingComponent]
})
export class SettingModule { }
