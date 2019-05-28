import React, { PureComponent } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class Barchart extends PureComponent {
  // static' jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/'

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
    let yearlyData = []
    let arrayOfYear = []
    let uniqueArray = []
    let quaterArray = ['Quater One', 'Quater Two', 'Quater Three', 'Quater Four']
    let quaterDataArray = []
    const barChartValue = this.props.BarChartValue
    console.log('barChartValue', barChartValue)
    if (this.props.duration === 'Daily') {
      barChartValue && barChartValue.children && barChartValue.children.length && barChartValue.children.map((bar, i) => {
        const dateObj = new Date(bar && bar.children && bar.children[i] && bar.children[i].key)
        const momentDate = moment(dateObj)
        const monthName = monthObject[momentDate.month()]
        const dayAndMonth = momentDate.date() + ' ' + monthName
        const dataObj = {
          name: dayAndMonth,
          Compliant: barChartValue && barChartValue.children && barChartValue.children[0] && barChartValue.children[0].children[i] && barChartValue.children[0].children[i].value.sum,
          Non_Compliant: barChartValue && barChartValue.children && barChartValue.children[1] && barChartValue.children[1].children[i] && barChartValue.children[1].children[i].value && barChartValue.children[1].children[i].value.sum
        }
        if (dataObj.Compliant !== undefined) {
          data.push(dataObj)
        }
      })
    } else if (this.props.duration === 'Quarterly') {
      let totalCompliantData = 0
      let totalNonData = 0
      barChartValue && barChartValue.children && barChartValue.children.length && barChartValue.children.map((bar, i) => {
        const dateObj = new Date(bar && bar.children && bar.children[i] && bar.children[i].key)
        const momentDate = moment(dateObj)
        const monthName = monthObject[momentDate.month()]
        const dayAndMonth = momentDate.date() + ' ' + monthName
        const dataObj = {
          name: dayAndMonth,
          Compliant: barChartValue && barChartValue.children && barChartValue.children[0] && barChartValue.children[0].children[i] && barChartValue.children[0].children[i].value.sum,
          Non_Compliant: barChartValue && barChartValue.children && barChartValue.children[1] && barChartValue.children[1].children[i] && barChartValue.children[1].children[i].value && barChartValue.children[1].children[i].value.sum
        }
        if (barChartValue && barChartValue.children && barChartValue.children[0] && barChartValue.children[0].children[i] && barChartValue.children[0].children[i].value.sum !== undefined) {
          totalCompliantData = totalCompliantData + (barChartValue && barChartValue.children && barChartValue.children[0] && barChartValue.children[0].children[i] && barChartValue.children[0].children[i].value.sum)
          totalNonData = totalNonData + (barChartValue && barChartValue.children && barChartValue.children[1] && barChartValue.children[1].children[i] && barChartValue.children[1].children[i].value && barChartValue.children[1].children[i].value.sum)
        }
        quaterDataArray.push(dataObj)
      })
      let quaterCompiantData = totalCompliantData / 4
      let quaterNonData = totalNonData / 4
      for (let i = 0; i < quaterArray.length; i++) {
        let obj = {
          name: quaterArray[i],
          Compliant: quaterCompiantData,
          Non_Compliant: quaterNonData
        }
        data.push(obj)
      }
    } else if (this.props.duration === 'Yearly') {
      barChartValue && barChartValue.children && barChartValue.children.length && barChartValue.children.map((bar, i) => {
        const dateObj = new Date(bar && bar.children && bar.children[i] && bar.children[i].key)
        const momentDate = moment(dateObj)
        const yearly = momentDate.year()
        arrayOfYear.push(yearly)
        const dataObj = {
          name: yearly,
          Compliant: barChartValue && barChartValue.children && barChartValue.children[0] && barChartValue.children[0].children[i] && barChartValue.children[0].children[i].value.sum,
          Non_Compliant: barChartValue && barChartValue.children && barChartValue.children[1] && barChartValue.children[1].children[i] && barChartValue.children[1].children[i].value && barChartValue.children[1].children[i].value.sum
        }
        yearlyData.push(dataObj)
      })
      uniqueArray = [...new Set(arrayOfYear)]
      for (let i = 0; i < uniqueArray.length; i++) {
        if (!isNaN(uniqueArray[i])) {
          let objectofYear = {
            Non_Compliant: 0,
            Compliant: 0
          }
          for (let j = 0; j < yearlyData.length; j++) {
            if (uniqueArray[i] === yearlyData[j].name) {
              objectofYear = {
                name: yearlyData[j].name,
                Compliant: objectofYear.Compliant + yearlyData[j].Compliant,
                Non_Compliant: objectofYear.Non_Compliant + yearlyData[j].Non_Compliant
              }
            }
          }
          data.push(objectofYear)
        }
      }
    } else {
      barChartValue && barChartValue.children && barChartValue.children.length && barChartValue.children.map((bar, i) => {
        const dateObj = new Date(bar && bar.children && bar.children[i] && bar.children[i].key)
        const momentDate = moment(dateObj)
        const monthName = monthObject[momentDate.month()]
        const dataObj = {
          name: monthName,
          Compliant: barChartValue && barChartValue.children && barChartValue.children[0] && barChartValue.children[0].children[i] && barChartValue.children[0].children[i].value.sum,
          Non_Compliant: barChartValue && barChartValue.children && barChartValue.children[1] && barChartValue.children[1].children[i] && barChartValue.children[1].children[i].value && barChartValue.children[1].children[i].value.sum
        }
        if (dataObj.Compliant !== undefined) {
          data.push(dataObj)
        }
      })
    }
    console.log('data', data)
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
  BarChartValue: PropTypes.any,
  duration: PropTypes.any
}
