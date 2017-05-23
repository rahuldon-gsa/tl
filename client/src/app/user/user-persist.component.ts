import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from './user';
import {UserService} from './user.service';
import {Response} from "@angular/http";


@Component({
  selector: 'user-persist',
  templateUrl: './user-persist.component.html'
})
export class UserPersistComponent implements OnInit {

  user = new User();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.user.accountLocked = false;
    this.user.enabled = false;
    this.user.accountExpired = false;
    this.user.passwordExpired = false;
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.userService.get(+params['id']).subscribe((user: User) => {
          this.create = false;
          this.user = user;
        });
      }
    });
  }

  save() {
    this.userService.save(this.user).subscribe((user: User) => {
      this.router.navigate(['/user', 'show', user.id]);
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
