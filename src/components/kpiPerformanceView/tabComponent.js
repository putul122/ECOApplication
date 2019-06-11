import React from 'react'
import styles from './tabComponent.scss'
import { Avatar } from 'antd'
import 'antd/dist/antd.css'
import {defaults, Bar} from 'react-chartjs-2'
defaults.global.legend.display = true

export default function TabComponent (props) {
  console.log('tab props', props)
  let colors = ['#FF6384', '#71B37C', '#EC932F', '#36A2EB', '#FFCE56', '#fd397a', '#0abb87', '#3e0abb', 'black', 'orange', '#fd397a', '#0abb87', '#3e0abb', 'yellow']
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
  return (
    <div className='row'>
      <div className='col-8'>
        <div className='row'>
          <div className={styles.contractContainer}>
            <div className={styles.contractText} >
              <div className={`${styles.badgeContainer}`} style={{borderLeft: `5px solid ${colors[2]}`}}>
                <div className={styles.badgeText}>{'Agreement'}</div>
                <Avatar className={styles.avatarOne} style={{backgroundColor: colors[2]}} size='medium'>
                  {10}
                </Avatar>
              </div>
            </div>
            <div className={styles.contractText} >
              <div className={`${styles.badgeContainer}`} style={{borderLeft: `5px solid ${colors[4]}`}}>
                <div className={styles.badgeText}>{'Service'}</div>
                <Avatar className={styles.avatarOne} style={{backgroundColor: colors[4]}} size='medium'>
                  {2}
                </Avatar>
              </div>
            </div>
            <div className={styles.contractText} >
              <div className={`${styles.badgeContainer}`} style={{borderLeft: `5px solid ${colors[1]}`}}>
                <div className={styles.badgeText}>{'KPI'}</div>
                <Avatar className={styles.avatarOne} style={{backgroundColor: colors[1]}} size='medium'>
                  {7}
                </Avatar>
              </div>
            </div>
          </div>
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
                    <th className='table-th pres-th m-datatable__cell m-datatable__cell--sort'>KPI Date</th>
                    <th className='table-th pres-th m-datatable__cell m-datatable__cell--sort'>KPI Score</th>
                    <th className='table-th pres-th m-datatable__cell m-datatable__cell--sort'>KPI Target</th>
                  </tr>
                </thead>
                <tbody className='table-body pres-th m-datatable__body ps ps--active-y ps--scrolling-y' id='style-1'>
                  <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
