import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GlobalEventsManager } from './../shared/services/global-events-manager';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-uber',
  templateUrl: './uber.component.html',
  styleUrls: ['./uber.component.css']
})
export class UberComponent implements OnInit , OnDestroy {

  navExpandedCustomerDashBoard: boolean = false;
  userName: string;
  @ViewChild('sidenav') sidenav: MdSidenav;

  constructor(private globalEventsManager: GlobalEventsManager) { }

  ngOnInit() { 
    this.globalEventsManager.showMessage("HIDEME");
    this.userName = "Donald J Trump";
  }

  ngOnDestroy() {
    this.globalEventsManager.showMessage("SHOWME");
  }

}
