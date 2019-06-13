 import React, { PureComponent } from 'react'
import {
  LineChart, Line
} from 'recharts'
import PropTypes from 'prop-types'

class LineChartComponent extends PureComponent {
  render () {
    console.log('this.props.data', this.props.data)
    return (
      <LineChart
        width={370}
        height={60}
        data={this.props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5
        }}
      >
        <Line type='monotone' dot={false} dataKey='value' />
      </LineChart>
    )
  }
}

LineChartComponent.propTypes = {
  data: PropTypes.any
}
export default LineChartComponent
