import React from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

class Visual extends React.Component {
  renderD3 = data => {
    const el = ReactFauxDOM.createElement('div');

    d3
      .select(el)
      .attr('class', 'visual-wrapper')
      .selectAll('div')
      .data(data)
      .enter()
      .selectAll('div')
      .data(d => d3.range(d.duration / 5).map(() => d))
      .enter()
      .append('div')
      .attr('class', 'block')
      .style('background-color', d => d.color);

    return el.toReact();
  };

  render() {
    return (
      <div>
        <div className="line-container">
          {this.renderD3(this.props.records)}
        </div>
      </div>
    );
  }
}

export default Visual;
