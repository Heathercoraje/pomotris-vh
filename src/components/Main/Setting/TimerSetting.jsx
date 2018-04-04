import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TimerSetting = props => (
	<div className="setting">
		<h1>Timer Setting</h1>
		<hr />
		<p>Choose your timer options</p>
		<TimerOptions {...props}/>
		<BreakTimeOptions {...props}/>
		<button className="button-close" onClick={props.closeModal}>
			Close
		</button>
	</div>
);

const TimerOptions = (props) => {
	const breakTime = props.breakTime;
	const options = [25, 45, 60];
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
	optionClick: PropTypes.func
};

const BreakTimeOptions = (props) => {
	const time = props.duration;
	const options = [5, 15, 20];
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
	optionClick: PropTypes.func
};

export default TimerSetting;
