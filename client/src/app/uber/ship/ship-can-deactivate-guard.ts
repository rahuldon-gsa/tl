import { Injectable } from '@angular/core';
import {
	CanDeactivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import { ShipComponent } from './ship.component';


@Injectable()
export class ShipDeactivateGuard implements CanDeactivate<ShipComponent> {

	canDeactivate(
		component: ShipComponent,
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Promise<boolean> | boolean {

		// Get the Crisis Center ID
		console.log(route.params['id']);

		// Get the current URL
		console.log(state.url);

		// Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
		if (component.shipment.id !== undefined) {
			return true;
		}
		// Otherwise ask the user with the dialog service and return its
		// promise which resolves to true or false when the user decides
		return confirm('Discard changes?');
	}
}