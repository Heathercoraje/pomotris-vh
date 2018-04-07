import React from 'react';
import { withFauxDOM } from 'react-faux-dom';
import * as d3 from 'd3';

class Visual extends React.Component {
  // static propTypes = {...}

  componentDidMount() {
    const visual = this.props.connectFauxDOM('div', 'chart');

    // D3 Code to create the shape
    // using faux as container
    var shape = d3
      .select(visual)
      .append('svg')
      .attr('width', 400)
      .attr('height', 400);
    shape
      .append('rect')
      .attr('width', '80')
      .attr('height', '80')
      .attr('x', '160')
      .attr('w', '160')
      .text('H')
      .style('fill', 'orange');
  }

  render() {
    return <div className="line-container">{this.props.chart}</div>;
  }
}

export default withFauxDOM(Visual);
