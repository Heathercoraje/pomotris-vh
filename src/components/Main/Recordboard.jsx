import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import * as d3 from 'd3';
// import ReactFauxDOM from 'react-faux-dom';
import { formatTime } from '../../js/helper';
import Visual from './Visual';

class Recordboard extends React.Component {
	state = {
		cubeMode: true
	};

	GetTotalTime = records => {
		const timeArray = records.map(record => Number(record.duration));
		const totalTime = records.length
			? formatTime(timeArray.reduce((a, b) => a + b) * 60)
			: null;
		return totalTime;
	};
	toggleDisplayMode = event => {
		const temp = this.state.cubeMode;
		this.setState({
			cubeMode: !temp
		});
	};

	toggleButtonText = () => {
		const isCubeMode = this.state.cubeMode;
		const buttonText = isCubeMode ? 'Show list' : 'Show cubes';
		return buttonText;
	};

	render() {
		const totalTime = this.GetTotalTime(this.props.records);
		const { records, categories } = this.props;
		const RecordList = records.map(
			({ category, task, duration, startTime, id }, i) => (
				<li className="recordItem" key={i} id={id}>
					{[category, task, duration, startTime].join(' | ')}
				</li>
			)
		);
		let content;
		if (this.state.cubeMode) {
			content = <Visual records={records} categories={categories} />;
		} else {
			content = RecordList;
		}
		return (
			<div className="RecordWrapper">
				<div className="recordHelper">
					<button
						className="toggleButton helerItem "
						onClick={this.toggleDisplayMode}
					>
						{this.toggleButtonText()}
					</button>
					<span className="totalTimeContainer helerItem ">
						{totalTime ? 'Total' : ''} {totalTime}
					</span>
				</div>
				{content}
			</div>
		);
	}
}

Recordboard.propTypes = {
	records: PropTypes.array
};

export default Recordboard;

// D3 --------------------
