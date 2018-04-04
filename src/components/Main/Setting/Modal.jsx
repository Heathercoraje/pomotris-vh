import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimerSetting from './TimerSetting';
import CategorySetting from './CategorySetting';

const modalStyle = {
	color: '#000',
	width: '35%',
	height: '50%',
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

// this component should have state to store selected options for (timerSetting/Category setting)
class Modal extends React.Component {
	state = {
		timerOpen: true,
		selectedOption: {
			duration: this.props.timeData.duration,
			breakTime: this.props.timeData.breakTime,
			categories: []
		}
	};

	// control display
	closeModal = event => {
		event.preventDefault();
		if (this.props.onCloseClick) {
			this.props.onCloseClick();
		}
	};

	switchSetting = val => {
		const update = val === 'timer';
		this.setState({
			timerOpen: update
		});
	};
	// control options
	onTimerSubmit = (duration, breakTime) => {
		const newOption = this.state.selectedOption;
		newOption.duration = duration;
		newOption.breakTime = breakTime;
		this.setState({
			selectedOption: newOption
		});
		this.props.onOptionClick({ duration, breakTime })
	};

	onCategorySubmit = array => {
		const newOption = this.state.selectedOption;
		newOption[categories] = array;
		this.setState({
			selectedOption: newOption
		});
	};

	// then collect and send this entire data (this.state to Timer)
	// here we send all data inside this.state.selectedOption to timer
	onSettingSubmit = () => {
		const data = this.state.selectedOption; // object
		this.props.onSettingSubmit(data);
		// {this.props.onCategorySubmit} do something about this
	};

	render() {
		if (!this.props.isOpen) return null;
		const content = this.state.timerOpen ? (
			<TimerSetting onSave={this.onTimerSubmit} closeModal={this.closeModal} {...this.state.selectedOption}/>
		) : (
			<CategorySetting
				onSave={this.onTimerSubmit}
				closeModal={this.closeModal}
			/>
		);
		return (
			<div>
				<div style={modalStyle}>
					<ul className="list-setting">
						<li onClick={this.switchSetting.bind(this, 'timer')}>Timer</li>
						<li onClick={this.switchSetting.bind(this, 'category')}>
							Category
						</li>
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

export default Modal;
