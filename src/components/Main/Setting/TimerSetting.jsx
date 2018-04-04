import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
// var ClassNames = require('classnames');

const TimerSetting = props => (
	<div className="setting">
		<hr />
		<h1>Timer Setting</h1>
		<p>Choose your timer options</p>
		<TimerOptions {...props} />
		<BreakTimeOptions {...props} />
		<button className="button-close" onClick={props.closeModal}>
			Close
		</button>
	</div>
);

TimerSetting.propTypes = {
	closeModal: PropTypes.func
};

class TimerOptions extends Component {
	state = {
		selected: this.props.duration
	};
	setActive = btn => {
		this.setState({
			selected: btn
		});
	};
	isActive = btn => {
		const selected = this.state.selected;
		const classNames =
			Number(btn) === Number(selected)
				? ClassNames('button-modal', 'button-timer', 'active', 'active-time')
				: ClassNames('button-modal', 'button-timer');
		return classNames;
	};
	selectOption = event => {
		const breakTime = this.props.breakTime;
		this.setActive(event.target.value);
		this.props.onSave(event.target.value, breakTime);
	};

	render() {
		const options = [25, 45, 60];
		const TimerOptionButtons = options.map((option, i) => (
			<button
				key={i}
				className={this.isActive(option)}
				onClick={this.selectOption}
				value={option}>
				{option} min
			</button>
		));
		return <div>{TimerOptionButtons}</div>;
	}
}

TimerOptions.propTypes = {
	breakTime: PropTypes.any,
	onSave: PropTypes.func
};

class BreakTimeOptions extends Component {
	state = {
		selected: this.props.breakTime > 20 ? 5 : this.props.breakTime
	};
	
	setActive = btn => {
		this.setState({
			selected: btn
		});
	};

	isActive = btn => {
		const selected = this.state.selected;
		const classNames =
			Number(btn) === Number(selected)
				? ClassNames(
						'button-modal',
						'button-breakTime',
						'active',
						'active-breakTime'
				  )
				: ClassNames('button-modal', 'button-breakTime');
		return classNames;
	};

	selectOption = event => {
		const duration = this.props.duration;
		this.setActive(event.target.value);
		this.props.onSave(duration, event.target.value);
	};
	render() {
		const options = [5, 15, 20];
		const breakTimeOptionButtons = options.map((option, i) => (
			<button
				key={i}
				className={this.isActive(option)}
				onClick={this.selectOption}
				value={option}>
				{option} min
			</button>
		));
		return <div>{breakTimeOptionButtons}</div>;
	}
}

BreakTimeOptions.propTypes = {
	duration: PropTypes.any,
	onSave: PropTypes.func
};

export default TimerSetting;
