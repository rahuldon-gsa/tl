
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from "../shared/services/authentication.service";
import { GlobalEventsManager } from '../shared/services/global-events-manager';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService, UserService]
})
export class LoginComponent implements OnInit, OnDestroy {
  model: any = {};
  loading = false;
  returnUrl: string;
  errorMessage: string;
  isPassword: boolean = false;
  isUsername: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private globalEventsManager: GlobalEventsManager,
    private userService: UserService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.errorMessage = sessionStorage.getItem('auth-message');

    if (sessionStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.errorMessage = '';
    sessionStorage.removeItem('auth-message');
  }

  login() {
    this.loading = true;
    this.errorMessage = '';

    this.authenticationService.authenticate(this.model.username, this.model.password)
      .subscribe(
      data => {

        // Store User Object in Session
        this.userService.getUserInfo(this.model.username).subscribe(
          userData => {
            sessionStorage.setItem('userId', userData.id.toString());
            sessionStorage.setItem('firstName', userData.firstName.toString());
            sessionStorage.setItem('lastName', userData.lastName.toString());
          });

        this.globalEventsManager.isUserLoggedIn(sessionStorage.getItem('userRole'));

        if (sessionStorage.getItem('userRole') != null) {
          this.router.navigate(['/dashboard'], { relativeTo: this.route });
        } else {
          this.router.navigate(['/']);
        }
      },
      error => {
        this.loading = false;
        if (error.status == 401) {
          this.errorMessage = "User is not authorized, please check username and password";
        } else {
          this.errorMessage = error;
        }
      }, () => {
        // location.reload();
      });
  }

  forgetPassword() {
    this.isPassword = true;
  }

  retrievePassword() {

    this.errorMessage = "";
  }

  loginAgain() {
    this.isUsername = false;
    this.isPassword = false;
  }

  forgetUserName() {
    this.isUsername = true;
  }

  retrieveUsername() {

    this.errorMessage = "";
  }

}
