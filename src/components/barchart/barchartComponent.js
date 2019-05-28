import React, { PureComponent } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class Barchart extends PureComponent {
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
    const barChartValue = this.props.BarChartValue
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
      let q1obj = {
        name: quaterArray[0],
        Non_Compliant: 0,
        Compliant: 0
      }
      let q2obj = {
        name: quaterArray[1],
        Non_Compliant: 0,
        Compliant: 0
      }
      let q3obj = {
        name: quaterArray[2],
        Non_Compliant: 0,
        Compliant: 0
      }
      let q4obj = {
        name: quaterArray[3],
        Non_Compliant: 0,
        Compliant: 0
      }
      barChartValue && barChartValue.children && barChartValue.children.length && barChartValue.children.map((bar, i) => {
        const dateObj = new Date(bar && bar.children && bar.children[i] && bar.children[i].key)
        const momentDate = moment(dateObj)
        const monthName = monthObject[momentDate.month()]
        if (monthName === 'Jan' || monthName === 'Feb' || monthName === 'Mar') {
          q1obj = {
            name: quaterArray[0],
            Non_Compliant: q1obj.Non_Compliant + (barChartValue && barChartValue.children && barChartValue.children[1] && barChartValue.children[1].children[i] && barChartValue.children[1].children[i].value && barChartValue.children[1].children[i].value.sum),
            Compliant: q1obj.Compliant + (barChartValue && barChartValue.children && barChartValue.children[0] && barChartValue.children[0].children[i] && barChartValue.children[0].children[i].value.sum)
          }
        } else if (monthName === 'Apr' || monthName === 'May' || monthName === 'Jun') {
          q2obj = {
            name: quaterArray[1],
            Non_Compliant: q2obj.Non_Compliant + (barChartValue && barChartValue.children && barChartValue.children[1] && barChartValue.children[1].children[i] && barChartValue.children[1].children[i].value && barChartValue.children[1].children[i].value.sum),
            Compliant: q2obj.Compliant + (barChartValue && barChartValue.children && barChartValue.children[0] && barChartValue.children[0].children[i] && barChartValue.children[0].children[i].value.sum)
          }
        } else if (monthName === 'Jul' || monthName === 'Aug' || monthName === 'Sep') {
          q3obj = {
            name: quaterArray[2],
            Non_Compliant: q3obj.Non_Compliant + (barChartValue && barChartValue.children && barChartValue.children[1] && barChartValue.children[1].children[i] && barChartValue.children[1].children[i].value && barChartValue.children[1].children[i].value.sum),
            Compliant: q3obj.Compliant + (barChartValue && barChartValue.children && barChartValue.children[0] && barChartValue.children[0].children[i] && barChartValue.children[0].children[i].value.sum)
          }
        } else if (monthName === 'Oct' || monthName === 'Nov' || monthName === 'Dec') {
          q4obj = {
            name: quaterArray[3],
            Non_Compliant: q4obj.Non_Compliant + (barChartValue && barChartValue.children && barChartValue.children[1] && barChartValue.children[1].children[i] && barChartValue.children[1].children[i].value && barChartValue.children[1].children[i].value.sum),
            Compliant: q4obj.Compliant + (barChartValue && barChartValue.children && barChartValue.children[0] && barChartValue.children[0].children[i] && barChartValue.children[0].children[i].value.sum)
          }
        }
      })
        data.push(q1obj)
        data.push(q2obj)
        data.push(q3obj)
        data.push(q4obj)
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
