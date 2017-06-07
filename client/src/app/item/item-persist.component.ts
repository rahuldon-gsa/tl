import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Item} from './item';
import {ItemService} from './item.service';
import {Response} from "@angular/http";


@Component({
  selector: 'item-persist',
  templateUrl: './item-persist.component.html'
})
export class ItemPersistComponent implements OnInit {

  item = new Item();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private itemService: ItemService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.itemService.get(+params['id']).subscribe((item: Item) => {
          this.create = false;
          this.item = item;
        });
      }
    });
  }

  save() {
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
