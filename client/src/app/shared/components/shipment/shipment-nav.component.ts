import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

class Link {
	public url: string;
	public page: number;
	public text: string;
	public status: boolean;
	constructor(url, page, text) {
		this.url = url;
		this.page = page;
		this.text = text;
	}
}

@Component({
	selector: 'shipment-nav',
	templateUrl: './shipment-nav.component.html',
	styleUrls: ['./../master.scss']
})
export class ShipmentNavComponent implements OnInit {

	@Input() selectedPage;
	@Input() createShip: boolean = true;
	@Input() addLoad: boolean = false;
	@Input() addItems: boolean = false;
	shipmentId: string;
	@Input() links: Link[];

	constructor(private route: ActivatedRoute, private router: Router) {
	}

	ngOnInit() {
		this.router.events.subscribe((routerEvent) => {
			if (routerEvent instanceof NavigationEnd) {
				let navEnd: NavigationEnd = routerEvent;
				for (let link of this.links) {
					if (navEnd.urlAfterRedirects === link.url) {
						this.changeSelectedPage(link.page);
					}
				}
			}
		});
	}

	changeSelectedPage(page): void {
		this.selectedPage = page;
	}
}
