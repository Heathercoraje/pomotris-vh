import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../../js/helper';
import Visual from './Visual';
import Grid from './Grid';

class Recordboard extends React.Component {
	deleteItem = event => {
		this.props.deleteRecord(event);
	};
	render() {
		const displayCube = this.props.displayCube;
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
		if (displayCube) {
			content = (
				<div className="d3-wrapper">
					<Visual records={records} categories={categories} />
					<Grid />
				</div>
			);
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
		return <div className="RecordWrapper">{content}</div>;
	}
}

Recordboard.propTypes = {
	records: PropTypes.array,
	categories: PropTypes.array,
	displayCube: PropTypes.bool,
	deleteRecord: PropTypes.func
};

export default Recordboard;
