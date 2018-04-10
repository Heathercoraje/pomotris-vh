import React from 'react';
import * as d3 from 'd3';
import { withFauxDOM } from 'react-faux-dom';

class Visual extends React.Component {
	componentDidUpdate() {
    // at initial state, both don't have anything (if you have your localStoarge clear);
    // once you submit category form && finish one timer, this will appear
    let categories = this.props.categories;
    let records = this.props.records;
    console.log(categories);
    console.log(records);
    // manipuate data failed :( so hard-coding it
		const data = [
      { duration: 45, category: 'yoga',color: '#84dce9'},
      { duration: 60, category: 'code', color: '#eca7e9'},
      { duration: 65, category: 'joy',color: '#aab8ed' },
			{ duration: 60, category: 'code', color: '#eca7e9'},
      { duration: 65, category: 'joy',color: '#aab8ed' },
      { duration: 45, category: 'code', color: '#ee759f'},
      { duration: 45, category: 'yoga',color: '#84dce9'},
		];
		const visual = this.props.connectFauxDOM('div', 'box');
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
	render() {
		return <div className="line-container">{this.props.box}</div>;
	}
}

export default withFauxDOM(Visual);
