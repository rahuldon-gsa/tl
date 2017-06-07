import {Component, OnInit} from '@angular/core';
import {PackageService} from './package.service';
import {Package} from './package';

@Component({
  selector: 'package-list',
  templateUrl: './package-list.component.html'
})
export class PackageListComponent implements OnInit {

  packageList: Package[] = [];

  constructor(private packageService: PackageService) { }

  ngOnInit() {
    this.packageService.list().subscribe((packageList: Package[]) => {
      this.packageList = packageList;
    });
  }
}
