import React from 'react'
import styles from './penaltyDashboardComponent.scss'
import { DatePicker, Table } from 'antd'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import './index.css'
import _ from 'lodash'
import { PenaltyDashboardJson } from './penaltyDashboard'

const { RangePicker } = DatePicker

class PenaltyDashboard extends React.Component {
  constructor () {
    super()
    this.state = {
      PenaltyDashboardData: PenaltyDashboardJson,
      ActualSlaDashboardData: [],
      dupActualSlaDashboardData: [],
      PenaltyApiData: [],
      dupPenaltyApiData: [],
      penaltyState: {
        supplier: '',
        service: '',
        kpi: ''
      },
      NestedPenaltyApiData: [],
      UniqueArr: [],
      startDate: '',
      endDate: '',
      department: 'Select',
      departmentFilter: [],
      supplier: 'Select',
      supplierFilter: [],
      service: 'Select',
      serviceFilter: [],
      kpi: 'Select',
      apiData: [],
      pageSize: 10,
      currentPage: 1,
      previousClass: '',
      nextClass: '',
      totalPages: 1
    }
  }
  componentWillMount () {
    this.unselectAll()
    this.props.penaltyMetaModel()
    this.props.penaltygetMDPerspectiveDATA()
    this.props.getMDPerspectiveDATA()
  }
  componentDidMount () {
    var { apiData, PenaltyDashboardData } = this.state
    for (var i = 0; i < PenaltyDashboardData.length; i++) {
      apiData.push({
        department: PenaltyDashboardData[i].parts[2].value.subject_part.value,
        supplier: PenaltyDashboardData[i].parts[3].value.subject_part.value,
        service: PenaltyDashboardData[i].parts[4].value.subject_part.value,
        kpi: PenaltyDashboardData[i].parts[5].value.subject_part.value,
        expDate: PenaltyDashboardData[i].parts[1].value.date_time_value
      })
    }
    this.setState({apiData})
  }
  componentWillReceiveProps (nextProps) {
    var ActuallArr1 = []
    // var ActuallArr12 = []
    for (var q = 0; q < nextProps.penaltymodelPerspectiveData.length - 1; q++) {
      console.log('nextProps.penaltymodelPerspectiveData[q]', nextProps.penaltymodelPerspectiveData[q])
      // if (nextProps.penaltymodelPerspectiveData[q].parts[4].value.subject_part.value.length !== 0) {
      //   for (var x = 0; x < nextProps.penaltymodelPerspectiveData[q].parts[4].value.subject_part.value.length; x++) {
      //     var obj2 = {
      //       Target: nextProps.penaltymodelPerspectiveData[q].parts[4].value.subject_part.value[x].values.Target.value ? nextProps.penaltymodelPerspectiveData[q].parts[4].value.subject_part.value[x].timestamp : '',
      //       Actual: nextProps.penaltymodelPerspectiveData[q].parts[4].value.subject_part.value[x].values.Score.value ? nextProps.penaltymodelPerspectiveData[q].parts[4].value.subject_part.value[x].values.Score.value : '',
      //       expDate: nextProps.penaltymodelPerspectiveData[q].parts[4].value.subject_part.value[x].timestamp ? nextProps.penaltymodelPerspectiveData[q].parts[4].value.subject_part.value[x].timestamp : '',
      //       Penalty: nextProps.penaltymodelPerspectiveData[q].parts[4].value.subject_part.value[x].values.Penalty.value ? nextProps.penaltymodelPerspectiveData[q].parts[4].value.subject_part.value[x].values.Penalty.value : '',
      //       kpi: nextProps.penaltymodelPerspectiveData[q].parts[3].value.subject_part.value
      //     }
      //     console.log(obj2)
      //     ActuallArr12.push(obj2)
      //   }
      // } else {
      //   var obj3 = {}
      //   ActuallArr12.push(obj3)
      // }
      if (nextProps.penaltymodelPerspectiveData[q].parts[4].value.subject_part.value.length) {
        console.log('array')
      }
      var obj1 = {
        supplier: nextProps.penaltymodelPerspectiveData[q].parts[1].value[0].target_component.name,
        service: nextProps.penaltymodelPerspectiveData[q].parts[2].value.subject_part.value,
        kpi: nextProps.penaltymodelPerspectiveData[q].parts[3].value.subject_part.value
      }
      ActuallArr1.push(obj1)
    }
    this.setState({PenaltyApiData: ActuallArr1, dupPenaltyApiData: ActuallArr1})
    // filter and actual data
    var ActuallArr = []
    for (var i = 0; i < nextProps.modelPerspectiveData.length - 1; i++) {
      var date
      if (nextProps.modelPerspectiveData[i].parts[1].value !== null) {
        var dates = new Date(nextProps.modelPerspectiveData[i].parts[1].value.date_time_value)
        date = dates.toUTCString()
      } else {
        date = ''
      }
      var obj = {
        department: nextProps.modelPerspectiveData[i].parts[3].value[0].target_component.name,
        supplier: nextProps.modelPerspectiveData[i].parts[2].value[0].target_component.name,
        service: nextProps.modelPerspectiveData[i].parts[6].value.subject_part.value,
        kpi: nextProps.modelPerspectiveData[i].parts[7].value.subject_part.value,
        contracts: nextProps.modelPerspectiveData[i].parts[0].value !== null ? nextProps.modelPerspectiveData[i].parts[0].value.value_set_value.name : '',
        expDate: date
      }
      ActuallArr.push(obj)
    }
    this.setState({ActualSlaDashboardData: ActuallArr, dupActualSlaDashboardData: ActuallArr})
    var depFilter = []
    var supFilter = []
    var serFilter = []
    var kpiFil = []
    ActuallArr.map((data) => {
      depFilter.push(data.department)
      supFilter.push(data.supplier)
      serFilter.push(data.service)
      kpiFil.push(data.kpi)
    })
    this.setState({
      UniqueArr: [...new Set(depFilter)],
      departmentFilter: [...new Set(supFilter)],
      supplierFilter: [...new Set(serFilter)],
      serviceFilter: [...new Set(kpiFil)]
    })
    var drafts = 0
    var agreed = 0
    var active = 0
    var expired = 0
    for (var j = 0; j < ActuallArr.length; j++) {
      if (ActuallArr[j].contracts === 'Draft') {
        drafts = drafts + 1
      } else if (ActuallArr[j].contracts === 'Agreed') {
        agreed = agreed + 1
      } else if (ActuallArr[j].contracts === 'Operational') {
        active = active + 1
      } else if (ActuallArr[j].contracts === 'Expired') {
        expired = expired + 1
      }
    }
    this.setState({
      drafts,
      agreed,
      active,
      expired
    })
  }
  ActualContracts = (uniqueArray) => {
    var drafts = 0
    var agreed = 0
    var active = 0
    var expired = 0
    for (var i = 0; i < uniqueArray.length; i++) {
      if (uniqueArray[i].contracts === 'Draft') {
        drafts = drafts + 1
      } else if (uniqueArray[i].contracts === 'Agreed') {
        agreed = agreed + 1
      } else if (uniqueArray[i].contracts === 'Operational') {
        active = active + 1
      } else if (uniqueArray[i].contracts === 'Expired') {
        expired = expired + 1
      }
    }
    this.setState({
      drafts,
      agreed,
      active,
      expired
    })
  }
  unselectAll = () => {
    var { dupActualSlaDashboardData } = this.state
    var repeatedArr = dupActualSlaDashboardData.map((data) => {
      return data.department
    })
    var repeatedArrdep = dupActualSlaDashboardData.map((data) => {
      return data.supplier
    })
    var repeatedArrsupp = dupActualSlaDashboardData.map((data) => {
      return data.service
    })
    var repeatedArrser = dupActualSlaDashboardData.map((data) => {
      return data.kpi
    })
    var UniqueArr = [...new Set(repeatedArr)]
    var departmentFilter = [...new Set(repeatedArrdep)]
    var supplierFilter = [...new Set(repeatedArrsupp)]
    var serviceFilter = [...new Set(repeatedArrser)]
    // this.departmentDropDown(UniqueArr[0])
    this.setState({UniqueArr, departmentFilter, supplierFilter, serviceFilter, department: 'Select', supplier: 'Select', service: 'Select', kpi: 'Select'})
    var drafts = 0
    var agreed = 0
    var active = 0
    var expired = 0
    for (var i = 0; i < this.state.ActualSlaDashboardData.length; i++) {
      if (this.state.ActualSlaDashboardData[i].contracts === 'Draft') {
        drafts = drafts + 1
      } else if (this.state.ActualSlaDashboardData[i].contracts === 'Agreed') {
        agreed = agreed + 1
      } else if (this.state.ActualSlaDashboardData[i].contracts === 'Operational') {
        active = active + 1
      } else if (this.state.ActualSlaDashboardData[i].contracts === 'Expired') {
        expired = expired + 1
      }
    }
    this.setState({
      drafts,
      agreed,
      active,
      expired,
      dupPenaltyApiData: this.state.PenaltyApiData
    })
  }
  tableFilter = () => {
    var arr = []
    if (this.state.penaltyState.service !== '' && this.state.penaltyState.supplier !== '' && this.state.penaltyState.kpi !== '') {
      arr = this.state.PenaltyApiData.filter((data, i) => {
        return (this.state.penaltyState.service === data.service && this.state.penaltyState.supplier === data.supplier && this.state.penaltyState.kpi === data.kpi)
      })
      this.setState({dupPenaltyApiData: arr})
    } else if (this.state.penaltyState.service !== '' && this.state.penaltyState.supplier !== '') {
      arr = this.state.PenaltyApiData.filter((data, i) => {
        return (this.state.penaltyState.service === data.service && this.state.penaltyState.supplier === data.supplier)
      })
      this.setState({dupPenaltyApiData: arr})
    } else if (this.state.penaltyState.service !== '' && this.state.penaltyState.kpi !== '') {
      arr = this.state.PenaltyApiData.filter((data, i) => {
        return (this.state.penaltyState.service === data.service && this.state.penaltyState.kpi === data.kpi)
      })
      this.setState({dupPenaltyApiData: arr})
    } else if (this.state.penaltyState.supplier !== '' && this.state.penaltyState.kpi !== '') {
      arr = this.state.PenaltyApiData.filter((data, i) => {
        return (this.state.penaltyState.supplier === data.supplier && this.state.penaltyState.kpi === data.kpi)
      })
      this.setState({dupPenaltyApiData: arr})
    } else if (this.state.penaltyState.supplier !== '') {
      arr = this.state.PenaltyApiData.filter((data, i) => {
        return (this.state.penaltyState.supplier === data.supplier)
      })
      this.setState({dupPenaltyApiData: arr})
    } else if (this.state.penaltyState.service !== '') {
      arr = this.state.PenaltyApiData.filter((data, i) => {
        return (this.state.penaltyState.service === data.service)
      })
      this.setState({dupPenaltyApiData: arr})
    } else if (this.state.penaltyState.kpi !== '') {
      arr = this.state.PenaltyApiData.filter((data, i) => {
        return (this.state.penaltyState.kpi === data.kpi)
      })
      this.setState({dupPenaltyApiData: arr})
    } else {
      this.setState({dupPenaltyApiData: this.state.PenaltyApiData})
    }
  }
  departmentDropDown = (value) => {
    this.setState({department: value})
    var { dupActualSlaDashboardData } = this.state
    var array = dupActualSlaDashboardData.filter((data) => {
      if (data.department === value && data.service === this.state.service) {
        return (data.department === value && data.service === this.state.service)
      } else if (data.department === value && data.supplier === this.state.supplier) {
        return (data.department === value && data.supplier === this.state.supplier)
      } else if (data.department === value && data.kpi === this.state.kpi) {
        return (data.department === value && data.kpi === this.state.kpi)
      } else if (data.department === value && data.service === this.state.service && data.supplier === this.state.supplier) {
        return (data.department === value && data.service === this.state.service && data.supplier === this.state.supplier)
      } else if (data.department === value && data.service === this.state.service && data.kpi === this.state.kpi) {
        return (data.department === value && data.service === this.state.service && data.kpi === this.state.kpi)
      } else if (data.department === value && data.kpi === this.state.kpi && data.supplier === this.state.supplier) {
        return (data.department === value && data.kpi === this.state.kpi && data.supplier === this.state.supplier)
      } else if (data.department === value && data.service === this.state.service && data.supplier === this.state.supplier && data.kpi === this.state.kpi) {
        return (data.department === value && data.service === this.state.service && data.supplier === this.state.supplier && data.kpi === this.state.kpi)
      } else if (data.department === value && this.state.supplier === 'Select' && this.state.service === 'Select' && this.state.kpi === 'Select') {
        return (data.department === value)
      }
    })
    var repeatedArr = array.map((data) => {
      return data.supplier
    })
    var repeatedArrser = array.map((data) => {
      return data.service
    })
    var repeatedArrkpi = array.map((data) => {
      return data.kpi
    })
    var UniqueArr = [...new Set(repeatedArr)]
    var UniqueArrser = [...new Set(repeatedArrser)]
    var UniqueArrkpi = [...new Set(repeatedArrkpi)]
    this.setState({department: value, departmentFilter: UniqueArr, supplierFilter: UniqueArrser, serviceFilter: UniqueArrkpi})
  }
  SupplierDropDown = (value) => {
    var { penaltyState } = this.state
    penaltyState.supplier = value
    this.setState({supplier: value, penaltyState})
    var { dupActualSlaDashboardData } = this.state
    var array = dupActualSlaDashboardData.filter((data) => {
      if (data.supplier === value && data.department === this.state.department) {
        return (data.supplier === value && data.department === this.state.department)
      } else if (data.supplier === value && data.service === this.state.service) {
        return (data.supplier === value && data.service === this.state.service)
      } else if (data.supplier === value && data.kpi === this.state.kpi) {
        return (data.supplier === value && data.kpi === this.state.kpi)
      } else if (data.supplier === value && data.department === this.state.department && data.service === this.state.service) {
        return (data.supplier === value && data.department === this.state.department && data.service === this.state.service)
      } else if (data.supplier === value && data.department === this.state.department && data.kpi === this.state.kpi) {
        return (data.supplier === value && data.department === this.state.department && data.kpi === this.state.kpi)
      } else if (data.supplier === value && data.kpi === this.state.kpi && data.service === this.state.service) {
        return (data.supplier === value && data.kpi === this.state.kpi && data.service === this.state.service)
      } else if (data.supplier === value && data.department === this.state.department && data.service === this.state.service && data.kpi === this.state.kpi) {
        return (data.supplier === value && data.department === this.state.department && data.service === this.state.service && data.kpi === this.state.kpi)
      } else if (data.supplier === value && this.state.department === 'Select' && this.state.service === 'Select' && this.state.kpi === 'Select') {
        return (data.supplier === value)
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
    this.tableFilter()
  }
  serviceDropDown = (value) => {
    var { penaltyState } = this.state
    penaltyState.service = value
    this.setState({service: value, penaltyState})
    var { dupActualSlaDashboardData } = this.state
    var array = dupActualSlaDashboardData.filter((data) => {
      if (data.service === value && data.department === this.state.department) {
        return (data.service === value && data.department === this.state.department)
      } else if (data.service === value && data.supplier === this.state.supplier) {
        return (data.service === value && data.supplier === this.state.supplier)
      } else if (data.service === value && data.kpi === this.state.kpi) {
        return (data.service === value && data.kpi === this.state.kpi)
      } else if (data.service === value && data.department === this.state.department && data.supplier === this.state.supplier) {
        return (data.service === value && data.department === this.state.department && data.supplier === this.state.supplier)
      } else if (data.service === value && data.department === this.state.department && data.kpi === this.state.kpi) {
        return (data.service === value && data.department === this.state.department && data.kpi === this.state.kpi)
      } else if (data.service === value && data.kpi === this.state.kpi && data.supplier === this.state.supplier) {
        return (data.service === value && data.kpi === this.state.kpi && data.supplier === this.state.supplier)
      } else if (data.service === value && data.department === this.state.department && data.supplier === this.state.supplier && data.kpi === this.state.kpi) {
        return (data.service === value && data.department === this.state.department && data.supplier === this.state.supplier && data.kpi === this.state.kpi)
      } else if (data.service === value && this.state.department === 'Select' && this.state.supplier === 'Select' && this.state.kpi === 'Select') {
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
    this.setState({service: value, serviceFilter: UniqueArrkpi, UniqueArr: UniqueArruni, departmentFilter: UniqueArrsupp})
    this.tableFilter()
  }
  kpiDropDown = (value) => {
    var { penaltyState } = this.state
    penaltyState.kpi = value
    this.setState({kpi: value, penaltyState})
    var { dupActualSlaDashboardData } = this.state
    var array = dupActualSlaDashboardData.filter((data) => {
      if (data.kpi === value && data.service === this.state.service) {
        return (data.kpi === value && data.service === this.state.service)
      } else if (data.kpi === value && data.supplier === this.state.supplier) {
        return (data.kpi === value && data.supplier === this.state.supplier)
      } else if (data.kpi === value && data.department === this.state.department) {
        return (data.kpi === value && data.department === this.state.department)
      } else if (data.kpi === value && data.service === this.state.service && data.supplier === this.state.supplier) {
        return (data.kpi === value && data.service === this.state.service && data.supplier === this.state.supplier)
      } else if (data.kpi === value && data.service === this.state.service && data.department === this.state.department) {
        return (data.kpi === value && data.service === this.state.service && data.department === this.state.department)
      } else if (data.kpi === value && data.department === this.state.department && data.supplier === this.state.supplier) {
        return (data.kpi === value && data.department === this.state.department && data.supplier === this.state.supplier)
      } else if (data.kpi === value && data.service === this.state.service && data.supplier === this.state.supplier && data.department === this.state.department) {
        return (data.kpi === value && data.service === this.state.service && data.supplier === this.state.supplier && data.department === this.state.department)
      } else if (data.kpi === value && this.state.department === 'Select' && this.state.service === 'Select' && this.state.supplier === 'Select') {
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
    this.setState({kpi: value, UniqueArr: UniqueArruni, departmentFilter: UniqueArrdep, supplierFilter: UniqueArrsupp})
    this.tableFilter()
  }
  PenaltydropDown = (dupActualSlaDashboardData) => {
    return (
      <div className={styles.HeaderContainer}>
        {/* dropDown */}
        <div className={styles.mainDropdown}>
          <div className={styles.LeftText}>
            <p>Department</p>
          </div>
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <button className={`btn btn-default dropdown-toggle dropup-btn ${styles.dropDownBtn}`} type='button' data-toggle='dropdown'>
              {this.state.department}
              <span className='caret' />
            </button>
            <ul className={`dropdown-menu menu ${styles.dropList}`}>
              {
                this.state.UniqueArr.map((val, key) => {
                  return (
                    <li key={key}>
                      <a href='javascript:void(0)'
                        onClick={() => this.departmentDropDown(val)}
                      >{val}</a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        {/* dropDown */}
        <div className={styles.mainDropdown}>
          <div className={styles.LeftText}>
            <p>Supplier</p>
          </div>
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <button className={`btn btn-default dropdown-toggle dropup-btn ${styles.dropDownBtn}`} type='button' data-toggle='dropdown'>
              {this.state.supplier}
              <span className='caret' />
            </button>
            <ul className={`dropdown-menu menu ${styles.dropList}`}>
              {
                this.state.departmentFilter.map((val, key) => {
                  return (
                    <li key={key}>
                      <a href='javascript:void(0)'
                        onClick={() => {
                            this.SupplierDropDown(val)
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
        {/* dropDown */}
        <div className={styles.mainDropdown}>
          <div className={styles.LeftText}>
            <p>Service</p>
          </div>
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <button className={`btn btn-default dropdown-toggle dropup-btn ${styles.dropDownBtn}`} type='button' data-toggle='dropdown'>
              {this.state.service}
              <span className='caret' />
            </button>
            <ul className={`dropdown-menu menu ${styles.dropList}`}>
              {
                this.state.supplierFilter.map((val, key) => {
                  return (
                    <li key={key}>
                      <a href='javascript:void(0)'
                        onClick={() => this.serviceDropDown(val)}
                      >{val}</a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        {/* dropDown */}
        <div className={styles.mainDropdown}>
          <div className={styles.LeftText}>
            <p>KPI</p>
          </div>
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <button className={`btn btn-default dropdown-toggle dropup-btn ${styles.dropDownBtn}`} type='button' data-toggle='dropdown'>
              {this.state.kpi}
              <span className='caret' />
            </button>
            <ul className={`dropdown-menu menu ${styles.dropList}`}>
              {
                this.state.serviceFilter.map((val, key) => {
                  return (
                    <li key={key}>
                      <a href='javascript:void(0)'
                        onClick={() => this.kpiDropDown(val)}
                       >{val}</a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        {/* dropDown */}
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
  calendarValue = (value) => {
    for (var i = 0; i < value.length; i++) {
      if (i === 0) {
        var a = new Date(value[i]._d)
        var b = a.toUTCString()
        this.setState({startDate: b})
      } else if (i === 1) {
        var aa = new Date(value[i]._d)
        var bb = aa.toUTCString()
        this.setState({endDate: bb})
      }
    }
    if (value.length > 1) {
      setTimeout(() => {
        this.valueAccordingToCalendar()
      }, 300)
    } else {
      var depFilter = []
      var supFilter = []
      var serFilter = []
      var kpiFil = []
      this.state.ActualSlaDashboardData.map((data) => {
        depFilter.push(data.department)
        supFilter.push(data.supplier)
        serFilter.push(data.service)
        kpiFil.push(data.kpi)
      })
      this.setState({
        UniqueArr: [...new Set(depFilter)],
        departmentFilter: [...new Set(supFilter)],
        supplierFilter: [...new Set(serFilter)],
        serviceFilter: [...new Set(kpiFil)]
      })
      this.setState({dupActualSlaDashboardData: this.state.ActualSlaDashboardData})
    }
  }
  valueAccordingToCalendar = () => {
    var { ActualSlaDashboardData } = this.state
    console.log(ActualSlaDashboardData)
    var dupActualSlaDashboardData = []
    var sDate = new Date(this.state.startDate).getTime()
    var eDate = new Date(this.state.endDate).getTime()
    console.log(sDate)
    console.log(eDate)
    for (var i = 0; i < ActualSlaDashboardData.length; i++) {
      var valDate = new Date(ActualSlaDashboardData[i].expDate).getTime()
      if (valDate >= sDate && valDate <= eDate) {
        dupActualSlaDashboardData.push(ActualSlaDashboardData[i])
      }
    }
    console.log(dupActualSlaDashboardData)
    this.setState({dupActualSlaDashboardData})
    this.unselectAll()
    this.setState({
      drafts: 0,
      agreed: 0,
      active: 0,
      expired: 0
    })
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
              className='RangePicker'
              disabledDate={false}
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
  showingPage = (e, page) => {
    e.preventDefault()
    this.setState({ pageSize: page })
  }
  fetchUsersForGivenPageNumber = async (e, pageNumber, arrow = null) => {
    e.preventDefault()

    if (arrow === 'next') {
      await this.setState(prevState => {
        return { currentPage: prevState.currentPage + 1 }
      })
    } else if (arrow === 'prev') {
      await this.setState(prevState => {
        return { currentPage: prevState.currentPage - 1 }
      })
    } else if (arrow === 'end') {
      await this.setState(prevState => {
        return { currentPage: pageNumber }
      })
    } else if (arrow === 'start') {
      await this.setState(prevState => {
        return { currentPage: 1 }
      })
    } else {
      await this.setState({ currentPage: pageNumber })
    }
  }
  render () {
    console.log(this.props, 'qqqqqqq')
    const {
      // searchTerm,
      previousClass,
      nextClass,
      currentPage,
      // invitedEmail,
      pageSize
    } = this.state
    const totalPages = Math.ceil(
      this.state.PenaltyApiData.length / pageSize
    )
    let pageArray = []
    let paginationLimit = 6
    let i = 1
    while (i <= totalPages) {
      let pageParameter = {}
      pageParameter.number = i
      pageParameter.class = ''
      pageArray.push(pageParameter)
      i++
    }
    pageArray = _.chunk(pageArray, paginationLimit)
    const listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, { number: currentPage })
      if (found.length > 0) {
        return group
      }
    })

    const startValueOfRange = (currentPage - 1) * pageSize + 1
    const endValueOfRange = (currentPage * pageSize) <= this.state.PenaltyDashboardData.length ? (currentPage * pageSize) : this.state.PenaltyDashboardData.length
    const totalItems = this.state.PenaltyDashboardData.length
    var activeClass = ''

    const expandedRowRender = (key) => {
      const columns = [
        { title: 'Supplier', key: 'supplier' },
        { title: 'Service', dataIndex: 'service', key: 'service' },
        { title: 'KPI', key: 'kpi' },
        { title: 'Target', key: 'Target' },
        { title: 'Actual', key: 'Actual' },
        { title: 'Penalty', key: 'Penalty' },
        { title: 'Expired Date', key: 'expDate' }
      ]
      const data = []
      data.push(key)
      return (
        <Table
          showHeader={false}
          expandedRowRender={NestedexpandedRowRender}
          expandIconColumnIndex={1}
          columns={columns}
          dataSource={data}
          expandIconAsCell={false}
          pagination={false}
        />
      )
    }
    const NestedexpandedRowRender = (index) => {
      const columns = [
        { title: 'Supplier', key: 'supplier' },
        { title: 'Service', key: 'service' },
        { title: 'KPI', dataIndex: 'kpi', key: 'kpi' },
        { title: 'Target', dataIndex: 'Target', key: 'Target' },
        { title: 'Actual', dataIndex: 'Actual', key: 'Actual' },
        { title: 'Penalty', dataIndex: 'Penalty', key: 'Penalty' },
        { title: 'Expired Date', dataIndex: 'expDate', key: 'expDate' }
      ]
      console.log('----------', index)
      const Nesteddata = []
      // for (var i = 0; i < this.state.PenaltyApiData[index].nestedData.length; i++) {
      //   var obj = {}
      //   obj = {
      //     kpi: this.state.PenaltyApiData[i].kpi,
      //     Target: this.state.PenaltyApiData[i].nestedData[0].timestamp
      //   }
      //   Nesteddata.push(obj)
      // }
      Nesteddata.push(index)
      return (
        <Table
          showHeader={false}
          columns={columns}
          dataSource={Nesteddata}
          expandIconAsCell={false}
          pagination={false}
        />
      )
    }
    const columns = [
      { title: 'Supplier', dataIndex: 'supplier', key: 'supplier' },
      { title: 'Service', key: 'service' },
      { title: 'KPI', key: 'kpi' },
      { title: 'Target', key: 'Target' },
      { title: 'Actual', key: 'Actual' },
      { title: 'Penalty', key: 'Penalty' },
      { title: 'Expired Date', key: 'expDate' }
    ]
      return (
        <div className={styles.MainContainer}>
          {this.PenaltydropDown(this.state.PenaltyDashboardData)}
          {this.PenaltyCalender()}
          <div className={styles.ContentContainer}>
            <div className={styles.leftContainer}>
              <div className={styles.tableContainer}>
                <Table
                  className={`components-table-demo-nested ${styles.tableSize}`}
                  columns={columns}
                  expandIconAsCell={false}
                  expandedRowRender={expandedRowRender}
                  dataSource={this.state.dupPenaltyApiData}
                  pagination={false}
                  rowKey='Id'
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-12 col-md-6' id='scrolling_vertical'>
                <div
                  className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll'
                  id='scrolling_vertical'
                >
                  <div className='m-datatable__pager m-datatable--paging-loaded clearfix'>
                    <ul className='pagination pg-blue pag'>
                      {currentPage > 1 && (
                        <li className='page-item'>
                          <a
                            href=''
                            title='Previous'
                            id='m_blockui_1_5'
                            className={
                              'm-datatable__pager-link m-datatable__pager-link--prev page-link list links' +
                              previousClass
                            }
                            onClick={e =>
                              this.fetchUsersForGivenPageNumber(
                                e,
                                currentPage,
                                'start'
                              )
                            }
                          >
                            <span aria-hidden='true'>&laquo;</span>
                            <span className={'sr-only'}>Previous</span>
                          </a>
                        </li>
                      )}
                      {currentPage > 1 && (
                        <li className='page-item'>
                          <a
                            href=''
                            title='Previous'
                            id='m_blockui_1_5'
                            className={
                              'm-datatable__pager-link m-datatable__pager-link--prev page-link list links' +
                              previousClass
                            }
                            onClick={e =>
                              this.fetchUsersForGivenPageNumber(
                                e,
                                currentPage,
                                'prev'
                              )
                            }
                          >
                            <span aria-hidden='true'>&lt;</span>
                            <span className={'sr-only'}>Previous</span>
                          </a>
                        </li>
                      )}
                      {listPage[0] &&
                        listPage[0].map(page => {
                          if (page.number === currentPage) {
                            page.class =
                            'kt-datatable__pager-link--active activ'
                            activeClass = 'active'
                          } else {
                            activeClass = ''
                            page.class = ''
                          }

                          return (
                            <li key={page.number} className={'page-item' + activeClass}>
                              <a
                                href=''
                                className={`kt-datatable__pager-link kt-datatable__pager-link-number ${page.class} page-link list `}
                                data-page={page.number}
                                title={page.number}
                                onClick={e =>
                                  this.fetchUsersForGivenPageNumber(
                                    e,
                                    page.number
                                  )
                                }
                                >
                                {page.number}
                              </a>
                            </li>
                          )
                        })}
                      {currentPage !== totalPages &&
                        totalPages > 1 && (
                        <li className='page-item'>
                          <a
                            href=''
                            title='Next'
                            className={
                              'm-datatable__pager-link m-datatable__pager-link--next page-link list links' +
                              nextClass
                            }
                            onClick={e =>
                              this.fetchUsersForGivenPageNumber(
                                e,
                                currentPage,
                                'next'
                              )
                            }
                          >
                            <span aria-hidden='true'>&gt;</span>
                            <span className={'sr-only'}>Next</span>
                          </a>
                        </li>
                      )}
                      {currentPage !== totalPages &&
                        totalPages > 1 && (
                        <li className='page-item'>
                          <a
                            href=''
                            title='Next'
                            className={
                              'm-datatable__pager-link m-datatable__pager-link--next page-link list links' +
                              nextClass
                            }
                            onClick={e =>
                              this.fetchUsersForGivenPageNumber(
                                e,
                                totalPages,
                                'end'
                              )
                            }
                          >
                            <span aria-hidden='true'>&raquo;</span>
                            <span className={'sr-only'}>Next</span>
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className={`col-sm-12 col-md-6 text-right ${styles.topSpacing}`}>
                {/* showing dropdown */}
                <div className='showing-div showspace spaceMargin '>
                  <div className='dropdown dropup-showing'>
                    <button className='btn btn-default dropdown-toggle dropup-btn' type='button' data-toggle='dropdown'>{this.state.pageSize}<span className='caret' /></button>
                    <ul className='dropdown-menu menu'>
                      <li><a href='javascript:void(0)' onClick={(e) => this.showingPage(e, 1)}>10</a></li>
                      <li><a href='javascript:void(0)' onClick={(e) => this.showingPage(e, 20)}>20</a></li>
                      <li><a href='javascript:void(0)' onClick={(e) => this.showingPage(e, 30)}>30</a></li>
                      <li><a href='javascript:void(0)' onClick={(e) => this.showingPage(e, 40)}>40</a></li>
                      <li><a href='javascript:void(0)' onClick={(e) => this.showingPage(e, 50)}>50</a></li>
                    </ul>
                  </div>
                  <span className='showing-text text-right showingText'> Showing {startValueOfRange} - {endValueOfRange} of {totalItems} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
}
PenaltyDashboard.propTypes = {
  // penaltymetaData: PropTypes.any,
  penaltyMetaModel: PropTypes.func,
  penaltymodelPerspectiveData: PropTypes.any,
  penaltygetMDPerspectiveDATA: PropTypes.func,
  modelPerspectiveData: PropTypes.any,
  getMDPerspectiveDATA: PropTypes.func
}
export default PenaltyDashboard
