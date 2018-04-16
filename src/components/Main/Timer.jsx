import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatTime, alertMessage, generateRandomColor, generateID, addColorDetail } from '../../js/helper';

import Setting from './Setting/Setting';

// 25 min/ 5 min  is default setting
class Timer extends Component {
	state = {
		category: null,
		task: null,
		color:'',
		startTime: null,
		duration: 0.1,
		remained: 0.1 * 60,
		breakTime: 0.1,
		breakTimeRemained: 0.1 * 60,
		isTimerRunning: false,
		isBreakRunning: false
	};

	// breakTime will be passes as props from Dashboard in future (from setting modal)
	componentDidUpdate() {
		if (!this.state.remained && this.state.isTimerRunning) {
			this.handleComplete();
		}
		if (this.state.breakTimeRemained < 0) {
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
		const breakTimeRemained = this.state.breakTimeRemained - 1;
		this.setState({ breakTimeRemained});
	};
	resetTimer = newDuration => {
		clearInterval(this.countDownID);
		const breakTime = this.state.breakTime;
		const breakTimeRemained = this.state.breakTime * 60;
		this.setState({
			category: null,
			task: null,
			startTime: null,
			duration: newDuration,
			remained: newDuration * 60,
			breakTime,
			breakTimeRemained,
			isTimerRunning: false,
			isBreakRunning: false
		});
	};

	handleFieldsSubmit = fields => {
		this.setState({
			task: fields.task,
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
		this.resetTimer(this.state.duration);
		clearInterval(this.breakTimeCountDownID);
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
		const task = this.state.task;
		const startTime = this.state.startTime;
		const duration = this.state.duration;
		const color = generateRandomColor(task, this.props.categories)
		const id = generateID();
		this.props.onRecordSubmit({ category, task, startTime, duration, color, id });
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
			breakTime: value,
			breakTimeRemained: value * 60
		});
	};

	render() {
		return (
			<div className="timer">
				<Setting
					timeData={this.timeData()}
					categories={this.props.categories}
					onOptionClick={this.handleOptionClick}
					onSettingOpen={this.handleStopClick}
					onCategorySubmit={this.props.onCategorySubmit}
				/>
				<Clock
					time={
						this.state.remained
							? formatTime(this.state.remained)
							: formatTime(this.state.breakTimeRemained)
					}
				/>
				<Fields
					onFieldsSubmit={this.handleFieldsSubmit}
					categories={this.props.categories}
					task={this.state.task}
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
			task: ''
		},
		formOpen: true
	};

	// when new task & cateroy props are empty ( aka, it is a new timer), then clear input
	componentWillReceiveProps(nextProps) {
		if (!nextProps.category && !nextProps.task) {
			this.clearForm();
		}
	}

	clearForm = () => {
		this.setState({
			fields: {
				category: '',
				task: ''
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
					list="categories"
					size={16}
					autoFocus
					placeholder="  Category "
					name="category"
					value={this.state.fields.category}
					onChange={this.onInputChange}
					autoComplete="off"
				/>
				<datalist id="categories">
					{this.props.categories.map((category, i ) =>
						<option key={i} value={category.category} />
					)}
				</datalist>
				<input
					size={25}
					name="task"
					placeholder="Enter your task"
					value={this.state.fields.task}
					onChange={this.onInputChange}
					autoComplete="off"
				/>
				<input style={{ display: 'none' }} type="submit" />
			</form>
		);
	}
}

Fields.propTypes = {
	task: PropTypes.string,
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
			<div className='wrapper-actionButtons'>
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
