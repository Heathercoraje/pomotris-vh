// browser mocks
const localStorageMock = (function() {
	let store = {};
	return {
		getItem(key) {
			return store[key] || null;
		},
		setItem(key, value) {
			store[key] = value.toString();
		},
		removeItem(key) {
			delete store[key];
		},
		clear() {
			store = {};
		}
	};
})();

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock
});

// this is to mock localStorage as in node env, node does not know browser api(locaStorage is an api supported by browswer)
