import React from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';
import { generateRandomColor } from '../../js/helper';

class Visual extends React.Component {
  // addRandomColor = records => {
  //   return generateRandomColor(records);
  // };

  renderD3 = data => {
    console.log('inside renderD3', data);

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

  // componentDidMount() {
  //   this.renderD3([{ duration: 30, color: '#e6e6e6' }], 'defaultBox');
  //   // here generating gray grids for background setting
  //   // these two different components will have to be position:absolute
  //   // to make them stacked on top of each others
  // }
  //
  // componentDidUpdate() {
  //   this.renderD3(this.props.records, 'box');
  // }
}

export default Visual;
