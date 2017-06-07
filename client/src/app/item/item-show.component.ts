import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Item} from './item';
import {ItemService} from './item.service';

@Component({
  selector: 'item-persist',
  templateUrl: './item-show.component.html'
})
export class ItemShowComponent implements OnInit {

  item = new Item();

  constructor(private route: ActivatedRoute, private itemService: ItemService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.itemService.get(+params['id']).subscribe((item: Item) => {
        this.item = item;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.itemService.destroy(this.item).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/item','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
