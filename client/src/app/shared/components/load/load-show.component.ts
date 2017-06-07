import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Load} from './load';
import {LoadService} from './load.service';

@Component({
  selector: 'load-persist',
  templateUrl: './load-show.component.html'
})
export class LoadShowComponent implements OnInit {

  load = new Load();

  constructor(private route: ActivatedRoute, private loadService: LoadService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.loadService.get(+params['id']).subscribe((load: Load) => {
        this.load = load;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.loadService.destroy(this.load).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/load','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
