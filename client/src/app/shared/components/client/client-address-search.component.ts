import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Address } from '../address/address';
import { ClientService } from './client.service';

@Component({
	selector: 'client-address-search',
	templateUrl: './client-address-search.component.html',
	styleUrls: ['./client.scss'],
	providers: [ClientService]
})
export class ClientAddressSearchComponent implements OnInit {

	addressList: Address[];
	responsive: boolean = true;
	isLoading: boolean = false;

	constructor(private clientService: ClientService, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) { }

	ngOnInit() {
	}

}

