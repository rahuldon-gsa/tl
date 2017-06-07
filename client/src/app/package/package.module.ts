import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {PackageService} from './package.service';
import { ItemModule } from '../item/item.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ItemModule
],
  providers: [
    PackageService
  ]
})
export class PackageModule {}