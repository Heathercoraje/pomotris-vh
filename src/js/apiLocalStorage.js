// using localStorage in place of Server for now
const apiLocalStorage = {
	loadRecords() {
		return new Promise((resolve, reject) => {
			const records = JSON.parse(localStorage.records || '[]');
			return resolve(records);
		});
	},
	loadCategories() {
		return new Promise((resolve, reject) => {
			const categories = JSON.parse(localStorage.categories || '[]');
			return resolve(categories);
		});
	},
	saveRecords(records) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				localStorage.records = JSON.stringify(records);
				return resolve({ success: true });
			}, 1000);
		});
	},
	saveCategories(categories) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				localStorage.categories = JSON.stringify(categories);
				return resolve({ success: true });
			}, 1000);
		});
	}
};

export default apiLocalStorage;
