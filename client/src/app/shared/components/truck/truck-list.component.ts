import {Component, OnInit} from '@angular/core';
import {TruckService} from './truck.service';
import {Truck} from './truck';

@Component({
  selector: 'truck-list',
  templateUrl: './truck-list.component.html'
})
export class TruckListComponent implements OnInit {

  truckList: Truck[] = [];

  constructor(private truckService: TruckService) { }

  ngOnInit() {
    this.truckService.list().subscribe((truckList: Truck[]) => {
      this.truckList = truckList;
    });
  }
}
