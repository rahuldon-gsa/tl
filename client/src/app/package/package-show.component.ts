import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Package} from './package';
import {PackageService} from './package.service';

@Component({
  selector: 'package-persist',
  templateUrl: './package-show.component.html'
})
export class PackageShowComponent implements OnInit {

  package = new Package();

  constructor(private route: ActivatedRoute, private packageService: PackageService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.packageService.get(+params['id']).subscribe((package: Package) => {
        this.package = package;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.packageService.destroy(this.package).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/package','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
