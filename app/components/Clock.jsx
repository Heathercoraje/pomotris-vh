import React, { Component } from 'react';
import formatTime from '../helper';

class Clock extends Component {
	state = {
		startTime: Date.now(),
		type: '',
		description: '',
		duration: 25,
		remained: 25 * 60,
		endTime: ''
	};
	componentDidMount() {
		this.countDownID = setInterval(() => this.countDown(), 1000);
	}
	componentWillUnmount() {
		clearInterval(this.countDownID);
	}
	countDown = () => {
		const remainedSeconds = this.state.remained - 1;
		this.setState({
			remained: remainedSeconds
		});
	};

	render() {
		return (
			<div>
				<h1>Pomorodor</h1>
				<h2>{formatTime(this.state.remained)}</h2>
			</div>
		);
	}
}

export default Clock;
