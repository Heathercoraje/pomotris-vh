// using localStorage in place of Server for now
import { filterByToday } from './helper';

const apiLocalStorage = {
	// do something about default
	deleteOldRecords() {
		const records = JSON.parse(localStorage.pomotrisRecords || null);
		if (!records) return;
		localStorage.pomotrisRecords = JSON.stringify(filterByToday(records));
	},

	loadRecords() {
		const defaultRecords = [
			{
				category: 'welcome',
				duration: 10,
				id: '310d95c1-783f-4459-9113-a6481c832061',
				startTime: new Date(Date.now()).toLocaleString(),
				task: 'Welcome to Pomotris',
				color: 'powderblue'
			}
		];
		return new Promise((resolve, reject) => {
			const status = true;
			let records = JSON.parse(localStorage.pomotrisRecords || null);
			if (!records) {
				records = defaultRecords;
			}
			return resolve(records);
		});
	},
	loadCategories() {
		return new Promise((resolve, reject) => {
			const categories = JSON.parse(localStorage.pomotrisCategories || '[]');
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
