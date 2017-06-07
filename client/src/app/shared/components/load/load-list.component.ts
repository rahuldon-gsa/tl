import {Component, OnInit} from '@angular/core';
import {LoadService} from './load.service';
import {Load} from './load';

@Component({
  selector: 'load-list',
  templateUrl: './load-list.component.html'
})
export class LoadListComponent implements OnInit {

  loadList: Load[] = [];

  constructor(private loadService: LoadService) { }

  ngOnInit() {
    this.loadService.list().subscribe((loadList: Load[]) => {
      this.loadList = loadList;
    });
  }
}
