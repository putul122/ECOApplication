import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import styles from './kpiPerformanceComponent.scss'
import { Avatar, DatePicker } from 'antd'
import 'antd/dist/antd.css'
import 'react-datepicker/dist/react-datepicker.css'
import {defaults, Bar} from 'react-chartjs-2'
defaults.global.legend.display = true
// import { DatePicker } from 'antd'
const { RangePicker } = DatePicker

export default function KPIPerformance (props) {
console.log(props)
let colors = ['#FF6384', '#71B37C', '#EC932F', '#36A2EB', '#FFCE56', '#fd397a', '#0abb87', '#3e0abb', 'black', 'orange', '#fd397a', '#0abb87', '#3e0abb', 'yellow']
let departmentOptions = []
let supplierOptions = []
let agreementOptions = []
let serviceOptions = []
let kpiOptions = []
let barData = {}
let payloadFilterBlock = props.payloadFilterBlock
let labelLength = 0
let navigateToKpi = function (data) {
  console.log('data', data)
  props.history.push('kpi-performances/' + data.subjectId, {
    pageSettings: props.actionSettings,
    selectedKpi: data
  })
}
let kpiList = ''
let getRandomColorHex = function () {
  let hex = '0123456789ABCDEF'
  let color = '#'
  for (var i = 1; i <= 6; i++) {
    color += hex[Math.floor(Math.random() * 16)]
  }
  return color
}
if (props.actionSettings.allFilterDataProcessed) {
  departmentOptions = props.actionSettings.departmentOption
  supplierOptions = props.actionSettings.supplierOption
  agreementOptions = props.actionSettings.agreementOption
  serviceOptions = props.actionSettings.serviceOption
  kpiOptions = props.actionSettings.kpiOption
  if (kpiOptions) {
    if (kpiOptions.length > 0) {
      kpiList = kpiOptions.map(function (data, index) {
        return (<span className='m-list-search__result-item clearfix' key={index}>
          <span className='m-list-search__result-item-text'><input checked={props.actionSettings.selectedKpi[index]} onChange={(event) => { handleCheckbox(event.target.checked, index) }} type='checkbox' />&nbsp;<a href='javascript:void(0);' onClick={(event) => { event.preventDefault(); navigateToKpi(data) }} >{data.name}</a></span>
        </span>)
      })
    } else {
      kpiList = ''
    }
  }
}
if (props.graphData !== '') {
  let partsData = props.graphData.partData || []
  // let color = ['#71B37C', '#EC932F']
  if (partsData.length > 0) {
    let labels = []
    let datasets = []
    partsData.forEach(function (partData, index) {
      let obj = {}
      obj.type = 'line'
      obj.fill = false
      // let barColor = getRandomColorHex()
      obj.label = partData[0].value
      let plotData = partData[1].value
      let data = []
      plotData.forEach(function (scoreData, idx) {
        if (index === 0) {
          labels.push(scoreData.date_time)
        }
        data.push(parseFloat(scoreData.values.Score.formatted_value) || 0)
      })
      let dataColor = colors[index] || getRandomColorHex()
      obj.data = data
      obj.borderColor = dataColor
      obj.backgroundColor = dataColor
      obj.pointBorderColor = dataColor
      obj.pointBackgroundColor = dataColor
      obj.pointHoverBackgroundColor = dataColor
      obj.pointHoverBorderColor = dataColor
      obj.pointHitRadius = 20
      datasets.push(obj)
    })
    labelLength = labels.length
    barData.labels = labels
    barData.datasets = datasets
  }
}
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
        display: labelLength < 10,
        scaleLabel: {
          display: true,
          fontStyle: 'normal',
          labelString: 'Days'
        },
        stacked: false
    }]
  },
  elements: { point: { radius: 0 } }
  // 'tooltips': {
  //   callbacks: {
  //     label: function (tooltipItem) {
  //       console.log(tooltipItem)
  //       return 'Cost: R ' + tooltipItem
  //     }
  //   }
  // }
}
let handleCheckbox = function (value, index) {
  let actionSettings = JSON.parse(JSON.stringify(props.actionSettings))
  actionSettings.selectedKpi[index] = value
  props.setActionSettings(actionSettings)
}
let handleSelect = function (filterType) {
  return function (newValue: any, actionMeta: any) {
    let actionSettings = JSON.parse(JSON.stringify(props.actionSettings))
    if (actionMeta.action === 'select-option') {
      let operationArray = []
      if (filterType === 'Department') {
        actionSettings.selectedDepartment = newValue
        operationArray = actionSettings.copyDepartment
      } else if (filterType === 'Supplier') {
        actionSettings.selectedSupplier = newValue
        operationArray = actionSettings.copySupplier
      } else if (filterType === 'Agreement') {
        actionSettings.selectedAgreement = newValue
        operationArray = actionSettings.copyAgreement
      } else if (filterType === 'Service') {
        actionSettings.selectedService = newValue
        operationArray = actionSettings.copyService
      }
      let indexList = operationArray.map(function (data) {
        return data.name === newValue.name
      })
      let kpiOption = []
      let selectedKpi = []
      if (indexList.length > 0) {
        indexList.forEach(function (data, id) {
          if (data && actionSettings.copyKpi[id]) {
            kpiOption.push(actionSettings.copyKpi[id])
            selectedKpi.push(false)
          }
        })
        actionSettings.kpiOption = kpiOption
        actionSettings.selectedKpi = selectedKpi
      }
    }
    if (actionMeta.action === 'clear') {
      let operationArray = []
      let compareObject = null
      if (filterType === 'Department') {
        actionSettings.selectedDepartment = null
        actionSettings.selectedSupplier = null
        actionSettings.selectedAgreement = null
        actionSettings.selectedService = null
      } else if (filterType === 'Supplier') {
        actionSettings.selectedSupplier = null
        actionSettings.selectedAgreement = null
        actionSettings.selectedService = null
        operationArray = actionSettings.copyDepartment
        compareObject = actionSettings.selectedDepartment
      } else if (filterType === 'Agreement') {
        actionSettings.selectedAgreement = null
        actionSettings.selectedService = null
        operationArray = actionSettings.copySupplier
        compareObject = actionSettings.selectedSupplier
      } else if (filterType === 'Service') {
        actionSettings.selectedService = null
        operationArray = actionSettings.copyAgreement
        compareObject = actionSettings.selectedAgreement
      }
      if (operationArray.length > 0) {
        let indexList = operationArray.map(function (data) {
          return data.name === compareObject.name
        })
        let kpiOption = []
        let selectedKpi = []
        if (indexList.length > 0) {
          indexList.forEach(function (data, id) {
            if (data && actionSettings.copyKpi[id]) {
              kpiOption.push(actionSettings.copyKpi[id])
              selectedKpi.push(false)
            }
          })
          actionSettings.kpiOption = kpiOption
          actionSettings.selectedKpi = selectedKpi
        }
      } else {
        let selectedKpi = []
        actionSettings.kpiOption = actionSettings.copyKpi
        actionSettings.copyKpi.forEach(function (data, id) {
          selectedKpi.push(false)
        })
        actionSettings.selectedKpi = selectedKpi
      }
    }
    props.setActionSettings(actionSettings)
  }
}
let editDate = function (date) {
  let actionSettings = JSON.parse(JSON.stringify(props.actionSettings))
  if (date) {
    actionSettings.startDate = date[0].format()
    actionSettings.endDate = date[1].format()
  } else {
    actionSettings.startDate = ''
    actionSettings.endDate = ''
  }
  props.setActionSettings(actionSettings)
}
let isEmpty = function (obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}
let processData = function () {
  // eslint-disable-next-line
  mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  let actionSettings = JSON.parse(JSON.stringify(props.actionSettings))
  let payloadFilter = {}
  payloadFilter.values_start_time = props.actionSettings.startDate
  payloadFilter.values_end_time = props.actionSettings.endDate
  // Agreement Filter
  if (!isEmpty(actionSettings.selectedAgreement)) {
    let agreementData = []
    agreementData.push(actionSettings.selectedAgreement.subjectId)
    payloadFilter.subject_id = agreementData
  }
  payloadFilter.parts = {}
  payloadFilter.parts['2'] = payloadFilterBlock.kpiFilter
  payloadFilter.parts['3'] = payloadFilterBlock.departmentAndSupplierFilter
  // KPI Filter
  let kpiData = []
  actionSettings.selectedKpi.forEach(function (isSelected, index) {
    if (isSelected) {
      kpiData.push(actionSettings.kpiOption[index].subjectId)
    }
  })
  // let kpiData = [58844, 58845]
  payloadFilter.parts['2'].constraint_perspective.parts['3'].constraint_perspective.parts['4'].constraint_perspective.parts['4'].constraint_perspective.parts['4'].constraint_perspective['subject_ids'] = kpiData
  // Department Filter
  if (!isEmpty(actionSettings.selectedDepartment)) {
    let departmentData = []
    departmentData.push(actionSettings.selectedDepartment.id)
    payloadFilter.parts['3'].constraint_perspective.parts['2'].target_component_ids = departmentData
  }
  // Supplier Filter
  if (!isEmpty(actionSettings.selectedSupplier)) {
    let supplierData = []
    supplierData.push(actionSettings.selectedSupplier.id)
    payloadFilter.parts['3'].constraint_perspective.parts['3'].target_component_ids = supplierData
  }
  console.log('payloadFilter', payloadFilter)
  const base64ecodedPayloadFilter = btoa(JSON.stringify(payloadFilter))
  // const base64ecodedPayloadFilter = 'eyJwYXJ0cyI6eyIyIjp7ImNvbnN0cmFpbnRfcGVyc3BlY3RpdmUiOnsicGFydHMiOnsiMyI6eyJjb25zdHJhaW50X3BlcnNwZWN0aXZlIjp7InBhcnRzIjp7IjQiOnsiY29uc3RyYWludF9wZXJzcGVjdGl2ZSI6eyJwYXJ0cyI6eyI0Ijp7ImNvbnN0cmFpbnRfcGVyc3BlY3RpdmUiOnsicGFydHMiOnsiNCI6eyJjb25zdHJhaW50X3BlcnNwZWN0aXZlIjp7InN1YmplY3RfaWRzIjpbNTg4NDRdfX19fX19fX19fX19fX19fQ%3d%3d'
  let payload = {}
  payload['meta_model_perspective_id[0]'] = 72
  payload['view_key[0]'] = 'AgreementScoring_HistoricalPerformanceDashboard'
  payload['filter[0]'] = base64ecodedPayloadFilter
  props.fetchModelPrespectives && props.fetchModelPrespectives(payload)
}
return (
  <div>
    <div className='row'>
      <div style={{ width: '100%' }}>
        <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--full-height m-portlet--skin-light  m-portlet--rounded-force'>
          <div className='m-portlet__body'>
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
                        isSearchable
                        onChange={handleSelect('Department')}
                        value={props.actionSettings.selectedDepartment}
                        options={departmentOptions}
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
                        placeholder='Select Supplier'
                        isClearable
                        value={props.actionSettings.selectedSupplier}
                        onChange={handleSelect('Supplier')}
                        isSearchable
                        name={'categorySelected'}
                        options={supplierOptions}
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
                        value={props.actionSettings.selectedAgreement}
                        onChange={handleSelect('Agreement')}
                        isSearchable
                        name={'categorySelected'}
                        options={agreementOptions}
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
                        value={props.actionSettings.selectedService}
                        onChange={handleSelect('Service')}
                        isSearchable
                        name={'categorySelected'}
                        options={serviceOptions}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row '>
                <div className='col-sm-11 col-md-11' style={{'display': 'flex'}}>
                  <h5 style={{'margin': '10px'}}>Period</h5>
                  <RangePicker
                    className={`RangePicker ${styles.rangePicker}`}
                    onChange={(val) => editDate(val)}
                    dateRender={(current) => {
                      const style = {}
                      if (current.date() === 1) {
                        style.border = '1px solid #1890ff'
                        style.borderRadius = '50%'
                      }
                      return (
                        <div className='ant-calendar-date' style={style}>
                          {current.date()}
                        </div>
                      )
                    }}
                  />
                </div>
              </div>
              <br />
              <div className='row'>
                <div className={styles.contractContainer}>
                  <div className={styles.contractText} >
                    <div className={`${styles.badgeContainer}`} style={{borderLeft: `5px solid ${colors[2]}`}}>
                      <div className={styles.badgeText}>{'Agreement'}</div>
                      <Avatar className={styles.avatarOne} style={{backgroundColor: colors[2]}} size='medium'>
                        {agreementOptions.length}
                      </Avatar>
                    </div>
                  </div>
                  <div className={styles.contractText} >
                    <div className={`${styles.badgeContainer}`} style={{borderLeft: `5px solid ${colors[4]}`}}>
                      <div className={styles.badgeText}>{'Service'}</div>
                      <Avatar className={styles.avatarOne} style={{backgroundColor: colors[4]}} size='medium'>
                        {serviceOptions.length}
                      </Avatar>
                    </div>
                  </div>
                  <div className={styles.contractText} >
                    <div className={`${styles.badgeContainer}`} style={{borderLeft: `5px solid ${colors[1]}`}}>
                      <div className={styles.badgeText}>{'KPI'}</div>
                      <Avatar className={styles.avatarOne} style={{backgroundColor: colors[1]}} size='medium'>
                        {kpiOptions.length}
                      </Avatar>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className='row'>
                <div className='col-md-8'>
                  <div className='m-section m-section--last'>
                    <div className='m-section__content'>
                      <div className='m-demo'>
                        <div className='m-demo__preview'>
                          <div className='m-list-search'>
                            <div className='m-list-search__results'>
                              <Bar
                                id='softwareChart'
                                data={barData}
                                width={200}
                                height={150}
                                options={chartOption}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='m-section m-section--last'>
                    <div className='m-section__content'>
                      <div className='m-demo'>
                        <div className='m-demo__preview'>
                          <div className='m-list-search'>
                            <div className='m-list-search__results'>
                              <span className='m-list-search__result-category m-list-search__result-category--first'>
                                          Select KPI
                                      </span>
                              {kpiList}
                              <br />
                              <div className='dataTables_length' >
                                <button onClick={processData} className={`btn btn-default dropup-btn ${styles.dropDownBtn} ${styles.goBtn}`} style={{width: '160px'}} type='button' >Go</button>
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
        </div>
      </div>
    </div>
  </div>
      )
    }
 KPIPerformance.propTypes = {
  actionSettings: PropTypes.any,
  payloadFilterBlock: PropTypes.any,
  fetchModelPrespectives: PropTypes.func,
  graphData: PropTypes.any
}
