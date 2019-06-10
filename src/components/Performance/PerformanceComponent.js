import React from 'react'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import styles from './PerfomanceComponent.scss'

class PerformanceComponent extends React.Component {
    renderCurrentPerformanceModelData = () => {
    // you will access to this.props.performanceModel here and you can
    // place the logic for rendering current performance model data here
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
                  <p>Service</p>
                </th>
                <th className='table-th'>
                  <p>KPI</p>
                </th>
                <th className='table-th'>
                  <p>As of Date</p>
                </th>
                <th className='table-th'>
                  <p>Current</p>
                </th>
                <th className='table-th'>
                  <p>KPI</p>
                </th>
                <th className='table-th'>
                  <p>Target</p>
                </th>
                <th className='table-th'>
                  <p>Perfomance</p>
                </th>
              </tr>
            </thead>
            <tbody className='table-body'>
              <tr>
                <td>
                  Process
                </td>
                <td>
                  Common
                </td>
                <td>
                  Reporting
                </td>
                <td>
                  Reporting Effectiveness
                </td>
                <td>
                  87%
                </td>
                <td>
                  87%
                </td>
                <td>
                  99%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.renderCurrentPerformanceModelData()}
      </div>
    )
  }
}

PerformanceComponent.propTypes = {
  filter: PropTypes.any
}
export default PerformanceComponent
