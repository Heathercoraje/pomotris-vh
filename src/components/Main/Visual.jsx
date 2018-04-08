import React from 'react';
import * as d3 from 'd3';
import { withFauxDOM } from 'react-faux-dom';

class Visual extends React.Component {
  // static propTypes = {...}

  componentDidMount() {
    // createBox() {
    const visual = this.props.connectFauxDOM('div', 'chart');
    // D3 Code to create the shape
    // using faux as container
    console.log(this.props.categories);
    console.log(this.props.records);

    d3
      .select('visual')
      .selectAll('div')
      .data(categories) // bind our data
      .enter()
      .append('div')
      // .selectAll('div') // inner selection
      // .data(d => d3.range(d.time / 5).map(() => d))
      // .enter()
      .text(d => d.category)
      .attr('class', 'block')
      .style('background-color', d => d.color);
  }
  componentDidUpdate() {
    // this is the place where you get data being fetched from localStorage or from parent.
    // componentDidMount only does initial render
    const records = this.props.records;
    const categories = this.props.categories;

    console.log('after update');
    console.log('Records : ', records);
    console.log('Categories :', categories);
    // return visual.toReact();
  }
  // }
  render() {
    // return <div className="line-container">{this.createBox()}</div>;

    return <div className="line-container">{this.props.chart}</div>;
  }
}

export default withFauxDOM(Visual);
