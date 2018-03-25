import React, { Component } from 'react';

class Clock extends Component {
	state = {
		startTime: new Date().getTime(),
		timeSetting: 25,
		remained: '25 : 00'
	};
	componentDidMount() {
		this.countDownID = setInterval(
			() => this.countDown(this.state.timeSetting),
			500
		);
	}
	componentWillUnmount() {
		clearInterval(this.countDownID);
	}
	countDown = timeSetting => {
		const now = new Date().getTime(); // milliseconds
		const time = timeSetting * 60 * 1000;
		const timeRemained = this.state.startTime + time - now;
		this.setState({
			remained: this.formatTime(timeRemained)
		});
	};

	formatTime = timeRemained => {
		const ms = timeRemained;
		const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((ms % (1000 * 60)) / 1000);
		const humanized = [String(minutes), ' : ', String(seconds)];
		return humanized;
	};
	render() {
		return (
			<div>
				<h1>Time Remained</h1>
				<h2>{this.state.remained}</h2>
			</div>
		);
	}
}

export default Clock;

// getTime() returns the number of milliseconds between midnight of Jan 1, 1970 and the specified dates
// hence, startTime is the current time in milliseconds format
// By adding timer (i.e. 25 min ) to start Time, this becomes and endTime
// and by updating now every second, remained time decreases
