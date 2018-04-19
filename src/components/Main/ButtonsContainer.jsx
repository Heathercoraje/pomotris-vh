import React, { Component } from 'react';
import styled from 'styled-components';
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
		this.props.clearAll();
	};
	render() {
		const totalTime = this.GetTotalTime(this.props.records);
		const { records, categories } = this.props;

		return (
			<div className="buttons-container">
				<button
					onClick={this.props.onButtonClick}
					value={this.renderButton(this.props)}
				>
					{this.renderButton(this.props)}
				</button>
				<button onClick={this.props.onButtonClick} value="cancel">
					Cancel
				</button>
				<button
					className="toggleButton helerItem "
					onClick={this.props.toggleDisplayMode}
				>
					{this.toggleButtonText()}
				</button>
				<span className="totalTimeContainer helerItem ">
					{totalTime ? 'Total' : '00:00'} {totalTime}
				</span>
				<button className="clearButton helerItem " onClick={this.clearAll}>
					Clear
				</button>
			</div>
		);
	}
}

// ButtonsContainer.propTypes = {
// 	props: PropTypes.object,
// 	isNew: PropTypes.bool,
// 	isCompleted: PropTypes.bool,
// 	isTimerRunning: PropTypes.bool,
// 	isBreakRunning: PropTypes.bool,
// 	onButtonClick: PropTypes.func
// };
export default ButtonsContainer;
