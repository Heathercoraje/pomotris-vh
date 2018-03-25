import React, { Component } from 'react';

class Clock extends Component {
	state = {
		startTime: Date.now(),
		timer: 25,
		remained: 25,
		elapsed: 0
	};
	componentDidMount() {
		this.countDownID = setInterval(() => this.countDown(), 1000);
	}
	componentWillUnmount() {
		clearInterval(this.countDownID);
	}
	countDown = () => {
		// most update time - startTime
		const elaspsedSecond = Date.now() - this.startTime;
		this.setState({
			// remained: this.timer - elapsed,
			// timer: Date.now()
			elapsed: elaspsedSecond
		});
	};
	render() {
		return (
			<div>
				<h1>Time Remained</h1>
				<h2>this is {this.state.elapsed}</h2>
			</div>
		);
	}
}

export default Clock;
