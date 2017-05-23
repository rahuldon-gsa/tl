import {Component, OnInit} from '@angular/core';
import {AddressService} from './address.service';
import {Address} from './address';

@Component({
  selector: 'address-list',
  templateUrl: './address-list.component.html'
})
export class AddressListComponent implements OnInit {

  addressList: Address[] = [];

  constructor(private addressService: AddressService) { }

  ngOnInit() {
    this.addressService.list().subscribe((addressList: Address[]) => {
      this.addressList = addressList;
    });
  }
}
