import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Setting extends React.Component {
	state = {
		isModalOpen: false
	};
	openModal = () => {
		this.setState({
			isModalOpen: true
		});
		this.props.onSettingOpen('Stop');
	};
	closeModal = () => {
		this.setState({
			isModalOpen: false
		});
	};
	render() {
		return (
			<div className="wrapper-setting">
				<span className="setting-icon" onClick={this.openModal}>
					<i className="fas fa-cog" />
				</span>
				<Modal
					isOpen={this.state.isModalOpen}
					onCloseClick={this.closeModal}
					optionClick={this.props.onOptionClick}
				/>
			</div>
		);
	}
}

Setting.propTypes = {
	onOptionClick: PropTypes.func,
	onBreakOptionClick: PropTypes.func
};

const modalStyle = {
	color: '#000',
	width: '35%',
	height: '45%',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate( -50%, -50%)',
	zIndex: '9999',
	background: '#fff',
	borderRadius: '10px'
};

const backStyle = {
	position: 'absolute',
	width: '100%',
	height: '100%',
	top: '0px',
	left: '0px',
	zIndex: '9998',
	background: 'rgba(0, 0, 0, 0.6)'
};

class Modal extends React.Component {
	state = {
		timerOpen: true
	};

	close = event => {
		event.preventDefault();
		if (this.props.onCloseClick) {
			this.props.onCloseClick();
		}
	};

	switchSetting = (event) => {
		// this.setState({
		// 	timerOpen:
		// });
	};

	render() {
		let content;
		if (!this.props.isOpen) {
			return null;
		}
		if (this.state.timerOpen) {
			content = <TimerSetting optionClick={this.props.optionClick} closeModal={this.close}/>
		} else {
			content = <CategorySetting />
		}

		return (
			<div>
				<div style={modalStyle}>
					<ul className='list-setting'>
						<li onClick={this.switchSetting}>Timer</li>
						<li onClick={this.switchSetting}>Category</li>
					</ul>
					{content}
				</div>
				<div style={backStyle} onClick={this.close} />
			</div>
		);
	}
}

Modal.propTypes = {
	isOpen: PropTypes.bool,
	onCloseClick: PropTypes.func
};

const TimerSetting = props => (
	<div className='timer-setting'>
		<h1>Timer Setting</h1>
		<p>Choose your timer options</p>
		<TimerOptions optionClick={props.optionClick} />
		<BreakTimeOptions optionClick={props.optionClick} />
		<button className="button-close" onClick={props.closeModal}>
			Close
		</button>
	</div>
);


const TimerOptions = ({ optionClick }) => {
	const options = [25, 45, 60];
	const selectOption = event => {
		optionClick(event.target.value);
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

const BreakTimeOptions = ({ optionClick }) => {
	const options = [10, 15, 20];
	const selectOption = event => {
		optionClick(event.target.value);
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

const CategorySetting = () => (<h1>Category Setting!</h1>)



export default Setting;
