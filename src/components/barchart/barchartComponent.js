import React, { PureComponent } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class Barchart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/'

  render () {
    const monthObject = {
      1: 'Jan',
      2: 'Feb',
      3: 'Mar',
      4: 'Apr',
      5: 'May',
      6: 'Jun',
      7: 'Jul',
      8: 'Aug',
      9: 'Sep',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec'
    }

    const data = []
    const barChartValue = this.props.BarChartValue

    barChartValue && barChartValue.children && barChartValue.children.length && barChartValue.children.map((bar, i) => {
        const dateObj = new Date(bar.children[i].key)
        const momentDate = moment(dateObj)
        const monthName = monthObject[momentDate.month()]

        const dataObj = {
          name: monthName, Compliant: barChartValue.children[0].children[i].value.sum, Non_Compliant: barChartValue.children[1].children[i].value.sum
        }

        data.push(dataObj)
    })

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
