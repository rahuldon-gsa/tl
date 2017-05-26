import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";

export class SampleModel {
	constructor(public id?: number,
		public name?: string,
		public surname?: string,
		public birthDate?: Date,
		public avatar?: string,
		public comment?: string) {
	}
}

@Component({
	selector: 'user-list-search-component',
	templateUrl: './user-search-list.component.html',
	styleUrls: ['./user-list.component.scss']
})
export class UserListSearchComponent implements OnInit {
	models: SampleModel[];
	isLoading: boolean = false;
	responsive: boolean = true;

	constructor() { }

	ngOnInit() {
		// Using a promisse here so angular will start another detect lifecycle
		Promise.resolve(null).then(() => {
			let count = 32;
			this.models = Array.apply(0, Array(count))
				.map(function (element: any, index: any) {
					return {
						id: index,
						name: 'Name ' + index,
						surname: 'Surname ' + index,
						birthDate: (new Date().getTime() + (index * 10000010)),
						avatar: (index % 2 == 1 ? 'search' : 'add'),
						comment: (index <= 5 ? 'comment ' + index : null)
					};
				});
		});
	}

	_sortByBirthDate(a: SampleModel, b: SampleModel, sortDir: string) {
		let dir = sortDir == 'asc' ? 1 : -1;
		if (a.birthDate < b.birthDate) return -1 * dir;
		if (a.birthDate > b.birthDate) return 1 * dir;
		return 0;
	}

	_filterByBirthDate(a: SampleModel, text: string) {
		let datePipe = new DatePipe("pt");
		let value = datePipe.transform(a.birthDate, 'dd/MM/yyyy');
		return value.toString().toUpperCase().indexOf(text.toUpperCase()) > -1;
	}

	addSample() {
		console.log('add sample');
	}

	editSample(samples: SampleModel[]) {
		console.log('editing sample: ' + JSON.stringify(samples));
	}

	removeSample(samples: SampleModel[]) {
		console.log('removing sample: ' + JSON.stringify(samples));
	}

	fieldChanged(event: any) {
		console.log('field changed');
		console.log(event);
	}
}
