import React from 'react'
import styles from './SlaDashboardComponent.scss'
import { Avatar } from 'antd'
import 'antd/dist/antd.css'
import './index.css'
import PropTypes from 'prop-types'
import PieChart from '../pieChart/pieChartComponent'
import Barchart from '../barchart/barchartComponent'

class SlaDashboardMainComponent extends React.Component {
  render () {
      return (
        <div className={styles.MainContainer}>
          <div className={styles.ContentContainer}>
            <div className={styles.leftContainer}>
              <div className={styles.chartContainer}>
                <div className={styles.pieContainer}>
                  <div className={styles.pieChart}>
                    <div className={styles.chart}>
                      <div className={styles.chartText}>
                        <span>Compliance</span>
                      </div>
                      <div className={styles.Mainchart}>
                        <PieChart valueOne={this.props.complianceValue} valueTwo={this.props.nonComplianceValue} />
                      </div>
                    </div>
                  </div>
                  <div className={styles.btnprops} onClick={() => {
                    this.props.history.push('penalty-dashboard', {
                      slaDepartment: this.state.department,
                      slaSupplier: this.state.supplier,
                      slaService: this.state.service,
                      slaKpi: this.state.kpi,
                      slaStartDate: this.state.startDate,
                      slaEndDate: this.state.endDate
                    })
                  }} role='button' tabIndex={0} onKeyDown={() => this.props.history.push('penalty-dashboard')}>
                    <div className={styles.chart}>
                      <div className={styles.chartText}>
                        <span>Penalty</span>
                      </div>
                      <div className={styles.Mainchart}>
                        <Avatar className={styles.avatarTwo} size='large'>
                          { this.props.pentaltyValue === 0 ? 0 : this.props.pentaltyValue ? this.props.pentaltyValue.toFixed(2) : 'N/A' }
                        </Avatar>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.barContainer}>
                  <div className={styles.pieChart}>
                    <div className={styles.Barchart}>
                      <Barchart BarChartValue={this.props.BarChartValue} duration={this.props.package} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
}

SlaDashboardMainComponent.propTypes = {
  history: PropTypes.any,
  pentaltyValue: PropTypes.any,
  nonComplianceValue: PropTypes.any,
  complianceValue: PropTypes.any,
  BarChartValue: PropTypes.any,
  package: PropTypes.any

}
export default SlaDashboardMainComponent
