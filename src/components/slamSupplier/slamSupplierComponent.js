import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from 'antd'
import styles from './slamSupplierComponent.scss'
import 'antd/dist/antd.css'
import Barchart from '../barchart/barchartComponent'

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
      dupActualSlaDashboardData: [],
      departmentFilter: [],
      serviceMultipleArray: [],
      kpiMultipleArray: [],
      startDate: this.props && this.props.location && this.props.location.state && this.props.location.state.slaStartDate ? this.props.location.state.slaStartDate : null,
      endDate: this.props && this.props.location && this.props.location.state && this.props.location.state.slaEndDate ? this.props.location.state.slaEndDate : null,
      supplier: this.props && this.props.location && this.props.location.state && this.props.location.state.slaSupplier ? this.props.location.state.slaSupplier : 'Select',
      slaComparisonArray: this.props && this.props.location && this.props.location.state && this.props.location.state.slaComparisonArray ? this.props.location.state.slaComparisonArray : [],
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
      if (this.props.location.state.slaService !== 'Select') {
        this.serviceDropDown(this.props.location.state.slaService, this.state.slaComparisonArray, true)
      } else if (this.props.location.state.slaKpi !== 'Select') {
        this.kpiDropDown(this.props.location.state.slaKpi, this.state.slaComparisonArray, true)
      } else if (this.props.location.state.slaSupplier !== 'Select') {
        this.supplierDropDown(this.props.location.state.slaSupplier, this.state.slaComparisonArray, true)
      }
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
    let slamState = {
      kpi: '',
      service: '',
      supplier: ''
    }
    this.unCheck()
    await this.setState({slamState, UniqueArr, departmentFilter, supplierFilter, serviceFilter, department: 'Select', supplier: 'Select', service: 'Select', kpi: 'Select'})
  }
  unCheck = () => {
    let x = document.getElementsByClassName('checkbox')
    console.log('-----', x)
    for (let i = 0; i < x.length; i++) {
       x[i].checked = false
     }
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
                    <li key={key} className={styles.listDrop}>
                      <input type='checkbox' name='supplier' value={val} className={`checkbox ${styles.checkBox}`} onChange={(e) => this.supplierDropDown(val, actuallArr, e.target.checked)} />
                      <a href='javascript:void(0)'
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
                        onClick={() => this.serviceDropDown(val, actuallArr, false)}
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
            <button className={`btn btn-default dropdown-toggle dropup-btn ${styles.dropDownBtn} ${styles.largeBtn}`} type='button' data-toggle='dropdown'>
              {this.state.kpi}
              <span className='caret' />
            </button>
            <ul className={`dropdown-menu menu ${styles.dropList}`}>
              {
                KPIDropDownArray.map((val, key) => {
                  return (
                    <li key={key}>
                      <a href='javascript:void(0)'
                        onClick={() => this.kpiDropDown(val, actuallArr, false)}
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
            <p>Period</p>
          </div>
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <RangePicker
              className='RangePicker'
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

  supplierDropDown = (value, ActuallArr, checked) => {
    var { slamState, serviceMultipleArray, kpiMultipleArray } = this.state
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
      } else {
        return (data.supplier === value)
      }
    })
    console.log('array', array)
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
    if (checked) {
      for (let i = 0; i < UniqueArrser.length; i++) {
        serviceMultipleArray.push(UniqueArrser[i])
      }
      for (let i = 0; i < UniqueArrkpi.length; i++) {
        kpiMultipleArray.push(UniqueArrkpi[i])
      }
      let checkBox = document.getElementsByClassName('checkbox')
      for (let i = 0; i < checkBox.length; i++) {
        if (checkBox[i].value === value) {
          checkBox[i].checked = true
        }
      }
    } else {
      for (let i = 0; i < UniqueArrser.length; i++) {
        let index = serviceMultipleArray.indexOf(UniqueArrser[i])
        if (index !== -1) {
          serviceMultipleArray.splice(index, 1)
        }
      }
      for (let i = 0; i < UniqueArrkpi.length; i++) {
        let index = kpiMultipleArray.indexOf(UniqueArrkpi[i])
        if (index !== -1) {
          kpiMultipleArray.splice(index, 1)
        }
      }
    }
    this.setState({supplier: value, supplierFilter: [...new Set(serviceMultipleArray)], UniqueArr: UniqueArrDep, serviceFilter: [...new Set(kpiMultipleArray)]})
  }

  serviceDropDown = (value, ActuallArr, checked) => {
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
      } else {
        return (data.service === value)
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
    if (checked) {
      setTimeout(() => {
        let checkBox = document.getElementsByClassName('checkbox')
        for (let j = 0; j < checkBox.length; j++) {
          if (checkBox[j].value === this.state.supplier) {
            checkBox[j].checked = true
          }
        }
      }, 1000)
    }
    this.setState({service: value, serviceFilter: UniqueArrkpi, UniqueArr: UniqueArruni, departmentFilter: UniqueArrsupp})
  }

  kpiDropDown = (value, ActuallArr, checked) => {
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
      } else {
        return (data.kpi === value)
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
    if (checked) {
      setTimeout(() => {
        let checkBox = document.getElementsByClassName('checkbox')
        for (let j = 0; j < checkBox.length; j++) {
          if (checkBox[j].value === this.state.supplier) {
            checkBox[j].checked = true
          }
        }
      }, 1000)
    }
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
  MetaModel: PropTypes.func,
  modelPerspectiveData: PropTypes.any,
  getMDPerspectiveDATA: PropTypes.func,
  location: PropTypes.any
}
export default SlamSupplier
