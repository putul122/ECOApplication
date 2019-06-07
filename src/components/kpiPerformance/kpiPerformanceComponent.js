import React from 'react'
// import PropTypes from 'prop-types'
// import _ from 'lodash'
import Select from 'react-select'
import styles from './kpiPerformanceComponent.scss'
import { Avatar } from 'antd'

export default function KPIPerformance (props) {
console.log(props)
let colors = ['orange', '#fd397a', '#0abb87', '#3e0abb', 'black', 'orange', '#fd397a', '#0abb87', '#3e0abb', 'yellow']
return (
  <div>
    <div className='row'>
      <div className={styles.MainContainer}>
        <div className={styles.ContentContainer}>
          <div className={styles.leftContainer}>
            <div>
              <div className='row' style={{'marginBottom': '20px'}}>
                <div className='col-sm-12 col-md-3'>
                  <div className='dataTables_length' style={{'display': 'flex'}}>
                    <h5 style={{'margin': '10px'}}>Department</h5>
                    <div className='m-input-icon'>
                      <Select
                        className='input-sm m-input'
                        placeholder='Select Department'
                        isClearable
                        isMulti
                        // onChange={handleTag}
                        // value={props.filterSettings.selectedTags}
                        // options={tagOptions}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-sm-12 col-md-3'>
                  <div className='dataTables_length' style={{'display': 'flex'}}>
                    <h5 style={{'margin': '10px'}}>Supplier</h5>
                    <div className='m-input-icon'>
                      <Select
                        className='input-sm m-input'
                        placeholder='Select Category'
                        isClearable
                        // defaultValue={props.filterSettings.selectedCategory}
                        // value={props.filterSettings.selectedCategory}
                        // onChange={handleCategorySelect}
                        isSearchable={false}
                        name={'categorySelected'}
                        // options={categoryOptions}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-sm-12 col-md-3'>
                  <div className='dataTables_length' style={{'display': 'flex'}}>
                    <h5 style={{'margin': '10px'}}>Agreement</h5>
                    <div className='m-input-icon'>
                      <Select
                        className='input-sm m-input'
                        placeholder='Select Agreement'
                        isClearable
                        // defaultValue={props.filterSettings.selectedCategory}
                        // value={props.filterSettings.selectedCategory}
                        // onChange={handleCategorySelect}
                        isSearchable={false}
                        name={'categorySelected'}
                        // options={categoryOptions}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-sm-12 col-md-3'>
                  <div className='dataTables_length' style={{'display': 'flex'}}>
                    <h5 style={{'margin': '10px'}}>Service</h5>
                    <div className='m-input-icon'>
                      <Select
                        className='input-sm m-input'
                        placeholder='Select Service'
                        isClearable
                        // defaultValue={props.filterSettings.selectedCategory}
                        // value={props.filterSettings.selectedCategory}
                        // onChange={handleCategorySelect}
                        isSearchable={false}
                        name={'categorySelected'}
                        // options={categoryOptions}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row '>
                <div className='col-sm-12 col-md-8'>
                  <div className='dataTables_length' style={{'display': 'flex'}}>
                    <h5 style={{'margin': '10px'}}>Period</h5>

                  </div>
                </div>
                <div className='col-sm-1 col-md-1'>
                  <div className='dataTables_length' style={{'display': 'flex'}}>
                    <button type='button' className='sm-btn btn btn-secondary'>Go</button>
                  </div>
                </div>
              </div>
            </div>
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
                <div className={`${styles.badgeContainer}`} style={{borderLeft: `5px solid ${colors[6]}`}}>
                  <div className={styles.badgeText}>{'Service'}</div>
                  <Avatar className={styles.avatarOne} style={{backgroundColor: colors[6]}} size='medium'>
                    {10}
                  </Avatar>
                </div>
              </div>
              <div className={styles.contractText} >
                <div className={`${styles.badgeContainer}`} style={{borderLeft: `5px solid ${colors[1]}`}}>
                  <div className={styles.badgeText}>{'KPI'}</div>
                  <Avatar className={styles.avatarOne} style={{backgroundColor: colors[1]}} size='medium'>
                    {10}
                  </Avatar>
                </div>
              </div>
            </div>
            <div className={styles.chartContainer}>
              <div className={styles.pieContainer}>
                <div className={styles.block1} >
                  <div className={styles.barContainer}>
                    <div className={styles.pieChart}>
                      <div className={styles.Barchart}>
                        <span style={{ textDecoration: 'underline' }}>BarChart</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.block2} >
                  <div className={styles.chart}>
                    <span style={{ textDecoration: 'underline' }}>Selected Kpi</span>
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
 }
