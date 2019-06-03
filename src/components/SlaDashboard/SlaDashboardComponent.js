import React from 'react'
import styles from './SlaDashboardComponent.scss'
import { Avatar, DatePicker, Spin } from 'antd'
import _ from 'lodash'
import 'antd/dist/antd.css'
import './index.css'
import PropTypes from 'prop-types'
import PieChart from '../pieChart/pieChartComponent'
import Barchart from '../barchart/barchartComponent'
import { SlaDashboardJson } from './SlaDashboard'
import { SlaDashboardpenaltyJson } from './sla-dashboard-penalty.js'
import { SlaDashboardPieChartJson } from './sla-dashboard-compliance-pie-chart.js'
import { HuaweiSlaDashboardPieChartJson } from './sla-dashboard-huawei-compliance-pie-chart.js'
import { SlaDashboardBarChartJson } from './sla-dashboard-compliance-bar-chart.js'
import axios from 'axios'
import api from '../../constants'

const { RangePicker } = DatePicker

class SlaDashboard extends React.Component {
  constructor () {
    super()

    this.state = {
      SlaDashboardData: SlaDashboardJson,
      ActualSlaDashboardData: [],
      metaContracts: [],
      contractStages: {},
      slaComparisonShowData: false,
      colors: ['orange', '#fd397a', '#0abb87', '#3e0abb', 'black', 'orange', '#fd397a', '#0abb87', '#3e0abb', 'yellow'],
      dupActualSlaDashboardData: [],
      SlaDashboardpenaltyJson: SlaDashboardpenaltyJson,
      SlaDashboardPieChartJson: SlaDashboardPieChartJson,
      HuaweiSlaDashboardPieChartJson: HuaweiSlaDashboardPieChartJson,
      SlaDashboardBarChartJson: SlaDashboardBarChartJson,
      ActualContractArr: [],
      UniqueArr: [],
      startDate: '',
      endDate: '',
      slaComparisonArray: [],
      ordersObject: {},
      perspectiveFilter: {
        parts: {}
      },
      prevDropdownName: '',
      department: 'Select',
      departmentFilter: [],
      supplier: 'Select',
      supplierFilter: [],
      service: 'Select',
      package: 'Select',
      packageValue: 54381,
      PackageArr: [
        {
          package: 'Daily',
          value: 54379
        },
        {
          package: 'Monthly',
          value: 54381
        },
        {
          package: 'Quarterly',
          value: 54382
        },
        {
          package: 'Yearly',
          value: 54383
        }
      ],
      serviceFilter: [],
      kpi: 'Select',
      contractsArray: [],
      uniqueContractsArrayCount: 0,
      uniqueContractsArray: [],
      modelData: [],
      AdheresTo: [],
      loader: false,
      AgreedTo: [],
      departmentItems: [],
      supplierItems: [],
      serviceItems: [],
      kpiItems: [],
      compliance: 50,
      nonCompliance: 50,
      penalty: 0,
      BarChartValue: []
    }
  }

  componentWillMount () {
    this.unselectAll()
    this.props.MetaModel()
    this.props.getMDPerspectiveDATA()
  }

