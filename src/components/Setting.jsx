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
			<div className='wrapper-setting'>
				<span className='setting-icon' onClick={this.openModal}><i className="fas fa-cog"></i></span>
				<Modal isOpen={this.state.isModalOpen} onCloseClick={this.closeModal}>
					<h1>Timer Setting</h1>
					<p>Choose your timer options</p>
					<TimerOptions optionClick={this.props.onOptionClick} />
					<BreakTimeOptions optionClick={this.props.onOptionClick} />
					<button className='button-close' onClick={this.closeModal}>close</button>
				</Modal>
			</div>
		);
	}
}

Setting.propTypes = {
	onOptionClick: PropTypes.func,
	onBreakOptionClick: PropTypes.func
}

const modalStyle = {
	color: '#000',
	width: '35%',
	height: '40%',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate( -50%, -50%)',
	zIndex: '9999',
	background: '#fff'
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
	close = event => {
		event.preventDefault();
		if (this.props.onCloseClick) {
			this.props.onCloseClick();
		}
	};

	render() {
		if (!this.props.isOpen) {
			return null;
		}
		return (
			<div>
				<div style={modalStyle}>{this.props.children}</div>
				<div style={backStyle} onClick={this.close} />
			</div>
		);
	}
}

Modal.propTypes = {
	isOpen: PropTypes.bool,
	onCloseClick: PropTypes.func
};

const TimerOptions = ({ optionClick }) => {
  let options = [25, 45, 60];
  let selectOption = event => {
    optionClick(event.target.value);
  };

  let TimerOptionButtons = options.map((option, i) => (
  		<button
  			key={i}
  			className="button-modal button-timer"
        onClick={selectOption}
  			value={option}>
  			{option} min
  		</button>
  	));

  return (
    <div>
    {TimerOptionButtons}
    </div>
  );
}

TimerOptions.propTypes = {
	optionClick: PropTypes.func
};

const BreakTimeOptions = ({ optionClick }) => {
	let options = [10, 15, 20];
	let selectOption = event => {
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
	return (
    <div>
    {breakTimeOptionButtons}
    </div>
  )
};

BreakTimeOptions.propTypes = {
	optionClick: PropTypes.func
};

export default Setting;
