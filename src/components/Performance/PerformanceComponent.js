import React from 'react'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import styles from './PerfomanceComponent.scss'
import { Badge } from 'antd'
import LineGraph from '../lineGraph/lineGraphComponent'

class PerformanceComponent extends React.Component {
    renderCurrentPerformanceModelData = (dataToShow) => {
      let headingNameArr = dataToShow && dataToShow.filter((value) => {
        return value.Dates.length
      })
      let isSummarizedObj = headingNameArr && headingNameArr[0] && headingNameArr[0].Dates && headingNameArr[0].Dates[headingNameArr[0].Dates.length - 1]
      let headings = isSummarizedObj && isSummarizedObj.values
      let headingName = headings && Object.keys(headings)
      let linechartData = []
      dataToShow && dataToShow.map((val) => {
        let arr = []
        val.Dates.map((values) => {
          let obj = {
            name: '',
            value: values && values.values && values.values.Status && values.values.Status.value
          }
          if (values && values.values && values.values.Status && values.values.Status.value) {
            arr.push(obj)
          }
        })
        linechartData.push(arr)
      })
      console.log('linechartData', linechartData)
    return (
      <div className={styles.MainContainer}>
        <div className={styles.tableContainer}>
          <table
            className={`m-portlet table table-striped- table-hover table-checkable dataTable no-footer ${styles.tableContainerChild}`}
            id='m_table_1'
            aria-describedby='m_table_1_info'
            role='grid'
          >
            <thead className='table-head'>
              <tr role='row' className='table-head-row'>
                <th className={styles.tableHeading}>
                  <p>Service</p>
                </th>
                <th className={styles.tableHeading}>
                  <p>KPI</p>
                </th>
                <th className={styles.tableHeading}>
                  <p>As of Date</p>
                </th>
                {
                  headingName && headingName.map((val, i) => {
                    return (
                      <th className={styles.tableHeading} key={i}>
                        <p>{val}</p>
                      </th>
                    )
                  })
                }
                <th className={styles.tableHeading}>
                  <p>Performance</p>
                </th>
              </tr>
            </thead>
            <tbody className='table-body'>
              {
                dataToShow.map((value, keys) => {
                  let checking = value && value.Dates && value.Dates[value.Dates.length - 1] && value.Dates[value.Dates.length - 1].values && Object.entries(value.Dates[value.Dates.length - 1].values)
                  if (checking && checking[0] && checking[0][1] && checking[0][1].value) {
                    return (
                      <tr key={keys}>
                        <td>
                          {value.Service}
                        </td>
                        <td>
                          {value.Kpi}
                        </td>
                        <td>
                          {
                            value.Dates.length ? value.Dates[value.Dates.length - 1].date_time : ''
                          }
                        </td>
                        {
                          value.Dates.length ? checking.map((val, j) => {
                            let bol = checking[0][1].value < checking[2][1].value
                            return (
                              <td key={j}>
                                {
                                  j === 1 ? bol ? <Badge
                                    count={val[1].formatted_value}
                                  /> : val[1].formatted_value
                                  : val[1].formatted_value
                                }
                              </td>
                            )
                          })
                          : headingName && headingName.map((val, i) => {
                            return (
                              <td key={i}>
                                <p />
                              </td>
                            )
                          })
                        }
                        <td>
                          <LineGraph data={linechartData[keys]} />
                        </td>
                      </tr>
                    )
                  }
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  render () {
    console.log('performance', this.props.performanceModel)
    let scoringData = this.props.performanceModel
    let dataToShow = []
    scoringData && scoringData.map((value, i) => {
      value && value.parts && value.parts[0] && value.parts[0].value && value.parts[0].value.items && value.parts[0].value.items && value.parts[0].value.items.map((valueOne) => {
        let mappingForTotal = valueOne && valueOne.parts && valueOne.parts[0] && valueOne.parts[0] && valueOne.parts[0].value && valueOne.parts[0].value.items
        mappingForTotal && mappingForTotal.map((valueTwo) => {
          let mappingForKpa = valueTwo && valueTwo.parts && valueTwo.parts[0] && valueTwo.parts[0] && valueTwo.parts[0].value && valueTwo.parts[0].value.items
          mappingForKpa && mappingForKpa.map((valueThree) => {
            let mappingForDomain = valueThree && valueThree.parts && valueThree.parts[0] && valueThree.parts[0] && valueThree.parts[0].value && valueThree.parts[0].value.items
            mappingForDomain && mappingForDomain.map((valueFour) => {
              let nestedService = valueFour && valueFour.parts && valueFour.parts[0] && valueFour.parts[0].value
              let objFour = {}
              let mappingForCluster = valueFour && valueFour.parts && valueFour.parts[1] && valueFour.parts[1] && valueFour.parts[1].value && valueFour.parts[1].value.items
              mappingForCluster && mappingForCluster.map((valueFive) => {
                let nestedKpi = valueFive && valueFive.parts && valueFive.parts[0] && valueFive.parts[0].value
                let objFive = {}
                let Dates = valueFive && valueFive.parts && valueFive.parts[1] && valueFive.parts[1].value ? valueFive.parts[1].value : []
                objFive = {
                  Service: nestedService,
                  Kpi: nestedKpi,
                  Dates: Dates
                }
                dataToShow.push(objFive)
              })
              objFour = {
                Service: nestedService,
                Kpi: '',
                Dates: []
            }
              dataToShow.push(objFour)
            })
          })
        })
      })
    })
    return (
      <div>
        {this.renderCurrentPerformanceModelData(dataToShow)}
      </div>
    )
  }
}

PerformanceComponent.propTypes = {
  performanceModel: PropTypes.any
}
export default PerformanceComponent
