import React from 'react';
import PropTypes from 'prop-types';
import { VictoryPie, VictoryContainer, VictoryLabel } from 'victory';

import Card from './Card';

const Chart = ({ data }) => {
  return (
    <VictoryPie
      colorScale={['#82efa6', '#191c27']}
      padding={{ top: 30, bottom: 0, left: 16, right: 16 }}
      height={60}
      width={100}
      data={data}
      startAngle={90}
      endAngle={-90}
      innerRadius={25}
      padAngle={3}
      containerComponent={<VictoryContainer width={100} height={50} />}
      labelComponent={<VictoryLabel style={{ fill: '#191c27', fontSize: 5 }} />}
    />
  );
};

const GraphCard = props => {
  return (
    <Card cols={props.cols} title={props.title} onClick={props.onClick}>
      <div className="graph-card">
        <div className="graph">
          <Chart data={props.data} />
        </div>
        <p className="number">{props.text}</p>
      </div>
    </Card>
  );
};

GraphCard.propTypes = {
  cols: PropTypes.number,
  data: PropTypes.shape({
    title: PropTypes.string
  }),
  onClick: PropTypes.func
};

export default GraphCard;
