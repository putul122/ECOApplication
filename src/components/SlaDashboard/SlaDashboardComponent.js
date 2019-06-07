import React, { Component } from 'react'
// import { Avatar, DatePicker, Spin } from 'antd'
// import _ from 'lodash'
import 'antd/dist/antd.css'
import './index.css'
import PropTypes from 'prop-types'
import { Object } from 'es6-shim'
// import PieChart from '../pieChart/pieChartComponent'
// import Barchart from '../barchart/barchartComponent'
// import axios from 'axios'
// import api from '../../constants'

// const { RangePicker } = DatePicker

import styles from './SlaDashboardComponent.scss'

class SlaDashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filterObject: {},
      filteredDropdownItemsObject: {}
    }

    this.dropdownLabels = []
    this.dropdownItemsArray = []
    this.dropdownItemsObject = {}
    this.dropdownItemsObjectKeys = []
  }

  componentDidMount () {
    this.props.MetaModel()
    this.props.getMDPerspectiveDATA()
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
        if (i === 0) {
          dropdownItemObject[this.dropdownLabels[i]] = part.value
        } else if (i === 1 || i === 2) {
          dropdownItemObject[this.dropdownLabels[i]] = part && part.value && part.value.subject_part && part.value.subject_part.value[0] && part.value.subject_part.value[0].target_component && part.value.subject_part.value[0].target_component.name
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
    const filterObject = this.state.filterObject
    const filterLabel = e.target.id.split('-')[0]

    filterObject[filterLabel] = val
    await this.setState({ filterObject })

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

  createHTMLDropdownMarkup (initial = false) {
    const htmlMarkup = Object.keys(this.dropdownItemsObject).map(key => {
      return (
        <div className={styles.HeaderContainer} key={key}>
          <div className={styles.mainDropdown}>
            <div className={styles.LeftText}>
              <p>{key}</p>
            </div>
            <div className={`dropdown dropup-showing ${styles.dropDown}`}>
              <button className={`btn btn-default dropdown-toggle dropup-btn ${styles.dropDownBtn}`} type='button' data-toggle='dropdown'>
                {this.state.department}
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

  render () {
    return (
      <div>
        {this.slaDropdowns()}
      </div>
    )
  }
}

SlaDashboard.propTypes = {
  metaData: PropTypes.any,
  MetaModel: PropTypes.func,
  modelPerspectiveData: PropTypes.any,
  getMDPerspectiveDATA: PropTypes.func
}

export default SlaDashboard
