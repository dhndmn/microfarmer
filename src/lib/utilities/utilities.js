import { farmerName, farmName } from '$lib/stores/farmer';

export function clearStores() {
	farmerName.set('');
	farmName.set('');
}
