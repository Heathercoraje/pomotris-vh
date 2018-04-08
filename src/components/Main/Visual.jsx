import React from 'react';
import * as d3 from 'd3';
import { withFauxDOM } from 'react-faux-dom';

class Visual extends React.Component {
	// static propTypes = {...}

	componentDidMount() {
		const visual = this.props.connectFauxDOM('div', 'chart');
		// D3 Code to create the shape
		// using faux as container
		const shape = d3
			.select(visual)
			.append('svg')
			.attr('width', 400)
			.attr('height', 400)
			.attr('stroke-width', 2)
			.attr('stroke', 'grey');
		shape
			.append('rect')
			.attr('width', '50')
			.attr('height', '50')
			.attr('x', '100')
			.attr('y', '60')
			.text('H')
			.style('fill', 'orange');
		shape
			.append('rect')
			.attr('width', '50')
			.attr('height', '50')
			.attr('x', '200')
			.attr('y', '60')
			.text('H')
			.style('fill', 'pink');
		shape
			.append('rect')
			.attr('width', '50')
			.attr('height', '50')
			.attr('x', '300')
			.attr('y', '60')
			.text('H')
			.style('fill', 'green');
	}
  componentDidUpdate() {
    // this is the place where you get data being fetched from localStorage or from parent.
    // componentDidMount only does initial render
    const records = this.props.records;
    const categories = this.props.categories;
    console.log('after update');
    console.log('Records : ', records);
    console.log('Categories :', categories);
  }
  
	render() {
		return <div className="line-container">{this.props.chart}</div>;
	}
}

export default withFauxDOM(Visual);
