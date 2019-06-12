import React, { Component } from 'react'
import { DatePicker, Spin } from 'antd'
// import _ from 'lodash'
import 'antd/dist/antd.css'
import './index.css'
import PropTypes from 'prop-types'
import axios from 'axios'

// import AgreementScoring from '../agreementScoring/AgreementScoringComponent'
// import PieChart from '../pieChart/pieChartComponent'
// import Barchart from '../barchart/barchartComponent'
// import axios from 'axios'
// import api from '../../constants'

// const { RangePicker } = DatePicker

import styles from './SlaDashboardComponent.scss'
import SlaDashboardMainComponent from './slaDashboardMainComponent'
import ScoringComponent from '../Scoring/ScoringComponent'
import PenaltyComponent from '../Penalty/PenaltyComponent'
import PerformanceComponent from '../Performance/PerformanceComponent'

import api from '../../constants'

const { RangePicker } = DatePicker

class SlaDashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filterObject: {},
      filteredDropdownItemsObject: {},
      perspectiveFilter: {},
      startDate: '',
      endDate: '',
      compliance: 50,
      loader: false,
      nonCompliance: 50,
      penalty: 0,
      BarChartValue: [],
      ActualBarChartValue: [],
      granularityValue: 'Select',
      ActualgranularityValue: 'Select',
      scoringGridModelData: [],
      penaltySummaryModelData: [],
      penaltyModelData: [],
      currentPerformanceModelData: [],
      package: 54381,
      granularityDropDown: [
        {
          name: 'Daily',
          id: 54379
        },
        {
          name: 'Monthly',
          id: 54381
        },
        {
          name: 'Quarterly',
          id: 54382
        },
        {
          name: 'Yearly',
          id: 54383
        }
      ]
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
    this.props.agreementScoringMetaModel()
  }

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
          dropdownItemObject[this.dropdownLabels[i]] = part && part.value && part.value.subject_part && part.value.subject_part.value[0] && part.value.subject_part.value[0].target_component && part.value.subject_part.value[0].target_component.name
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
    const filterLabel = e.target.id.split('-')[0]
    filterObject[filterLabel] = val
    // Object.keys(filterObject).map((key) => {

    // })
    let idArray = this.dropdownItemsObjectWithIds[filterLabel].filter((value) => {
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

  getComplianceData = (perspectiveFilter) => {
    const stringifiedPerspectiveFilter = JSON.stringify(perspectiveFilter)
    const base64ecodedPerspectiveFilter = btoa(stringifiedPerspectiveFilter)
    console.log('perspectiveFilter', perspectiveFilter)
    axios
      .get(api.newPerspectiveFilter(base64ecodedPerspectiveFilter))
      .then(res => {
        this.setState({
          ActualBarChartValue: res.data && res.data[0].parts && res.data[0].parts[0].value,
          compliance: res.data && res.data[0].parts[0].value && res.data[0].parts[0].value.children && res.data[0].parts[0].value.children[0].value.sum,
          nonCompliance: res.data && res.data[0].parts[0].value && res.data[0].parts[0].value.children && res.data[0].parts[0].value.children[1].value.sum,
          penalty: res.data && res.data[0].parts[0].value && res.data[0].parts[0].value.children && res.data[0].parts[0].value.children[2].value.sum,
          ActualgranularityValue: this.state.granularityValue
        })
      })

    axios
      .get(api.scoringModelperspectives(base64ecodedPerspectiveFilter))
      .then(res => {
        console.log('scoring', res.data)
        this.setState({
          scoringGridModelData: res.data
        })
      })

    axios
      .get(api.penaltySummaryModelperspectives(base64ecodedPerspectiveFilter))
      .then(res => {
        this.setState({
          penaltySummaryModelData: res.data
        })
      })

    axios
      .get(api.penaltyModelperspectives(base64ecodedPerspectiveFilter))
      .then(res => {
        console.log('penalty', res.data)
        this.setState({
          penaltyModelData: res.data
        })
      })
    axios
      .get(api.currentPerformanceModelperspectives(base64ecodedPerspectiveFilter))
      .then(res => {
        this.setState({
          currentPerformanceModelData: res.data
        })
      })
    this.loaderCheck()
  }

  loaderCheck = async () => {
    const { currentPerformanceModelData, penaltyModelData, penaltySummaryModelData, scoringGridModelData } = this.state
    if (currentPerformanceModelData && penaltyModelData && penaltySummaryModelData && scoringGridModelData) {
      this.setState({loader: false})
    }
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
      <div className={`dropdown dropup-showing ${styles.goButton}`}>
        <button onClick={this.submitPerspectiveFilter} className={`btn btn-default dropup-btn ${styles.goBtn} ${styles.clearFilter}`} type='button'>
          Go
        </button>
      </div>
    )
  }

  submitPerspectiveFilter = async () => {
    this.setState({loader: true})
    const { perspectiveFilter } = this.state
    await this.getComplianceData(perspectiveFilter)
  }

  gradFun = (val) => {
    const { perspectiveFilter } = this.state
    perspectiveFilter['time_type_id'] = val.id
    this.setState({ granularityValue: val.name, perspectiveFilter })
  }

  clearButton = () => {
    return (
      <div className={styles.HeaderContainerClear}>
        <div className={styles.mainDropdown}>
          <div className={styles.LeftText}>
            <p>Granularity</p>
          </div>
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <button className={`btn btn-default dropdown-toggle dropup-btn ${styles.dropDownBtn}`} type='button' data-toggle='dropdown'>
              {this.state.granularityValue}
              <span className='caret' />
            </button>
            <ul className={`dropdown-menu menu ${styles.dropList}`}>
              {this.state.granularityDropDown.map((val, index) => {
              return (<li key={index}>
                <a href='javascript:void(0)' onClick={() => this.gradFun(val)}>{val.name}</a>
              </li>)
            })}
            </ul>
          </div>
        </div>
        <div className={`dropdown dropup-showing ${styles.dropDown}`}>
          <button onClick={this.clearFilter} className={`btn btn-default dropup-btn ${styles.dropDownBtnClear} ${styles.clearFilter}`} type='button'>
            Clear Filter
          </button>
        </div>
      </div>
    )
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

  tabs = () => {
    return (
      <div id='exTab2' className='container'>
        <ul className='nav nav-tabs nav-pills'>
          <li>
            <a className='active' href='#1' data-toggle='tab'>Dashboard</a>
          </li>
          <li className={styles.scoreBoard}>
            <a href='#2' data-toggle='tab'>Scorecard</a>
          </li>
          <li>
            <a href='#3' data-toggle='tab' className={styles.scorePenalty}>Scoring</a>
          </li>
          <li>
            <a href='#4' data-toggle='tab' className={styles.scorePenalty}>Penalty</a>
          </li>
          <li>
            <a href='#5' data-toggle='tab'>Perfomance</a>
          </li>
        </ul>
        <div className='tab-content'>
          <div className='tab-pane active' id='1'>
            {
              this.state.loader ? (<Spin className={styles.spin} />)
              : (<SlaDashboardMainComponent package={this.state.ActualgranularityValue} BarChartValue={this.state.ActualBarChartValue} pentaltyValue={this.state.penalty} nonComplianceValue={this.state.nonCompliance} complianceValue={this.state.compliance} />)
            }
          </div>
          <div className='tab-pane' id='2'>
            asd
          </div>
          <div className='tab-pane' id='3'>
            {
              this.state.loader ? (<Spin className={styles.spin} />)
              : (<ScoringComponent filter={this.state.scoringGridModelData} />)
            }
          </div>
          <div className='tab-pane' id='4'>
            {
              this.state.loader ? (<Spin className={styles.spin} />)
              : (<PenaltyComponent penaltySummaryModel={this.state.penaltySummaryModelData} penaltyModel={this.state.penaltyModelData} />)
            }
          </div>
          <div className='tab-pane' id='5'>
            {
              this.state.loader ? (<Spin className={styles.spin} />)
              : (<PerformanceComponent performanceModel={this.state.currentPerformanceModelData} />)
            }
          </div>
        </div>
      </div>
    )
  }

  render () {
    console.log('filterObj', this.state.filterObject)
    return (
      <div>
        {this.slaDropdowns()}
        <button onClick={() => {
          this.props.history.push('kpi-performances', {
              slaAgreeemnt: this.state.filterObject['Agreement'],
              slaDepartment: this.state.filterObject['Department'],
              slaSupplier: this.state.filterObject['Supplier']
            })
          }} className={`btn btn-default dropup-btn ${styles.dropDownBtn} ${styles.clearFilter}`} style={{width: '160px'}} type='button'>
          Kpi Performance
        </button>
        {this.PenaltyCalender()}
        {this.submitButton()}
        <button onClick={() => {
          this.props.history.push('sla-comparison', {
              slaAgreeemnt: this.state.filterObject['Agreement'],
              slaDepartment: this.state.filterObject['Department'],
              slaSupplier: this.state.filterObject['Supplier'],
              filterObject: this.state.filterObject
            })
          }} className={`btn btn-default dropup-btn ${styles.dropDownBtns} ${styles.clearFilter}`} type='button'>
          Supplier Comparison
        </button>
        <button onClick={() => {
          this.props.history.push('kpi-performances', {
              slaAgreeemnt: this.state.filterObject['Agreement'],
              slaDepartment: this.state.filterObject['Department'],
              slaSupplier: this.state.filterObject['Supplier']
            })
          }} className={`btn btn-default dropup-btn ${styles.dropDownBtns} ${styles.clearFilter}`} type='button'>
          Kpi Performance
        </button>
        {this.clearButton()}
        {this.tabs()}
      </div>
    )
  }
}

SlaDashboard.propTypes = {
  // agreementScoringMetaData: PropTypes.any,
  // agreementScoringModelPerspectiveData: PropTypes.any,
  metaData: PropTypes.any,
  MetaModel: PropTypes.func,
  modelPerspectiveData: PropTypes.any,
  getMDPerspectiveDATA: PropTypes.func,
  agreementScoringMetaModel: PropTypes.func,
  history: PropTypes.any
}

export default SlaDashboard
