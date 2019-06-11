import React from 'react'
import PropTypes from 'prop-types'
import styles from './kpiPerformanceViewComponent.scss'
import TabComponent from './tabComponent'
var isEmpty = function (obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

export default function KPIPerformance (props) {
  console.log('props', props)
  let showScore = props.showTabs.showScore
  let DepartmentName = ''
  let ServiceName = ''
  let SupplierName = ''
  let KPIName = ''
  let showPenalty = props.showTabs.showPenalty
  let showTabs = function (tab) {
    if (tab === 'Score') {
      let payload = {'showScore': ' active show', 'showPenalty': ''}
      props.setCurrentTab(payload)
    } else if (tab === 'Penalty') {
      let payload = {'showScore': '', 'showPenalty': ' active show'}
      props.setCurrentTab(payload)
    }
    let availableAction = props.availableAction
    availableAction['toCallScorePenaltyAPI'] = true
    props.setAvailableAction(availableAction)
  }
  if (!isEmpty(props.pageSettings)) {
    if (!isEmpty(props.pageSettings.selectedDepartment)) {
      DepartmentName = props.pageSettings.selectedDepartment.name
    }
    if (!isEmpty(props.pageSettings.selectedService)) {
      ServiceName = props.pageSettings.selectedService.name
    }
    if (!isEmpty(props.pageSettings.selectedSupplier)) {
      SupplierName = props.pageSettings.selectedSupplier.name
    }
    if (!isEmpty(props.pageSettings.selectedKpi)) {
      KPIName = props.pageSettings.selectedKpi.name
    }
  }

  return (
    <div>
      <div className='row'>
        <div style={{ width: '100%' }}>
          <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--full-height m-portlet--skin-light  m-portlet--rounded-force'>
            <div className='m-portlet__body' >
              <div className='row'>
                <div className={styles.topInfoContainer} >
                  <span className='col-4'><h4>{DepartmentName}</h4></span>
                  <span className='col-4'><h4>{ServiceName}</h4></span>
                  <span className='col-4 pull-right'><h4>{SupplierName}</h4></span>
                </div>
              </div>
              <div className='row justify-content-center'>
                <span className={styles.KpiInfoContainer + 'justify-content-center'}><h1>{KPIName}</h1></span>
              </div>
              <div className='row'>
                <div className='col-12' >
                  <div className={styles.tabsprops}>
                    <ul className='nav nav-tabs' role='tablist'>
                      <li className='nav-item'>
                        <a className={'nav-link' + showScore} data-toggle='tab' onClick={() => showTabs('Score')} href='javascript:void(0);'>Score</a>
                      </li>
                      <li className='nav-item'>
                        <a className={'nav-link' + showPenalty} data-toggle='tab' onClick={() => showTabs('Penalty')} href='javascript:void(0);'>Penalty</a>
                      </li>
                    </ul>
                    <div className='tab-content'>
                      <div className={'tab-pane' + showScore} id='m_tabs_3_1' role='tabpanel'>
                        <div className='m--space-10' />
                        <TabComponent graphData={props.graphData} showTabs={props.showTabs} />
                      </div>
                      <div className={'tab-pane' + showPenalty} id='m_tabs_3_2' role='tabpanel'>
                        <div className='row'>
                          <div className='m--space-10' />
                          <TabComponent graphData={props.graphData} showTabs={props.showTabs} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

KPIPerformance.propTypes = {
  showTabs: PropTypes.any,
  setCurrentTab: PropTypes.any,
  pageSettings: PropTypes.any,
  graphData: PropTypes.any,
  availableAction: PropTypes.any,
  setAvailableAction: PropTypes.func
}
