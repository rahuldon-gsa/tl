import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Address} from './address';
import {AddressService} from './address.service';

@Component({
  selector: 'address-persist',
  templateUrl: './address-show.component.html'
})
export class AddressShowComponent implements OnInit {

  address = new Address();

  constructor(private route: ActivatedRoute, private addressService: AddressService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.addressService.get(+params['id']).subscribe((address: Address) => {
        this.address = address;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.addressService.destroy(this.address).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/address','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
