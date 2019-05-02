import React from 'react'
import styles from './penaltyDashboardComponent.scss'
import { DatePicker, Table } from 'antd'
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
      UniqueArr: [],
      department: 'Select',
      departmentFilter: [],
      supplier: 'Select',
      supplierFilter: [],
      service: 'Select',
      serviceFilter: [],
      kpi: 'Select',
      apiData: [],
      // searchTerm: '',
      pageSize: 10,
      currentPage: 1,
      previousClass: '',
      nextClass: '',
      // invitedEmail: '',
      totalPages: 1
    }
  }
  componentWillMount () {
    this.unselectAll()
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
  unselectAll = () => {
    var { PenaltyDashboardData } = this.state
    var repeatedArr = PenaltyDashboardData.map((data) => {
      return data.parts[2].value.subject_part.value
    })
    var repeatedArrdep = PenaltyDashboardData.map((data) => {
      return data.parts[3].value.subject_part.value
    })
    var repeatedArrsupp = PenaltyDashboardData.map((data) => {
      return data.parts[4].value.subject_part.value
    })
    var repeatedArrser = PenaltyDashboardData.map((data) => {
      return data.parts[5].value.subject_part.value
    })
    var UniqueArr = [...new Set(repeatedArr)]
    var departmentFilter = [...new Set(repeatedArrdep)]
    var supplierFilter = [...new Set(repeatedArrsupp)]
    var serviceFilter = [...new Set(repeatedArrser)]
    // this.departmentDropDown(UniqueArr[0])
    this.setState({UniqueArr, departmentFilter, supplierFilter, serviceFilter, department: 'Select', supplier: 'Select', service: 'Select', kpi: 'Select'})
  }
  departmentDropDown = (value) => {
    var { PenaltyDashboardData } = this.state
    var array = PenaltyDashboardData.filter((data) => {
      if (data.parts[2].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service) {
        return (data.parts[2].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service)
      } else if (data.parts[2].value.subject_part.value === value && data.parts[3].value.subject_part.value === this.state.supplier) {
        return (data.parts[2].value.subject_part.value === value && data.parts[3].value.subject_part.value === this.state.supplier)
      } else if (data.parts[2].value.subject_part.value === value && data.parts[5].value.subject_part.value === this.state.kpi) {
        return (data.parts[2].value.subject_part.value === value && data.parts[5].value.subject_part.value === this.state.kpi)
      } else if (data.parts[2].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service && data.parts[3].value.subject_part.value === this.state.supplier) {
        return (data.parts[2].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service && data.parts[3].value.subject_part.value === this.state.supplier)
      } else if (data.parts[2].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service && data.parts[5].value.subject_part.value === this.state.kpi) {
        return (data.parts[2].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service && data.parts[5].value.subject_part.value === this.state.kpi)
      } else if (data.parts[2].value.subject_part.value === value && data.parts[5].value.subject_part.value === this.state.kpi && data.parts[3].value.subject_part.value === this.state.supplier) {
        return (data.parts[2].value.subject_part.value === value && data.parts[5].value.subject_part.value === this.state.kpi && data.parts[3].value.subject_part.value === this.state.supplier)
      } else if (data.parts[2].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service && data.parts[3].value.subject_part.value === this.state.supplier && data.parts[5].value.subject_part.value === this.state.kpi) {
        return (data.parts[2].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service && data.parts[3].value.subject_part.value === this.state.supplier && data.parts[5].value.subject_part.value === this.state.kpi)
      } else if (data.parts[2].value.subject_part.value === value && this.state.supplier === 'Select' && this.state.service === 'Select' && this.state.kpi === 'Select') {
        return (data.parts[2].value.subject_part.value === value)
      }
    })
    var repeatedArr = array.map((data) => {
      return data.parts[3].value.subject_part.value
    })
    var repeatedArrser = array.map((data) => {
      return data.parts[4].value.subject_part.value
    })
    var repeatedArrkpi = array.map((data) => {
      return data.parts[5].value.subject_part.value
    })
    var UniqueArr = [...new Set(repeatedArr)]
    var UniqueArrser = [...new Set(repeatedArrser)]
    var UniqueArrkpi = [...new Set(repeatedArrkpi)]
    this.setState({department: value, departmentFilter: UniqueArr, supplierFilter: UniqueArrser, serviceFilter: UniqueArrkpi})
  }
  SupplierDropDown = (value) => {
    var { PenaltyDashboardData } = this.state
    var array = PenaltyDashboardData.filter((data) => {
      if (data.parts[3].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department) {
        return (data.parts[3].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department)
      } else if (data.parts[3].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service) {
        return (data.parts[3].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service)
      } else if (data.parts[3].value.subject_part.value === value && data.parts[5].value.subject_part.value === this.state.kpi) {
        return (data.parts[3].value.subject_part.value === value && data.parts[5].value.subject_part.value === this.state.kpi)
      } else if (data.parts[3].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department && data.parts[4].value.subject_part.value === this.state.service) {
        return (data.parts[3].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department && data.parts[4].value.subject_part.value === this.state.service)
      } else if (data.parts[3].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department && data.parts[5].value.subject_part.value === this.state.kpi) {
        return (data.parts[3].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department && data.parts[5].value.subject_part.value === this.state.kpi)
      } else if (data.parts[3].value.subject_part.value === value && data.parts[5].value.subject_part.value === this.state.kpi && data.parts[4].value.subject_part.value === this.state.service) {
        return (data.parts[3].value.subject_part.value === value && data.parts[5].value.subject_part.value === this.state.kpi && data.parts[4].value.subject_part.value === this.state.service)
      } else if (data.parts[3].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department && data.parts[4].value.subject_part.value === this.state.service && data.parts[5].value.subject_part.value === this.state.kpi) {
        return (data.parts[3].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department && data.parts[4].value.subject_part.value === this.state.service && data.parts[5].value.subject_part.value === this.state.kpi)
      } else if (data.parts[3].value.subject_part.value === value && this.state.department === 'Select' && this.state.service === 'Select' && this.state.kpi === 'Select') {
        return (data.parts[3].value.subject_part.value === value)
      }
    })
    var repeatedArrdep = array.map((data) => {
      return data.parts[2].value.subject_part.value
    })
    var repeatedArrser = array.map((data) => {
      return data.parts[4].value.subject_part.value
    })
    var repeatedArrkpi = array.map((data) => {
      return data.parts[5].value.subject_part.value
    })
    var UniqueArrDep = [...new Set(repeatedArrdep)]
    var UniqueArrser = [...new Set(repeatedArrser)]
    var UniqueArrkpi = [...new Set(repeatedArrkpi)]
    this.setState({supplier: value, supplierFilter: UniqueArrser, UniqueArr: UniqueArrDep, serviceFilter: UniqueArrkpi})
  }
  serviceDropDown = (value) => {
    var { PenaltyDashboardData } = this.state
    var array = PenaltyDashboardData.filter((data) => {
      if (data.parts[4].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department) {
        return (data.parts[4].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department)
      } else if (data.parts[4].value.subject_part.value === value && data.parts[3].value.subject_part.value === this.state.supplier) {
        return (data.parts[4].value.subject_part.value === value && data.parts[3].value.subject_part.value === this.state.supplier)
      } else if (data.parts[4].value.subject_part.value === value && data.parts[5].value.subject_part.value === this.state.kpi) {
        return (data.parts[4].value.subject_part.value === value && data.parts[5].value.subject_part.value === this.state.kpi)
      } else if (data.parts[4].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department && data.parts[3].value.subject_part.value === this.state.supplier) {
        return (data.parts[4].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department && data.parts[3].value.subject_part.value === this.state.supplier)
      } else if (data.parts[4].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department && data.parts[5].value.subject_part.value === this.state.kpi) {
        return (data.parts[4].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department && data.parts[5].value.subject_part.value === this.state.kpi)
      } else if (data.parts[4].value.subject_part.value === value && data.parts[5].value.subject_part.value === this.state.kpi && data.parts[3].value.subject_part.value === this.state.supplier) {
        return (data.parts[4].value.subject_part.value === value && data.parts[5].value.subject_part.value === this.state.kpi && data.parts[3].value.subject_part.value === this.state.supplier)
      } else if (data.parts[4].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department && data.parts[3].value.subject_part.value === this.state.supplier && data.parts[5].value.subject_part.value === this.state.kpi) {
        return (data.parts[4].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department && data.parts[3].value.subject_part.value === this.state.supplier && data.parts[5].value.subject_part.value === this.state.kpi)
      } else if (data.parts[4].value.subject_part.value === value && this.state.department === 'Select' && this.state.supplier === 'Select' && this.state.kpi === 'Select') {
        return (data.parts[4].value.subject_part.value === value)
      }
    })
    var repeatedArr = array.map((data) => {
      return data.parts[5].value.subject_part.value
    })
    var repeatedArruni = array.map((data) => {
      return data.parts[2].value.subject_part.value
    })
    var repeatedArrsupp = array.map((data) => {
      return data.parts[3].value.subject_part.value
    })
    var UniqueArrkpi = [...new Set(repeatedArr)]
    var UniqueArruni = [...new Set(repeatedArruni)]
    var UniqueArrsupp = [...new Set(repeatedArrsupp)]
    this.setState({service: value, serviceFilter: UniqueArrkpi, UniqueArr: UniqueArruni, departmentFilter: UniqueArrsupp})
  }
  kpiDropDown = (value) => {
    var { PenaltyDashboardData } = this.state
    var array = PenaltyDashboardData.filter((data) => {
      if (data.parts[5].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service) {
        return (data.parts[5].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service)
      } else if (data.parts[5].value.subject_part.value === value && data.parts[3].value.subject_part.value === this.state.supplier) {
        return (data.parts[5].value.subject_part.value === value && data.parts[3].value.subject_part.value === this.state.supplier)
      } else if (data.parts[5].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department) {
        return (data.parts[5].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department)
      } else if (data.parts[5].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service && data.parts[3].value.subject_part.value === this.state.supplier) {
        return (data.parts[5].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service && data.parts[3].value.subject_part.value === this.state.supplier)
      } else if (data.parts[5].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service && data.parts[2].value.subject_part.value === this.state.department) {
        return (data.parts[5].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service && data.parts[2].value.subject_part.value === this.state.department)
      } else if (data.parts[5].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department && data.parts[3].value.subject_part.value === this.state.supplier) {
        return (data.parts[5].value.subject_part.value === value && data.parts[2].value.subject_part.value === this.state.department && data.parts[3].value.subject_part.value === this.state.supplier)
      } else if (data.parts[5].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service && data.parts[3].value.subject_part.value === this.state.supplier && data.parts[2].value.subject_part.value === this.state.department) {
        return (data.parts[5].value.subject_part.value === value && data.parts[4].value.subject_part.value === this.state.service && data.parts[3].value.subject_part.value === this.state.supplier && data.parts[2].value.subject_part.value === this.state.department)
      } else if (data.parts[5].value.subject_part.value === value && this.state.department === 'Select' && this.state.service === 'Select' && this.state.supplier === 'Select') {
        return (data.parts[5].value.subject_part.value === value)
      }
    })
    var repeatedArrUni = array.map((data) => {
      return data.parts[2].value.subject_part.value
    })
    var repeatedArrdep = array.map((data) => {
      return data.parts[3].value.subject_part.value
    })
    var repeatedArrsupp = array.map((data) => {
      return data.parts[4].value.subject_part.value
    })
    var UniqueArruni = [...new Set(repeatedArrUni)]
    var UniqueArrdep = [...new Set(repeatedArrdep)]
    var UniqueArrsupp = [...new Set(repeatedArrsupp)]
    this.setState({kpi: value, UniqueArr: UniqueArruni, departmentFilter: UniqueArrdep, supplierFilter: UniqueArrsupp})
  }
  PenaltydropDown = (PenaltyDashboardData) => {
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
                      <a href='javascript:void(0)' onClick={() => this.departmentDropDown(val)}>{val}</a>
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
                      <a href='javascript:void(0)' onClick={() => this.SupplierDropDown(val)}>{val}</a>
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
                      <a href='javascript:void(0)' onClick={() => this.serviceDropDown(val)}>{val}</a>
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
                      <a href='javascript:void(0)' onClick={() => this.kpiDropDown(val)}>{val}</a>
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
    const {
      // searchTerm,
      previousClass,
      nextClass,
      currentPage,
      // invitedEmail,
      pageSize
    } = this.state
    const totalPages = Math.ceil(
      this.state.PenaltyDashboardData.length / pageSize
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
      console.log(key)
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
    const NestedexpandedRowRender = (key) => {
      const columns = [
        { title: 'Supplier', key: 'supplier' },
        { title: 'Service', key: 'service' },
        { title: 'KPI', dataIndex: 'kpi', key: 'kpi' },
        { title: 'Target', key: 'Target' },
        { title: 'Actual', key: 'Actual' },
        { title: 'Penalty', key: 'Penalty' },
        { title: 'Expired Date', dataIndex: 'expDate', key: 'expDate' }
      ]
      const Nesteddata = []
      Nesteddata.push(key)
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
    console.log('Penalty-dashboard', this.state.PenaltyDashboardData)
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
                  dataSource={this.state.apiData}
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

export default PenaltyDashboard
