import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { User } from '../../../user/user';

@Component({
  selector: 'contact-card',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() currentUserId: number;

  user: User = new User();
  constructor(private userService: UserService) { }

  ngOnInit() {

    if (this.currentUserId !== undefined) {
      this.userService.get(this.currentUserId).subscribe(
        data => {
          this.user = data;
        },
        error => {
          console.log("User Error :: ");
        });
    }
  }

}
