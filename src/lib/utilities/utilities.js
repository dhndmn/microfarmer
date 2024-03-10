import { farmerName, farmName } from '$lib/stores/farmer';

export function clearStores() {
	farmerName.set('');
	farmName.set('');
	for (var key in localStorage) {
		if (key.startsWith('microfarmer.')) {
			localStorage.removeItem(key);
		}
	}
}
