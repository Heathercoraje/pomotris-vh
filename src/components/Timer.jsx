import React, { Component } from 'react';
import formatTime from '../js/helper';

class Timer extends Component {
	state = {
		startTime: '',
		duration: 25,
		remained: 25 * 60,
		isTimerRunning: false
	};

	resetTimer = newDuration => {
		clearInterval(this.countDownID);
		this.setState({
			startTime: '',
			duration: newDuration,
			remained: newDuration * 60,
			isTimerRunning: false
		});
	};

	countDown = () => {
		const remainedSeconds = this.state.remained - 1;
		this.setState({
			remained: remainedSeconds
		});
	};

	handleActionButtonsClick = event => {
		const btn = event.target.value;
		if (btn === 'start') {
			this.handleStartClick();
		} else if (btn === 'stop') {
			this.handleStopClick();
		} else {
			this.handleCancelClick();
		}
	};

	handleStartClick = () => {
		this.countDownID = setInterval(() => this.countDown(), 1000);
		this.setState({
			startTime: Date.now(),
			isTimerRunning: true
		});
	};
	handleStopClick = () => {
		clearInterval(this.countDownID);
		this.setState({
			isTimerRunning: false
		});
	};
	handleCancelClick = () => {
		this.resetTimer(this.state.duration);
	};
	handleOptionClick = value => {
		this.resetTimer(value);
	};
	render() {
		return (
			<div className="timer">
				<Clock time={formatTime(this.state.remained)} />
				<TimeOptions optionClick={this.handleOptionClick} />
				<ActionButtons
					isTimerRunning={this.state.isTimerRunning}
					onButtonClick={this.handleActionButtonsClick}
				/>
			</div>
		);
	}
}

const Clock = props => <h1>{props.time}</h1>;

class TimeOptions extends Component {
	selectOption = event => {
		this.props.optionClick(event.target.value);
	};

	render() {
		return (
			<div>
				<button onClick={this.selectOption} value="25">
					25 min
				</button>
				<button onClick={this.selectOption} value="50">
					50 min
				</button>
			</div>
		);
	}
}
class ActionButtons extends Component {
	render() {
		const buttonText = this.props.isTimerRunning ? 'stop' : 'start';
		return (
			<div>
				<button onClick={this.props.onButtonClick} value={buttonText}>
					{buttonText}
				</button>
				<button onClick={this.props.onButtonClick} value="cancel">
					Cancel
				</button>
			</div>
		);
	}
}
export default Timer;