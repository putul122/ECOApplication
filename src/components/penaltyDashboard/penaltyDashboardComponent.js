import React from 'react'
import styles from './penaltyDashboardComponent.scss'
import { DatePicker } from 'antd'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import moment from 'moment'
import './index.css'
import _ from 'lodash'

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
      finalTableData: [],
      dateFilteredData: [],
      dateFilterSet: false,
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

  componentDidMount () {
    this.props.penaltyMetaModel()
    this.props.penaltygetMDPerspectiveDATA()
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
    let penaltyState = {
      kpi: '',
      service: '',
      supplier: ''
    }
    await this.setState({penaltyState, dupPenaltyApiData: this.state.PenaltyApiData, UniqueArr, departmentFilter, supplierFilter, serviceFilter, department: 'Select', supplier: 'Select', service: 'Select', kpi: 'Select'})
    this.tableFilter()
  }

  tableFilter = (ActuallArr1 = []) => {
    let arr = []
    if (this.state.penaltyState.service !== '' && this.state.penaltyState.supplier !== '' && this.state.penaltyState.kpi !== '') {
      arr = this.props.penaltymodelPerspectiveData.filter((data, i) => {
        const supplier = (data && data.parts && data.parts[1].value[0].target_component.name) || ''
        const service = (data && data.parts && data.parts[2].value.subject_part.value) || ''
        const kpi = (data && data.parts && data.parts[3].value.subject_part.value) || ''
        return (this.state.penaltyState.service === service && this.state.penaltyState.supplier === supplier && this.state.penaltyState.kpi === kpi)
      })
    } else if (this.state.penaltyState.service !== '' && this.state.penaltyState.supplier !== '') {
      arr = this.props.penaltymodelPerspectiveData.filter((data, i) => {
        const supplier = (data && data.parts && data.parts[1].value[0].target_component.name) || ''
        const service = (data && data.parts && data.parts[2].value.subject_part.value) || ''
        return (this.state.penaltyState.service === service && this.state.penaltyState.supplier === supplier)
      })
    } else if (this.state.penaltyState.service !== '' && this.state.penaltyState.kpi !== '') {
      arr = this.props.penaltymodelPerspectiveData.filter((data, i) => {
        const service = (data && data.parts && data.parts[2].value.subject_part.value) || ''
        const kpi = (data && data.parts && data.parts[3].value.subject_part.value) || ''
        return (this.state.penaltyState.service === service && this.state.penaltyState.kpi === kpi)
      })
    } else if (this.state.penaltyState.supplier !== '' && this.state.penaltyState.kpi !== '') {
      arr = this.props.penaltymodelPerspectiveData.filter((data, i) => {
        const supplier = (data && data.parts && data.parts[1].value[0].target_component.name) || ''
        const kpi = (data && data.parts && data.parts[3].value.subject_part.value) || ''
        return (this.state.penaltyState.supplier === supplier && this.state.penaltyState.kpi === kpi)
      })
    } else if (this.state.penaltyState.supplier !== '') {
      arr = this.props.penaltymodelPerspectiveData.filter((data, i) => {
        if (data.parts) {
          const supplier = (data && data.parts && data.parts[1].value[0].target_component.name) || ''
          return (this.state.penaltyState.supplier === supplier)
        }
      })
    } else if (this.state.penaltyState.service !== '') {
      arr = this.props.penaltymodelPerspectiveData.filter((data, i) => {
        const service = (data && data.parts && data.parts[2].value.subject_part.value) || ''
        return (this.state.penaltyState.service === service)
      })
    } else if (this.state.penaltyState.kpi !== '') {
      arr = this.props.penaltymodelPerspectiveData.filter((data, i) => {
        const kpi = (data && data.parts && data.parts[3].value.subject_part.value) || ''
        return (this.state.penaltyState.kpi === kpi)
      })
    } else {
      arr = this.props.penaltymodelPerspectiveData
    }
    let finalArr = []
    arr.forEach(data => {
      if (data && data.parts && data.parts[4].value.subject_part.value.length) {
        data.parts[4].value.subject_part.value.forEach(item => {
          let penalty = (item && item.values && item.values.Penalty && item.values.Penalty.value) || ''
          let score = (item && item.values && item.values.Score && item.values.Score.value) || ''
          let target = (item && item.values && item.values.Target && item.values.Target.value) || ''
          let date = item.timestamp

          let obj1 = {
            supplier: data && data.parts && data.parts[1].value[0].target_component.name,
            service: data && data.parts && data.parts[2].value.subject_part.value,
            kpi: data && data.parts && data.parts[3].value.subject_part.value,
            penalty: penalty,
            score: score,
            target: target,
            date: date
          }
          finalArr.push(obj1)
        })
      } else {
        let obj1 = {
          supplier: data && data.parts && data.parts[1].value[0].target_component.name,
          service: data && data.parts && data.parts[2].value.subject_part.value,
          kpi: data && data.parts && data.parts[3].value.subject_part.value,
          penalty: '',
          score: '',
          target: '',
          date: ''
        }
        finalArr.push(obj1)
      }
    })
    if (this.state.dateFilterSet) {
      this.valueAccordingToCalendar(finalArr)
    } else {
      this.setState({finalTableData: finalArr, currentPage: 1})
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

  calendarValue = async (value, ActuallArr1, ActuallArr) => {
    if (value.length) {
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
    } else {
      await this.setState({ startDate: '', endDate: '', dateFilterSet: false })
      this.tableFilter()
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
      if (!this.state.finalTableData.length) {
        const dupData = []
        this.props.penaltymodelPerspectiveData.forEach(penaltyContract => {
          if (this.props.penaltymodelPerspectiveData[i].parts[4].value.subject_part.value.length) {
            this.props.penaltymodelPerspectiveData[i].parts[4].value.subject_part.value.forEach(item => {
              let penalty = (item && item.values && item.values.Penalty && item.values.Penalty.value) || ''
              let score = (item && item.values && item.values.Score && item.values.Score.value) || ''
              let target = (item && item.values && item.values.Target && item.values.Target.value) || ''
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
              dupData.push(obj1)
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
            dupData.push(obj1)
          }
        })
        this.setState({finalTableData: dupData})
      }
    }
  }

  valueAccordingToCalendar = (ActuallArr1 = []) => {
    // var { ActualSlaDashboardData } = this.state
    let sDate = moment(this.state.startDate).unix()
    let eDate = moment(this.state.endDate).unix()
    let rawData = []
    if (ActuallArr1.length) {
      rawData = ActuallArr1
    } else if (this.state.finalTableData.length) {
      rawData = this.state.finalTableData
    } else {
      this.props.penaltymodelPerspectiveData.forEach(data => {
        if (data && data.parts && data.parts[4].value.subject_part.value.length) {
          data.parts[4].value.subject_part.value.forEach(item => {
            let penalty = (item && item.values && item.values.Penalty && item.values.Penalty.value) || ''
            let score = (item && item.values && item.values.Score && item.values.Score.value) || ''
            let target = (item && item.values && item.values.Target && item.values.Target.value) || ''
            let date = item.timestamp

            let obj1 = {
              supplier: data.parts[1].value[0].target_component.name,
              service: data.parts[2].value.subject_part.value,
              kpi: data.parts[3].value.subject_part.value,
              penalty: penalty,
              score: score,
              target: target,
              date: date
            }
            rawData.push(obj1)
          })
        } else {
          let obj1 = {
            supplier: data && data.parts && data.parts[1].value[0].target_component.name,
            service: data && data.parts && data.parts[2].value.subject_part.value,
            kpi: data && data.parts && data.parts[3].value.subject_part.value,
            penalty: '',
            score: '',
            target: '',
            date: ''
          }
          rawData.push(obj1)
        }
      })
    }
    const finalData = rawData.filter(penaltyContract => {
      if (penaltyContract.date.length) {
        let valDate = moment(penaltyContract.date).unix()
        return (valDate >= sDate && valDate <= eDate)
      }
    })
    this.setState({ finalTableData: finalData, dateFilterSet: true, currentPage: 1 })
  }
  PenaltyCalender = (ActuallArr1, ActuallArr) => {
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
              onChange={(val) => this.calendarValue(val, ActuallArr1, ActuallArr)}
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
  pageSizeBlurHandler = async e => {
  }
  pageSizeChangeHandler = async e => {
    await this.setState({
      pageSize: +e.target.value
    })
  }
  pageSizeBlurHandler = () => {
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
    console.log('this.state.dateFilteredData', this.state.dateFilteredData)

    // filter and actual data
    for (let i = 0; i < penaltymodelPerspectiveDataCount; i++) {
      let date = new Date(this.props.penaltymodelPerspectiveData[i].parts[0].value.date_time_value)
      let obj = {
        department: '',
        supplier: this.props.penaltymodelPerspectiveData[i].parts[1].value[0].target_component.name,
        service: this.props.penaltymodelPerspectiveData[i].parts[2].value.subject_part.value,
        kpi: this.props.penaltymodelPerspectiveData[i].parts[3].value.subject_part.value,
        expDate: date.toUTCString()
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

    const finalDataForTable = (this.state.finalTableData.length || this.state.dateFilterSet) ? this.state.finalTableData : ActuallArr1
    const {
      previousClass,
      nextClass,
      currentPage,
      pageSize
    } = this.state
    const totalPages = Math.ceil(
      finalDataForTable.length / pageSize
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
    const endValueOfRange = (currentPage * pageSize) <= finalDataForTable.length ? (currentPage * pageSize) : finalDataForTable.length
    const totalItems = finalDataForTable.length
    var activeClass = ''
    const pagTable = []

    for (let i = startValueOfRange - 1; i < endValueOfRange; i++) {
      pagTable.push(finalDataForTable[i])
    }

    return (
      <div className={styles.MainContainer}>
        {this.PenaltydropDown(finalDepFilter, finalSupFilter, finalSerFilter, finalKpiFil, ActuallArr, ActuallArr1)}
        {this.PenaltyCalender(ActuallArr1, ActuallArr)}
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
                  {pagTable.map((item, index) => {
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
                {item.date ? moment(new Date(item.date)).format('DD-MM-YYYY') : ''}
              </td>
            </tr>)
          })}
                </tbody>
              </table>
            </div>
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
                  <li><a href='javascript:void(0)' onClick={(e) => this.showingPage(e, 10)}>10</a></li>
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
