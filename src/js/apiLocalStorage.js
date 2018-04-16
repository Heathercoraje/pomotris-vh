// using localStorage in place of Server for now
const apiLocalStorage = {
	// do something about default
	loadRecords() {
		const defaultRecords = [
			{
				category: 'welcome',
				duration: 10,
				id: '310d95c1-783f-4459-9113-a6481c832061',
				startTime: '3/29/2018, 5:47:48 PM',
				task: 'Welcome to Pomotris',
				color: 'powderblue'
			}
		];
		return new Promise((resolve, reject) => {
			const status = true;
			let records = JSON.parse(localStorage.pomotrisRecords || null);
			if (!records) {
				records = defaultRecords;
				localStorage.pomotrisRecords = JSON.stringify(records);
			}
			return resolve(records);
		});
	},
	loadCategories() {
		return new Promise((resolve, reject) => {
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
