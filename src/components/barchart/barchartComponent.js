import React, { PureComponent } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'
import PropTypes from 'prop-types'

export default class Barchart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/'

  render () {
    const data = [
      {
        name: 'JAN', Compliant: this.props.BarChartValue.length ? this.props.BarChartValue[0][0].children[0].value.count : 0, Non_Compliant: this.props.BarChartValue.length ? this.props.BarChartValue[0][0].children[1].value.count : 0, amt: 2400
      },
      {
        name: 'FEB', Compliant: this.props.BarChartValue.length ? this.props.BarChartValue[1][0].children[0].value.count : 0, Non_Compliant: this.props.BarChartValue.length ? this.props.BarChartValue[1][0].children[1].value.count : 0, amt: 2210
      },
      {
        name: 'MAR', Compliant: this.props.BarChartValue.length ? this.props.BarChartValue[2][0].children[0].value.count : 0, Non_Compliant: this.props.BarChartValue.length ? this.props.BarChartValue[2][0].children[1].value.count : 0, amt: 2290
      }
    ]
    return (
      <BarChart
        width={850}
        height={250}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='Non_Compliant' fill='#8884d8' />
        <Bar dataKey='Compliant' fill='#f8e7b3' />
      </BarChart>
    )
  }
}

Barchart.propTypes = {
  BarChartValue: PropTypes.any
}
