import React from 'react'
import styles from './penaltyDashboardComponent.scss'
import { DatePicker } from 'antd'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import moment from 'moment'
import './index.css'
// import _ from 'lodash'
// import moment = require('moment');

const { RangePicker } = DatePicker

class PenaltyDashboard extends React.Component {
  constructor () {
    super()
    this.state = {
      PenaltyDashboardData: [],
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
      departmentDropDownArray: [],
      supplierDropDownArray: [],
      serviceDropDownArray: [],
      kpiDropDownArray: [],
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

  // componentWillMount () {
  //   this.unselectAll()
  //   this.props.penaltyMetaModel()
  //   this.props.penaltygetMDPerspectiveDATA()
  //   this.props.getMDPerspectiveDATA()
  // }

  componentDidMount () {
    // let { apiData, PenaltyDashboardData } = this.state
    // for (let i = 0; i < PenaltyDashboardData.length; i++) {
    //   apiData.push({
    //     department: PenaltyDashboardData[i].parts[2].value.subject_part.value,
    //     supplier: PenaltyDashboardData[i].parts[3].value.subject_part.value,
    //     service: PenaltyDashboardData[i].parts[4].value.subject_part.value,
    //     kpi: PenaltyDashboardData[i].parts[5].value.subject_part.value,
    //     expDate: PenaltyDashboardData[i].parts[1].value.date_time_value
    //   })
    // }
    // this.setState({apiData})
    this.props.penaltyMetaModel()
    this.props.penaltygetMDPerspectiveDATA()
    // this.props.getMDPerspectiveDATA()
  }
  // componentWillReceiveProps (nextProps) {
  //   let ActuallArr1 = []
  //   let ActuallArr = []

  //   // Preparing the table
  //   for (let i = 0; i < nextProps.penaltymodelPerspectiveData.length; i++) {
  //     if (nextProps.penaltymodelPerspectiveData[i].parts[4].value.subject_part.value.length) {
  //       nextProps.penaltymodelPerspectiveData[i].parts[4].value.subject_part.value.forEach(item => {
  //         let penalty = item.values.Penalty.value
  //         let score = item.values.Score.value
  //         let target = item.values.Target.value
  //         let date = item.timestamp

  //         let obj1 = {
  //           supplier: nextProps.penaltymodelPerspectiveData[i].parts[1].value[0].target_component.name,
  //           service: nextProps.penaltymodelPerspectiveData[i].parts[2].value.subject_part.value,
  //           kpi: nextProps.penaltymodelPerspectiveData[i].parts[3].value.subject_part.value,
  //           penalty: penalty,
  //           score: score,
  //           target: target,
  //           date: date
  //         }
  //         ActuallArr1.push(obj1)
  //       })
  //     } else {
  //       let obj1 = {
  //         supplier: nextProps.penaltymodelPerspectiveData[q].parts[1].value[0].target_component.name,
  //         service: nextProps.penaltymodelPerspectiveData[q].parts[2].value.subject_part.value,
  //         kpi: nextProps.penaltymodelPerspectiveData[q].parts[3].value.subject_part.value,
  //         penalty: '',
  //         score: '',
  //         target: '',
  //         date: ''
  //       }
  //       ActuallArr1.push(obj1)
  //     }
  //   }
  //   // this.setState({PenaltyApiData: ActuallArr1, dupPenaltyApiData: ActuallArr1})

  //   // filter and actual data
  //   for (let i = 0; i < nextProps.modelPerspectiveData.length; i++) {
  //     let obj = {
  //       department: '',
  //       supplier: nextProps.penaltymodelPerspectiveData[i].parts[1].value[0].target_component.name,
  //       service: nextProps.penaltymodelPerspectiveData[i].parts[2].value.subject_part.value,
  //       kpi: nextProps.penaltymodelPerspectiveData[i].parts[3].value.subject_part.value
  //     }
  //     ActuallArr.push(obj)
  //   }

  //   let depFilter = []
  //   let supFilter = []
  //   let serFilter = []
  //   let kpiFil = []
  //   console.log('ActualArr', ActuallArr)
  //   ActuallArr.forEach((data) => {
  //     depFilter.push(data.department)
  //     supFilter.push(data.supplier)
  //     serFilter.push(data.service)
  //     kpiFil.push(data.kpi)
  //   })
  //   console.log('ActualArrAfter', ActuallArr)
  //   this.setState({
  //     UniqueArr: [...new Set(depFilter)],
  //     departmentFilter: [...new Set(supFilter)],
  //     supplierFilter: [...new Set(serFilter)],
  //     serviceFilter: [...new Set(kpiFil)],
  //     ActualSlaDashboardData: ActuallArr,
  //     dupActualSlaDashboardData: ActuallArr
  //   })
  // }

  // shouldComponentUpdate (nextProps, nextState) {
  //   // this.setState({ departmentDropDownArray, supplierDropDownArray, serviceDropDownArray, KPIDropDownArray })
  //   if (nextState.departmentDropDownArray && this.state.departmentDropDownArray.length !== nextState.departmentDropDownArray) {
  //     return true
  //   }
  //   if (nextState.supplierDropDownArray && this.state.supplierDropDownArray.length !== nextState.supplierDropDownArray) {
  //     console.log('sup')
  //     return true
  //   }
  //   if (nextState.serviceDropDownArray && this.state.serviceDropDownArray.length !== nextState.serviceDropDownArray) {
  //     console.log('serv')
  //     return true
  //   }
  //   if (nextState.kpiDropDownArray && this.state.kpiDropDownArray.length !== nextState.kpiDropDownArray) {
  //     console.log('here')
  //     return true
  //   }
  //   return false
  // }
  unselectAll = () => {
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
    this.setState({dupPenaltyApiData: this.state.PenaltyApiData, UniqueArr, departmentFilter, supplierFilter, serviceFilter, department: 'Select', supplier: 'Select', service: 'Select', kpi: 'Select'})
  }
  tableFilter = (ActuallArr1) => {
    let arr = []
    let finalArr = []
    console.log('ActuallArr1', ActuallArr1)
    if (this.state.penaltyState.service !== '' && this.state.penaltyState.supplier !== '' && this.state.penaltyState.kpi !== '') {
      arr = ActuallArr1.filter((data, i) => {
        return (this.state.penaltyState.service === data.service && this.state.penaltyState.supplier === data.supplier && this.state.penaltyState.kpi === data.kpi)
      })
      this.setState({dupPenaltyApiData: arr})
    } else if (this.state.penaltyState.service !== '' && this.state.penaltyState.supplier !== '') {
      arr = ActuallArr1.filter((data, i) => {
        return (this.state.penaltyState.service === data.service && this.state.penaltyState.supplier === data.supplier)
      })
      this.setState({dupPenaltyApiData: arr})
    } else if (this.state.penaltyState.service !== '' && this.state.penaltyState.kpi !== '') {
      arr = ActuallArr1.filter((data, i) => {
        return (this.state.penaltyState.service === data.service && this.state.penaltyState.kpi === data.kpi)
      })
      this.setState({dupPenaltyApiData: arr})
    } else if (this.state.penaltyState.supplier !== '' && this.state.penaltyState.kpi !== '') {
      arr = ActuallArr1.filter((data, i) => {
        return (this.state.penaltyState.supplier === data.supplier && this.state.penaltyState.kpi === data.kpi)
      })
      this.setState({dupPenaltyApiData: arr})
    } else if (this.state.penaltyState.supplier !== '') {
      arr = ActuallArr1.filter((data, i) => {
        return (this.state.penaltyState.supplier === data.supplier)
      })
      this.setState({dupPenaltyApiData: arr})
    } else if (this.state.penaltyState.service !== '') {
      arr = ActuallArr1.filter((data, i) => {
        return (this.state.penaltyState.service === data.service)
      })
      console.log('arr serv', arr)
      this.setState({dupPenaltyApiData: arr})
    } else if (this.state.penaltyState.kpi !== '') {
      arr = ActuallArr1.filter((data, i) => {
        return (this.state.penaltyState.kpi === data.kpi)
      })
      this.setState({dupPenaltyApiData: arr})
    } else {
      arr = ActuallArr1
      this.setState({dupPenaltyApiData: ActuallArr1})
    }

    // Filtering by date
    if (this.state.startDate !== '' && this.state.endDate !== '') {
      const startTime = moment(this.state.startDate).unix()
      const endTime = moment(this.state.endDate).unix()
      finalArr = arr.filter(item => {
        if (item.date) {
          const itemTime = moment(item.date).unix()
          return itemTime > startTime && itemTime < endTime
        }
      })
      this.setState({dupPenaltyApiData: arr})
    } else if (this.startDate !== '') {
      const startTime = moment(this.state.startDate).unix()
      finalArr = arr.filter(item => {
        if (item.date) {
          const itemTime = moment(item.date).unix()
          return itemTime > startTime
        }
      })
      this.setState({dupPenaltyApiData: arr})
    } else if (this.endDate !== '') {
      const endTime = moment(this.state.endDate).unix()
      finalArr = arr.filter(item => {
        if (item.date) {
          const itemTime = moment(item.date).unix()
          return itemTime < endTime
        }
      })
      this.setState({dupPenaltyApiData: finalArr})
    } else {
      this.setState({dupPenaltyApiData: finalArr})
    }
  }
  departmentDropDown = (value, ActuallArr) => {
    this.setState({department: value})
    var { dupActualSlaDashboardData } = this.state
    const dropDownData = dupActualSlaDashboardData.length ? dupActualSlaDashboardData : ActuallArr
    var array = dropDownData.filter(data => {
      if (data.department === value && data.service === this.state.service && data.supplier === this.state.supplier && data.kpi === this.state.kpi) {
        return (data.department === value && data.service === this.state.service && data.supplier === this.state.supplier && data.kpi === this.state.kpi)
      } else if (data.department === value && data.kpi === this.state.kpi && data.supplier === this.state.supplier) {
        return (data.department === value && data.kpi === this.state.kpi && data.supplier === this.state.supplier)
      } else if (data.department === value && data.service === this.state.service && data.kpi === this.state.kpi) {
        return (data.department === value && data.service === this.state.service && data.kpi === this.state.kpi)
      } else if (data.department === value && data.service === this.state.service && data.supplier === this.state.supplier) {
        return (data.department === value && data.service === this.state.service && data.supplier === this.state.supplier)
      } else if (data.department === value && data.kpi === this.state.kpi) {
        return (data.department === value && data.kpi === this.state.kpi)
      } else if (data.department === value && data.supplier === this.state.supplier) {
        return (data.department === value && data.supplier === this.state.supplier)
      } else if (data.department === value && data.service === this.state.service) {
        return (data.department === value && data.service === this.state.service)
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
  SupplierDropDown = (value, ActuallArr, ActuallArr1) => {
    var { penaltyState } = this.state
    penaltyState.supplier = value
    this.setState({supplier: value, penaltyState})
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

    if (this.state.startDate !== '' || this.state.endDate !== '') {
      this.setState(() => { return { startDate: '', endDate: '' } })
    }
    this.tableFilter(ActuallArr1)
  }

  serviceDropDown = (value, ActuallArr, ActuallArr1) => {
    var { penaltyState } = this.state
    penaltyState.service = value
    this.setState({service: value, penaltyState})
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
    this.tableFilter(ActuallArr1)
  }
  kpiDropDown = (value, ActuallArr, ActuallArr1) => {
    var { penaltyState } = this.state
    penaltyState.kpi = value
    this.setState({kpi: value, penaltyState})
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
    this.tableFilter(ActuallArr1)
  }
  PenaltydropDown = (depDropDownArray, supDropDownArray, serDropDownArray, kpiDropDownArray, ActuallArr, ActuallArr1) => {
    let departmentDropDownArray = this.state.UniqueArr.length ? this.state.UniqueArr : depDropDownArray
    let supplierDropDownArray = this.state.departmentFilter.length ? this.state.departmentFilter : supDropDownArray
    let serviceDropDownArray = this.state.supplierFilter.length ? this.state.supplierFilter : serDropDownArray
    let KPIDropDownArray = this.state.serviceFilter.length ? this.state.serviceFilter : kpiDropDownArray

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
                departmentDropDownArray.map((val, key) => {
                  return (
                    <li key={key}>
                      <a href='javascript:void(0)'
                        onClick={() => this.departmentDropDown(val, ActuallArr)}
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
                supplierDropDownArray.map((val, key) => {
                  return (
                    <li key={key}>
                      <a href='javascript:void(0)'
                        onClick={() => {
                            this.SupplierDropDown(val, ActuallArr, ActuallArr1)
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
                serviceDropDownArray.map((val, key) => {
                  return (
                    <li key={key}>
                      <a href='javascript:void(0)'
                        onClick={() => this.serviceDropDown(val, ActuallArr, ActuallArr1)}
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
                KPIDropDownArray.map((val, key) => {
                  return (
                    <li key={key}>
                      <a href='javascript:void(0)'
                        onClick={() => this.kpiDropDown(val, ActuallArr, ActuallArr1)}
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
      this.tableFilter()
    }
  }
  valueAccordingToCalendar = () => {
    var { ActualSlaDashboardData } = this.state
    console.log(ActualSlaDashboardData)
    var dupActualSlaDashboardData = []
    var sDate = new Date(this.state.startDate).getTime()
    var eDate = new Date(this.state.endDate).getTime()

    for (var i = 0; i < ActualSlaDashboardData.length; i++) {
      var valDate = new Date(ActualSlaDashboardData[i].expDate).getTime()
      if (valDate >= sDate && valDate <= eDate) {
        dupActualSlaDashboardData.push(ActualSlaDashboardData[i])
      }
    }
    this.setState({dupActualSlaDashboardData})
    // this.unselectAll()
    this.tableFilter()
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
    console.log('his.props.penaltymodelPerspectiveData', this.props.penaltymodelPerspectiveData)
    let ActuallArr1 = []
    let ActuallArr = []
    let depFilter = []
    let supFilter = []
    let serFilter = []
    let kpiFil = []
    let finalDepFilter = []
    let finalSupFilter = []
    let finalSerFilter = []
    let finalKpiFil = []

    // Preparing the table
    let penaltymodelPerspectiveDataCount = this.props.penaltymodelPerspectiveData.length ? this.props.penaltymodelPerspectiveData.length - 1 : 0

    if (penaltymodelPerspectiveDataCount) {
      for (let i = 0; i < 200; i++) {
        if (this.props.penaltymodelPerspectiveData[i].parts[4].value.subject_part.value.length) {
          this.props.penaltymodelPerspectiveData[i].parts[4].value.subject_part.value.forEach(item => {
            let penalty = item.values.Penalty.value
            let score = item.values.Score.value
            let target = item.values.Target.value
            let date = item.timestamp

            let obj1 = {
              supplier: this.props.penaltymodelPerspectiveData[i].parts[1].value[0].target_component.name,
              service: this.props.penaltymodelPerspectiveData[i].parts[2].value.subject_part.value,
              kpi: this.props.penaltymodelPerspectiveData[i].parts[3].value.subject_part.value,
              penalty: penalty,
              score: score,
              target: target,
              date: date
            }
            ActuallArr1.push(obj1)
          })
        } else {
          let obj1 = {
            supplier: this.props.penaltymodelPerspectiveData[i].parts[1].value[0].target_component.name,
            service: this.props.penaltymodelPerspectiveData[i].parts[2].value.subject_part.value,
            kpi: this.props.penaltymodelPerspectiveData[i].parts[3].value.subject_part.value,
            penalty: '',
            score: '',
            target: '',
            date: ''
          }
          ActuallArr1.push(obj1)
        }
      }
    }
    let tableData = this.state.dupPenaltyApiData.length ? this.state.dupPenaltyApiData : ActuallArr1

    // filter and actual data
    for (let i = 0; i < penaltymodelPerspectiveDataCount; i++) {
      let obj = {
        department: '',
        supplier: this.props.penaltymodelPerspectiveData[i].parts[1].value[0].target_component.name,
        service: this.props.penaltymodelPerspectiveData[i].parts[2].value.subject_part.value,
        kpi: this.props.penaltymodelPerspectiveData[i].parts[3].value.subject_part.value
      }
      ActuallArr.push(obj)
    }

    ActuallArr.forEach((data) => {
      depFilter.push(data.department)
      supFilter.push(data.supplier)
      serFilter.push(data.service)
      kpiFil.push(data.kpi)
    })

    finalDepFilter = [...new Set(depFilter)]
    finalSupFilter = [...new Set(supFilter)]
    finalSerFilter = [...new Set(serFilter)]
    finalKpiFil = [...new Set(kpiFil)]

    return (
      <div className={styles.MainContainer}>
        {this.PenaltydropDown(finalDepFilter, finalSupFilter, finalSerFilter, finalKpiFil, ActuallArr, ActuallArr1)}
        {this.PenaltyCalender()}
        <div className={styles.ContentContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.tableContainer}>
              <table
                className='m-portlet table table-striped- table-hover table-checkable dataTable no-footer'
                id='m_table_1'
                aria-describedby='m_table_1_info'
                role='grid'
      >
                <thead className='table-head'>
                  <tr role='row' className='table-head-row'>
                    <th className='table-th'>
                      <p>Supplier</p>
                    </th>
                    <th className='table-th'>
                      <p>Service</p>
                    </th>
                    <th className='table-th'>
                      <p>KPI</p>
                    </th>
                    <th className='table-th'>
                      <p>Target</p>
                    </th>
                    <th className='table-th'>
                      <p>Actual</p>
                    </th>
                    <th className='table-th'>
                      <p>Penalty</p>
                    </th>
                    <th className='table-th'>
                      <p>Date</p>
                    </th>
                  </tr>
                </thead>
                <tbody className='table-body'>
                  {tableData.map((item, index) => {
            return (<tr key={index} className='table-tr'>
              <td className='table-td'>
                {item.supplier}
              </td>
              <td className='table-td'>
                {item.service}
              </td>
              <td className='table-td'>
                {item.kpi}
              </td>
              <td className='table-td'>
                {item.target}
              </td>
              <td className='table-td'>
                {item.score}
              </td>
              <td className='table-td'>
                {item.penalty}
              </td>
              <td className='table-td'>
                {item.date ? moment(new Date(item.date)).format('DD-MM-YYYY') : 0}
              </td>
            </tr>)
          })}
                </tbody>
              </table>
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
  penaltygetMDPerspectiveDATA: PropTypes.func
  // getMDPerspectiveDATA: PropTypes.func
}
export default PenaltyDashboard
