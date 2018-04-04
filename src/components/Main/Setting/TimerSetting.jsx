import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

const TimerOptions = props => {
	const options = [25, 45, 60];
	const breakTime = props.breakTime;
	const selectOption = event => {
		props.onSave(event.target.value, breakTime);
	};
	const TimerOptionButtons = options.map((option, i) => (
		<button
			key={i}
			className="button-modal button-timer"
			onClick={selectOption}
			value={option}>
			{option} min
		</button>
	));
	return <div>{TimerOptionButtons}</div>;
};

TimerOptions.propTypes = {
	breakTime: PropTypes.any,
	onSave: PropTypes.func
};

const BreakTimeOptions = props => {
	const options = [5, 15, 20];
	const time = props.duration;
	const selectOption = event => {
		props.onSave(time, event.target.value);
	};
	const breakTimeOptionButtons = options.map((option, i) => (
		<button
			key={i}
			className="button-modal button-breakTime"
			onClick={selectOption}
			value={option}>
			{option} min
		</button>
	));
	return <div>{breakTimeOptionButtons}</div>;
};

BreakTimeOptions.propTypes = {
	duration: PropTypes.any,
	onSave: PropTypes.func
};

export default TimerSetting;
