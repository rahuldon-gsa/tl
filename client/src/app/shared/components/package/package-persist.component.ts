import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Package} from './package';
import {PackageService} from './package.service';
import {Response} from "@angular/http";
import { ItemService } from '../item/item.service';
import { Item } from '../item/item';

@Component({
  selector: 'package-persist',
  templateUrl: './package-persist.component.html'
})
export class PackagePersistComponent implements OnInit {

  package = new Package();
  create = true;
  errors: any[];
  itemList: Item[];

  constructor(private route: ActivatedRoute, private packageService: PackageService, private router: Router, private itemService: ItemService) {}

  ngOnInit() {
    this.package.isHazardous = false;
    this.package.isStackable = false;
    this.itemService.list().subscribe((itemList: Item[]) => { this.itemList = itemList; });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.packageService.get(+params['id']).subscribe((package: Package) => {
          this.create = false;
          this.package = package;
        });
      }
    });
  }

  save() {
    this.packageService.save(this.package).subscribe((package: Package) => {
      this.router.navigate(['/package', 'show', package.id]);
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
