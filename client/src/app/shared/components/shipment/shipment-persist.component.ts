import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Shipment} from './shipment';
import {ShipmentService} from './shipment.service';
import {Response} from "@angular/http";


@Component({
  selector: 'shipment-persist',
  templateUrl: './shipment-persist.component.html'
})
export class ShipmentPersistComponent implements OnInit {

  shipment = new Shipment();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private shipmentService: ShipmentService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.shipmentService.get(+params['id']).subscribe((shipment: Shipment) => {
          this.create = false;
          this.shipment = shipment;
        });
      }
    });
  }

  save() {
    this.shipmentService.save(this.shipment).subscribe((shipment: Shipment) => {
      this.router.navigate(['/shipment', 'show', shipment.id]);
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
