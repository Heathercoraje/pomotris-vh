import React from 'react';
import * as d3 from 'd3';
import { withFauxDOM } from 'react-faux-dom';

class Visual extends React.Component {
  state = {
    categories: this.props.categories,
    records: this.props.records
  };

  componentDidMount() {
    const categories = this.props.categories;
    console.log('DidMount ', categories);

    const data = [
      { time: 25, category: 'D3', color: '#2180B7' },
      { time: 45, category: 'Pomotris', color: '#BB8FCE' },
      { time: 25, category: 'Extension', color: '#B0FC4F' }
    ];
    const visual = this.props.connectFauxDOM('div', 'box');
    d3
      .select(visual)
      .attr('class', 'visual-wrapper')
      .selectAll('div')
      .data(data) // bind our data
      .enter()
      .selectAll('div') // inner selection
      .data(d => d3.range(d.time / 5).map(() => d)) // rebind our data as an array length to num with repeating elements
      .enter()
      .append('div')
      .attr('class', 'block')
      .style('background-color', d => d.color);
  }

  componentDidUpdate() {
    const categories = this.props.categories;
    console.log('DidUpdate ', categories);
  }

  render() {
    return <div className="line-container">{this.props.box}</div>;
  }
}

export default withFauxDOM(Visual);
