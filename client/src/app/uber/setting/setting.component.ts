import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/model/user';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  providers: [UserService]
})
export class SettingComponent implements OnInit {

  user: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    let loggedInUserName = sessionStorage.getItem("currentUser");

    if (loggedInUserName !== undefined) {
      // If user is already logged in skip and show message
      this.userService.getUserInfo("admin")
        .subscribe(
        data => {
        },
        error => {
          console.log("User Error :: ");
        }, () => { console.log("Done Calling Service"); });
    }
  }
}
