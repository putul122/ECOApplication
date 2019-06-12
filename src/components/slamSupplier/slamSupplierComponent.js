import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DatePicker, Spin } from 'antd'
import 'antd/dist/antd.css'

import styles from './slamSupplierComponent.scss'
import Barchart from '../barchart/barchartComponent'
import axios from 'axios'
import api from '../../constants'

const { RangePicker } = DatePicker

class SlamSupplier extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slamState: {
        supplier: '',
        service: '',
        kpi: ''
      },
      data: [],
      selectedOptionArray: [],
      selectedOption: '',
      barchartSlavalue: [],
      barChartSupplierArray: [],
      slaBarchartStateData: [],
      ordersObject: {},
      perspectiveFilter: {},
      dupActualSlaDashboardData: [],
      departmentFilter: [],
      serviceMultipleArray: [],
      kpiMultipleArray: [],
      slaComparisonShowData: true,
      supplierFilter: [],
      supplierIdsArray: [],
      departmentDropDownArray: [],
      supplierDropDownArray: [],
      serviceDropDownArray: [],
      kpiDropDownArray: [],
      serviceFilter: [],
      filterObject: this.props && this.props.location && this.props.location.state && this.props.location.state.filterObject ? this.props.location.state.filterObject : {},
      filteredDropdownItemsObject: {},
      BarChartValue: [],
      ActualBarChartValue: [],
      loader: false
    }
    this.dropdownLabels = []
    this.dropdownItemsArray = []
    this.dropdownItemsObject = {}
    this.dropdownItemsObjectKeys = []
    this.dropdownItemsObjectWithIds = {}
  }

  componentDidMount () {
    this.props.MetaModel()
    this.props.getMDPerspectiveDATA()
    const obj = Object.entries(this.state.filterObject)
    obj.map((val) => {
      if (val && val[0] && val[1]) {
        this.dropdownFilter(val[0], val[1])
      }
    })
  }

  // -------------------------------------------------------------------------------------------------------------------------
  // start of new work
  slaDropdowns = () => {
    this.props &&
    this.props.metaData &&
    this.props.metaData.resources &&
    this.props.metaData.resources[0].parts &&
    this.props.metaData.resources[0].parts.map(part => {
      if (part.constraint_perspective) {
        part.constraint_perspective &&
        part.constraint_perspective.parts &&
        part.constraint_perspective.parts.map(part => {
          this.createDropdownLabels(part)
        })
      } else {
        this.createDropdownLabels(part)
      }
    })
    this.dropdownLabels = [...new Set(this.dropdownLabels)]
    this.setDropdownItems()
    return this.createInitialFilterDropdown()
  }

  createDropdownLabels = (part) => {
    if (part.name !== 'Values') {
      this.dropdownLabels.push(part.name)
    }
  }

  setDropdownItems = () => {
    this.props &&
    this.props.modelPerspectiveData &&
    this.props.modelPerspectiveData.map(item => {
      const dropdownItemObject = {}
      item.parts && item.parts.map((part, i) => {
        if (i === 2) {
          const name = part.value
          dropdownItemObject[this.dropdownLabels[i]] = name

          const dropdownObject = {}
          dropdownObject[name] = item.subject_id

          if (this.dropdownItemsObjectWithIds[this.dropdownLabels[i]]) {
            this.dropdownItemsObjectWithIds[this.dropdownLabels[i]].push(dropdownObject)
          } else {
            this.dropdownItemsObjectWithIds[this.dropdownLabels[i]] = []
              this.dropdownItemsObjectWithIds[this.dropdownLabels[i]].push(dropdownObject)
          }
        } else if (i === 1 || i === 0) {
          dropdownItemObject[this.dropdownLabels[i]] = part && part.value && part.value.subject_part && part.value.subject_part.value && part.value.subject_part.value[0] && part.value.subject_part.value[0].target_component && part.value.subject_part.value[0].target_component.name
          const dropdownObject = {}
          if (part && part.value && part.value.subject_part && part.value.subject_part.value[0] && part.value.subject_part.value[0].target_component) {
            const itemName = part.value.subject_part.value[0].target_component.name
            const itemId = part.value.subject_part.value[0].target_component.id

            dropdownObject[itemName] = itemId
            if (this.dropdownItemsObjectWithIds[this.dropdownLabels[i]]) {
                this.dropdownItemsObjectWithIds[this.dropdownLabels[i]].push(dropdownObject)
            } else {
              this.dropdownItemsObjectWithIds[this.dropdownLabels[i]] = []
              this.dropdownItemsObjectWithIds[this.dropdownLabels[i]].push(dropdownObject)
            }
          }
        }
        this.dropdownItemsArray.push(dropdownItemObject)
      })
    })
  }

  createInitialFilterDropdown = (filteredItemsArray = []) => {
    const filterFromArray = filteredItemsArray.length ? filteredItemsArray : this.dropdownItemsArray

    filterFromArray.map((item, i) => {
      Object.keys(item).map(key => {
        if (Object.keys(this.dropdownItemsObject).includes(key)) {
          if (item[key]) {
            this.dropdownItemsObject[key].push(item[key])
            this.dropdownItemsObject[key] = [...new Set(this.dropdownItemsObject[key])]
          }
        } else {
          if (item[key]) {
            this.dropdownItemsObject[key] = []
            this.dropdownItemsObject[key].push(item[key])
          }
        }
      })
    })
    return this.createHTMLDropdownMarkup(true)
  }

  createFilterDropdown = (filteredItemsArray = []) => {
    const filterFromArray = filteredItemsArray.length ? filteredItemsArray : this.dropdownItemsArray

    filterFromArray.map((item, i) => {
      Object.keys(item).map(key => {
        if (Object.keys(this.dropdownItemsObject).includes(key)) {
          if (item[key]) {
            this.dropdownItemsObject[key].push(item[key])
            this.dropdownItemsObject[key] = [...new Set(this.dropdownItemsObject[key])]
          }
        } else {
          if (item[key]) {
            this.dropdownItemsObject[key] = []
            this.dropdownItemsObject[key].push(item[key])
          }
        }
      })
    })
    return this.createHTMLDropdownMarkup()
  }

  dropdownFilter = async (e, val) => {
    let { perspectiveFilter } = this.state
    const filterObject = this.state.filterObject
    const filterLabel = e && e.target && e.target.id ? e.target.id.split('-')[0] : e
    filterObject[filterLabel] = val
    let idArray = this.dropdownItemsObjectWithIds && this.dropdownItemsObjectWithIds[filterLabel] && this.dropdownItemsObjectWithIds[filterLabel].filter((value) => {
      return value[val]
    })
    if (filterLabel === 'Agreement') {
      perspectiveFilter['subject_ids'] = [idArray[0][val]]
    } else {
      if (!perspectiveFilter['parts']) {
        perspectiveFilter['parts'] = {
          '3': {
            'constraint_perspective': {
              'parts': {}
            }
          }
        }
      }
      if (filterLabel === 'Department') {
        perspectiveFilter.parts['3'].constraint_perspective.parts['2'] = {
          target_component_ids: [idArray[0][val]]
        }
      } else {
        perspectiveFilter.parts['3'].constraint_perspective.parts['3'] = {
          target_component_ids: [idArray[0][val]]
        }
      }
    }
    await this.setState({ filterObject, perspectiveFilter })
    this.setFilter()
  }

  setFilter = async () => {
    let filteredItemsArray = []
    Object.keys(this.state.filterObject).map(filter => {
      const filterFromArray = filteredItemsArray.length ? filteredItemsArray : this.dropdownItemsArray
      filteredItemsArray = filterFromArray.filter(item => item[filter] === this.state.filterObject[filter])
    })
    this.createFilterDropdown(filteredItemsArray)
  }
  createHTMLDropdownMarkup (initial = false) {
    const htmlMarkup = Object.keys(this.dropdownItemsObject).map(key => {
      return (
        <div className={`${styles.HeaderContainer}`} key={key}>
          <div className={styles.mainDropdown}>
            <div className={styles.LeftText}>
              <p>{key}</p>
            </div>
            <div className={`dropdown dropup-showing ${styles.dropDown}`}>
              <button className={`btn btn-default dropdown-toggle dropup-btn ${styles.dropDownBtn}`} type='button' data-toggle='dropdown'>
                {this.state.filterObject[key] ? this.state.filterObject[key] : 'Select'}
                <span className='caret' />
              </button>
              <ul className={`dropdown-menu menu ${styles.dropList}`}>
                {this.dropdownItemsObject[key].map((val, index) => {
                return (<li key={index}>
                  <a href='javascript:void(0)' id={`${key}-${index}`} onClick={e => this.dropdownFilter(e, val)}>{val}</a>
                </li>)
              })}
              </ul>
            </div>
          </div>
        </div>
        )
    })
    if (!initial) {
      this.setState({ filteredDropdownItemsObject: this.dropdownItemsObject })
    }
    return htmlMarkup
  }
  PenaltyCalender = () => {
    return (
      <div className={styles.HeaderContainer}>
        {/* dropDown */}
        <div className={styles.mainDropdown}>
          <div className={styles.LeftText}>
            <p>Period</p>
          </div>
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <RangePicker
              className={`RangePicker ${styles.rangePicker}`}
              onChange={(val) => this.calendarValue(val)}
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
      </div>
    )
  }

  isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }

  calendarValue = (value) => {
    let { perspectiveFilter } = this.state
    let a, b, aa, bb
    for (let i = 0; i < value.length; i++) {
      if (i === 0) {
        a = new Date(value[i]._d)
        b = a.toUTCString()
        this.setState({startDate: b})
      } else if (i === 1) {
        aa = new Date(value[i]._d)
        bb = aa.toUTCString()
        this.setState({endDate: bb})
      }
    }
    if (value.length > 1) {
      setTimeout(() => {
        perspectiveFilter['values_start_time'] = a.toISOString().slice(0, 19)
        perspectiveFilter['values_end_time'] = aa.toISOString().slice(0, 19)
      }, 300)
    } else {
      if (perspectiveFilter['values_start_time']) {
        delete perspectiveFilter['values_start_time']
        delete perspectiveFilter['values_end_time']
      }
    }
  }

  submitButton = () => {
    return (
      <div className={`${styles.HeaderContainer}`}>
        <div className={styles.mainDropdown}>
          <div className={styles.LeftText}>
            <p />
          </div>
          <button onClick={this.submitPerspectiveFilter} className={`btn btn-default dropup-btn ${styles.goBtn} ${styles.goFilter}`} type='button'>
            Go
          </button>
          <button onClick={this.clearFilter} className={`btn btn-default dropup-btn ${styles.dropDownBtnClear} ${styles.clearFilter}`} type='button'>
            Clear Filter
          </button>
        </div>
      </div>
    )
  }

  submitPerspectiveFilter = async () => {
    this.setState({loader: true})
    const { perspectiveFilter } = this.state
    await this.getComplianceData(perspectiveFilter)
  }
  getComplianceData = (perspectiveFilter) => {
    const stringifiedPerspectiveFilter = JSON.stringify(perspectiveFilter)
    const base64ecodedPerspectiveFilter = btoa(stringifiedPerspectiveFilter)
    console.log('perspectiveFilter', perspectiveFilter)
    axios
      .get(api.newPerspectiveFilter(base64ecodedPerspectiveFilter))
      .then(res => {
        console.log('res', res.data)
        this.setState({
          ActualBarChartValue: res.data && res.data[0].parts && res.data[0].parts[0].value,
          compliance: res.data && res.data[0].parts[0].value && res.data[0].parts[0].value.children && res.data[0].parts[0].value.children[0].value.sum,
          nonCompliance: res.data && res.data[0].parts[0].value && res.data[0].parts[0].value.children && res.data[0].parts[0].value.children[1].value.sum,
          penalty: res.data && res.data[0].parts[0].value && res.data[0].parts[0].value.children && res.data[0].parts[0].value.children[2].value.sum,
          ActualgranularityValue: this.state.granularityValue
        })
        this.loaderCheck(res)
      })
  }

  loaderCheck = async (res) => {
    if (res) {
      this.setState({loader: false})
    }
  }

  clearFilter = () => {
    let { perspectiveFilter, filterObject } = this.state
    delete perspectiveFilter['subject_id']
    delete perspectiveFilter['parts']
    filterObject = {}
    this.setState({
      perspectiveFilter,
      filterObject,
      compliance: 50,
      nonCompliance: 50,
      penalty: 0,
      BarChartValue: [],
      granularityValue: 'Select',
      ActualBarChartValue: []
    })
  }

  // end of new work
  render () {
    console.log('location', this.props.location)
    return (
      <div className={styles.MainContainer}>
        <div className={styles.MainHeaderContainer}>
          {/* dropDown */}
          {this.slaDropdowns()}
          {this.PenaltyCalender()}
          {this.submitButton()}
          <div className={styles.ContentContainer}>
            <div className={styles.leftContainer}>
              <div className={styles.chartContainer}>
                <div className={styles.barContainer}>
                  <div className={styles.pieChart}>
                    { !this.state.loader ? <div className={styles.Barchart}>
                      <Barchart BarChartValue={this.state.ActualBarChartValue} />
                    </div> : <Spin className={styles.spin} /> }
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

SlamSupplier.propTypes = {
  metaData: PropTypes.any,
  MetaModel: PropTypes.func,
  modelPerspectiveData: PropTypes.any,
  getMDPerspectiveDATA: PropTypes.func,
  location: PropTypes.any
  // isLoading: PropTypes.any
}
export default SlamSupplier
