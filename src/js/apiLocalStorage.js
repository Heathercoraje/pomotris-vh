// using localStorage in place of Server for now
import { filterByToday } from './helper';

const apiLocalStorage = {
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
				localStorage.pomotrisRecords = JSON.stringify(defaultRecords);
			}
			return resolve(records);
		});
	},
	updateRecords(records) {
		localStorage.pomotrisRecords = JSON.stringify(records);
	},
	loadCategories() {
		return new Promise((resolve, reject) => {
			const categories = JSON.parse(localStorage.pomotrisCategories || '[]');
			return resolve(categories);
		});
	},
	saveCategories(categories) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				localStorage.pomotrisCategories = JSON.stringify(categories);
				return resolve({ success: true });
			}, 1000);
		});
	},
	saveItem(record) {
		const records = JSON.parse(localStorage.pomotrisRecords || '[]');
		records.unshift(record);
		localStorage.pomotrisRecords = JSON.stringify(records);
	},
	deleleItem(id) {
		const prevRecords = JSON.parse(localStorage.pomotrisRecords);
		const newRecords = prevRecords.filter(r => r.id !== id);
		localStorage.pomotrisRecords = JSON.stringify(newRecords);
	}
};

export default apiLocalStorage;
