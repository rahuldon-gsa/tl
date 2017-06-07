import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Load} from './load';
import {LoadService} from './load.service';
import {Response} from "@angular/http";
import { LocationService } from '../location/location.service';
import { Location } from '../location/location';
import { LocationService } from '../location/location.service';
import { Location } from '../location/location';
import { PackageService } from '../package/package.service';
import { Package } from '../package/package';

@Component({
  selector: 'load-persist',
  templateUrl: './load-persist.component.html'
})
export class LoadPersistComponent implements OnInit {

  load = new Load();
  create = true;
  errors: any[];
  locationList: Location[];
  locationList: Location[];
  packageList: Package[];

  constructor(private route: ActivatedRoute, private loadService: LoadService, private router: Router, private locationService: LocationService, private locationService: LocationService, private packageService: PackageService) {}

  ngOnInit() {
    this.load.needHelp = false;
    this.locationService.list().subscribe((locationList: Location[]) => { this.locationList = locationList; });
    this.locationService.list().subscribe((locationList: Location[]) => { this.locationList = locationList; });
    this.packageService.list().subscribe((packageList: Package[]) => { this.packageList = packageList; });
    this.load.isTrailerReady = false;
    this.load.needForkLift = false;
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.loadService.get(+params['id']).subscribe((load: Load) => {
          this.create = false;
          this.load = load;
        });
      }
    });
  }

  save() {
    this.loadService.save(this.load).subscribe((load: Load) => {
      this.router.navigate(['/load', 'show', load.id]);
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
