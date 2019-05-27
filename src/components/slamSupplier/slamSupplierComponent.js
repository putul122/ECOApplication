import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './slamSupplierComponent.scss'
import Barchart from '../barchart/barchartComponent'

class SlamSupplier extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slamState: {
        supplier: '',
        service: '',
        kpi: ''
      },
      dupActualSlaDashboardData: [],
      departmentFilter: [],
      startDate: this.props && this.props.location && this.props.location.state && this.props.location.state.slaStartDate ? this.props.location.state.slaStartDate : null,
      endDate: this.props && this.props.location && this.props.location.state && this.props.location.state.slaEndDate ? this.props.location.state.slaEndDate : null,
      supplier: this.props && this.props.location && this.props.location.state && this.props.location.state.slaSupplier ? this.props.location.state.slaSupplier : 'Select',
      supplierFilter: [],
      departmentDropDownArray: [],
      supplierDropDownArray: [],
      serviceDropDownArray: [],
      kpiDropDownArray: [],
      service: this.props && this.props.location && this.props.location.state && this.props.location.state.slaService ? this.props.location.state.slaService : 'Select',
      serviceFilter: [],
      kpi: this.props && this.props.location && this.props.location.state && this.props.location.state.slaKpi ? this.props.location.state.slaKpi : 'Select'
    }
  }

  componentDidMount () {
    this.props.MetaModel()
    this.props.getMDPerspectiveDATA()
    setTimeout(() => {
      this.setState({
        loader: true
      })
    }, 5000)
  }

  unselectAll = async () => {
    let { dupActualSlaDashboardData } = this.state
    let repeatedArr = dupActualSlaDashboardData.map((data) => {
      return data.department
    })
    let repeatedArrdep = dupActualSlaDashboardData.map((data) => {
      return data.supplier
    })
    let repeatedArrsupp = dupActualSlaDashboardData.map((data) => {
      return data.service
    })
    let repeatedArrser = dupActualSlaDashboardData.map((data) => {
      return data.kpi
    })
    let UniqueArr = [...new Set(repeatedArr)]
    let departmentFilter = [...new Set(repeatedArrdep)]
    let supplierFilter = [...new Set(repeatedArrsupp)]
    let serviceFilter = [...new Set(repeatedArrser)]
    // this.departmentDropDown(UniqueArr[0])
    let slamState = {
      kpi: '',
      service: '',
      supplier: ''
    }
    await this.setState({slamState, UniqueArr, departmentFilter, supplierFilter, serviceFilter, department: 'Select', supplier: 'Select', service: 'Select', kpi: 'Select'})
  }

  BarChartValue = (val) => {
    let { SlaDashboardBarChartJson } = this.state
    let BarChartValue = []
    SlaDashboardBarChartJson[0].parts[0].value.map((data, i) => {
      let arr = data.children.filter((value, j) => {
        return val === value.key
      })
      if (arr.length) {
        BarChartValue.push(arr)
      }
    })
    this.setState({BarChartValue})
  }

  SupplierComparisonDropdown = (supDropDownArray, serDropDownArray, kpiDropDownArray, actuallArr) => {
    let supplierDropDownArray = this.state.departmentFilter.length ? this.state.departmentFilter : supDropDownArray
    let serviceDropDownArray = this.state.supplierFilter.length ? this.state.supplierFilter : serDropDownArray
    let KPIDropDownArray = this.state.serviceFilter.length ? this.state.serviceFilter : kpiDropDownArray

    return (
      <div className={styles.HeaderContainer}>
        <div className={styles.mainDropdown}>
          <div className={styles.LeftText}>
            <p>Supplier</p>
          </div>
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <button className={`btn btn-default dropdown-toggle dropup-btn ${styles.dropDownBtn} ${styles.largeBtn}`} type='button' data-toggle='dropdown'>
              {this.state.supplier}
              <span className='caret' />
            </button>
            <ul className={`dropdown-menu menu ${styles.dropList}`}>
              {
                supplierDropDownArray.map((val, key) => {
                  return (
                    <li key={key}>
                      <a href='javascript:void(0)'
                        onClick={() => {
                            this.supplierDropDown(val, actuallArr)
                            // this.BarChartValue(val)
                          }
                        }
                      >{val}</a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>

        <div className={styles.mainDropdown}>
          <div className={styles.LeftText}>
            <p>Service</p>
          </div>
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <button className={`btn btn-default dropdown-toggle dropup-btn ${styles.dropDownBtn} ${styles.largeBtn}`} type='button' data-toggle='dropdown'>
              {this.state.service}
              <span className='caret' />
            </button>
            <ul className={`dropdown-menu menu ${styles.dropList}`}>
              {
                serviceDropDownArray.map((val, key) => {
                  return (
                    <li key={key}>
                      <a href='javascript:void(0)'
                        onClick={() => this.serviceDropDown(val, actuallArr)}
                      >{val}</a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>

        <div className={styles.mainDropdown}>
          <div className={styles.LeftText}>
            <p>KPI</p>
          </div>
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <button className={`btn btn-default dropdown-toggle dropup-btn ${styles.dropDownBtn} ${styles.smallBtn}`} type='button' data-toggle='dropdown'>
              {this.state.kpi}
              <span className='caret' />
            </button>
            <ul className={`dropdown-menu menu ${styles.dropList}`}>
              {
                KPIDropDownArray.map((val, key) => {
                  return (
                    <li key={key}>
                      <a href='javascript:void(0)'
                        onClick={() => this.kpiDropDown(val, actuallArr)}
                       >{val}</a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <div className={styles.mainDropdown}>
          <div className={styles.LeftText}>
            <p className={styles.emptyPara} />
          </div>
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <button onClick={() => this.unselectAll()} className={`btn btn-default dropup-btn ${styles.dropDownBtn} ${styles.clearFilter}`} type='button'>
              Clear Filter
            </button>
          </div>
        </div>
      </div>
    )
  }

  supplierDropDown = (value, ActuallArr) => {
    var { slamState } = this.state
    slamState.supplier = value
    slamState.service = this.state.service !== 'Select' ? this.state.service : ''
    slamState.kpi = this.state.kpi !== 'Select' ? this.state.kpi : ''
    this.setState({supplier: value, slamState})
    var { dupActualSlaDashboardData } = this.state
    const dropDownData = dupActualSlaDashboardData.length ? dupActualSlaDashboardData : ActuallArr
    var array = dropDownData.filter((data) => {
      if (data.supplier === value && this.state.department === 'Select' && this.state.service === 'Select' && this.state.kpi === 'Select') {
        return (data.supplier === value)
      } else if (data.supplier === value && data.department === this.state.department && data.service === this.state.service && data.kpi === this.state.kpi) {
        return (data.supplier === value && data.department === this.state.department && data.service === this.state.service && data.kpi === this.state.kpi)
      } else if (data.supplier === value && data.kpi === this.state.kpi && data.service === this.state.service) {
        return (data.supplier === value && data.kpi === this.state.kpi && data.service === this.state.service)
      } else if (data.supplier === value && data.department === this.state.department && data.kpi === this.state.kpi) {
        return (data.supplier === value && data.department === this.state.department && data.kpi === this.state.kpi)
      } else if (data.supplier === value && data.department === this.state.department && data.service === this.state.service) {
        return (data.supplier === value && data.department === this.state.department && data.service === this.state.service)
      } else if (data.supplier === value && data.kpi === this.state.kpi) {
        return (data.supplier === value && data.kpi === this.state.kpi)
      } else if (data.supplier === value && data.service === this.state.service) {
        return (data.supplier === value && data.service === this.state.service)
      } else if (data.supplier === value && data.department === this.state.department) {
        return (data.supplier === value && data.department === this.state.department)
      }
    })
    var repeatedArrdep = array.map((data) => {
      return data.department
    })
    var repeatedArrser = array.map((data) => {
      return data.service
    })
    var repeatedArrkpi = array.map((data) => {
      return data.kpi
    })
    var UniqueArrDep = [...new Set(repeatedArrdep)]
    var UniqueArrser = [...new Set(repeatedArrser)]
    var UniqueArrkpi = [...new Set(repeatedArrkpi)]
    this.setState({supplier: value, supplierFilter: UniqueArrser, UniqueArr: UniqueArrDep, serviceFilter: UniqueArrkpi})
  }

  serviceDropDown = (value, ActuallArr) => {
    var { slamState } = this.state
    slamState.service = value
    slamState.supplier = this.state.supplier !== 'Select' ? this.state.supplier : ''
    slamState.kpi = this.state.kpi !== 'Select' ? this.state.kpi : ''
    this.setState({service: value, slamState})
    var { dupActualSlaDashboardData } = this.state
    const dropDownData = dupActualSlaDashboardData.length ? dupActualSlaDashboardData : ActuallArr
    var array = dropDownData.filter((data) => {
      if (data.service === value && this.state.department === 'Select' && this.state.supplier === 'Select' && this.state.kpi === 'Select') {
        return (data.service === value)
      } else if (data.service === value && data.department === this.state.department && data.supplier === this.state.supplier && data.kpi === this.state.kpi) {
        return (data.service === value && data.department === this.state.department && data.supplier === this.state.supplier && data.kpi === this.state.kpi)
      } else if (data.service === value && data.kpi === this.state.kpi && data.supplier === this.state.supplier) {
        return (data.service === value && data.kpi === this.state.kpi && data.supplier === this.state.supplier)
      } else if (data.service === value && data.department === this.state.department && data.kpi === this.state.kpi) {
        return (data.service === value && data.department === this.state.department && data.kpi === this.state.kpi)
      } else if (data.service === value && data.department === this.state.department && data.supplier === this.state.supplier) {
        return (data.service === value && data.department === this.state.department && data.supplier === this.state.supplier)
      } else if (data.service === value && data.kpi === this.state.kpi) {
        return (data.service === value && data.kpi === this.state.kpi)
      } else if (data.service === value && data.supplier === this.state.supplier) {
        return (data.service === value && data.supplier === this.state.supplier)
      } else if (data.service === value && data.department === this.state.department) {
        return (data.service === value && data.department === this.state.department)
      }
    })
    var repeatedArr = array.map((data) => {
      return data.kpi
    })
    var repeatedArruni = array.map((data) => {
      return data.department
    })
    var repeatedArrsupp = array.map((data) => {
      return data.supplier
    })
    var UniqueArrkpi = [...new Set(repeatedArr)]
    var UniqueArruni = [...new Set(repeatedArruni)]
    var UniqueArrsupp = [...new Set(repeatedArrsupp)]
    this.setState({service: value, serviceFilter: UniqueArrkpi, UniqueArr: UniqueArruni, departmentFilter: UniqueArrsupp})
  }

  kpiDropDown = (value, ActuallArr) => {
    var { slamState } = this.state
    slamState.kpi = value
    slamState.service = this.state.service !== 'Select' ? this.state.service : ''
    slamState.supplier = this.state.supplier !== 'Select' ? this.state.supplier : ''
    this.setState({kpi: value, slamState})
    var { dupActualSlaDashboardData } = this.state
    const dropDownData = dupActualSlaDashboardData.length ? dupActualSlaDashboardData : ActuallArr
    var array = dropDownData.filter((data) => {
      if (data.kpi === value && this.state.department === 'Select' && this.state.service === 'Select' && this.state.supplier === 'Select') {
        return (data.kpi === value)
      } else if (data.kpi === value && data.service === this.state.service && data.supplier === this.state.supplier && data.department === this.state.department) {
        return (data.kpi === value && data.service === this.state.service && data.supplier === this.state.supplier && data.department === this.state.department)
      } else if (data.kpi === value && data.department === this.state.department && data.supplier === this.state.supplier) {
        return (data.kpi === value && data.department === this.state.department && data.supplier === this.state.supplier)
      } else if (data.kpi === value && data.service === this.state.service && data.department === this.state.department) {
        return (data.kpi === value && data.service === this.state.service && data.department === this.state.department)
      } else if (data.kpi === value && data.service === this.state.service && data.supplier === this.state.supplier) {
        return (data.kpi === value && data.service === this.state.service && data.supplier === this.state.supplier)
      } else if (data.kpi === value && data.department === this.state.department) {
        return (data.kpi === value && data.department === this.state.department)
      } else if (data.kpi === value && data.supplier === this.state.supplier) {
        return (data.kpi === value && data.supplier === this.state.supplier)
      } else if (data.kpi === value && data.service === this.state.service) {
        return (data.kpi === value && data.service === this.state.service)
      }
    })
    var repeatedArrUni = array.map((data) => {
      return data.department
    })
    var repeatedArrdep = array.map((data) => {
      return data.supplier
    })
    var repeatedArrsupp = array.map((data) => {
      return data.service
    })
    var UniqueArruni = [...new Set(repeatedArrUni)]
    var UniqueArrdep = [...new Set(repeatedArrdep)]
    var UniqueArrsupp = [...new Set(repeatedArrsupp)]
    this.setState({kpi: value, UniqueArr: UniqueArruni, departmentFilter: UniqueArrdep, supplierFilter: UniqueArrsupp})
  }

  render () {
    let ActuallArr = []
    let supFilter = []
    let serFilter = []
    let kpiFil = []
    let finalSupFilter = []
    let finalSerFilter = []
    let finalKpiFil = []

    let modelPerspectiveDataCount = this.props.modelPerspectiveData.length ? this.props.modelPerspectiveData.length - 1 : 0

    // filter and actual data
    for (let i = 0; i < modelPerspectiveDataCount; i++) {
      let date = new Date(this.props.modelPerspectiveData[i].parts[0].value.date_time_value)
      let obj = {
        supplier: this.props && this.props.modelPerspectiveData[i] && this.props.modelPerspectiveData[i].parts[2] && this.props.modelPerspectiveData[i].parts[2].value[0] && this.props.modelPerspectiveData[i].parts[2].value[0].target_component && this.props.modelPerspectiveData[i].parts[2].value[0].target_component.name,
        service: this.props && this.props.modelPerspectiveData[i] && this.props.modelPerspectiveData[i].parts[6] && this.props.modelPerspectiveData[i].parts[6].value && this.props.modelPerspectiveData[i].parts[6].value.subject_part && this.props.modelPerspectiveData[i].parts[6].value.subject_part.value,
        kpi: this.props && this.props.modelPerspectiveData[i] && this.props.modelPerspectiveData[i].parts[7] && this.props.modelPerspectiveData[i].parts[7].value && this.props.modelPerspectiveData[i].parts[7].value.subject_part && this.props.modelPerspectiveData[i].parts[7].value.subject_part.value,
        expDate: date.toUTCString()
      }
      ActuallArr.push(obj)
    }

    ActuallArr.forEach((data) => {
      supFilter.push(data.supplier)
      serFilter.push(data.service)
      kpiFil.push(data.kpi)
    })

    finalSupFilter = [...new Set(supFilter)]
    finalSerFilter = [...new Set(serFilter)]
    finalKpiFil = [...new Set(kpiFil)]

    return (
      <div className={styles.MainContainer}>
        <div className={styles.HeaderContainer}>
          {/* dropDown */}
          {this.SupplierComparisonDropdown(finalSupFilter, finalSerFilter, finalKpiFil, ActuallArr)}
          <div className={styles.ContentContainer}>
            <div className={styles.leftContainer}>
              <div className={styles.chartContainer}>
                <div className={styles.barContainer}>
                  <div className={styles.pieChart}>
                    <div className={styles.Barchart}>
                      <Barchart />
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
}

SlamSupplier.propTypes = {
  // metaData: PropTypes.any,
  MetaModel: PropTypes.func,
  modelPerspectiveData: PropTypes.any,
  getMDPerspectiveDATA: PropTypes.func,
  location: PropTypes.any
  // history: PropTypes.any
}
export default SlamSupplier
