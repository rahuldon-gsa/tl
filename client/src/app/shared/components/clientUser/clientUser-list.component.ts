import {Component, OnInit} from '@angular/core';
import {ClientUserService} from './clientUser.service';
import {ClientUser} from './clientUser';

@Component({
  selector: 'clientUser-list',
  templateUrl: './clientUser-list.component.html'
})
export class ClientUserListComponent implements OnInit {

  clientUserList: ClientUser[] = [];

  constructor(private clientUserService: ClientUserService) { }

  ngOnInit() {
    this.clientUserService.list().subscribe((clientUserList: ClientUser[]) => {
      this.clientUserList = clientUserList;
    });
  }
}
