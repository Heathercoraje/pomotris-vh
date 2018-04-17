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
	deleteItem = event => {
		this.props.deleteRecord(event);
	};

	render() {
		const totalTime = this.GetTotalTime(this.props.records);
		const { records, categories } = this.props;
		const RecordList = records.map(({ category, task, duration, id }, i) => (
			<tr className="record-item" key={i} id={id}>
				<td>
					<span className="recordItem">{category}</span>
				</td>
				<td>
					<span>{task}</span>
				</td>
				<td className="time-trashIcon-container">
					<span>{duration}</span>
					<button
						type="button"
						className="trashIcon"
						id={id}
						onClick={this.deleteItem}
					>
						<i className="far fa-trash-alt" />
					</button>
				</td>
			</tr>
		));
		let content;
		if (this.state.cubeMode) {
			content = <Visual records={records} categories={categories} />;
		} else {
			content = (
				<div className="list-container">
					<table className="table" align="center">
						<thead>
							<tr>
								<th className="tableHead">Category</th>
								<th className="tableHead">Task</th>
								<th className="tableHead">Time</th>
							</tr>
						</thead>
						<tbody>{RecordList}</tbody>
					</table>
				</div>
			);
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
