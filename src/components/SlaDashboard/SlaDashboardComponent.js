import React from 'react'
import styles from './SlaDashboardComponent.scss'
import { Avatar, DatePicker } from 'antd'
import 'antd/dist/antd.css'
import './index.css'
import PropTypes from 'prop-types'
import PieChart from '../pieChart/pieChartComponent'
import Barchart from '../barchart/barchartComponent'
import { SlaDashboardJson } from './SlaDashboard'
import { SlaDashboardpenaltyJson } from './sla-dashboard-penalty.js'
import { SlaDashboardPieChartJson } from './sla-dashboard-compliance-pie-chart.js'
import { SlaDashboardBarChartJson } from './sla-dashboard-compliance-bar-chart.js'
const { RangePicker } = DatePicker

class SlaDashboard extends React.Component {
  constructor () {
    super()
    this.state = {
      SlaDashboardData: SlaDashboardJson,
      ActualSlaDashboardData: [],
      dupActualSlaDashboardData: [],
      SlaDashboardpenaltyJson: SlaDashboardpenaltyJson,
      SlaDashboardPieChartJson: SlaDashboardPieChartJson,
      SlaDashboardBarChartJson: SlaDashboardBarChartJson,
      ActualContractArr: [],
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
      drafts: 0,
      agreed: 0,
      active: 0,
      expired: 0,
      contractsArray: [],
      modelData: [],
      AdheresTo: [],
      loader: false,
      AgreedTo: [],
      departmentItems: [],
      supplierItems: [],
      serviceItems: [],
      kpiItems: [],
      BarChartValue: [],
      DropDownArray: [{
        name: 'Agreed To',
        id: 0
      }, {
        name: 'Adheres To',
        id: 0
      }, {
        name: 'Service Is Measured By',
        id: 0
      }, {
        name: 'Is Defined By KPI',
        id: 0
      }]
    }
  }
  componentDidMount () {
    this.unselectAll()
    this.props.MetaModel()
    this.props.getMDPerspectiveDATA()

    setTimeout(() => {
    //   if (this.state.departmentItems || this.state.supplierItems || this.state.serviceItems || this.state.kpiItems) {
      this.DepartmentId(this.state.DropDownArray[0].id)
      this.SupplierId(this.state.DropDownArray[1].id)
      this.ServiceId(this.state.DropDownArray[2].id)
      this.KpiId(this.state.DropDownArray[3].id)

      this.setState({loader: true})
    //   }
    }, 3000)
  }
  DepartmentId = (id) => {
    const payload = {
      user_id: id
    }
    this.props.getDropDownItemDep(payload)
  }
  SupplierId = (id) => {
    const payload = {
      user_id: id
    }
    this.props.getDropDownItemSup(payload)
  }
  ServiceId = (id) => {
    const payload = {
      user_id: id
    }
    this.props.getDropDownItemSer(payload)
  }
  KpiId = (id) => {
    const payload = {
      user_id: id
    }
    this.props.getDropDownItemKpi(payload)
  }
  componentWillReceiveProps (nextProps) {
    // New work

    var metaDataParts = nextProps.metaData.resources[0].parts
    var { DropDownArray } = this.state
    var actuallDropDownData = DropDownArray
    metaDataParts.forEach(element => {
      DropDownArray.forEach((dropdownData, i) => {
        if (element.name === dropdownData.name) {
          if (element.standard_property === null && element.type_property === null) {
            if (element.constraint_inverted === true) {
              actuallDropDownData[i].id = element.constraint.component_type.id
            } else {
              actuallDropDownData[i].id = element.constraint.target_component_type.id
            }
          }
        } else {
          if (element.standard_property === null && element.type_property === null && element.constraint_perspective !== null) {
            var constraintParts = element.constraint_perspective.parts
            constraintParts.forEach((constraintElement, j) => {
              DropDownArray.forEach((constraintDropDownData, k) => {
                if (constraintElement.name === constraintDropDownData.name) {
                  if (constraintElement.standard_property === null && constraintElement.type_property === null) {
                    if (constraintElement.constraint_inverted === true) {
                      actuallDropDownData[k].id = constraintElement.constraint.component_type.id
                    } else {
                      actuallDropDownData[k].id = constraintElement.constraint.target_component_type.id
                    }
                  }
                } else {
                  if (constraintElement.standard_property === null && constraintElement.type_property === null && constraintElement.constraint_perspective !== null) {
                    var NestedconstraintParts = constraintElement.constraint_perspective.parts
                    NestedconstraintParts.forEach((NestedconstraintElement, l) => {
                      DropDownArray.forEach((NestedconstraintDropDownData, m) => {
                        if (NestedconstraintElement.name === NestedconstraintDropDownData.name) {
                          if (NestedconstraintElement.standard_property === null && NestedconstraintElement.type_property === null) {
                            if (NestedconstraintElement.constraint_inverted === true) {
                              actuallDropDownData[m].id = NestedconstraintElement.constraint.component_type.id
                            } else {
                              actuallDropDownData[m].id = NestedconstraintElement.constraint.target_component_type.id
                            }
                          }
                        }
                      })
                    })
                  }
                }
              })
            })
          }
        }
      })
    })
    this.setState({
      DropDownArray: actuallDropDownData
    })
    var departmentItems = []
    var supplierItems = []
    var serviceItems = []
    var kpiItems = []
    var dep = nextProps.dropDownItemsDepData.resources
    var sup = nextProps.dropDownItemsSupData.resources
    var ser = nextProps.dropDownItemsSerData.resources
    var kpi = nextProps.dropDownItemsKpiData.resources
    dep.forEach((element, i) => {
      departmentItems.push(element.name)
    })
    sup.forEach((element, i) => {
      supplierItems.push(element.name)
    })
    ser.forEach((element, i) => {
      serviceItems.push(element.name)
    })
    kpi.forEach((element, i) => {
      kpiItems.push(element.name)
    })
    departmentItems = [...new Set(departmentItems)]
    supplierItems = [...new Set(supplierItems)]
    serviceItems = [...new Set(serviceItems)]
    kpiItems = [...new Set(kpiItems)]
    this.setState({
      departmentItems,
      supplierItems,
      serviceItems,
      kpiItems
    })
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
      console.log(obj)
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

  removeDuplication = (contractsArray) => {
    const uniqueArray = contractsArray.filter((thing, index) => {
      return index === contractsArray.findIndex(obj => {
        return JSON.stringify(obj) === JSON.stringify(thing)
      })
    })
    this.Contracts(uniqueArray)
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
      expired
    })
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
    this.contractValue(value, 'department')
  }
  SupplierDropDown = (value) => {
    this.setState({supplier: value})
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
    this.contractValue(value, 'supplier')
  }
  serviceDropDown = (value) => {
    this.setState({service: value})
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
    this.contractValue(value, 'service')
  }
  kpiDropDown = (value) => {
    this.setState({kpi: value})
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
    this.contractValue(value, 'kpi')
  }
  contractValue = (value, name) => {
    if (this.state.dupActualSlaDashboardData.length) {
      var arr = []
      if (name === 'department') {
        arr = this.state.dupActualSlaDashboardData.filter((data, i) => {
          return (value === data.department && this.state.supplier === data.supplier && this.state.service === data.service && this.state.kpi === data.kpi) || (value === data.department && this.state.supplier === data.supplier && this.state.service === data.service) || (value === data.department && this.state.kpi === data.kpi && this.state.supplier === data.supplier) || (value === data.department && this.state.kpi === data.kpi && this.state.service === data.service) || (value === data.department && this.state.kpi === data.kpi) || (value === data.department && this.state.service === data.service) || (value === data.department && this.state.supplier === data.supplier) || (value === data.department)
        })
      } else if (name === 'supplier') {
        arr = this.state.dupActualSlaDashboardData.filter((data, i) => {
          return (value === data.supplier && this.state.department === data.department && this.state.service === data.service && this.state.kpi === data.kpi) || (value === data.supplier && this.state.department === data.department && this.state.service === data.service) || (value === data.supplier && this.state.kpi === data.kpi && this.state.department === data.department) || (value === data.supplier && this.state.kpi === data.kpi && this.state.service === data.service) || (value === data.supplier && this.state.kpi === data.kpi) || (value === data.supplier && this.state.service === data.service) || (value === data.supplier && this.state.department === data.department) || (value === data.supplier)
        })
      } else if (name === 'service') {
        arr = this.state.dupActualSlaDashboardData.filter((data, i) => {
          return (value === data.service && this.state.supplier === data.supplier && this.state.department === data.department && this.state.kpi === data.kpi) || (value === data.service && this.state.supplier === data.supplier && this.state.department === data.department) || (value === data.service && this.state.kpi === data.kpi && this.state.supplier === data.supplier) || (value === data.service && this.state.kpi === data.kpi && this.state.department === data.department) || (value === data.service && this.state.kpi === data.kpi) || (value === data.service && this.state.department === data.department) || (value === data.service && this.state.supplier === data.supplier) || (value === data.service)
        })
      } else if (name === 'kpi') {
        arr = this.state.dupActualSlaDashboardData.filter((data, i) => {
          return (value === data.kpi && this.state.supplier === data.supplier && this.state.service === data.service && this.state.department === data.department) || (value === data.kpi && this.state.supplier === data.supplier && this.state.service === data.service) || (value === data.kpi && this.state.department === data.department && this.state.supplier === data.supplier) || (value === data.kpi && this.state.department === data.department && this.state.service === data.service) || (value === data.kpi && this.state.department === data.department) || (value === data.kpi && this.state.service === data.service) || (value === data.kpi && this.state.supplier === data.supplier) || (value === data.kpi)
        })
      }
      this.setState({ActualContractArr: arr})
      this.ActualContracts(arr)
      console.log(arr)
    }
  }
  SladropDown = (dupActualSlaDashboardData) => {
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
                            this.BarChartValue(val)
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
  SlaCalender = () => {
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
  badgesComponent = (text, number, color) => {
    return (
      <div className={styles.contractText}>
        <div className={`${styles.badgeContainer}`} style={{borderLeft: `5px solid ${color}`}}>
          <div className={styles.badgeText}>{text}</div>
          <Avatar className={styles.avatarOne} style={{backgroundColor: color}} size='medium'>
            {number}
          </Avatar>
        </div>
      </div>
    )
  }
  cardContent = (date, supplier, service, penalty) => {
    return (
      <div className={styles.cards}>
        <p className={styles.date}>{date}</p>
        <p className={styles.cardText}>
          <span className={styles.cardLeftText}>Supplier:</span>
          <span className={styles.cardRightText}>{supplier}</span>
        </p>
        <p className={styles.cardText}>
          <span className={styles.cardLeftText}>Service:</span>
          <span className={styles.cardRightText}>{service}</span>
        </p>
        <p className={styles.cardTextOne}>
          <span className={styles.cardLeftText}>Penalty:</span>
          <span className={styles.cardRightTextColor}>{penalty}%</span>
        </p>
      </div>
    )
  }
  BarChartValue = (val) => {
    var { SlaDashboardBarChartJson } = this.state
    var BarChartValue = []
    SlaDashboardBarChartJson[0].parts[0].value.map((data, i) => {
      var arr = data.children.filter((value, j) => {
        return val === value.key
      })
      if (arr.length) {
        BarChartValue.push(arr)
      }
    })
    this.setState({BarChartValue})
  }
  render () {
    console.log('render')
      return (
        <div>
          { this.state.loader
            ? <div className={styles.MainContainer}>
              <div>
                {this.SladropDown(this.state.dupActualSlaDashboardData)}
                {this.SlaCalender()}
                <div className={styles.ContentContainer}>
                  <div className={styles.leftContainer}>
                    <div className={styles.contractContainer}>
                      <div className={styles.contractText}>
                        <a href='javascript:void(0)' className={styles.Text}>
                          Contracts <Avatar className={styles.avatarOne} style={{backgroundColor: 'lightgreen'}} size='medium'>
                            {this.state.drafts + this.state.agreed + this.state.active + this.state.expired}
                          </Avatar>
                        </a>
                      </div>
                      {this.badgesComponent('Draft', this.state.drafts, 'orange')}
                      {this.badgesComponent('Agreed', this.state.agreed, '#fd397a')}
                      {this.badgesComponent('Active', this.state.active, '#0abb87')}
                      {this.badgesComponent('Expired', this.state.expired, '#3e0abb')}
                    </div>
                    <div className={styles.chartContainer}>
                      <div className={styles.pieContainer}>
                        <div className={styles.pieChart}>
                          <div className={styles.chart}>
                            <div className={styles.chartText}>
                              <span>Compliance</span>
                            </div>
                            <div className={styles.Mainchart}>
                              <PieChart valueOne={this.state.SlaDashboardPieChartJson[0].parts[0].value[0].value.count} valueTwo={this.state.SlaDashboardPieChartJson[0].parts[0].value[1].value.count} />
                            </div>
                          </div>
                        </div>
                        <div className={styles.penaltyChart}>
                          <div className={styles.chart}>
                            <div className={styles.chartText}>
                              <span>Penalty</span>
                            </div>
                            <div className={styles.Mainchart}>
                              <Avatar className={styles.avatarTwo} size='large'>
                                {this.state.SlaDashboardpenaltyJson[0].parts[0].value[0].value.sum}
                              </Avatar>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.barContainer}>
                        <div className={styles.pieChart}>
                          <div className={styles.Barchart}>
                            <Barchart BarChartValue={this.state.BarChartValue} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.rightContainer}>
                    <div className={styles.headerText}>
                        DOLA
                    </div>
                    {this.cardContent('12/04/2019', 'Huawei', 'Supervision', '2')}
                    {this.cardContent('12/04/2019', 'Huawei', '2G Availability', '3')}
                  </div>
                </div>
              </div>
            </div>
            : ''
          }
        </div>
      )
  }
}

SlaDashboard.propTypes = {
  metaData: PropTypes.any,
  MetaModel: PropTypes.func,
  modelPerspectiveData: PropTypes.any,
  getMDPerspectiveDATA: PropTypes.func,
  dropDownItemsDepData: PropTypes.any,
  getDropDownItemDep: PropTypes.func,
  dropDownItemsSupData: PropTypes.any,
  getDropDownItemSup: PropTypes.func,
  dropDownItemsSerData: PropTypes.any,
  getDropDownItemSer: PropTypes.func,
  dropDownItemsKpiData: PropTypes.any,
  getDropDownItemKpi: PropTypes.func
}
export default SlaDashboard
