import React, { Component } from 'react';
import styled from 'styled-components';
import Timer from './Timer';
import Recordboard from './Recordboard';
import apiLocalStorage from '../../js/apiLocalStorage';
import { addColorDetail } from '../../js/helper';

class Dashboard extends React.Component {
	state = {
		records: [],
		categories: [],
		displayCube: true
	};

	// I am leaving log statements for us to make sure things are working
	// these log statements need to be removed before deployment
	componentWillMount() {
		apiLocalStorage.deleteOldRecords();
		apiLocalStorage
			.loadRecords()
			.then(records => {
				this.setState({ records });
			})
			.catch(err => {
				console.log('Failed to retrieve records');
			});
		apiLocalStorage
			.loadCategories()
			.then(categories => {
				this.setState({ categories });
			})
			.catch(err => {
				console.log('Failed to retrieve category data');
			});
	}

	handleRecordSubmit = newRecord => {
		const records = this.state.records.slice();
		records.unshift(newRecord);
		apiLocalStorage.saveItem(newRecord);
		this.setState({
			records
		});
	};

	updateRecordsDetails = data => {
		const prevRecords = this.state.records.slice();
		const categories = data;
		const records = addColorDetail(prevRecords, categories);
		this.setState({ records });
		apiLocalStorage.updateRecords(records);
	};

	handleCategorySubmit = data => {
		const categories = data;
		this.setState({ categories });
		apiLocalStorage
			.saveCategories(categories)
			.then(() => {
				console.log('success saving new categories');
				this.setState({
					categories
				});
				console.log('success updating categories state');
			})
			.catch(err => {
				console.error(
					'Sorry, Are you sure your localStorage is currently available?'
				);
			});
		this.updateRecordsDetails(data);
	};
	toggleDisplayMode = event => {
		const temp = this.state.displayCube;
		this.setState({
			displayCube: !temp
		});
	};
	deleteRecord = event => {
		const prevRecords = this.state.records.slice();
		const target = event.target.id;
		const records = prevRecords.filter(record => record.id !== target);
		apiLocalStorage.deleleItem(target);
		this.setState({
			records
		});
	};
	clearAllRecords = () => {
		const records = [];
		this.setState({ records });
		apiLocalStorage.clearAllRecords();
	};
	render() {
		return (
			<div className="children-container">
				<Timer
					{...this.state}
					onRecordSubmit={this.handleRecordSubmit}
					onCategorySubmit={this.handleCategorySubmit}
					clearAll={this.clearAllRecords}
					toggleDisplayMode={this.toggleDisplayMode}
				/>
				<Recordboard {...this.state} deleteRecord={this.deleteRecord} />
			</div>
		);
	}
}

export default Dashboard;
