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
		if (btn === 'Start') {
			this.handleStartClick();
		} else if (btn === 'Stop') {
			this.handleStopClick();
		} else if (btn === 'Resume') {
			this.handleResumeClick();
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
	handleResumeClick = () => {
		this.countDownID = setInterval(() => this.countDown(), 1000);
		this.setState({
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
		if (!this.state.remained) {
			alert('Your timer is over, your break will start now');
		}
		return (
			<div className="timer">
				<Clock time={formatTime(this.state.remained)} />
				<TimeOptions optionClick={this.handleOptionClick} />
				<ActionButtons
					isNew={this.state.remained === this.state.duration * 60}
					isTimerRunning={this.state.isTimerRunning}
					onButtonClick={this.handleActionButtonsClick}
				/>
			</div>
		);
	}
}

const Clock = props => <h1>{props.time}</h1>;

class TimeOptions extends Component {
	state = {
		options: [25, 45, 60]
	};
	selectOption = event => {
		this.props.optionClick(event.target.value);
	};

	render() {
		return (
			<div>
				<TimerOptionButtons
					options={this.state.options}
					selectOption={this.selectOption}
				/>
			</div>
		);
	}
}
const TimerOptionButtons = props =>
	props.options.map((option, i) => (
		<button key={i} onClick={props.selectOption} value={option}>
			{option} min
		</button>
	));
class ActionButtons extends Component {
	render() {
		const buttonText =
			!this.props.isNew && !this.props.isTimerRunning
				? 'Resume'
				: !this.props.isTimerRunning ? 'Start' : 'Stop';
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
