// using localStorage in place of Server for now
const apiLocalStorage = {
	loadRecords() {
		return new Promise((resolve, reject) => {
			const records = JSON.parse(localStorage.pomotrisRecords || '[]');
			return resolve(records);
		});
	},
	loadCategories() {
		return new Promise((resolve, reject) => {
			// const defaultCategories =
			const categories = JSON.parse(localStorage.PomotrisCategories || '[]');
			return resolve(categories);
		});
	},
	saveRecords(records) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				localStorage.pomotrisRecords = JSON.stringify(records);
				return resolve({ success: true });
			}, 1000);
		});
	},
	saveCategories(categories) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				localStorage.pomotrisCategories = JSON.stringify(categories);
				return resolve({ success: true });
			}, 1000);
		});
	}
};

export default apiLocalStorage;
