import React, { Component } from 'react';
import { formatTime, alertMessage } from '../js/helper';
import uuid from 'uuid-v4';
// 25 min/ 10 min  is default setting
class Timer extends Component {
	state = {
		type: '',
		title: '',
		startTime: '',
		duration: 25,
		remained: 25 * 60,
		breakTime: 10 * 60,
		isTimerRunning: false,
		isBreakRunning: false,
	};
	// breakTime will be passes as props from Dashboard in future
	componentDidUpdate() {
		if (!this.state.remained && this.state.isTimerRunning) {
			this.handleComplete();
		}
		if (this.state.breakTime < 0) {
			this.handleBreakOver();
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
			type: '',
			title: '',
			startTime: '',
			duration: newDuration,
			breakTime: 10 * 60,
			remained: newDuration * 60,
			isTimerRunning: false,
		});
	};
	handleRecordSubmit = () => {
		const type = this.state.type;
		const title = this.state.title;
		const startTime = this.state.startTime;
		const duration = this.state.duration;
		const id = uuid();
		this.props.onRecordSubmit({ type, title, startTime, duration, id });
	};
	handleFieldsSubmit = fields => {
		this.setState({
			title: fields.title,
			type: fields.type
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
			isTimerRunning: true,
			isReset:false
		});
	};

	handleResumeClick = btn => {
		if (btn === 'Continue') {
			this.countDownID = setInterval(() => this.countDown(), 1000);
			this.setState({
				isTimerRunning: true
			});
		} else {
			// btn === Resume
			this.breakTimeCountDownID = setInterval(
				() => this.breakTimeCountDown(),
				1000
			);
			this.setState({
				isBreakRunning: true
			});
		}
	};

	handleStopClick = btn => {
		if (btn === 'Stop') {
			clearInterval(this.countDownID);
			this.setState({
				isTimerRunning: false
			});
		} else {
			// btn === Pause
			clearInterval(this.breakTimeCountDownID);
			this.setState({
				isBreakRunning: false
			});
		}
	};

	handleCancelClick = () => {
		this.resetTimer(this.state.duration);
		clearInterval(this.breakTimeCountDownID);
	};

	handleBreakStart = () => {
		this.breakTimeCountDownID = setInterval(
			() => this.breakTimeCountDown(),
			1000
		);
		this.setState({
			isBreakRunning: true
		});
	};
	handleBreakOver = () => {
		alertMessage('start');
		clearInterval(this.breakTimeCountDownID);
		this.resetTimer(this.state.duration);
		this.setState({
			isBreakRunning: false
		});
	};
	handleComplete = () => {
		alertMessage('break');
		clearInterval(this.countDownID);
		this.handleRecordSubmit();
		this.handleBreakStart();
		this.setState({
			isTimerRunning: false
		});
	};

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
				<Fields
					onFieldsSubmit={this.handleFieldsSubmit}
				/>
				<TimeOptions optionClick={this.handleOptionClick} />
				<ActionButtons
					isNew={this.state.remained === this.state.duration * 60}
					isCompleted={!this.state.remained}
					isBreakRunning={this.state.isBreakRunning}
					isTimerRunning={this.state.isTimerRunning}
					onButtonClick={this.handleActionButtonsClick}
				/>
			</div>
		);
	}
}

const Clock = props => <h1>{props.time}</h1>;

class Fields extends Component {
	state = {
		inputFields: {
			type: '',
			title: ''
		},
		displayFields: {
			type:'',
			title:''
		},
		formOpen: true
	}
//
// 	componentWillReceiveProps() {
// // do something...form needs to be unfold when its a new timer
// 	}

	onFormSubmit = event => {
		const fields = this.state.displayFields;
		this.props.onFieldsSubmit(fields);
		this.setState({
			inputFields: {
				type: '',
				title: ''
			},
			formOpen: false
		});
		event.preventDefault();
	};

	onInputChange = event => {
		const inputFields = this.state.inputFields;
		const displayFields = this.state.displayFields;
		inputFields[event.target.name] = event.target.value;
		displayFields[event.target.name] = event.target.value;
		this.setState({ inputFields, displayFields });
	};

	render() {
		if (this.state.formOpen ) {
			return (
				<form onSubmit={this.onFormSubmit}>
					<input
						autoFocus
						placeholder=" Type "
						name="type"
						value={this.state.inputFields.type}
						onChange={this.onInputChange}
					/>
					<input
						autoFocus
						name="title"
						placeholder=" Task name"
						value={this.state.inputFields.title}
						onChange={this.onInputChange}
					/>
					<input type="submit" />
				</form>
			);
		}
			const type = this.state.displayFields.type;
			const title = this.state.displayFields.title;
			return (
				<p onClick={() => this.setState({ formOpen: true })}>
					({type}) {title}{' '}
				</p>
			);

	}
}

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
		if (this.props.isBreakRunning && !this.props.isTimerRunning)
			buttonText = 'Pause';
		else if (this.props.isCompleted) buttonText = 'Resume';
		else if (!this.props.isNew && !this.props.isTimerRunning)
			buttonText = 'Continue';
		else if (!this.props.isTimerRunning) buttonText = 'Start';
		else buttonText = 'Stop';
		return buttonText;
	};

	render() {
		return (
			<div>
				<button
					onClick={this.props.onButtonClick}
					value={this.renderButton(this.props)}>
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
