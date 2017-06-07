import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Shipment} from './shipment';
import {ShipmentService} from './shipment.service';

@Component({
  selector: 'shipment-persist',
  templateUrl: './shipment-show.component.html'
})
export class ShipmentShowComponent implements OnInit {

  shipment = new Shipment();

  constructor(private route: ActivatedRoute, private shipmentService: ShipmentService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.shipmentService.get(+params['id']).subscribe((shipment: Shipment) => {
        this.shipment = shipment;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.shipmentService.destroy(this.shipment).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/shipment','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
