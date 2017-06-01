import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
	selector: 'app-confirmation',
	templateUrl: './confirmation.component.html',
	styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationDialog {

	constructor( @Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<ConfirmationDialog>) { }

}
