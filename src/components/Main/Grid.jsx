import React from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

class Grid extends React.Component {
  renderD3 = () => {
    const gridData = [320];

    const greyEl = ReactFauxDOM.createElement('div');

    d3
      .select(greyEl)
      .attr('class', 'grid-wrapper')
      .selectAll('div')
      .data(gridData)
      .enter()
      .selectAll('div')
      .data(d => d3.range(d / 5).map(() => d))
      .enter()
      .append('div')
      .attr('class', 'block')
      .style('background-color', '#eee');

    return greyEl.toReact();
  };

  render() {
    return (
      <div>
        <div className="line-container">{this.renderD3()}</div>
      </div>
    );
  }
}

export default Grid;
