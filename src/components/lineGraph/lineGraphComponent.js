 import React, { PureComponent } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip
} from 'recharts'
import PropTypes from 'prop-types'

class LineChartComponent extends PureComponent {
  render () {
    console.log('this.props.data', this.props.data)
    return (
      <LineChart
        width={370}
        height={150}
        data={this.props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5
        }}
      >
        <XAxis dataKey='name' tick={false} />
        <YAxis tick={false} />
        <Tooltip />
        <Line labelLine={false} dot={false} dataKey='value' activeDot={{ r: 0 }} />
      </LineChart>
    )
  }
}

LineChartComponent.propTypes = {
  data: PropTypes.any
}
export default LineChartComponent
