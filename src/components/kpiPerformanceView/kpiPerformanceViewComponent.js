import React from 'react'
import PropTypes from 'prop-types'
import styles from './kpiPerformanceViewComponent.scss'
import TabComponent from './tabComponent'

export default function KPIPerformance (props) {
  console.log('props', props)
  let showScore = props.showTabs.showScore
  let showPenalty = props.showTabs.showPenalty
  let showTabs = function (tab) {
    if (tab === 'Score') {
      let payload = {'showScore': ' active show', 'showPenalty': ''}
      props.setCurrentTab(payload)
    } else if (tab === 'Penalty') {
      let payload = {'showScore': '', 'showPenalty': ' active show'}
      props.setCurrentTab(payload)
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
                  <span className='col-4'><h4>Network</h4></span>
                  <span className='col-4'><h4>Common Fault Management</h4></span>
                  <span className='col-4 pull-right'><h4>Huawei</h4></span>
                </div>
              </div>
              <div className='row justify-content-center'>
                <span className={styles.KpiInfoContainer + 'justify-content-center'}><h1>End to End Handling Effectiveness</h1></span>
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
                        <TabComponent showTabs={props.showTabs} />
                      </div>
                      <div className={'tab-pane' + showPenalty} id='m_tabs_3_2' role='tabpanel'>
                        <div className='row'>
                          <div className='m--space-10' />
                          <TabComponent showTabs={props.showTabs} />
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
  setCurrentTab: PropTypes.any
  // fetchModelPrespectives: PropTypes.func,
  // graphData: PropTypes.any
}
