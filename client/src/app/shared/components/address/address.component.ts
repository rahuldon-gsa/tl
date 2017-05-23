import { Component, OnInit, Input } from '@angular/core';
import { Address } from './address';
import { AddressService } from './address.service';

@Component({
  selector: 'address-card',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: [AddressService]
})
export class AddressComponent implements OnInit {

  @Input() addressId: string;
  @Input() userId: string;

  address: Address = new Address();

  constructor(private addressService: AddressService) { }

  ngOnInit() {
    if (this.addressId !== undefined) {
      this.addressService.get(+this.addressId).subscribe(
        data => {
          this.address = data;
        },
        error => {
          console.log("Error Getting Address :: ");
        });
    }
  }

}
