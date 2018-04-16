import React from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

class Visual extends React.Component {
  renderD3 = data => {
    const el = ReactFauxDOM.createElement('div');

    var tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip');

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
      .style('background-color', d => d.color)
      .on('mouseover', function(d) {
        if (!d.category) {
          tooltip.text('No Category');
          return tooltip.style('visibility', 'visible');
        } else {
          tooltip.text(d.category);
          return tooltip.style('visibility', 'visible');
        }
      })
      .on('mousemove', function() {
        return tooltip
          .style('top', d3.event.pageY - 15 + 'px')
          .style('left', d3.event.pageX + 15 + 'px');
      })
      .on('mouseout', function() {
        return tooltip.style('visibility', 'hidden');
      });

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
