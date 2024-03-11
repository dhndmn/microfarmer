export function clearStores() {
	for (var key in localStorage) {
		if (key.startsWith('mf-')) {
			localStorage.removeItem(key);
		}
	}
}
