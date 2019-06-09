import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Select from 'react-select'
import styles from './kpiPerformanceComponent.scss'
import { Avatar } from 'antd'
import DatePicker from 'react-datepicker'
import 'antd/dist/antd.css'
import 'react-datepicker/dist/react-datepicker.css'

export default function KPIPerformance (props) {
console.log(props)
let colors = ['orange', '#fd397a', '#0abb87', '#3e0abb', 'black', 'orange', '#fd397a', '#0abb87', '#3e0abb', 'yellow']
let departmentOptions = []
let supplierOptions = []
let agreementOptions = []
let serviceOptions = []
let kpiOptions = []
let payloadFilterBlock = props.payloadFilterBlock
console.log(payloadFilterBlock)
let kpiList = ''
if (props.actionSettings.allFilterDataProcessed) {
  departmentOptions = _.uniqBy(props.actionSettings.departmentOption, 'id')
  supplierOptions = _.uniqBy(props.actionSettings.supplierOption, 'id')
  agreementOptions = _.uniqBy(props.actionSettings.agreementOption, 'name')
  serviceOptions = _.uniqBy(props.actionSettings.serviceOption, 'id')
  kpiOptions = _.uniqBy(props.actionSettings.kpiOption, 'id')
  if (kpiOptions) {
    if (kpiOptions.length > 0) {
      kpiList = kpiOptions.map(function (data, index) {
        return (<span className='m-list-search__result-item clearfix' key={index}>
          <input type='checkbox' />
          <span className='m-list-search__result-item-text'><a href='' onClick={(event) => { event.preventDefault() }} >{data.name}</a></span>
        </span>)
      })
    } else {
      kpiList = ''
    }
  }
}
let handleSelect = function (filterType) {
  return function (newValue: any, actionMeta: any) {
    let actionSettings = JSON.parse(JSON.stringify(props.actionSettings))
    if (actionMeta.action === 'select-option') {
      if (filterType === 'Department') {
        actionSettings.selectedDepartment = newValue
      } else if (filterType === 'Supplier') {
        actionSettings.selectedSupplier = newValue
      } else if (filterType === 'Agreement') {
        actionSettings.selectedAgreement = newValue
      } else if (filterType === 'Service') {
        actionSettings.selectedService = newValue
      }
    }
    if (actionMeta.action === 'clear') {
      if (filterType === 'Department') {
        actionSettings.selectedDepartment = []
      } else if (filterType === 'Supplier') {
        actionSettings.selectedSupplier = []
      } else if (filterType === 'Agreement') {
        actionSettings.selectedAgreement = []
      } else if (filterType === 'Service') {
        actionSettings.selectedService = []
      }
    }
    props.setActionSettings(actionSettings)
  }
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
  let actionSettings = JSON.parse(JSON.stringify(props.actionSettings))
  let payloadFilter = {}
  payloadFilter.values_start_time = ''
  payloadFilter.values_end_time = ''
  // Agreement Filter
  if (!isEmpty(actionSettings.selectedAgreement)) {
    let agreementData = []
    agreementData.push(actionSettings.selectedAgreement.id)
    payloadFilter.subject_id = agreementData
  }
  payloadFilter.parts = {}
  payloadFilter.parts['2'] = payloadFilterBlock.kpiFilter
  payloadFilter.parts['3'] = payloadFilterBlock.departmentAndSupplierFilter
  // KPI Filter
  let kpiData = [58846, 58845, 58844]
  payloadFilter.parts['2'].constraint_perspective.parts['3'].constraint_perspective.parts['4'].constraint_perspective.parts['4'].constraint_perspective.parts['4'].constraint_perspective['subject_ids'] = kpiData
  console.log('payloadFilter', payloadFilter)
  // Supplier Filter
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
  // const base64ecodedPayloadFilter = btoa(JSON.stringify(payloadFilter))
  let payload = {}
  payload['meta_model_perspective_id[0]'] = 72
  payload['view_key[0]'] = 'AgreementScoring_HistoricalPerformanceDashboard'
  payload['filter[0]'] = 'eyJwYXJ0cyI6eyIyIjp7ImNvbnN0cmFpbnRfcGVyc3BlY3RpdmUiOnsicGFydHMiOnsiMyI6eyJjb25zdHJhaW50X3BlcnNwZWN0aXZlIjp7InBhcnRzIjp7IjQiOnsiY29uc3RyYWludF9wZXJzcGVjdGl2ZSI6eyJwYXJ0cyI6eyI0Ijp7ImNvbnN0cmFpbnRfcGVyc3BlY3RpdmUiOnsicGFydHMiOnsiNCI6eyJjb25zdHJhaW50X3BlcnNwZWN0aXZlIjp7InN1YmplY3RfaWRzIjpbNTg4NDRdfX19fX19fX19fX19fX19fQ%3d%3d'
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
                <div className='col-sm-12 col-md-8' style={{'display': 'flex'}}>
                  <h5 style={{'margin': '10px'}}>Period</h5>
                  <DatePicker
                    className='input-sm form-control m-input'
                    selected={null}
                    placeholderText='Start date'
                    dateFormat='DD MMM YYYY'
                    // onSelect={(date) => { editProperty(index, date, parentIndex) }}
                  />&nbsp;&nbsp;
                  <DatePicker
                    className='input-sm form-control m-input'
                    selected={null}
                    placeholderText='End date'
                    dateFormat='DD MMM YYYY'
                    // onSelect={(date) => { editProperty(index, date, parentIndex) }}
                  />
                </div>
                <div className='col-sm-1 col-md-1'>
                  <div className='dataTables_length' style={{'display': 'flex'}}>
                    <button onClick={processData} type='button' className='sm-btn btn btn-secondary'>Go</button>
                  </div>
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
                    <div className={`${styles.badgeContainer}`} style={{borderLeft: `5px solid ${colors[6]}`}}>
                      <div className={styles.badgeText}>{'Service'}</div>
                      <Avatar className={styles.avatarOne} style={{backgroundColor: colors[6]}} size='medium'>
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
              <div className='row'>
                <div className='col-md-8'>
                  <div className='m-section m-section--last'>
                    <div className='m-section__content'>
                      <div className='m-demo'>
                        <div className='m-demo__preview'>
                          <div className='m-list-search'>
                            <div className='m-list-search__results'>
                              <span className='m-list-search__result-category m-list-search__result-category--first'>
                                          Bar Graph
                                      </span>
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
  fetchModelPrespectives: PropTypes.func
}
