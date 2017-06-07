import { Component, OnInit } from '@angular/core';
import { ItemService } from './item.service';
import { Item } from './item';

@Component({
	selector: 'item-component',
	templateUrl: './item.component.html',
	styleUrls: ['./../master.scss'],
	providers: [ItemService]
})
export class ItemComponent implements OnInit {

	itemList: Item[] = [];

	constructor(private itemService: ItemService) { }

	ngOnInit() {
		this.itemService.list().subscribe((itemList: Item[]) => {
			this.itemList = itemList;
		});
	}
}
