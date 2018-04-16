import React from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../../js/helper';
import Visual from './Visual';
import Grid from './Grid';

const Recordboard = ({ records, categories }) => {
  const timeArray = records.map(record => Number(record.duration));
  const totalTime = records.length
    ? formatTime(timeArray.reduce((a, b) => a + b) * 60)
    : null;
  const RecordList = records.map(
    ({ category, task, duration, startTime, id }, i) => (
      <li className="recordItem" key={i} id={id}>
        {[category, task, duration, startTime].join(' | ')}
      </li>
    )
  );

  return (
    <div className="RecordWrapper">
      <h2>
        {totalTime ? 'Total' : ''} {totalTime}
      </h2>
      <div class="d3-wrapper">
        <Visual records={records} categories={categories} />
        <Grid />
      </div>
    </div>
  );
};

Recordboard.propTypes = {
  records: PropTypes.array
};

export default Recordboard;
