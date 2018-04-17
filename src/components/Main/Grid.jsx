import React from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

class Grid extends React.Component {
  renderD3 = () => {
    const gridData = [300];

    const gridEl = ReactFauxDOM.createElement('div');

    d3
      .select(gridEl)
      .attr('class', 'grid-wrapper')
      .selectAll('div')
      .data(gridData)
      .enter()
      .selectAll('div')
      .data(d => d3.range(d / 5).map(() => d))
      .enter()
      .append('div')
      .style('background-color', '#eee')
      .attr('class', 'block');

    return gridEl.toReact();
  };

  render() {
    return (
      <div>
        <div>{this.renderD3()}</div>
      </div>
    );
  }
}

export default Grid;
