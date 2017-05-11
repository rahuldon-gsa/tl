import { Component } from '@angular/core';
import { NavService } from './nav.service';
import { OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalEventsManager } from '../shared/services/global-events-manager';

@Component({
  selector: 'app-navigation',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  applicationData: any;
  navExpanded: boolean = false;
  isMainNavActive: boolean = false;

  isUserLogged: boolean = false;
  isUserAdmin: boolean = false;
  isNormalUser: boolean = false;

  constructor(private navService: NavService, private globalEventsManager: GlobalEventsManager) {
    this.globalEventsManager.userLoginMessageEmitter.subscribe((mode) => {
      // mode will be null the first time it is created, so you need to igonore it when null
      if (mode !== undefined) {
        this.isUserLogged = true;
      }
      this.setUserRole();
    });
  }

  setUserRole() {
    let userRole = sessionStorage.getItem('userRole');
    if (userRole === 'ROLE_ADMIN') {
      this.isUserAdmin = true;
      this.isUserLogged = true;
      this.isNormalUser = false;
      this.isMainNavActive = true;
    } else if (userRole === 'ROLE_USER') {
      this.isNormalUser = true;
      this.isUserLogged = true;
      this.isUserAdmin = false;
    } else {
      this.isNormalUser = false;
      this.isUserLogged = false;
      this.isUserAdmin = false;
    }
  }

  ngOnInit(): void {
    this.navService.getNavData().subscribe(res => this.applicationData = res);
  }
}
