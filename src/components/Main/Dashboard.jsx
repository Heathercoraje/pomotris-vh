import React, { Component } from 'react';
import styled from 'styled-components';
import Timer from './Timer';
import Recordboard from './Recordboard';
import apiLocalStorage from '../../js/apiLocalStorage';

class Dashboard extends React.Component {
	state = {
		records: [
			{
				category: 'Coding',
				duration: 25,
				id: '310d95c1-783f-4459-9113-a6481c832061',
				startTime: '3/29/2018, 5:47:48 PM',
				title: 'Learning React'
			},
			{
				category: 'Workout',
				duration: 50,
				id: '310d95c1-783f-5655-9113-a6481c832061',
				startTime: '3/29/2018, 7:00:48 PM',
				title: 'Run 7 miles'
			}
		],
		categories: []
	};

	// I am leaving log statements for us to make sure things are working
	// these log statements need to be removed before deployment

	componentWillMount() {
		apiLocalStorage.loadRecords().then(records => {
			this.setState({records});
			console.log('success loading records');
		});
		apiLocalStorage.loadCategories().then(categories => {
			this.setState({categories})
		})
	}
	handleRecordSubmit = newRecord => {
		const records = [...this.state.records, newRecord];
		console.log('success saving a new record');
		apiLocalStorage
			.saveRecords(records)
			.then(() => {
				console.log('success saving a new record');
				this.setState({
					records
				});
				console.log('success updating records state');
			})
			.catch(err => {
				console.error(
					'Sorry, Are you sure your localStorage is currently available?'
				);
			});
	};

	handleCategorySubmit = data => {
		const categories = data;
		this.setState({ categories });
		apiLocalStorage
			.saveCategories(categories)
			.then(() => {
				console.log('success saving a new categories');
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
	};

	render() {
		return (
			<div className="children-container">
				<Timer
					onRecordSubmit={this.handleRecordSubmit}
					onCategorySubmit={this.handleCategorySubmit}
					categories={this.state.categories}
				/>
				<Recordboard records={this.state.records} categories={this.state.categories} />
			</div>
		);
	}
}

export default Dashboard;
