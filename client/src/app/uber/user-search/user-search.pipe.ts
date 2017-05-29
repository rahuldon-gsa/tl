import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../user/user';

@Pipe({
	name: 'userSearchFilter',
	pure: false
})
export class UserSearchPipe implements PipeTransform {


	/*
	transform(items: any[], field: string, value: string): any[] {
		if (value.length > 0) {
			if (!items) return [];
			return items.filter(it => it[field] == value);
		} else {
			return items;
		}
	}
	*/

	transform(items: User[], filter: User): User[] {
		if (!items || !filter) {
			return items;
		}
		// filter items array, items which match and return true will be kept, false will be filtered out
		return items.filter((item: User) => this.applyFilter(item, filter));
	}

	/**
	* Perform the filtering.
	* 
	* @param {Book} book The book to compare to the filter.
	* @param {Book} filter The filter to apply.
	* @return {boolean} True if book satisfies filters, false if not.
	*/
	applyFilter(book: User, filter: User): boolean {
		for (let field in filter) {

			if (filter[field]) {
				if (typeof filter[field] === 'string') {
					if (book[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
						return false;
					}
				} else if (typeof filter[field] === 'number') {
					if (book[field] !== filter[field]) {
						return false;
					}
				}
			}
		}
		return true;
	}
}
