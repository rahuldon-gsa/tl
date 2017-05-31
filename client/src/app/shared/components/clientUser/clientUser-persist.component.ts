import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ClientUser} from './clientUser';
import {ClientUserService} from './clientUser.service';
import {Response} from "@angular/http";


@Component({
  selector: 'clientUser-persist',
  templateUrl: './clientUser-persist.component.html'
})
export class ClientUserPersistComponent implements OnInit {

  clientUser = new ClientUser();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private clientUserService: ClientUserService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.clientUserService.get(+params['id']).subscribe((clientUser: ClientUser) => {
          this.create = false;
          this.clientUser = clientUser;
        });
      }
    });
  }

  save() {
    this.clientUserService.save(this.clientUser).subscribe((clientUser: ClientUser) => {
      this.router.navigate(['/clientUser', 'show', clientUser.id]);
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
