import { Component } from '@angular/core';
import { NavService } from './nav.service';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from "../shared/services/authentication.service";
import { GlobalEventsManager } from '../shared/services/global-events-manager';

@Component({
  selector: 'app-navigation',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [AuthenticationService]
})
export class NavComponent implements OnInit {

  applicationData: any;
  navExpanded: boolean = false;
  mainNavExpandButton: boolean = true;

  isUserLogged: boolean = false;
  isUserAdmin: boolean = false;
  isNormalUser: boolean = false;

  constructor(private router: Router, private navService: NavService, private authenticationService: AuthenticationService, private globalEventsManager: GlobalEventsManager) {

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url === '/' || val.url === '/index') {
          this.mainNavExpandButton = true;
          this.navExpanded = false;
        } else {
          this.mainNavExpandButton = false;
          this.navExpanded = true;
        }

        this.setUserRole();
      }
    });

    this.globalEventsManager.userLoginMessageEmitter.subscribe((mode) => {
      // mode will be null the first time it is created, so you need to igonore it when null
      if (mode !== undefined) {
        this.isUserLogged = true;
      }
      this.setUserRole();
    });

    this.globalEventsManager.globalMessageEmitter.subscribe((navMessage) => {
      if (navMessage === 'SHOWME' || navMessage.length < 1) {
        this.mainNavExpandButton = true;
        this.navExpanded = false;
      } else {
        this.mainNavExpandButton = false;
        this.navExpanded = true;
      }
    });

  }
  setUserRole() {
    let userRole = sessionStorage.getItem('userRole');
    if (userRole === 'ROLE_ADMIN') {
      this.isUserAdmin = true;
      this.isUserLogged = true;
      this.isNormalUser = false;
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

  logoutCurrentUser() {
    this.authenticationService.logout().subscribe(res => this.isUserLogged = false);
  }
}
