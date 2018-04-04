import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid-v4';
import { formatTime, alertMessage } from '../../js/helper';
import Setting from './Setting/Setting';

// 25 min/ 5 min  is default setting
class Timer extends Component {
	state = {
		category: null,
		title: null,
		startTime: null,
		duration: 25,
		remained: 25 * 60,
		breakTime: 5 * 60,
		isTimerRunning: false,
		isBreakRunning: false
	};

	// breakTime will be passes as props from Dashboard in future (from setting modal)
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
			category: null,
			title: null,
			startTime: null,
			duration: newDuration,
			breakTime: 10 * 60,
			remained: newDuration * 60,
			isTimerRunning: false,
			isBreakRunning: false
		});
	};

	handleFieldsSubmit = fields => {
		this.setState({
			title: fields.title,
			category: fields.category
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
			startTime: new Date(Date.now()).toLocaleString(),
			isTimerRunning: true
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
	handleRecordSubmit = () => {
		const category = this.state.category;
		const title = this.state.title;
		const startTime = this.state.startTime;
		const duration = this.state.duration;
		const id = uuid();
		this.props.onRecordSubmit({ category, title, startTime, duration, id });
	};

	timeData = () => {
		const duration = this.state.duration;
		const breakTime = this.state.breakTime;
		return { duration, breakTime };
	};

	handleOptionClick = obj => {
		this.editDuration(obj.duration);
		this.editBreakTime(obj.breakTime);
	};

	editDuration = value => {
		this.setState({
			duration: value,
			remained: value * 60
		});
	};

	editBreakTime = value => {
		this.setState({
			breakTime: value * 60
		});
	};

	render() {
		return (
			<div className="timer">
				<Setting
					timeData={this.timeData()}
					onOptionClick={this.handleOptionClick}
					onSettingOpen={this.handleStopClick}
					onCategorySubmit={this.props.onCategorySubmit}
				/>
				<Clock
					time={
						this.state.remained
							? formatTime(this.state.remained)
							: formatTime(this.state.breakTime)
					}
				/>
				<Fields
					onFieldsSubmit={this.handleFieldsSubmit}
					title={this.state.title}
					category={this.state.category}
				/>
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

Timer.propTypes = {
	onRecordSubmit: PropTypes.func,
	onSettingSubmit: PropTypes.func
};

const Clock = props => <div className="clock">{props.time}</div>;

Clock.propTypes = {
	time: PropTypes.string,
	formatTime: PropTypes.func
};

class Fields extends Component {
	state = {
		fields: {
			category: '',
			title: ''
		},
		formOpen: true
	};

	// when new title & cateroy props are empty ( aka, it is a new timer), then clear input
	componentWillReceiveProps(nextProps) {
		if (!nextProps.category && !nextProps.title) {
			this.clearForm();
		}
	}

	clearForm = () => {
		this.setState({
			fields: {
				category: '',
				title: ''
			},
			formOpen: true
		});
	};

	// input data remains after submit, clearing happens when current timer is over or timer is reset
	onFormSubmit = event => {
		const fields = this.state.fields;
		this.props.onFieldsSubmit(fields);
		event.preventDefault();
	};

	onInputChange = event => {
		const fields = this.state.fields;
		fields[event.target.name] = event.target.value;
		this.setState({ fields });
	};

	render() {
		return (
			<form
				className="timer-form"
				onSubmit={this.onFormSubmit}
				onBlur={this.onFormSubmit}>
				<input
					size={15}
					autoFocus
					placeholder="  Category "
					name="category"
					value={this.state.fields.category}
					onChange={this.onInputChange}
					autoComplete="off"
				/>
				<input
					size={25}
					name="title"
					placeholder="Task"
					value={this.state.fields.title}
					onChange={this.onInputChange}
					autoComplete="off"
				/>
				<input style={{ display: 'none' }} type="submit" />
			</form>
		);
	}
}

Fields.propTypes = {
	title: PropTypes.string,
	category: PropTypes.string,
	onFieldsSubmit: PropTypes.func
};

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

ActionButtons.propTypes = {
	props: PropTypes.object,
	isNew: PropTypes.bool,
	isCompleted: PropTypes.bool,
	isTimerRunning: PropTypes.bool,
	isBreakRunning: PropTypes.bool,
	onButtonClick: PropTypes.func
};
export default Timer;
