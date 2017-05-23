import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Address} from './address';
import {AddressService} from './address.service';
import {Response} from "@angular/http";
import { MdDialog, MdDialogRef } from '@angular/material';


@Component({
  selector: 'address-persist',
  templateUrl: './address-persist.component.html'
})
export class AddressPersistComponent implements OnInit {

  address = new Address();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private addressService: AddressService, private router: Router, public dialogRef: MdDialogRef<any>) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.addressService.get(+params['id']).subscribe((address: Address) => {
          this.create = false;
          this.address = address;
        });
      }
    });
  }

  save() {
    this.addressService.save(this.address).subscribe((address: Address) => {
      this.router.navigate(['/address', 'show', address.id]);
    }, (res: Response) => {
      const json = res.json();
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
