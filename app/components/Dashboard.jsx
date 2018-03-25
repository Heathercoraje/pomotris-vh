import React, { Component } from 'react';
import Clock from './Clock';
// import RecordBoard from './Recordboard';

class Dashboard extends React.Component {
	state = {
		record: []
	};

	render() {
		return (
			<div>
				<Clock />
				{/* <Recordboard /> */}
			</div>
		);
	}
}

export default Dashboard;
