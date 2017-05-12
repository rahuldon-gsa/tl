import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalEventsManager } from './../shared/services/global-events-manager';
@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.css']
})
export class CustomerLayoutComponent implements OnInit, OnDestroy {

  constructor(private globalEventsManager: GlobalEventsManager) { }
  
  ngOnInit() {
  }

  ngOnDestroy() {
    this.globalEventsManager.showMessage("SHOWME");
  }

}
