import React, { Component } from 'react';
import { formatTime, alertMessage } from '../js/helper';

// 25 min/ 10 min  is default setting
class Timer extends Component {
	state = {
		startTime: '',
		duration: 25,
		remained: 25 * 60,
		breakTime: 10 * 60,
		isTimerRunning: false,
		isBreakRunning: false
	};
	// breakTime will be passes as props from Dashboard in future
	componentDidUpdate() {
		if (!this.state.remained && this.state.isTimerRunning) {
			this.handleComplete();
		}
	}
	countDown = () => {
		const remainedSeconds = this.state.remained - 1;
		this.setState({
			remained: remainedSeconds
		});
	};
	breakTimeCountDown = () => {
		const breakTime = this.state.breakTime - 1;
		this.setState({ breakTime });
	};
	resetTimer = newDuration => {
		clearInterval(this.countDownID);
		this.setState({
			startTime: '',
			duration: newDuration,
			breakTime: 10 * 60,
			remained: newDuration * 60,
			isTimerRunning: false
		});
	};

	// handle button-clicks
	handleActionButtonsClick = event => {
		const btn = event.target.value;
		if (btn === 'Start') {
			this.handleStartClick();
		} else if (btn === 'Stop' || btn === 'Pause') {
			this.handleStopClick(btn);
		} else if (btn === 'Resume' || btn === 'Continue') {
			this.handleResumeClick(btn);
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

	handleResumeClick = (btn) => {
		if (btn === 'Continue') {
			this.countDownID = setInterval(() => this.countDown(), 1000);
			this.setState({
				isTimerRunning: true
			});
		} else { // btn === Resume
			this.breakTimeCountDownID = setInterval(() => this.breakTimeCountDown(), 1000);
			this.setState({
				isBreakRunning: true
			});
		}
	};

	handleStopClick = (btn) => {
		if (btn === 'Stop') {
			clearInterval(this.countDownID);
			this.setState({
				isTimerRunning: false
			});
		} else { // btn === Pause
			clearInterval(this.breakTimeCountDownID);
			this.setState({
				isBreakRunning: false
			});
		}
	};

	handleCancelClick = () => {
		this.resetTimer(this.state.duration);
	};

	handleBreak = () => {
		this.breakTimeCountDownID = setInterval(() => this.breakTimeCountDown(), 1000);
		this.setState({
			isBreakRunning: true
		})
	}
	handleComplete = () => {
		alertMessage();
		clearInterval(this.countDownID);
		this.handleBreak()
		this.setState({
			isTimerRunning: false
		});
	}

	handleOptionClick = value => {
		this.resetTimer(value);
	};

	render() {
		return (
			<div className="timer">
				<Clock
					time={
						this.state.remained
							? formatTime(this.state.remained)
							: formatTime(this.state.breakTime)
					}
				/>
				<TimeOptions optionClick={this.handleOptionClick} />
				<ActionButtons
					isNew={this.state.remained === this.state.duration * 60}
					isCompleted={(!this.state.remained)}
					isBreakRunning={this.state.isBreakRunning}
					isTimerRunning={this.state.isTimerRunning}
					onButtonClick={this.handleActionButtonsClick}
				/>
			</div>
		);
	}
}

const Clock = props => {
	return <h1>{props.time}</h1>;
};

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
					onOptionClick={this.selectOption}
				/>
			</div>
		);
	}
}
const TimerOptionButtons = props =>
	props.options.map((option, i) => (
		<button key={i} onClick={props.onOptionClick} value={option}>
			{option} min
		</button>
	));

class ActionButtons extends Component {
	// prefer to have clean render function, so extract codes into button choice function
	renderButton = () => {
		let buttonText;
		if (this.props.isBreakRunning && !this.props.isTimerRunning) buttonText = 'Pause';
		else if (this.props.isCompleted) buttonText = 'Resume'
		else if (!this.props.isNew && !this.props.isTimerRunning) buttonText = 'Continue';
		else if (!this.props.isTimerRunning) buttonText = 'Start';
		else buttonText = 'Stop';
		return buttonText
	}

	render() {
		return (
			<div>
				<button onClick={this.props.onButtonClick} value={this.renderButton(this.props)}>
					{this.renderButton(this.props)}
				</button>
				<button onClick={this.props.onButtonClick} value="cancel">
					Cancel
				</button>
			</div>
		);
	}
}
export default Timer;
