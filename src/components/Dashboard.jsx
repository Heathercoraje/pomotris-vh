import React, { Component } from 'react';
import styled from 'styled-components';
import Timer from './Timer';
import Recordboard from './Recordboard';

const Wrapper = styled.div`
	width: 40vw;
	margin: 0 auto;
	text-align: center;
`;

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
			},
			{
				category: 'Reading',
				duration: 50,
				id: '323d95c1-783f-4459-9113-a6481c832061',
				startTime: '3/29/2018, 9:47:48 PM',
				title: 'YDKJS book 6 '
			}
		]
	};
	// example { category: '',title: '', startTime: '', duration: '', id:''}
	handleRecordSubmit = newRecord => {
		const records = [...this.state.records, newRecord];
		this.setState({
			records
		});
	};
	render() {
		return (
			<Wrapper>
				<div className="pomotris">Pomotris</div>
				<Timer onRecordSubmit={this.handleRecordSubmit} />
				<Recordboard records={this.state.records} />
			</Wrapper>
		);
	}
}

export default Dashboard;
