import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Trailer} from './trailer';
import {TrailerService} from './trailer.service';

@Component({
  selector: 'trailer-persist',
  templateUrl: './trailer-show.component.html'
})
export class TrailerShowComponent implements OnInit {

  trailer = new Trailer();

  constructor(private route: ActivatedRoute, private trailerService: TrailerService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.trailerService.get(+params['id']).subscribe((trailer: Trailer) => {
        this.trailer = trailer;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.trailerService.destroy(this.trailer).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/trailer','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
