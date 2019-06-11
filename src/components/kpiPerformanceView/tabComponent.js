import React from 'react'
import PropTypes from 'prop-types'
import styles from './tabComponent.scss'
// import { Avatar } from 'antd'
import 'antd/dist/antd.css'
import {defaults, Bar} from 'react-chartjs-2'
defaults.global.legend.display = true

export default function TabComponent (props) {
  console.log('tab props', props)
  let colors = ['#FF6384', '#71B37C', '#EC932F', '#36A2EB', '#FFCE56', '#fd397a', '#0abb87', '#3e0abb', 'black', 'orange', '#fd397a', '#0abb87', '#3e0abb', 'yellow']
  let blockInformationList = ''
  let tableHeader = ''
  let tableBodyData = ''
  let chartOption = {
    responsive: true,
    title: {
      display: true,
      text: 'KPI Score by Month, Day and KPI'
    },
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
          ticks: {
            beginAtZero: true
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Score'
          }
      }],
      xAxes: [{
          ticks: {
              autoSkip: false
          },
          display: true,
          scaleLabel: {
            display: true,
            fontStyle: 'normal',
            labelString: 'Days'
          },
          stacked: false
      }]
    }
    // 'tooltips': {
    //   callbacks: {
    //     label: function (tooltipItem) {
    //       console.log(tooltipItem)
    //       return 'Cost: R ' + tooltipItem
    //     }
    //   }
    // }
  }
  if (props.graphData !== '') {
    let blockData = props.graphData.blockData
    let labels = props.graphData.labels
    let penalty = props.graphData.penalty
    let scores = props.graphData.scores
    let targets = props.graphData.targets
    if (blockData && blockData.length > 0) {
      blockInformationList = blockData.map(function (data, index) {
        return (
          <div key={index} className={styles.contractText} >
            <div className={`${styles.badgeContainer}`} style={{borderLeft: `5px solid ${colors[index]}`}}>
              <div className={styles.badgeText}>{data.display_name}</div>
              {/* <Avatar className={styles.avatarOne} style={{backgroundColor: colors[4]}} size='big'> */}
              {data.formatted_value}
              {/* </Avatar> */}
            </div>
          </div>
        )
      })
    }
    if ((labels && labels.length > 0) && (scores && scores.length > 0) && (targets && targets.length > 0)) {
      tableHeader = []
      tableBodyData = []
      for (let i = 0; i < labels.length; i++) {
        let tableColumn = []
        if (labels[i]) {
          if (i === 0) {
            tableHeader.push(<th className='table-th pres-th m-datatable__cell m-datatable__cell--sort'>Date</th>)
          }
          tableColumn.push(<td>{labels[i]}</td>)
        }
        if (scores[i]) {
          if (i === 0) {
            tableHeader.push(<th className='table-th pres-th m-datatable__cell m-datatable__cell--sort'>{scores[i].display_name}</th>)
          }
          tableColumn.push(<td>{scores[i].formatted_value}</td>)
        }
        if (targets[i]) {
          if (i === 0) {
            tableHeader.push(<th className='table-th pres-th m-datatable__cell m-datatable__cell--sort'>{targets[i].display_name}</th>)
          }
          tableColumn.push(<td>{scores[i].formatted_value}</td>)
        }
        if (penalty && penalty.length > 0) {
          if (i === 0) {
            tableHeader.push(<th className='table-th pres-th m-datatable__cell m-datatable__cell--sort'>{penalty[i].display_name}</th>)
          }
          tableColumn.push(<td>{scores[i].formatted_value}</td>)
        }
        tableBodyData.push(<tr>{tableColumn}</tr>)
      }
    }
  }
  return (
    <div className='row'>
      <div className='col-8'>
        <div className='row'>
          {blockInformationList}
        </div>
        <br />
        <div className='row'>
          <div className='col-12'>
            <Bar
              id='softwareChart'
              data={{}}
              width={200}
              height={150}
              options={chartOption}
            />
          </div>
        </div>
      </div>
      <div className='col-4'>
        <div className='m_datatable' id='scrolling_vertical'>
          <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{ 'display': 'block', 'min-height': '500px', 'max-height': '550px' }}>
            <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '80vh'}}>
              <table className='table-pres table table-striped- table-bordered table-hover table-checkable dataTable no-footer' >
                <thead className='table-head pres-th m-datatable__head'>
                  <tr className='table-head-row m-datatable__row' style={{ 'left': '0px;' }}>
                    {tableHeader}
                  </tr>
                </thead>
                <tbody className='table-body pres-th m-datatable__body ps ps--active-y ps--scrolling-y' id='style-1'>
                  {tableBodyData}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
TabComponent.propTypes = {
  // eslint-disable-next-line
  showTabs: PropTypes.any,
  graphData: PropTypes.any
}
