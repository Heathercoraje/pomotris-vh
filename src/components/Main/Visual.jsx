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
    // nothing is being rendered from props. I don't see categoris or records...
    // manipuate data failed :( so hard-coding it

    if (categories.length < 1) {
      console.log('categories is empty!');
      let data = [{ color: '#565656', times: 49 }];
      const grid = this.props.connectFauxDOM('div', 'box');
      d3
        .select(grid)
        .attr('class', 'visual-wrapper')
        .selectAll('div')
        .data(data) // bind our data
        .enter()
        .selectAll('div') // inner selection
        .data(d => d3.range(d.times).map(() => d)) // rebind our data as an array length to num with repeating elements
        .enter()
        .append('div')
        .attr('class', 'block')
        .style('background-color', d => d.color);
    } else {
      console.log('categories has some data!');
      // even when this console.log above appears and there is data, soon after there is a condole again from Dashboard that sends the data, but it is empty and it seems like things are not being pulled out of local storage

      // const data = [
      //   { duration: 45, category: 'yoga', color: '#84dce9' },
      //   { duration: 60, category: 'code', color: '#eca7e9' },
      //   { duration: 65, category: 'joy', color: '#aab8ed' },
      //   { duration: 60, category: 'code', color: '#eca7e9' },
      //   { duration: 65, category: 'joy', color: '#aab8ed' },
      //   { duration: 45, category: 'code', color: '#ee759f' },
      //   { duration: 45, category: 'yoga', color: '#84dce9' }
      // ];
      const visual = this.props.connectFauxDOM('div', 'box');
      d3
        .select(visual)
        .attr('class', 'visual-wrapper')
        .selectAll('div')
        .data(categories) // bind our data
        .enter()
        .append('div')

        // .selectAll('div') // inner selection
        .text('HELLO!')
        // .data(d => d3.range(d.duration / 5).map(() => d)) // rebind our data as an array length to num with repeating elements
        // .enter()
        // .append('div')
        .attr('class', 'block')
        .style('background-color', 'orange');
      console.log('finish loading D3');
    }
  }
  render() {
    return <div className="line-container">{this.props.box}</div>;
  }
}

export default withFauxDOM(Visual);
