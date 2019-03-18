import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
// import TreeMap from '../treeMap/treeMapComponent'
export default function ServiceDashboard (props) {
  let dashboardPerspectiveList = ''
  if (props.dashboardPerspectives && props.dashboardPerspectives !== '') {
    let appPackage = JSON.parse(localStorage.getItem('packages'))
    let perspectives = appPackage.resources[0].perspectives
    dashboardPerspectiveList = props.dashboardPerspectives.map(function (data, index) {
      let subjectName = data.subject_name
      let parts = data.parts
      let subjectCount = ''
      let List = _.find(perspectives, function (obj) {
        return (obj.perspective === data.perspective_id && obj.role_key === 'List')
      })
      let listLink = 'javascript:void(0);'
      if (List) {
        listLink = '/perspectives/' + List.perspective + '/' + List.view_key
      }
      console.log('List', List)
      parts.forEach(function (partData, i) {
        if (partData.value.hasOwnProperty(subjectName)) {
          subjectCount = partData.value[subjectName].count
        }
        // if (partData.value.metric === 'count') {
        //   subjectCount = partData.value.value
        // }
      })
      return (
        <div className='col-md-4'>
          <div className='m-portlet m-portlet--bordered-semi m-portlet--skin-light  m-portlet--rounded-force'>
            <div className='m-portlet__head'>
              <div className='m-portlet__head-caption'>
                <div className='m-portlet__head-title'>
                  {/* <h3 className='m-portlet__head-text m--font-light'>
                  Activity
                  </h3> */}
                </div>
              </div>
            </div>
            <div className='m-portlet__body' style={{'height': '150px', paddingLeft: '0px', paddingRight: '0px'}} >
              <div className='m-widget17'>
                <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides ' style={{'backgroundColor': '#0083C2'}}>
                  <div className='m-widget17__chart'>
                    <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                      <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                      <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                        <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                    <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                  </div>
                </div>
                <div className='m-widget17__stats'>
                  <div className='m-widget17__items m-widget17__items-col2'>
                    <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                      <span className='m-widget17__icon'>
                        <i className='flaticon-notes m--font-brand' />
                      </span>
                      <span className='m-widget17__subtitle'>
                        <a href={listLink} ><h3>{subjectName}</h3></a>
                        <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{subjectCount}</h5>
                      </span>
                      {/* <span className='m-widget17__desc'>
                        <h1>{softwareCount}</h1>
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div>
      <div className='row'>
        <div className='col-md-10'>
          <h3>&nbsp;</h3>
        </div>
      </div>
      <div className='row' id='agreementSummary'>
        {dashboardPerspectiveList}
      </div>
      {/* <div>
        <TreeMap />
      </div> */}
    </div>
  )
}

ServiceDashboard.propTypes = {
  dashboardPerspectives: PropTypes.any
}
