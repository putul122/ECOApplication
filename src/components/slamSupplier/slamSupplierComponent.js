import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from 'antd'
import Select from 'react-select'
import axios from 'axios'
import 'antd/dist/antd.css'

import styles from './slamSupplierComponent.scss'
import Barchart from '../barchart/barchartComponent'
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
      perspectiveFilter: {
        parts: {}
      },
      dupActualSlaDashboardData: [],
      departmentFilter: [],
      serviceMultipleArray: [],
      kpiMultipleArray: [],
      slaComparisonShowData: true,
      startDate: this.props && this.props.location && this.props.location.state && this.props.location.state.slaStartDate ? this.props.location.state.slaStartDate : null,
      endDate: this.props && this.props.location && this.props.location.state && this.props.location.state.slaEndDate ? this.props.location.state.slaEndDate : null,
      supplier: this.props && this.props.location && this.props.location.state && this.props.location.state.slaSupplier ? this.props.location.state.slaSupplier : 'Select',
      slaComparisonArray: this.props && this.props.location && this.props.location.state && this.props.location.state.slaComparisonArray ? this.props.location.state.slaComparisonArray : [],
      supplierFilter: [],
      supplierIdsArray: [],
      departmentDropDownArray: [],
      supplierDropDownArray: [],
      serviceDropDownArray: [],
      kpiDropDownArray: [],
      service: this.props && this.props.location && this.props.location.state && this.props.location.state.slaService ? this.props.location.state.slaService : 'Select',
      serviceFilter: [],
      kpi: this.props && this.props.location && this.props.location.state && this.props.location.state.slaKpi ? this.props.location.state.slaKpi : 'Select'
    }
  }

  componentWillReceiveProps (nextProps) {
    let ordersObject = {}
    let ActuallArr = []
    let supFilterId = []
    let serFilterId = []
    let kpiFilId = []

    for (let i = 0; i < nextProps.modelPerspectiveData.length - 1; i++) {
      let date
      if (nextProps.modelPerspectiveData[i].parts[1].value !== null) {
        let dates = new Date(nextProps.modelPerspectiveData[i].parts[1].value.date_time_value)
        date = dates.toUTCString()
      } else {
        date = ''
      }
      let obj = {
        subject_id: nextProps.modelPerspectiveData[i] && nextProps.modelPerspectiveData[i].subject_id,
        supplier: nextProps.modelPerspectiveData[i] && nextProps.modelPerspectiveData[i].parts && nextProps.modelPerspectiveData[i].parts[2].value && nextProps.modelPerspectiveData[i].parts[2].value[0].target_component && nextProps.modelPerspectiveData[i].parts[2].value[0].target_component.name,
        supplierId: nextProps.modelPerspectiveData[i] && nextProps.modelPerspectiveData[i].parts && nextProps.modelPerspectiveData[i].parts[2].value && nextProps.modelPerspectiveData[i].parts[2].value[0].target_component && nextProps.modelPerspectiveData[i].parts[2].value[0].target_component.id,
        service: nextProps.modelPerspectiveData[i] && nextProps.modelPerspectiveData[i].parts && nextProps.modelPerspectiveData[i].parts[6].value && nextProps.modelPerspectiveData[i].parts[6].value.subject_part && nextProps.modelPerspectiveData[i].parts[6].value.subject_part.value,
        serviceId: nextProps.modelPerspectiveData[i] && nextProps.modelPerspectiveData[i].parts && nextProps.modelPerspectiveData[i].parts[6].value && nextProps.modelPerspectiveData[i].parts[6].value.subject_part && nextProps.modelPerspectiveData[i].parts[6].value.subject_id,
        kpi: nextProps.modelPerspectiveData[i] && nextProps.modelPerspectiveData[i].parts && nextProps.modelPerspectiveData[i].parts[7].value && nextProps.modelPerspectiveData[i].parts[7].value.subject_part && nextProps.modelPerspectiveData[i].parts[7].value.subject_part.value,
        kpiId: nextProps.modelPerspectiveData[i] && nextProps.modelPerspectiveData[i].parts && nextProps.modelPerspectiveData[i].parts[7].value && nextProps.modelPerspectiveData[i].parts[7].value.subject_part && nextProps.modelPerspectiveData[i].parts[7].value.subject_id,
        contracts: nextProps.modelPerspectiveData[i] && nextProps.modelPerspectiveData[i].parts && nextProps.modelPerspectiveData[i].parts[0].value !== null ? nextProps.modelPerspectiveData[i].parts[0].value.value_set_value ? nextProps.modelPerspectiveData[i].parts[0].value.value_set_value.name : '' : '',
        expDate: date
      }

      ActuallArr.push(obj)
    }
    ordersObject['supplier'] = nextProps.metaData.resources[0].parts[2].order
    ordersObject['department'] = nextProps.metaData.resources[0].parts[3].order
    ordersObject['service'] = nextProps.metaData.resources[0].parts[4].constraint_perspective.parts[1].constraint_perspective.parts[1].order
    ordersObject['kpi'] = nextProps.metaData.resources[0].parts[4].constraint_perspective.parts[1].constraint_perspective.parts[2].order
    this.setState({ordersObject, ActualSlaDashboardData: ActuallArr, dupActualSlaDashboardData: ActuallArr, ActualContractArr: ActuallArr})
    ActuallArr.map((data) => {
      supFilterId.push(data.supplierId)
      serFilterId.push(data.serviceId)
      kpiFilId.push(data.kpiId)
    })

    ordersObject['supplier'] = nextProps.metaData.resources[0].parts[2].order
    ordersObject['department'] = nextProps.metaData.resources[0].parts[3].order
    ordersObject['service'] = nextProps.metaData.resources[0].parts[4].constraint_perspective.parts[1].constraint_perspective.parts[1].order
    ordersObject['kpi'] = nextProps.metaData.resources[0].parts[4].constraint_perspective.parts[1].constraint_perspective.parts[2].order
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
    let { dupActualSlaDashboardData, perspectiveFilter, ordersObject } = this.state
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

    // deletion of perspective filter dropdown
    delete perspectiveFilter.parts[ordersObject['supplier']]
    delete perspectiveFilter.parts[ordersObject['department']]
    if (perspectiveFilter.parts['7']) {
      delete perspectiveFilter.parts['7'].constraint_perspective.parts['5'].constraint_perspective.parts[ordersObject['service']]
      delete perspectiveFilter.parts['7'].constraint_perspective.parts['5'].constraint_perspective.parts[ordersObject['kpi']]
    }
    await this.setState({selectedOptionArray: [], barChartSupplierArray: [], supplierIdsArray: [], slamState, UniqueArr, departmentFilter, supplierFilter, serviceFilter, department: 'Select', supplier: 'Select', service: 'Select', kpi: 'Select'})
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

  SupplierComparisonDropdown = (supDropDownArray, serDropDownArray, kpiDropDownArray, actuallArr, selectedOptionArray, options) => {
    // let supplierDropDownArray = this.state.departmentFilter.length ? this.state.departmentFilter : supDropDownArray
    let serviceDropDownArray = this.state.supplierFilter.length ? this.state.supplierFilter : serDropDownArray
    let KPIDropDownArray = this.state.serviceFilter.length ? this.state.serviceFilter : kpiDropDownArray

    return (
      <div className={styles.HeaderContainer}>
        <div className={styles.mainDropdown}>
          <div className={styles.LeftText}>
            <p>Supplier</p>
          </div>
          <Select
            value={selectedOptionArray}
            onChange={e => this.handleChange(e, actuallArr)}
            options={options}
            isMulti
            className={styles.MultiSelect}
          />
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
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <button onClick={() => this.getComplianceData()} className={`btn btn-default dropup-btn ${styles.dropDownBtn} ${styles.clearFilter}`} type='button'>
              Go
            </button>
          </div>
        </div>
      </div>
    )
  }

  supplierDropDown = (value, ActuallArr, checked) => {
    const { slamState, ordersObject, perspectiveFilter, serviceMultipleArray, kpiMultipleArray, barChartSupplierArray } = this.state
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

    const supplierIdsArray = this.state.supplierIdsArray
    supplierIdsArray.push(array[0].supplierId)
    const uniqueSupplierIds = [...new Set(supplierIdsArray)]

    perspectiveFilter.parts[ordersObject['supplier']] = {
      target_component_ids: uniqueSupplierIds
    }

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
    this.setState({supplierIdsArray, perspectiveFilter, barChartSupplierArray: [...new Set(barChartSupplierArray)], supplier: value, supplierFilter: [...new Set(serviceMultipleArray)], UniqueArr: UniqueArrDep, serviceFilter: [...new Set(kpiMultipleArray)]})
  }

  getComplianceData = () => {
    const { perspectiveFilter } = this.state

    const stringifiedPerspectiveFilter = JSON.stringify(perspectiveFilter)
    const base64ecodedPerspectiveFilter = btoa(stringifiedPerspectiveFilter)

    axios
      .get(api.slaBarchart(base64ecodedPerspectiveFilter))
      .then(res => {
        const slaBarchartStateData = res.data && res.data[0].parts && res.data[0].parts[0].value && res.data[0].parts[0].value.children
        this.setState({ slaBarchartStateData })
        this.slaComparisonBarchart(slaBarchartStateData)
      })
  }

  slaComparisonBarchart = (slaBarchartStateData) => {
    let { data, supplier } = this.state
    let dataArr = []
    if (supplier !== 'Select') {
      for (let i = 0; i < supplier.length; i++) {
        if (slaBarchartStateData && slaBarchartStateData.length) {
          for (let j = 0; j < slaBarchartStateData.length; j++) {
            let obj = {
              name: supplier[i],
              Compliant: 0,
              Non_Compliant: 0
            }
            if (supplier[i] === slaBarchartStateData[j].key) {
              let compliantData = 0
              let nonCompliantData = 0
              for (let k = 0; k < slaBarchartStateData[j].children[0].children.length; k++) {
                compliantData = compliantData + slaBarchartStateData[j].children[0].children[k].value.sum
                nonCompliantData = nonCompliantData + slaBarchartStateData[j].children[1].children[k].value.sum
              }
              obj['Compliant'] = compliantData
              obj['Non_Compliant'] = nonCompliantData
            }
            dataArr.push(obj)
          }
        }
      }
    }
    this.setState({
      data: dataArr
    })
    console.log('data', data)
  }

  serviceDropDown = (value, ActuallArr, checked) => {
    var { slamState, ordersObject, perspectiveFilter } = this.state
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
    if (!perspectiveFilter.parts['7']) {
      perspectiveFilter.parts['7'] = {
        constraint_perspective: {
          parts: {
            '5': {
              constraint_perspective: {
                parts: {}
              }
            }
          }
        }
      }
    }
    perspectiveFilter.parts['7'].constraint_perspective.parts['5'].constraint_perspective.parts[ordersObject['service']] = {
      constraint_perspective: {
        subject_ids: [
          array[0].serviceId
        ]
      }
    }

    this.setState({perspectiveFilter, service: value, serviceFilter: UniqueArrkpi, UniqueArr: UniqueArruni, departmentFilter: UniqueArrsupp})
  }

  kpiDropDown = (value, ActuallArr, checked) => {
    var { slamState, ordersObject, perspectiveFilter } = this.state
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
    if (!perspectiveFilter.parts['7']) {
      perspectiveFilter.parts['7'] = {
        constraint_perspective: {
          parts: {
            '5': {
              constraint_perspective: {
                parts: {}
              }
            }
          }
        }
      }
    }
    perspectiveFilter.parts['7'].constraint_perspective.parts['5'].constraint_perspective.parts[ordersObject['kpi']] = {
      constraint_perspective: {
        subject_ids: [
          array[0].kpiId
        ]
      }
    }

    this.setState({perspectiveFilter, kpi: value, UniqueArr: UniqueArruni, departmentFilter: UniqueArrdep, supplierFilter: UniqueArrsupp})
  }

  handleChange = (e, ActuallArr) => {
    let { barChartSupplierArray } = this.state
    for (let j = 0; j < e.length; j++) {
      barChartSupplierArray.push(e[j].value)
    }
    barChartSupplierArray = [...new Set(this.state.barChartSupplierArray)]
    let selectedOptionArray = []
    let supplier = []

    e.map(item => {
      supplier.push(item.value)

      const selectedOption = {}
      selectedOption.value = item.value
      selectedOption.label = item.label
      selectedOptionArray.push(selectedOption)
    })
    for (let i = 0; i < barChartSupplierArray.length; i++) {
      if (supplier.indexOf(barChartSupplierArray[i]) === -1) {
        this.supplierDropDown(barChartSupplierArray[i], ActuallArr, false)
      } else {
        this.supplierDropDown(barChartSupplierArray[i], ActuallArr, true)
      }
    }
    this.setState({ selectedOptionArray, supplier, barChartSupplierArray })
  }

  render () {
    let ActuallArr = []
    let supFilter = []
    let serFilter = []
    let kpiFil = []
    let finalSupFilter = []
    let finalSerFilter = []
    let finalKpiFil = []
    console.log(this.state.perspectiveFilter)
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
    let options = []
    finalSupFilter.forEach(sup => {
      const option = {}
      option.value = sup
      option.label = sup
      options.push(option)
    })

    const { selectedOptionArray } = this.state

    return (
      <div className={styles.MainContainer}>
        <div className={styles.HeaderContainer}>
          {/* dropDown */}
          {this.SupplierComparisonDropdown(finalSupFilter, finalSerFilter, finalKpiFil, ActuallArr, selectedOptionArray, options)}
          <div className={styles.ContentContainer}>
            <div className={styles.leftContainer}>
              <div className={styles.chartContainer}>
                <div className={styles.barContainer}>
                  <div className={styles.pieChart}>
                    <div className={styles.Barchart}>
                      <Barchart data={this.state.data} slaComparisonShowData={this.state.slaComparisonShowData} />
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
  metaData: PropTypes.any,
  MetaModel: PropTypes.func,
  modelPerspectiveData: PropTypes.any,
  getMDPerspectiveDATA: PropTypes.func,
  location: PropTypes.any
}
export default SlamSupplier
