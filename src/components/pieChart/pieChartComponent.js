import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  PieChart, Pie, Cell
} from 'recharts'

// const RADIAN = Math.PI / 180
// const renderCustomizedLabel = () => {
//    const radius = 10 + (20 - 10) * 0.5
//   const x = 200 + radius * Math.cos(-0 * RADIAN)
//   const y = 200 + radius * Math.sin(-0 * RADIAN)

//   return (
//     <text x={x} y={y} fill='white' textAnchor={x > 10 ? 'start' : 'end'} dominantBaseline='central'>
//       {`${(50 * 100).toFixed(0)}%`}
//     </text>
//   )
// }

export default class Piechart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/'
  render () {
    const data = [
      { name: 'Group 1', value: this.props.valueOne },
      { name: 'Group 2', value: this.props.valueTwo }
    ]
    const COLORS = ['#0abb87', '#fd397a']
    return (
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
        //   label={renderCustomizedLabel}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    )
  }
}
Piechart.propTypes = {
  valueOne: PropTypes.any,
  valueTwo: PropTypes.any
}
