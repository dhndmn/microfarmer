import { prefix } from '$lib/stores';

export function clearStores() {
	for (var key in localStorage) {
		if (key.startsWith(prefix)) {
			localStorage.removeItem(key);
		}
	}
}
