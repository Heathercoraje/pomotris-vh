import React from 'react';
import * as d3 from 'd3';
import { withFauxDOM } from 'react-faux-dom';
import { generateRandomColor } from '../../js/helper';

class Visual extends React.Component {
	addRandomColor = (records) => {
		return generateRandomColor(records)
	}
	renderD3 = (records, selector) => {
		const data = this.addRandomColor(records);
		const visual = this.props.connectFauxDOM('div', selector);
		d3
			.select(visual)
			.attr('class', 'visual-wrapper')
			.selectAll('div')
			.data(data) // bind our data
			.enter()
			.selectAll('div') // inner selection
			.data(d => d3.range(d.duration / 5).map(() => d)) // rebind our data as an array length to num with repeating elements
			.enter()
			.append('div')
			.attr('class', 'block')
			.style('background-color', d => d.color);
	}

	componentDidMount() {
		this.renderD3([{duration: 300, color: '#e6e6e6'}], 'defaultBox')
    // here generating gray grids for background setting
    // these two different components will have to be position:absolute
    // to make them stacked on top of each others
	}

	componentDidUpdate() {
		console.log(this.props.records); // we get the most updated props.
		this.renderD3(this.props.records, 'box');
	}


	render() {
		return (
			<div>
				<div className="line-container">{this.props.defaultBox}</div>
				<div className="line-container">{this.props.box}</div>
			</div>
		);
	}
}

export default withFauxDOM(Visual);
