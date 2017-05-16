import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GlobalEventsManager } from './../shared/services/global-events-manager';
import { AuthenticationService } from './../shared/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-uber',
  templateUrl: './uber.component.html',
  styleUrls: ['./uber.component.css'],
  providers: [GlobalEventsManager, AuthenticationService]
})
export class UberComponent implements OnInit, OnDestroy {

  navExpandedCustomerDashBoard: boolean = false;
  userName: string;
  isLoading: boolean = false;

  @ViewChild('sidenav') sidenav: MdSidenav;

  constructor(private globalEventsManager: GlobalEventsManager, private authenticationService: AuthenticationService,
    private router: Router) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.userName = "Donald J Trump";
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.globalEventsManager.showMessage("SHOWME");
  }

  // Logout user
  logout() {
    this.authenticationService.logout().subscribe((val) => {
      this.router.navigate(["/"]);
    });
  }

}
