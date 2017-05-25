import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Client} from './client';
import {ClientService} from './client.service';

@Component({
  selector: 'client-persist',
  templateUrl: './client-show.component.html'
})
export class ClientShowComponent implements OnInit {

  client = new Client();

  constructor(private route: ActivatedRoute, private clientService: ClientService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.clientService.get(+params['id']).subscribe((client: Client) => {
        this.client = client;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.clientService.destroy(this.client).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/client','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
