import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../shared/components/address/address.service';
import { AddressPersistComponent } from '../../shared/components/address/address-persist.component';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'pizza-dialog',
  template: `
  <button type="button" (click)="dialogRef.close('yes')">Yes</button>
  <button type="button" (click)="dialogRef.close('no')">No</button>
  `
})
export class PizzaDialog {
  constructor(public dialogRef: MdDialogRef<PizzaDialog>) { }
}