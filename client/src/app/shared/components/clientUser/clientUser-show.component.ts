import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ClientUser} from './clientUser';
import {ClientUserService} from './clientUser.service';

@Component({
  selector: 'clientUser-persist',
  templateUrl: './clientUser-show.component.html'
})
export class ClientUserShowComponent implements OnInit {

  clientUser = new ClientUser();

  constructor(private route: ActivatedRoute, private clientUserService: ClientUserService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.clientUserService.get(+params['id']).subscribe((clientUser: ClientUser) => {
        this.clientUser = clientUser;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.clientUserService.destroy(this.clientUser).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/clientUser','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
