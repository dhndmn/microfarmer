// @ts-nocheck
import { farmerId, farmerName, farmName, harvests, prefix, supplies } from '$lib/stores';

export function clearStores() {
	// Set app stores to an empty values
	farmerId.update(() => null);
	farmerName.update(() => '');
	farmName.update(() => '');
	harvests.update(() => []);
	supplies.update(() => []);

	// Delete all related local storage key value pairs
	for (var key in localStorage) {
		if (key.startsWith(prefix)) {
			localStorage.removeItem(key);
		}
	}
}