  componentWillReceiveProps (nextProps) {
    // filter and actual data
    let ActuallArr = []
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
        department: nextProps.modelPerspectiveData[i] && nextProps.modelPerspectiveData[i].parts && nextProps.modelPerspectiveData[i].parts[3].value && nextProps.modelPerspectiveData[i].parts[3].value[0].target_component && nextProps.modelPerspectiveData[i].parts[3].value[0].target_component.name,
        departmentId: nextProps.modelPerspectiveData[i] && nextProps.modelPerspectiveData[i].parts && nextProps.modelPerspectiveData[i].parts[3].value && nextProps.modelPerspectiveData[i].parts[3].value[0].target_component && nextProps.modelPerspectiveData[i].parts[3].value[0].target_component.id,
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
    let ordersObject = {}
    ordersObject['supplier'] = nextProps.metaData.resources[0].parts[2].order
    ordersObject['department'] = nextProps.metaData.resources[0].parts[3].order
    ordersObject['service'] = nextProps.metaData.resources[0].parts[4].constraint_perspective.parts[1].constraint_perspective.parts[1].order
    ordersObject['kpi'] = nextProps.metaData.resources[0].parts[4].constraint_perspective.parts[1].constraint_perspective.parts[2].order
    this.setState({ordersObject, ActualSlaDashboardData: ActuallArr, dupActualSlaDashboardData: ActuallArr, ActualContractArr: ActuallArr})
    let depFilter = []
    let supFilter = []
    let serFilter = []
    let kpiFil = []
    let metaArray = []
    ActuallArr.map((data) => {
      depFilter.push(data.department)
      supFilter.push(data.supplier)
      serFilter.push(data.service)
      kpiFil.push(data.kpi)
    })
    console.log('abc', ActuallArr)
    this.setState({
      UniqueArr: [...new Set(depFilter)],
      departmentFilter: [...new Set(supFilter)],
      supplierFilter: [...new Set(serFilter)],
      serviceFilter: [...new Set(kpiFil)]
    })

    metaArray = nextProps.metaData && nextProps.metaData.resources && nextProps.metaData.resources[0].parts && nextProps.metaData.resources[0].parts[0].type_property && nextProps.metaData.resources[0].parts[0].type_property.value_set && nextProps.metaData.resources[0].parts[0].type_property.value_set.values

    let metaContracts = []

    if (metaArray && metaArray.length) {
      for (let m = 0; m < metaArray.length; m++) {
        metaContracts.push(metaArray[m].name)
      }
    }
    const { uniqueContractsArray, uniqueContractsArrayCount } = this.createUniqueContractsArray(ActuallArr)
    let cStages = {}
    metaContracts.forEach(contract => {
      cStages[contract] = 0
    })
    for (let j = 0; j < uniqueContractsArrayCount; j++) {
      cStages[uniqueContractsArray[j].contracts] += 1
    }
    this.setState({
      metaContracts,
      contractStages: cStages,
      slaComparisonArray: ActuallArr
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

  ActualContracts = (arr) => {
    const { uniqueContractsArray, uniqueContractsArrayCount } = this.createUniqueContractsArray(arr)
    let cStages = {}
    this.state.metaContracts.forEach(contract => {
      cStages[contract] = 0
    })
    for (let j = 0; j < uniqueContractsArrayCount; j++) {
      cStages[uniqueContractsArray[j].contracts] += 1
    }
    this.setState({
      contractStages: cStages
    })
  }

  createUniqueContractsArray = contractsArray => {
    const uniqueContractsArray = _.uniqBy(contractsArray, 'subject_id')
    const uniqueContractsArrayCount = uniqueContractsArray.length
    this.setState({ uniqueContractsArray, uniqueContractsArrayCount })
    return { uniqueContractsArray, uniqueContractsArrayCount }
  }

  unselectAll = () => {
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
    const { uniqueContractsArray, uniqueContractsArrayCount } = this.createUniqueContractsArray(dupActualSlaDashboardData)

    let UniqueArr = [...new Set(repeatedArr)]
    let departmentFilter = [...new Set(repeatedArrdep)]
    let supplierFilter = [...new Set(repeatedArrsupp)]
    let serviceFilter = [...new Set(repeatedArrser)]
    // this.departmentDropDown(UniqueArr[0])
    this.setState({ActualContractArr: dupActualSlaDashboardData, UniqueArr, departmentFilter, supplierFilter, serviceFilter, department: 'Select', supplier: 'Select', service: 'Select', kpi: 'Select', compliance: 50, nonCompliance: 50, penalty: 0, BarChartValue: []})

    let cStages = {}
    this.state.metaContracts.forEach(contract => {
      cStages[contract] = 0
    })
    for (let j = 0; j < uniqueContractsArrayCount; j++) {
      cStages[uniqueContractsArray[j].contracts] += 1
    }
    // deletion of perspective filter dropdown
    delete perspectiveFilter.parts[ordersObject['supplier']]
    delete perspectiveFilter.parts[ordersObject['department']]
    if (perspectiveFilter.parts['7']) {
      delete perspectiveFilter.parts['7'].constraint_perspective.parts['5'].constraint_perspective.parts[ordersObject['service']]
      delete perspectiveFilter.parts['7'].constraint_perspective.parts['5'].constraint_perspective.parts[ordersObject['kpi']]
    }
    this.setState({
      contractStages: cStages,
      perspectiveFilter,
      packageValue: 54381,
      package: 'Select'
    })
  }

  departmentDropDown = value => {
    this.setState({department: value})
    let { dupActualSlaDashboardData, ordersObject, perspectiveFilter } = this.state
    let array = dupActualSlaDashboardData.filter(data => {
      if (data.department === value && this.state.supplier === 'Select' && this.state.service === 'Select' && this.state.kpi === 'Select') {
        return (data.department === value)
      } else if (data.department === value && data.service === this.state.service && data.supplier === this.state.supplier && data.kpi === this.state.kpi) {
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
    perspectiveFilter.parts[ordersObject['department']] = {
      target_component_ids: [
        array[0].departmentId
     ]
    }

    this.getComplianceData(perspectiveFilter)

    // perspectiveFilter.parts
    let repeatedArr = array.map((data) => {
      return data.supplier
    })
    let repeatedArrser = array.map((data) => {
      return data.service
    })
    let repeatedArrkpi = array.map((data) => {
      return data.kpi
    })
    let UniqueArr = [...new Set(repeatedArr)]
    let UniqueArrser = [...new Set(repeatedArrser)]
    let UniqueArrkpi = [...new Set(repeatedArrkpi)]
    this.setState({perspectiveFilter, department: value, departmentFilter: UniqueArr, supplierFilter: UniqueArrser, serviceFilter: UniqueArrkpi})
    this.contractValue(value, 'department')
  }

  getComplianceData = (perspectiveFilter, filterType) => {
    const stringifiedPerspectiveFilter = JSON.stringify(perspectiveFilter)
    const base64ecodedPerspectiveFilter = btoa(stringifiedPerspectiveFilter)

    axios
      .get(api.perspectiveFilter(base64ecodedPerspectiveFilter))
      .then(res => {
        console.log('ressssss', res)
        this.setState({
          BarChartValue: res.data && res.data[0].parts && res.data[0].parts[0].value,
          compliance: res.data && res.data[0].parts[0].value && res.data[0].parts[0].value.children && res.data[0].parts[0].value.children[0].value.sum,
          nonCompliance: res.data && res.data[0].parts[0].value && res.data[0].parts[0].value.children && res.data[0].parts[0].value.children[1].value.sum,
          penalty: res.data && res.data[0].parts[0].value && res.data[0].parts[0].value.children && res.data[0].parts[0].value.children[2].value.sum
        })
      })
  }

  SupplierDropDown = async value => {
    this.setState({supplier: value})
    let { dupActualSlaDashboardData, ordersObject, perspectiveFilter } = this.state
    let array = dupActualSlaDashboardData.filter((data) => {
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
    perspectiveFilter.parts[ordersObject['supplier']] = {
      target_component_ids: [
        array[0].supplierId
     ]
    }

    await this.getComplianceData(perspectiveFilter)

    let repeatedArrdep = array.map((data) => {
      return data.department
    })
    let repeatedArrser = array.map((data) => {
      return data.service
    })
    let repeatedArrkpi = array.map((data) => {
      return data.kpi
    })
    let UniqueArrDep = [...new Set(repeatedArrdep)]
    let UniqueArrser = [...new Set(repeatedArrser)]
    let UniqueArrkpi = [...new Set(repeatedArrkpi)]
    this.setState({supplier: value, supplierFilter: UniqueArrser, UniqueArr: UniqueArrDep, serviceFilter: UniqueArrkpi})
    this.contractValue(value, 'supplier')
  }

  serviceDropDown = (value) => {
    this.setState({service: value})
    let { dupActualSlaDashboardData, ordersObject, perspectiveFilter } = this.state
    let array = dupActualSlaDashboardData.filter((data) => {
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

    this.getComplianceData(perspectiveFilter)

    let repeatedArr = array.map((data) => {
      return data.kpi
    })
    let repeatedArruni = array.map((data) => {
      return data.department
    })
    let repeatedArrsupp = array.map((data) => {
      return data.supplier
    })
    let UniqueArrkpi = [...new Set(repeatedArr)]
    let UniqueArruni = [...new Set(repeatedArruni)]
    let UniqueArrsupp = [...new Set(repeatedArrsupp)]
    this.setState({service: value, serviceFilter: UniqueArrkpi, UniqueArr: UniqueArruni, departmentFilter: UniqueArrsupp})
    this.contractValue(value, 'service')
  }

  kpiDropDown = (value) => {
    this.setState({kpi: value})
    let { dupActualSlaDashboardData, ordersObject, perspectiveFilter } = this.state
    let array = dupActualSlaDashboardData.filter((data) => {
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

    this.getComplianceData(perspectiveFilter)

    let repeatedArrUni = array.map((data) => {
      return data.department
    })
    let repeatedArrdep = array.map((data) => {
      return data.supplier
    })
    let repeatedArrsupp = array.map((data) => {
      return data.service
    })
    let UniqueArruni = [...new Set(repeatedArrUni)]
    let UniqueArrdep = [...new Set(repeatedArrdep)]
    let UniqueArrsupp = [...new Set(repeatedArrsupp)]
    this.setState({kpi: value, UniqueArr: UniqueArruni, departmentFilter: UniqueArrdep, supplierFilter: UniqueArrsupp})
    this.contractValue(value, 'kpi')
  }

  contractValue = (value, name) => {
    let arrayToBeFiltered = this.state.ActualContractArr

    if (this.state.prevDropdownName === name) {
      arrayToBeFiltered = this.state.dupActualSlaDashboardData
    }

    if (arrayToBeFiltered.length) {
      let arr = []
      if (name === 'department') {
        arr = arrayToBeFiltered.filter((data, i) => {
          return (value === data.department && this.state.supplier === data.supplier && this.state.service === data.service && this.state.kpi === data.kpi) || (value === data.department && this.state.supplier === data.supplier && this.state.service === data.service) || (value === data.department && this.state.kpi === data.kpi && this.state.supplier === data.supplier) || (value === data.department && this.state.kpi === data.kpi && this.state.service === data.service) || (value === data.department && this.state.kpi === data.kpi) || (value === data.department && this.state.service === data.service) || (value === data.department && this.state.supplier === data.supplier) || (value === data.department)
        })
      } else if (name === 'supplier') {
        arr = arrayToBeFiltered.filter((data, i) => {
          return (value === data.supplier && this.state.department === data.department && this.state.service === data.service && this.state.kpi === data.kpi) || (value === data.supplier && this.state.department === data.department && this.state.service === data.service) || (value === data.supplier && this.state.kpi === data.kpi && this.state.department === data.department) || (value === data.supplier && this.state.kpi === data.kpi && this.state.service === data.service) || (value === data.supplier && this.state.kpi === data.kpi) || (value === data.supplier && this.state.service === data.service) || (value === data.supplier && this.state.department === data.department) || (value === data.supplier)
        })
      } else if (name === 'service') {
        arr = arrayToBeFiltered.filter((data, i) => {
          return (value === data.service && this.state.supplier === data.supplier && this.state.department === data.department && this.state.kpi === data.kpi) || (value === data.service && this.state.supplier === data.supplier && this.state.department === data.department) || (value === data.service && this.state.kpi === data.kpi && this.state.supplier === data.supplier) || (value === data.service && this.state.kpi === data.kpi && this.state.department === data.department) || (value === data.service && this.state.kpi === data.kpi) || (value === data.service && this.state.department === data.department) || (value === data.service && this.state.supplier === data.supplier) || (value === data.service)
        })
      } else if (name === 'kpi') {
        arr = arrayToBeFiltered.filter((data, i) => {
          return (value === data.kpi && this.state.supplier === data.supplier && this.state.service === data.service && this.state.department === data.department) || (value === data.kpi && this.state.supplier === data.supplier && this.state.service === data.service) || (value === data.kpi && this.state.department === data.department && this.state.supplier === data.supplier) || (value === data.kpi && this.state.department === data.department && this.state.service === data.service) || (value === data.kpi && this.state.department === data.department) || (value === data.kpi && this.state.service === data.service) || (value === data.kpi && this.state.supplier === data.supplier) || (value === data.kpi)
        })
      }
      this.setState({ActualContractArr: arr, prevDropdownName: name})
      this.ActualContracts(arr)
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
        <div className={styles.btnpropsComparison}>
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <button onClick={() => {
              this.props.history.push('sla-comparison', {
                  slaDepartment: this.state.department,
                  slaSupplier: this.state.supplier,
                  slaService: this.state.service,
                  slaKpi: this.state.kpi,
                  slaStartDate: this.state.startDate,
                  slaEndDate: this.state.endDate,
                  slaComparisonArray: this.state.slaComparisonArray
                })
              }} className={`btn btn-default dropup-btn ${styles.dropDownBtn} ${styles.clearFilter}`} style={{width: '160px'}} type='button'>
              Supplier Comparison
            </button>
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
    let { perspectiveFilter, packageValue } = this.state
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
        this.valueAccordingToCalendar()
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
        perspectiveFilter.parts['7'].constraint_perspective.parts['5'].constraint_perspective.parts['6'] = {
          value_set_id: 1,
          values_start_time: a.toISOString().slice(0, 10),
          values_end_time: aa.toISOString().slice(0, 10),
          time_component_id: packageValue
        }
        console.log(perspectiveFilter)
        this.getComplianceData(perspectiveFilter)
      }, 300)
    } else {
      if (perspectiveFilter.parts['7']) {
        delete perspectiveFilter.parts['7'].constraint_perspective.parts['5'].constraint_perspective.parts['6']
        if (this.isEmpty(perspectiveFilter.parts['7'].constraint_perspective.parts['5'].constraint_perspective.parts)) {
          alert(123)
          delete perspectiveFilter.parts['7']
        }
      }
      console.log(perspectiveFilter)
      let depFilter = []
      let supFilter = []
      let serFilter = []
      let kpiFil = []
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
        serviceFilter: [...new Set(kpiFil)],
        perspectiveFilter
      })
      this.setState({dupActualSlaDashboardData: this.state.ActualSlaDashboardData})
    }
  }

  valueAccordingToCalendar = () => {
    let { ActualSlaDashboardData } = this.state
    let dupActualSlaDashboardData = []
    let sDate = new Date(this.state.startDate).getTime()
    let eDate = new Date(this.state.endDate).getTime()
    for (let i = 0; i < ActualSlaDashboardData.length; i++) {
      let valDate = new Date(ActualSlaDashboardData[i].expDate).getTime()
      if (valDate >= sDate && valDate <= eDate) {
        dupActualSlaDashboardData.push(ActualSlaDashboardData[i])
      }
    }
    this.setState({dupActualSlaDashboardData})
    // this.unselectAll()
    // this.setState({
    //   drafts: 0,
    //   agreed: 0,
    //   active: 0,
    //   expired: 0
    // })
  }

  packageSelector = async (packageName, value) => {
    this.setState({
      package: packageName,
      packageValue: value
    })

    const { perspectiveFilter } = this.state

    if (perspectiveFilter.parts['7'] && perspectiveFilter.parts['7'].constraint_perspective.parts['5'].constraint_perspective.parts['6']) {
      perspectiveFilter.parts['7'].constraint_perspective.parts['5'].constraint_perspective.parts['6'].time_component_id = value
      await this.setState({perspectiveFilter})
      console.log('perspectiveFilter', perspectiveFilter)
      this.getComplianceData(perspectiveFilter)
    }
  }

  SlaCalender = () => {
    return (
      <div className={styles.HeaderContainer}>
        {/* dropDown */}
        <div className={styles.mainDropdownCalender}>
          <div className={styles.LeftText}>
            <p>Period</p>
          </div>
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <RangePicker
              className='RangePicker'
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
        <div className={styles.mainDropdown}>
          <div className={styles.LeftText}>
            <p>Time interval</p>
          </div>
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <button className={`btn btn-default dropdown-toggle dropup-btn ${styles.dropDownBtn}`} type='button' data-toggle='dropdown'>
              {this.state.package}
              <span className='caret' />
            </button>
            <ul className={`dropdown-menu menu ${styles.dropList}`}>
              {
                this.state.PackageArr.map((val, key) => {
                  return (
                    <li key={key}>
                      <a href='javascript:void(0)'
                        onClick={() => {
                            this.packageSelector(val.package, val.value)
                          }
                        }
                      >{val.package}</a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
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

  render () {
      return (
        <div className={styles.MainContainer}>
          { this.state.ActualSlaDashboardData.length
            ? <div>
              <div>
                {this.SladropDown(this.state.dupActualSlaDashboardData)}
                {this.SlaCalender()}
                <div className={styles.ContentContainer}>
                  <div className={styles.leftContainer}>
                    <div className={styles.contractContainer}>
                      <div className={styles.contractText}>
                        <a href='javascript:void(0)' onClick={() => { this.props.history.push('/perspective_hierarchy/15/ContractsList') }} className={styles.Text}>
                          Contracts
                        </a>
                        <Avatar className={styles.avatarOne} style={{backgroundColor: 'lightgreen'}} size='medium'>
                          {this.state.uniqueContractsArrayCount}
                        </Avatar>
                      </div>
                      {
                        this.state.metaContracts.map((data, i) => {
                          return <div className={styles.contractText} key={i}>
                            <div className={`${styles.badgeContainer}`} style={{borderLeft: `5px solid ${this.state.colors[i]}`}}>
                              <div className={styles.badgeText}>{data}</div>
                              <Avatar className={styles.avatarOne} style={{backgroundColor: this.state.colors[i]}} size='medium'>
                                {this.state.contractStages[data]}
                              </Avatar>
                            </div>
                          </div>
                        })
                      }
                    </div>
                    <div className={styles.chartContainer}>
                      <div className={styles.pieContainer}>
                        <div className={styles.btnprops} onClick={() => {
                          this.props.history.push('penalty-scorecard')
                        }} role='button' tabIndex={0} onKeyDown={() => this.props.history.push('penalty-scorecard')} >
                          <div className={styles.chart}>
                            <div className={styles.chartText}>
                              <span style={{ textDecoration: 'underline' }}>Compliance</span>
                            </div>
                            <div className={styles.Mainchart}>
                              <PieChart valueOne={this.state.compliance} valueTwo={this.state.nonCompliance} />
                            </div>
                          </div>
                        </div>
                        <div className={styles.btnprops} onClick={() => {
                          this.props.history.push('penalty-dashboard', {
                            slaDepartment: this.state.department,
                            slaSupplier: this.state.supplier,
                            slaService: this.state.service,
                            slaKpi: this.state.kpi,
                            slaStartDate: this.state.startDate,
                            slaEndDate: this.state.endDate
                          })
                        }} role='button' tabIndex={0} onKeyDown={() => this.props.history.push('penalty-dashboard')}>
                          <div className={styles.chart}>
                            <div className={styles.chartText}>
                              <span style={{ textDecoration: 'underline' }}>Penalty</span>
                            </div>
                            <div className={styles.Mainchart}>
                              <Avatar className={styles.avatarTwo} size='large'>
                                { this.state.penalty === 0 ? 0 : this.state.penalty ? this.state.penalty.toFixed(2) : 'N/A' }
                              </Avatar>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.barContainer}>
                        <div className={styles.pieChart}>
                          <div className={styles.Barchart}>
                            <Barchart slaComparisonShowData={this.state.slaComparisonShowData} BarChartValue={this.state.BarChartValue} supplier={this.state.supplier} duration={this.state.package} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            : <Spin className={styles.spin} />
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
  history: PropTypes.any
}
export default SlaDashboard
