import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formatTime } from '../../js/helper';

class ButtonsContainer extends Component {
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
	GetTotalTime = records => {
		const timeArray = records.map(record => Number(record.duration));
		const totalTime = records.length
			? formatTime(timeArray.reduce((a, b) => a + b) * 60)
			: null;
		return totalTime;
	};

	toggleButtonText = () => {
		const cubeMode = this.props.displayCube;
		const buttonText = cubeMode ? 'Show list' : 'Show cubes';
		return buttonText;
	};
	deleteItem = event => {
		this.props.deleteRecord(event);
	};
	clearAll = () => {
		swal({
			title: 'Are you sure?',
			text:
				'Once deleted, you will not be able to recover your pomotris records!',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then(willDelete => {
			if (willDelete) {
				this.props.clearAll();
				swal('Alright. Your pomotris records have been deleted!', {
					icon: 'success'
				});
			} else {
				swal('Your pomotris records are safe!');
			}
		});
	};
	render() {
		const totalTime = this.GetTotalTime(this.props.records);
		const { records, categories } = this.props;

		return (
			<div className="buttons-container">
				<button
					onClick={this.props.onButtonClick}
					value={this.renderButton(this.props)}
					className="button-main button-start"
				>
					{this.renderButton(this.props)}
				</button>
				<button
					onClick={this.props.onButtonClick}
					value="cancel"
					className="button-main button-cancel"
				>
					Cancel
				</button>
				<button className="button-main button-total-time">
					{totalTime ? 'Total' : '00:00'} {totalTime}
				</button>
				<button
					className="button-main button-toggle"
					onClick={this.props.toggleDisplayMode}
				>
					{this.toggleButtonText()}
				</button>
				<button className="button-main button-clear" onClick={this.clearAll}>
					Clear
				</button>
			</div>
		);
	}
}

ButtonsContainer.propTypes = {
	props: PropTypes.object,
	isNew: PropTypes.bool,
	isCompleted: PropTypes.bool,
	isTimerRunning: PropTypes.bool,
	isBreakRunning: PropTypes.bool,
	onButtonClick: PropTypes.func
};
export default ButtonsContainer;
