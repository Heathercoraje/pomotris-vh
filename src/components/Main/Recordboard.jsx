import React from 'react';
import PropTypes from 'prop-types';
// import * as d3 from 'd3';
// import ReactFauxDOM from 'react-faux-dom';
import { formatTime } from '../../js/helper';
import Visual from './Visual';

const Recordboard = ({ records }) => {
  const timeArray = records.map(record => Number(record.duration));
  const totalTime = records.length
    ? formatTime(timeArray.reduce((a, b) => a + b) * 60)
    : null;
  const RecordList = records.map(
    ({ category, title, duration, startTime, id }, i) => (
      <li className="recordItem" key={i} id={id}>
        {[category, title, duration, startTime].join(' | ')}
      </li>
    )
  );

  return (
    <div className="RecordWrapper">
      <h2>
        {totalTime ? 'Total' : ''} {totalTime}
      </h2>
      <Visual />
      <ul className="recordList">{RecordList}</ul>
    </div>
  );
};

Recordboard.propTypes = {
  records: PropTypes.array
};

export default Recordboard;

// D3 --------------------
