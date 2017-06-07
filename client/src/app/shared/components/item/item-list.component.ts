import {Component, OnInit} from '@angular/core';
import {ItemService} from './item.service';
import {Item} from './item';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit {

  itemList: Item[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.list().subscribe((itemList: Item[]) => {
      this.itemList = itemList;
    });
  }
}
