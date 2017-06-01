import {Component, OnInit} from '@angular/core';
import {TrailerService} from './trailer.service';
import {Trailer} from './trailer';

@Component({
  selector: 'trailer-list',
  templateUrl: './trailer-list.component.html'
})
export class TrailerListComponent implements OnInit {

  trailerList: Trailer[] = [];

  constructor(private trailerService: TrailerService) { }

  ngOnInit() {
    this.trailerService.list().subscribe((trailerList: Trailer[]) => {
      this.trailerList = trailerList;
    });
  }
}
