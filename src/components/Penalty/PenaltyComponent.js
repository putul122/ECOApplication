import React from 'react'
import PropTypes from 'prop-types'
import styles from './PenaltyComponent.scss'

import 'antd/dist/antd.css'

class PenaltyComponent extends React.Component {
  constructor () {
    super()
    this.state = {
      table: [
        {
          heading: 'March 2019'
        },
        {
          heading: 'April 2019'
        },
        {
          heading: 'May 2019'
        }
      ]
    }
  }

  renderPenaltySummaryModelData = (dataToShowKPA) => {
    // you will access to this.props.penaltySummaryModel here and you can
    // place the logic for rendering penalty summary data here
    console.log('penaltySummaryModel', this.props.penaltySummaryModel)
    let monthToShow = dataToShowKPA.filter((val) => {
      return val.Dates.length
    })
    return (
      <div className={styles.MainContainer}>
        <div className={styles.tableContainer}>
          <table
            className='m-portlet table table-striped- table-hover table-checkable dataTable no-footer'
            id='m_table_1'
            aria-describedby='m_table_1_info'
            role='grid'
          >
            <thead className='table-head'>
              <tr role='row' className='table-head-row'>
                <th className='table-th'>
                  <p>KPA</p>
                </th>
                {
                  monthToShow && monthToShow[0] && monthToShow[0].Dates && monthToShow[0].Dates.map((val, i) => {
                   return (
                     <th className='table-th' key={i}>
                       <p>{val.date_time}</p>
                     </th>
                   )
                 })
                }
              </tr>
            </thead>
            <tbody className='table-body'>
              {
                dataToShowKPA.map((value, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        {value.KPA}
                      </td>
                      {
                        value.Dates.length ? value.Dates.map((v, j) => {
                          return (
                            <td key={j}>
                              {v && v.values && v.values.Value.formatted_value ? v.values.Value.formatted_value : 0}
                            </td>
                          )
                        })
                        : monthToShow && monthToShow[0] && monthToShow[0].Dates && monthToShow[0].Dates.map((val, j) => {
                            return (
                              <td key={j}>
                                0
                              </td>
                            )
                          })
                        }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderPenaltyModelData = (dataToShow) => {
    // you will access to and this.props.penaltyModel here and you can
    // place the logic for rendering penalty data here
    let monthToShow = dataToShow.filter((val) => {
      return val.Dates.length
    })
    return (
      <div className={styles.MainContainer}>
        <div className={styles.tableContainer}>
          <table
            className='m-portlet table table-striped- table-hover table-checkable dataTable no-footer'
            id='m_table_1'
            aria-describedby='m_table_1_info'
            role='grid'
          >
            <thead className='table-head'>
              <tr role='row' className='table-head-row'>
                <th className='table-th'>
                  <p>Agreement</p>
                </th>
                <th className='table-th'>
                  <p>KPA</p>
                </th>
                <th className='table-th'>
                  <p>Domain</p>
                </th>
                <th className='table-th'>
                  <p>Cluster</p>
                </th>
                <th className='table-th'>
                  <p>KPI</p>
                </th>
                {
                  monthToShow && monthToShow[0] && monthToShow[0].Dates && monthToShow[0].Dates.map((val, i) => {
                   return (
                     <th className='table-th' key={i}>
                       <p>{val.date_time}</p>
                     </th>
                   )
                 })
                }
              </tr>
            </thead>
            <tbody className='table-body'>
              {
                dataToShow.map((value, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        {value.total}
                      </td>
                      <td>
                        {value.KPA}
                      </td>
                      <td>
                        {value.Domain}
                      </td>
                      <td>
                        {value.Cluster}
                      </td>
                      <td>
                        {value.KPI}
                      </td>
                      {
                        value.Dates.length ? value.Dates.map((v, j) => {
                          return (
                            <td key={j}>
                              {v && v.values && v.values.Penalty && v.values.Penalty.value ? v.values.Penalty.value : 0}
                            </td>
                          )
                        })
                        : monthToShow && monthToShow[0] && monthToShow[0].Dates && monthToShow[0].Dates.map((val, j) => {
                            return (
                              <td key={j}>
                                0
                              </td>
                            )
                          })
                        }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  render () {
    // penaltyModel
    let scoringData = this.props.penaltyModel
    let dataToShow = []
    scoringData && scoringData.map((value, i) => {
      value && value.parts && value.parts[0] && value.parts[0].value && value.parts[0].value.items && value.parts[0].value.items && value.parts[0].value.items.map((valueOne) => {
        let nestedTotal = valueOne && valueOne.parts && valueOne.parts[0] && valueOne.parts[0].value
        let mappingForTotal = valueOne && valueOne.parts && valueOne.parts[1] && valueOne.parts[1] && valueOne.parts[1].value && valueOne.parts[1].value.items
        let objOne = {}
        mappingForTotal && mappingForTotal.map((valueTwo) => {
          let nestedKpa = valueTwo && valueTwo.parts && valueTwo.parts[0] && valueTwo.parts[0].value
          let mappingForKpa = valueTwo && valueTwo.parts && valueTwo.parts[1] && valueTwo.parts[1] && valueTwo.parts[1].value && valueTwo.parts[1].value.items
          let objTwo = {}
          mappingForKpa && mappingForKpa.map((valueThree) => {
            let nestedDomain = valueThree && valueThree.parts && valueThree.parts[0] && valueThree.parts[0].value
            let objThree = {}
            let mappingForDomain = valueThree && valueThree.parts && valueThree.parts[1] && valueThree.parts[1] && valueThree.parts[1].value && valueThree.parts[1].value.items
            mappingForDomain && mappingForDomain.map((valueFour) => {
              let nestedCluster = valueFour && valueFour.parts && valueFour.parts[0] && valueFour.parts[0].value
              let objFour = {}
              let mappingForCluster = valueFour && valueFour.parts && valueFour.parts[1] && valueFour.parts[1] && valueFour.parts[1].value && valueFour.parts[1].value.items
              mappingForCluster && mappingForCluster.map((valueFive) => {
                let nestedKpi = valueFive && valueFive.parts && valueFive.parts[0] && valueFive.parts[0].value
                let objFive = {}
                let Dates = valueFive && valueFive.parts && valueFive.parts[1] && valueFive.parts[1] && valueFive.parts[1].value
                objFive = {
                  total: nestedTotal,
                  KPA: nestedKpa,
                  Domain: nestedDomain,
                  Cluster: nestedCluster,
                  KPI: nestedKpi,
                  Dates: Dates
                }
                dataToShow.push(objFive)
              })
              objFour = {
                total: nestedTotal,
                KPA: nestedKpa,
                Domain: nestedDomain,
                Cluster: nestedCluster,
                KPI: '',
                Dates: []
              }
              dataToShow.push(objFour)
            })
            objThree = {
              total: nestedTotal,
              KPA: nestedKpa,
              Domain: nestedDomain,
              Cluster: '',
              KPI: '',
              Dates: []
            }
            dataToShow.push(objThree)
          })
          objTwo = {
            total: nestedTotal,
            KPA: nestedKpa,
            Domain: '',
            Cluster: '',
            KPI: '',
            Dates: []
          }
          dataToShow.push(objTwo)
        })
        objOne = {
          total: nestedTotal,
          KPA: '',
          Domain: '',
          Cluster: '',
          KPI: '',
          Dates: []
        }
        dataToShow.push(objOne)
      })
    })
    // penaltySummartModel
    let penaltyData = this.props.penaltySummaryModel
    let dataToShowKPA = []
    penaltyData && penaltyData.map((value, i) => {
      value && value.parts && value.parts[0] && value.parts[0].value && value.parts[0].value.items && value.parts[0].value.items && value.parts[0].value.items.map((valueOne) => {
        let nestedKPA = valueOne && valueOne.parts && valueOne.parts[0] && valueOne.parts[0].value
        let Dates = valueOne && valueOne.parts && valueOne.parts[1] && valueOne.parts[1] && valueOne.parts[1].value
        let objOne = {}
        objOne = {
          KPA: nestedKPA,
          Dates: Dates
        }
        dataToShowKPA.push(objOne)
      })
    })
    return (
      <div>
        {this.renderPenaltySummaryModelData(dataToShowKPA)}
        {this.renderPenaltyModelData(dataToShow)}
      </div>
    )
  }
}

PenaltyComponent.propTypes = {
  penaltyModel: PropTypes.any,
  penaltySummaryModel: PropTypes.any
}
export default PenaltyComponent
