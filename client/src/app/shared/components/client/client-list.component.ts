import {Component, OnInit} from '@angular/core';
import {ClientService} from './client.service';
import {Client} from './client';

@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {

  clientList: Client[] = [];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.list().subscribe((clientList: Client[]) => {
      this.clientList = clientList;
    });
  }
}
