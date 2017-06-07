import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdNativeDateModule } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _ from "lodash";
import { Item } from './item';
import { ItemService } from './item.service';
import { Response } from "@angular/http";

@Component({
	selector: 'item-dialog',
	templateUrl: './item-dialog.component.html',
	styleUrls: ['./../master.scss'],
	providers: [ItemService]
})
export class ItemDialog implements OnInit {

	item = new Item();
	create = true;
	errors: any[];
	freightClassTypes = this.itemService.freightClassTypes;
	itemTypes = this.itemService.itemTypes;
	itemType: string;
	freightClass: string;

	constructor( @Inject(MD_DIALOG_DATA) data: any, public dialogRef: MdDialogRef<ItemDialog>,
		private route: ActivatedRoute, private itemService: ItemService, private router: Router) {
		if (data !== undefined && data.mode === 'add') {
			this.item.itemId = _.random(0, 99999999).toString();
		} else {
			this.itemService.get(data.id).subscribe((item: Item) => {
				this.create = false;
				this.item = item;
				this.itemType = item.type;
				this.freightClass = item.freightClass;
			});
		}
	}

	ngOnInit() {


	}

	saveItem() {
		this.itemService.save(this.item).subscribe((item: Item) => {
			this.router.navigate(['/item', 'show', item.id]);
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
