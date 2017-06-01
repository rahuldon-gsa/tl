import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Truck} from './truck';
import {TruckService} from './truck.service';

@Component({
  selector: 'truck-persist',
  templateUrl: './truck-show.component.html'
})
export class TruckShowComponent implements OnInit {

  truck = new Truck();

  constructor(private route: ActivatedRoute, private truckService: TruckService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.truckService.get(+params['id']).subscribe((truck: Truck) => {
        this.truck = truck;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.truckService.destroy(this.truck).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/truck','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
