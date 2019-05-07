import React from 'react'
import _ from 'lodash'
import ReactModal from 'react-modal'
import Select from 'react-select'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types'
import styles from './perspectiveExclusionComponent.scss'
import 'react-datepicker/dist/react-datepicker.css'
ReactModal.setAppElement('#root')
const customStylescrud = { content: { top: '15%', left: '8%', background: 'none', border: '0px', overflow: 'none', margin: 'auto' } }

export default function PerspectiveExclusion (props) {
  let defaultStyle = {'content': {'top': '20%'}}
  let connectionSelectBoxList = ''
  let businessPropertyList = ''
  let searchTextBox
  let perPage = props.perPage || 10
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let modelPrespectivesList = ''
  let totalPages
  let tableHeader = []
  let labels = []
  let messageList = ''
  let serviceName = props.addSettings.deleteObject ? props.addSettings.deleteObject.subject_name : ''
  let editProperty = function (index, value, parentIndex) {
    let connectionData = {...props.connectionData}
    let customerProperty = connectionData.customerProperty
    let propertyType = customerProperty[parentIndex][index].type_property.property_type
    if (propertyType.key === 'Boolean') {
      customerProperty[parentIndex][index].type_property.boolean_value = value
    } else if (propertyType.key === 'Integer') {
      customerProperty[parentIndex][index].type_property.int_value = value
    } else if (propertyType.key === 'Decimal') {
      customerProperty[parentIndex][index].type_property.float_value = value
    } else if (propertyType.key === 'DateTime') {
      customerProperty[parentIndex][index].type_property.date_time_value = value.format('DD MMM YYYY')
    } else if (propertyType.key === 'Text') {
      customerProperty[parentIndex][index].type_property.text_value = value
    } else {
      customerProperty[parentIndex][index].type_property.other_value = value
    }
    connectionData.customerProperty = customerProperty
    props.setConnectionData(connectionData)
  }
  let handlePropertySelect = function (index, parentIndex) {
    return function (newValue: any, actionMeta: any) {
      console.log('newValue', newValue)
      console.log('actionMeta', actionMeta)
      let connectionData = JSON.parse(JSON.stringify(props.connectionData))
      let customerProperty = connectionData.customerProperty
      if (actionMeta.action === 'select-option') {
        customerProperty[parentIndex][index].type_property.value_set_value = newValue
      }
      if (actionMeta.action === 'clear') {
        customerProperty[parentIndex][index].type_property.value_set_value = newValue
      }
      connectionData.customerProperty = customerProperty
      props.setConnectionData(connectionData)
    }
  }
  console.log('searchTextBox', searchTextBox)
  // let handleBlurdropdownChange = function (event) {
  //   console.log('handle Blur change', event.target.value)
  // }
  let handledropdownChange = function (pages) {
    console.log('handle change', pages, typeof pages)
    props.setPerPage(parseInt(pages))
    // showCurrentPages = pages
  }
  let openUpdateModal = function (data) {
    let addSettings = {...props.addSettings}
    let labelParts = props.metaModelPerspective.resources[0].parts
    let selectedValues = []
    let setCustomerProperty = []
    let totalParts = data.parts.length
    let startIndexOfLast3Parts = totalParts - 3
    if (data.parts) {
      data.parts.forEach(function (partData, ix) {
        if (ix < startIndexOfLast3Parts) {
          if (labelParts[ix] && labelParts[ix].standard_property !== null && labelParts[ix].type_property === null) { // Standard Property
            if (labelParts[ix].name === 'Name') {
              addSettings.name = data.parts[ix].value
            }
            if (labelParts[ix].name === 'Description') {
              addSettings.description = data.parts[ix].value
            }
          } else if (labelParts[ix] && labelParts[ix].standard_property === null && labelParts[ix].type_property === null) { // Connection Property
            // Do not process connection property of parent meta model perspectives.
            // if (data.parts[ix].value.length > 0) {
            //   // todo write code for multiple component
            //   let eachSelectedValues = []
            //   data.parts[ix].value.forEach(function (value, ix) {
            //     let targetComponent = value.target_component
            //     targetComponent.label = targetComponent.name
            //     targetComponent.value = targetComponent.id
            //     eachSelectedValues.push(targetComponent)
            //   })
            //   selectedValues.push(eachSelectedValues)
            // } else {
            //   selectedValues.push(null)
            // }
          } else if (labelParts[ix] && labelParts[ix].standard_property === null && labelParts[ix].type_property !== null) { // Customer Property
            let value = null
            if (labelParts[ix].type_property.property_type.key === 'Integer') { // below are Customer Property
              value = data.parts[ix].value !== null ? data.parts[ix].value.int_value : ''
            } else if (labelParts[ix].type_property.property_type.key === 'Decimal') {
              value = data.parts[ix].value !== null ? data.parts[ix].value.float_value : ''
            } else if (labelParts[ix].type_property.property_type.key === 'Text') {
              value = data.parts[ix].value !== null ? data.parts[ix].value.text_value : ''
            } else if (labelParts[ix].type_property.property_type.key === 'DateTime') {
              value = data.parts[ix].value !== null ? data.parts[ix].value.date_time_value : ''
            } else if (labelParts[ix].type_property.property_type.key === 'Boolean') {
              value = data.parts[ix].value !== null || data.parts[ix].value !== ''
            } else if (labelParts[ix].type_property.property_type.key === 'List') {
              value = data.parts[ix].value !== null ? data.parts[ix].value.value_set_value : ''
            } else {
              value = data.parts[ix].value !== null ? data.parts[ix].value.other_value : ''
            }
            setCustomerProperty.push(value)
          }
        } else {
          let subjectPart = data.parts[ix].value !== null ? data.parts[ix].value.subject_part : null
          let subjectId = data.parts[ix].value !== null ? data.parts[ix].value.subject_id : null
          let connectionObject = subjectPart ? subjectPart.value[0].target_component : null
          if (connectionObject) {
            connectionObject.subjectId = subjectId
            connectionObject.value = connectionObject.id
            connectionObject.label = connectionObject.name
            let selectedObject = []
            selectedObject.push(connectionObject)
            selectedValues.push(selectedObject)
            console.log('in if startIndexOfLast3Parts', connectionObject)
          }
        }
      })
    }
    addSettings.isEditModalOpen = true
    addSettings.updateObject = data
    addSettings.updateResponse = null
    props.setAddSettings(addSettings)
    let connectionData = {...props.connectionData}
    let pIndex = 0 // customer property is set in parent index 0
    let existingCustomerProperty = connectionData.customerProperty[pIndex].map(function (data, index) {
      if (data.type_property.property_type.key === 'Boolean') {
        data.type_property.boolean_value = setCustomerProperty[index]
      } else if (data.type_property.property_type.key === 'Integer') {
        data.type_property.int_value = setCustomerProperty[index]
      } else if (data.type_property.property_type.key === 'Decimal') {
        data.type_property.float_value = setCustomerProperty[index]
      } else if (data.type_property.property_type.key === 'DateTime') {
        data.type_property.date_time_value = setCustomerProperty[index]
      } else if (data.type_property.property_type.key === 'Text') {
        data.type_property.text_value = setCustomerProperty[index]
      } else {
        data.type_property.other_value = setCustomerProperty[index]
      }
      return data
    })
    connectionData.customerProperty[pIndex] = existingCustomerProperty
    connectionData.selectedValues[0] = [] // no connection for parent Meta model Perspectives
    connectionData.selectedValues[1] = selectedValues // metric point property for service meta model perspectives.
    connectionData.initialSelectedValues = JSON.parse(JSON.stringify(selectedValues))
    props.setConnectionData(connectionData)
  }
  let openModal = function (event) {
    event.preventDefault()
    let addSettings = {...props.addSettings}
    addSettings.isModalOpen = true
    addSettings.name = ''
    addSettings.description = ''
    props.setAddSettings(addSettings)
    let connectionData = JSON.parse(JSON.stringify(props.connectionData))
    props.connectionData.data.forEach(function (conObject, parentIndex) {
      let selectedValues = []
      connectionData.selectedValues[parentIndex].forEach(function (data) {
        selectedValues.push(null)
      })
      connectionData.selectedValues[parentIndex] = selectedValues
    })
    props.connectionData.customerProperty.forEach(function (propertyObject, parentIndex) {
      if (propertyObject) {
        let resetCustomerProperty = propertyObject.map(function (data, index) {
          if (data.type_property.property_type.key === 'Boolean') {
            data.type_property.boolean_value = null
          } else if (data.type_property.property_type.key === 'Integer') {
            data.type_property.int_value = null
          } else if (data.type_property.property_type.key === 'Decimal') {
            data.type_property.float_value = null
          } else if (data.type_property.property_type.key === 'DateTime') {
            data.type_property.date_time_value = null
          } else if (data.type_property.property_type.key === 'Text') {
            data.type_property.text_value = null
          } else if (data.type_property.property_type.key === 'List') {
            data.type_property.value_set_value = null
          } else {
            data.type_property.other_value = null
          }
          return data
        })
        connectionData.customerProperty[parentIndex] = resetCustomerProperty
      }
    })
    props.setConnectionData(connectionData)
  }
  let openDeleteModal = function (data) {
    console.log('delete', data)
    let addSettings = {...props.addSettings}
    addSettings.isDeleteModalOpen = true
    addSettings.deleteObject = data
    props.setAddSettings(addSettings)
  }
  let closeModal = function () {
    let addSettings = {...props.addSettings}
    addSettings.isModalOpen = false
    addSettings.isDeleteModalOpen = false
    addSettings.isEditModalOpen = false
    addSettings.deleteObject = null
    addSettings.createResponse = null
    props.setAddSettings(addSettings)
  }
  let editName = function (event) {
    let addSettings = JSON.parse(JSON.stringify(props.addSettings))
    addSettings.name = event.target.value
    props.setAddSettings(addSettings)
  }
  let editDescription = function (event) {
    let addSettings = JSON.parse(JSON.stringify(props.addSettings))
    addSettings.description = event.target.value
    props.setAddSettings(addSettings)
  }
  let createComponent = function (event) {
    event.preventDefault()
    let addSettings = JSON.parse(JSON.stringify(props.addSettings))
    let patchPayload = []
    let obj = {}
    obj.op = 'add'
    obj.path = '/-'
    obj.value = {}
    obj.value.parts = []
    obj.value.parts[0] = {'value': addSettings.name}
    obj.value.parts[1] = {'value': addSettings.description}
    let connectionData = {...props.connectionData}
    let lastCustomerIndex = 0
    connectionData.customerProperty[0].forEach(function (data, index) {
      if (data.type_property.property_type.key === 'Boolean') {
        obj.value.parts[data.partIndex] = {value: {'boolean_value': data.type_property.boolean_value}}
      } else if (data.type_property.property_type.key === 'Integer') {
        obj.value.parts[data.partIndex] = {value: {'int_value': data.type_property.int_value}}
      } else if (data.type_property.property_type.key === 'Decimal') {
        obj.value.parts[data.partIndex] = {value: {'float_value': data.type_property.float_value}}
      } else if (data.type_property.property_type.key === 'DateTime') {
        obj.value.parts[data.partIndex] = {value: {'date_time_value': data.type_property.date_time_value}}
      } else if (data.type_property.property_type.key === 'Text') {
        obj.value.parts[data.partIndex] = {value: {'text_value': data.type_property.text_value}}
      } else if (data.type_property.property_type.key === 'List') {
        obj.value.parts[data.partIndex] = {value: {'value_set_value_id': data.type_property.value_set_value ? data.type_property.value_set_value.id : null}}
      } else {
        obj.value.parts[data.partIndex] = {value: {'other_value': data.type_property.other_value}}
      }
      lastCustomerIndex = data.partIndex
    })
    let allMetricPointSet = false
    allMetricPointSet = connectionData.selectedValues[1].every(function (selecteOption) {
      return (selecteOption !== null || selecteOption.length > 0)
    })
    if (allMetricPointSet) {
      // eslint-disable-next-line
      mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let metricObject = {'target_id': connectionData.selectedValues[1][0].subjectId}
      let metricPointArray = []
      metricPointArray.push(metricObject)
      obj.value.parts[lastCustomerIndex + 1] = {'value': metricPointArray}
      patchPayload.push(obj)
      let selectedPackage = JSON.parse(localStorage.getItem('selectedPackage'))
      let dashboardKey = selectedPackage.key
      let perspectives = selectedPackage.perspectives
      let perspectiveId = parseInt(props.metaModelPerspective.resources[0].id)
      let perspectiveViewKey = ''
      if (dashboardKey === 'ECO_SLA') {
      perspectiveViewKey = _.result(_.find(perspectives, function (obj) {
          return (obj.perspective === perspectiveId && obj.role_key === 'Create')
      }), 'view_key')
      }
      let payload = {}
      payload.queryString = {}
      payload.queryString.meta_model_perspective_id = perspectiveId
      payload.queryString.view_key = perspectiveViewKey
      payload.queryString.apply_changes = true
      payload.data = {}
      payload.data[props.metaModelPerspective.resources[0].id] = patchPayload
      console.log('payload', payload)
      props.updateModelPrespectives(payload)
    } else {
      alert('All metric point not set')
    }
  }
  let updateComponent = function (event) {
    event.preventDefault()
    // eslint-disable-next-line
    // mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let addSettings = JSON.parse(JSON.stringify(props.addSettings))
    let connectionData = JSON.parse(JSON.stringify(props.connectionData))
    let labelParts = props.metaModelPerspective.resources[0].parts
    let data = addSettings.updateObject
    let patchPayload = []
    if (data.parts) {
      labelParts.forEach(function (partData, index) {
        let valueType = ''
        let obj = {}
        if (partData.standard_property !== null && partData.type_property === null) { // Standard Property
          obj.op = 'replace'
          valueType = partData.standard_property
          obj.path = '/' + data.subject_id + '/parts/' + index + '/' + valueType
          if (partData.standard_property === 'name') {
            obj.value = props.addSettings.name
          }
          if (partData.standard_property === 'description') {
            obj.value = props.addSettings.description
          }
          patchPayload.push(obj)
        } else if (partData.standard_property === null && partData.type_property !== null) {
          let obj = {}
          obj.op = 'replace'
          let pIndex = 0 // Business property is in parent meta model perspectives
          let customerProperty = _.find(connectionData.customerProperty[pIndex], function (obj) {
            return obj.name === partData.name
          })
          console.log('customerProperty', customerProperty)
          if (customerProperty) {
            if (customerProperty.type_property.property_type.key === 'Boolean') {
              valueType = `boolean_value`
              obj.value = customerProperty.type_property.boolean_value
            } else if (customerProperty.type_property.property_type.key === 'Integer') {
              valueType = `int_value`
              obj.value = customerProperty.type_property.int_value
            } else if (customerProperty.type_property.property_type.key === 'Decimal') {
              valueType = `float_value`
              obj.value = customerProperty.type_property.float_value
            } else if (customerProperty.type_property.property_type.key === 'DateTime') {
              valueType = `date_time_value`
              obj.value = customerProperty.type_property.date_time_value
            } else if (customerProperty.type_property.property_type.key === 'Text') {
              valueType = `text_value`
              obj.value = customerProperty.type_property.text_value
            } else if (customerProperty.type_property.property_type.key === 'List') {
              valueType = `value_set_value_id`
              obj.value = customerProperty.type_property.value_set_value ? customerProperty.type_property.value_set_value.id : null
            } else {
              valueType = `other_value`
              obj.value = customerProperty.type_property.other_value
            }
            obj.path = '/' + data.subject_id + '/parts/' + index + '/' + valueType
            patchPayload.push(obj)
          }
        }
      })
    }
    let selectedPackage = JSON.parse(localStorage.getItem('selectedPackage'))
    let dashboardKey = selectedPackage.key
    let perspectives = selectedPackage.perspectives
    let perspectiveId = parseInt(props.metaModelPerspective.resources[0].id)
    let perspectiveViewKey = ''
    if (dashboardKey === 'ECO_SLA') {
      perspectiveViewKey = _.result(_.find(perspectives, function (obj) {
          return (obj.perspective === perspectiveId && obj.role_key === 'Update')
      }), 'view_key')
    }
    let payload = {}
    payload.queryString = {}
    payload.queryString.meta_model_perspective_id = perspectiveId
    payload.queryString.view_key = perspectiveViewKey
    payload.queryString.apply_changes = true
    payload.data = {}
    payload.data[props.metaModelPerspective.resources[0].id] = patchPayload
    console.log('payload', payload)
    props.updateModelPrespectives(payload)
  }
  let removeComponent = function (event) {
    event.preventDefault()
    let removeObject = {}
    removeObject.op = 'remove'
    removeObject.path = `/${props.addSettings.deleteObject.subject_id}/`
    let selectedPackage = JSON.parse(localStorage.getItem('selectedPackage'))
    let dashboardKey = selectedPackage.key
    let perspectives = selectedPackage.perspectives
    let perspectiveId = parseInt(props.metaModelPerspective.resources[0].id)
    let perspectiveViewKey = ''
    if (dashboardKey === 'ECO_SLA') {
      perspectiveViewKey = _.result(_.find(perspectives, function (obj) {
          return (obj.perspective === perspectiveId && obj.role_key === 'Update')
      }), 'view_key')
    }
    let payload = {}
    payload.queryString = {}
    payload.queryString.meta_model_perspective_id = perspectiveId
    payload.queryString.view_key = perspectiveViewKey
    payload.queryString.apply_changes = true
    payload.data = {}
    let patchData = []
    patchData.push(removeObject)
    payload.data[perspectiveId] = patchData
    console.log('remove payload data', payload)
    props.removeModelPrespectives(payload)
  }
  if (props.metaModelPerspectiveList !== '') {
    if (props.metaModelPerspectiveList.resources[0].parts.length > 0) {
      tableHeader = []
      props.metaModelPerspectiveList.resources[0].parts.forEach(function (data, index) {
        if (data.standard_property !== null || data.type_property !== null) {
          if (data.standard_property !== null || data.type_property === null) {
            if (data.standard_property !== 'description') {
              labels.push(data.name)
              tableHeader.push(<th key={index + 'col' + index} className=''><h5>{data.name}</h5></th>)
            }
          }
          if (data.standard_property === null || data.type_property !== null) {
            labels.push(data.name)
            tableHeader.push(<th key={index + 'col' + index} className=''><h5>{data.name}</h5></th>)
          }
        }
      })
      tableHeader.push(<th key={'last'} className='table-th pres-th'><p>Action</p></th>)
    }
  }
  let listModelPrespectives = function () {
    if (props.modelPrespectives !== '' && props.metaModelPerspectiveList !== '') {
      let labelParts = props.metaModelPerspectiveList.resources[0].parts
      // let crude = props.crude
      // let mask = props.metaModelPerspective.resources[0].crude
      // let crud = []
      // for (let option in crude) {
      //   if (crude.hasOwnProperty(option)) {
      //     if (mask & crude[option]) {
      //       crud.push(option)
      //     }
      //   }
      // }
      if (props.modelPrespectives.length > 0) {
        let modelPrespectives = _.filter(props.modelPrespectives, {'error_code': null})
        // modelPrespectives.splice(-1, 1)
        if (modelPrespectives.length > 0) {
          modelPrespectivesList = []
          modelPrespectives.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).forEach(function (data, index) {
            if (data.error_code === null && data.parts !== null) {
              let childList = []
              if (data.parts) {
                data.parts.forEach(function (partData, ix) {
                  let value
                  if (labelParts[ix] && labelParts[ix].standard_property !== null && labelParts[ix].type_property === null) { // Standard Property
                    if (labelParts[ix].standard_property === 'name') {
                      value = partData.value ? partData.value : ''
                      childList.push(<td className='table-td pres-th' key={'ch_' + index + '_' + ix}>{value}</td>)
                    }
                  } else if (labelParts[ix] && labelParts[ix].standard_property === null && labelParts[ix].type_property === null && labelParts[ix].constraint_perspective === null) { // Connection Property
                    if (partData.value) {
                      let targetComponents = []
                      partData.value.forEach(function (data, index) {
                        targetComponents.push(data.target_component.name)
                      })
                      value = targetComponents.toString()
                    } else {
                      value = partData.value || ''
                    }
                  } else if (labelParts[ix] && labelParts[ix].standard_property === null && labelParts[ix].type_property !== null) { // below are Customer Property
                    if (labelParts[ix].type_property.property_type.key === 'Integer') {
                      value = partData.value !== null ? partData.value.int_value : ''
                    } else if (labelParts[ix].type_property.property_type.key === 'Decimal') {
                      value = partData.value !== null ? partData.value.float_value : ''
                    } else if (labelParts[ix].type_property.property_type.key === 'Text') {
                      value = partData.value !== null ? partData.value.text_value : ''
                    } else if (labelParts[ix].type_property.property_type.key === 'DateTime') {
                      value = partData.value !== null ? moment(partData.value.date_time_value).format('DD MMM YYYY') : ''
                    } else if (labelParts[ix].type_property.property_type.key === 'Boolean') {
                      value = partData.value !== null && partData.value.boolean_value ? 'true' : 'false'
                    } else if (labelParts[ix].type_property.property_type.key === 'List') {
                      value = partData.value !== null ? (partData.value.value_set_value ? partData.value.value_set_value.name : '') : ''
                    } else {
                      value = partData.value !== null ? partData.value.other_value : ''
                    }
                    childList.push(<td className='table-td pres-th' key={'ch_' + index + '_' + ix}>{value}</td>)
                  }
                })

                let availableAction = {...props.availableAction}
                let list = []
                if (availableAction.Update) {
                  list.push(<a href='javascript:void(0);' onClick={(event) => { event.preventDefault(); openUpdateModal(data) }} > <img src='/assets/edit.png' alt='gear' className='td-icons' /></a>)
                }
                if (availableAction.Delete) {
                  list.push(<a onClick={(event) => { event.preventDefault(); openDeleteModal(data) }} href='javascript:void(0);'><img src='/assets/rubbish-bin.png' alt='delete' className='td-icons' /></a>)
                }
                childList.push(<td className='table-td pres-th' key={'last' + index}>{list}</td>)
              }
              modelPrespectivesList.push(<tr className='table-tr' key={index}>{childList}</tr>)
            }
          })
          // props.setConnectionData(connectionData)
        } else {
          modelPrespectivesList = []
          modelPrespectivesList.push((
            <tr key={0} className='table-tr'>
              <td className='table-td pres-th' colSpan={labelParts.length}>{'No data to display'}</td>
            </tr>
          ))
        }
      } else {
        modelPrespectivesList = []
        modelPrespectivesList.push((
          <tr key={0} className='table-tr'>
            <td className='table-td pres-th' colSpan={labelParts.length}>{'No data to display'}</td>
          </tr>
        ))
      }
    }
  }
  if (props.modelPrespectives && props.modelPrespectives !== '' && props.metaModelPerspectiveList !== '') {
    totalPages = Math.ceil((props.modelPrespectives.length - 1) / perPage)
    let i = 1
    while (i <= totalPages) {
      let pageParameter = {}
      pageParameter.number = i
      pageParameter.class = ''
      pageArray.push(pageParameter)
      i++
    }
    pageArray = _.chunk(pageArray, paginationLimit)
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
    listModelPrespectives()
  }
  if (currentPage === 1) {
    previousClass = 'm-datatable__pager-link--disabled'
  }
  if (currentPage === totalPages) {
    nextClass = 'm-datatable__pager-link--disabled'
  }
  let handleListAndPagination = function (page) {
    listModelPrespectives()
    props.setCurrentPage(page)
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }
  let handlePrevious = function () {
    if (currentPage === 1) {
      previousClass = styles.disabled
    } else {
      props.setCurrentPage(currentPage - 1)
      handleListAndPagination(currentPage - 1)
    }
  }

  let handleNext = function (event) {
    event.preventDefault()
    if (currentPage === totalPages) {
      nextClass = styles.disabled
    } else {
      props.setCurrentPage(currentPage + 1)
      handleListAndPagination(currentPage + 1)
    }
  }
  let handleLast = function (pages) {
    if (currentPage === totalPages) {
      nextClass = styles.disabled
    } else {
      props.setCurrentPage(pages)
      handleListAndPagination(pages)
    }
  }
  let handleFirst = function () {
    props.setCurrentPage(1)
    handleListAndPagination(1)
  }
  let handlePage = function (page) {
    if (page === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else if (page === totalPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    handleListAndPagination(page)
  }
  // if (props.metaModelPerspective && props.metaModelPerspective !== '' && props.metaModelPerspective.error_code === null) {
  //   if (props.metaModelPerspective.resources[0].parts.length > 0) {
  //     tableHeader = props.metaModelPerspective.resources[0].parts.map(function (data, index) {
  //       labels.push(data.name)
  //       return (<th key={index} className='table-th pres-th'><p>{data.name}</p></th>)
  //     })
  //   }
  //   tableHeader.push(<th key={'last'} className='table-th pres-th'><p>Action</p></th>)
  // }
  let handleSelectChange = function (index, parentIndex) {
    return function (newValue: any, actionMeta: any) {
      console.log('newValue', newValue)
      console.log('actionMeta', actionMeta)
      console.log('index', index)
      let connectionData = JSON.parse(JSON.stringify(props.connectionData))
      let selectedValues = connectionData.selectedValues
      if (actionMeta.action === 'select-option' || actionMeta.action === 'remove-value') {
        selectedValues[parentIndex][index] = newValue
        connectionData.selectedValues = selectedValues
        // props.setConnectionData(connectionData)
        let subjectId = newValue.subjectId
        let selectOption = connectionData.selectOption
        let backupSelectOption = connectionData.backupSelectOption
        let selectOptionLength = selectOption[parentIndex].length
        for (let i = index + 1; i < selectOptionLength; i++) {
          if (selectOption[parentIndex][i]) {
            let filterObject = _.find(backupSelectOption[parentIndex][i], function (obj) {
              return obj.subjectId === subjectId
            })
            let filterArray = []
            filterArray.push(filterObject)
            selectOption[parentIndex][i] = filterArray
            selectedValues[parentIndex][i] = []
          }
        }
        connectionData.selectOption = selectOption
        props.setConnectionData(connectionData)
      }
      if (actionMeta.action === 'clear') {
        selectedValues[parentIndex][index] = null
        connectionData.selectedValues = selectedValues
        // props.setConnectionData(connectionData)
        let selectOption = connectionData.selectOption
        let backupSelectOption = connectionData.backupSelectOption
        let selectOptionLength = selectOption[parentIndex].length
        for (let i = index + 1; i < selectOptionLength; i++) {
          if (selectOption[parentIndex][i]) {
            let restoreList = backupSelectOption[parentIndex][i]
            selectOption[parentIndex][i] = restoreList
            selectedValues[parentIndex][i] = []
          }
        }
        connectionData.selectOption = selectOption
        props.setConnectionData(connectionData)
      }
    }
  }
  if (props.connectionData !== '' && props.connectionData.operation.isComplete) {
    // eslint-disable-next-line
    mApp && mApp.unblockPage()
    let connectionData = {...props.connectionData}
    connectionSelectBoxList = []
    connectionData.data.forEach(function (connectionProperty, parentIndex) {
      if (connectionProperty && connectionProperty.length > 0) {
        connectionProperty.forEach(function (data, index) {
          let selectOptions = []
          if (connectionData.selectOption[parentIndex][index] && connectionData.selectOption[parentIndex][index].length > 0) {
            selectOptions = connectionData.selectOption[parentIndex][index].map(function (component, id) {
              component.value = component.id
              component.label = component.name
              return component
            })
          }
          let defaultValue = connectionData.selectedValues[parentIndex][index] || null
          connectionSelectBoxList.push(<div className='form-group row'>
            <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
            <div className='col-8'>
              <Select
                className='input-sm m-input'
                placeholder={'Select ' + data.name}
                isDisabled={props.addSettings.isEditModalOpen}
                // isMulti={data.max !== 1}
                isClearable
                isSearchable
                value={defaultValue}
                onChange={handleSelectChange(index, parentIndex)}
                options={selectOptions}
              />
            </div>
          </div>)
        })
      }
    })
    businessPropertyList = []
    connectionData.customerProperty.forEach(function (customerProperty, parentIndex) {
      if (customerProperty && customerProperty.length > 0) {
        customerProperty.forEach(function (data, index) {
          let value = null
          if (data.type_property.property_type.key === 'Integer') {
            value = data.type_property.int_value
            businessPropertyList.push(<div className='form-group row'>
              <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
              <div className='col-8 form-group m-form__group has-info'>
                <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value, parentIndex) }} placeholder='Enter Here' />
                {false && (<div className='form-control-feedback'>should be Number</div>)}
              </div>
            </div>)
          } else if (data.type_property.property_type.key === 'Decimal') {
            value = data.type_property.float_value
            businessPropertyList.push(<div className='form-group row'>
              <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
              <div className='col-8 form-group m-form__group has-info'>
                <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value, parentIndex) }} placeholder='Enter Here' />
                {false && (<div className='form-control-feedback'>should be Number</div>)}
              </div>
            </div>)
          } else if (data.type_property.property_type.key === 'DateTime') {
            value = data.type_property.date_time_value ? moment(data.type_property.date_time_value).format('DD MMM YYYY') : ''
            businessPropertyList.push(<div className='form-group row'>
              <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
              <div className='col-8 form-group m-form__group has-info'>
                <DatePicker
                  className='input-sm form-control m-input'
                  selected={data.type_property.date_time_value ? moment(data.type_property.date_time_value) : ''}
                  dateFormat='DD MMM YYYY'
                  onSelect={(date) => { editProperty(index, date, parentIndex) }}
                  />
                {/* <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' /> */}
                {false && (<div className='form-control-feedback'>should be Date</div>)}
              </div>
            </div>)
          } else if (data.type_property.property_type.key === 'Text') {
            value = data.type_property.text_value
            businessPropertyList.push(<div className='form-group row'>
              <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
              <div className='col-8 form-group m-form__group has-info'>
                <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value, parentIndex) }} placeholder='Enter Here' />
                {false && (<div className='form-control-feedback'>should be Text</div>)}
              </div>
            </div>)
        } else if (data.type_property.property_type.key === 'Boolean') {
            value = data.type_property.boolean_value
            businessPropertyList.push(<div className='form-group row'>
              <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
              <div className='col-8 form-group m-form__group has-info'>
                <input checked={value} onChange={(event) => { editProperty(index, event.target.checked, parentIndex) }} type='checkbox' style={{cursor: 'pointer'}} />
                {false && (<div className='form-control-feedback'>should be Text</div>)}
              </div>
            </div>)
          } else if (data.type_property.property_type.key === 'List') {
            let propertyOption = data.type_property.value_set.values.map((option, opIndex) => {
              option.label = option.name
              option.value = option.id
              return option
            })
            let dvalue = data.type_property.value_set_value
            if (data.type_property.value_set_value !== null) {
              dvalue.label = data.type_property.value_set_value.name
              dvalue.value = data.type_property.value_set_value.id
            }
            value = data.type_property.value_set_value ? data.type_property.value_set_value.name : null
            businessPropertyList.push(<div className='form-group row'>
              <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
              <Select
                className='col-8 input-sm m-input'
                placeholder='Select Options'
                isClearable
                defaultValue={dvalue}
                onChange={handlePropertySelect(index, parentIndex)}
                isSearchable={false}
                name={'selectProperty'}
                options={propertyOption}
                />
            </div>)
          } else {
            value = data.type_property.other_value
            businessPropertyList.push(<div className='form-group row'>
              <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
              <div className='col-8 form-group m-form__group has-info'>
                <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value, parentIndex) }} placeholder='Enter Here' />
                {false && (<div className='form-control-feedback'>should be Text</div>)}
              </div>
            </div>)
          }
        })
      }
    })
    if (businessPropertyList.length === 0) {
      businessPropertyList = ''
    }
  }
  if (props.addSettings.createResponse !== null) {
    if (props.addSettings.createResponse.length > 0) {
      messageList = props.addSettings.createResponse.map(function (data, index) {
        if (data.error_code === null) {
          if (data.message != null) {
            return (<li className='m-list-search__result-item' key={index}>{data.message}</li>)
          } else {
            if (props.addSettings.createResponse.length === 1) {
              return (<li className='m-list-search__result-item' key={99}>{'No data has been added.'}</li>)
            }
          }
        } else {
          return (<li className='m-list-search__result-item' key={index}>{'Error Code: ' + data.error_code + 'Message: ' + data.error_message}</li>)
        }
      })
    } else {
      messageList = []
      messageList.push((
        <li key={0}>{'No data has been added.'}</li>
      ))
    }
  }
  if (props.addSettings.updateResponse !== null) {
    if (props.addSettings.updateResponse.length > 0) {
      messageList = props.addSettings.updateResponse.map(function (data, index) {
        if (data.error_code === null) {
          if (data.message != null) {
            return (<li className='m-list-search__result-item' key={index}>{data.message}</li>)
          } else {
            if (props.addSettings.updateResponse.length === 1) {
              return (<li className='m-list-search__result-item' key={99}>{'No data has been added.'}</li>)
            }
          }
        } else {
          return (<li className='m-list-search__result-item' key={index}>{'Error Code: ' + data.error_code + 'Message: ' + data.error_message}</li>)
        }
      })
    } else {
      messageList = []
      messageList.push((
        <li className='m-list-search__result-item' key={0}>{'No data has been added.'}</li>
      ))
    }
  }
  if (props.addSettings.deleteResponse !== null) {
    defaultStyle = customStylescrud
    if (props.addSettings.deleteResponse.length > 0) {
      messageList = props.addSettings.deleteResponse.map(function (data, index) {
        if (data.error_code === null) {
          if (data.message != null) {
            return (<li className='m-list-search__result-item' key={index}>{data.message}</li>)
          } else {
            if (props.addSettings.deleteResponse.length === 1) {
              return (<li className='m-list-search__result-item' key={99}>{'No data has been added.'}</li>)
            }
          }
        } else {
          return (<li className='m-list-search__result-item' key={index}>{'Error Code: ' + data.error_code + 'Message: ' + data.error_message}</li>)
        }
      })
    } else {
      messageList = []
      messageList.push((
        <li className='m-list-search__result-item' key={0}>{'No data has been added.'}</li>
      ))
    }
  }
  // var showCurrentPages = modelPrespectivesList.length
  const startValueOfRange = (currentPage - 1) * perPage + 1
  const endValueOfRange = (currentPage * perPage) <= (modelPrespectivesList.length) ? (currentPage * perPage) : (modelPrespectivesList.length)

  var activeClass = ''
return (
  <div>
    <div id='entitlementList'>
      {/* The table structure begins */}
      <div className='row'>
        <div className='col-md-12'>
          <div className='m_datatable' id='scrolling_vertical'>
            <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
              <div>
                <div className='m-portlet'>
                  <div className='m-portlet__body'>
                    <div className='row'>
                      <div className='col-md-10' />
                      {props.availableAction.Create && (<div className='col-md-2 float-right'>
                        <button type='button' onClick={openModal} className='btn btn-outline-info btn-sm' style={{'float': 'right'}}>Add </button>&nbsp;
                      </div>)}
                    </div>
                    <br />
                    <div id='m_table_1_wrapper' className='dataTables_wrapper dt-bootstrap4'>
                      <div className='row' style={{'marginBottom': '20px'}}>
                        <div className='col-sm-12 col-md-6'>
                          <div className='dataTables_length pull-left' id='m_table_1_length' style={{'display': 'flex'}}>
                            <div style={{'display': 'flex', 'width': '350px'}}>
                              <div className='m-input-icon m-input-icon--left'>
                                <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onKeyUp={''} />
                                <span className='m-input-icon__icon m-input-icon__icon--left'>
                                  <span>
                                    <i className='la la-search' />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className='col-sm-12 col-md-6'>
                          <div className='dataTables_length' id='m_table_1_length' style={{'display': 'flex'}}>
                            <h5 style={{'margin': '8px'}}>Show</h5>
                            <select value={props.perPage} name='m_table_1_length' onBlur={handleBlurdropdownChange} onChange={handledropdownChange} aria-controls='m_table_1' className='custom-select custom-select-sm form-control form-control-sm' style={{'height': '40px'}}>
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                            </select>
                            <h5 style={{'margin': '8px'}}>Entries</h5>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '100vh'}}>
                      <table className='table-pres m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                        <thead className='table-head pres-th'>
                          <tr role='row' className='table-head-row'>
                            {tableHeader}
                          </tr>
                        </thead>
                        <tbody className='table-body pres-th'>
                          {modelPrespectivesList}
                        </tbody>
                      </table>
                    </div>
                    {/* dummy row */}
                    <div className='row'>
                      <div className='col-sm-12 col-md-6' id='scrolling_vertical'>
                        <div
                          className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll'
                          id='scrolling_vertical'
                        >
                          <div className='m-datatable__pager m-datatable--paging-loaded clearfix'>
                            <ul className='m-datatable__pager-nav  pag'>
                              {currentPage !== 1 && totalPages > 1 ? <li className='page-item'><a href='javascript:void(0)' title='Previous' id='m_blockui_1_5' className={'m-datatable__pager-link m-datatable__pager-link--prev  page-link list links anchors' + previousClass} onClick={() => { handlePrevious(); handleFirst() }} data-page='4'><span aria-hidden='true'>&laquo;</span><span className={'sr-only'}>Previous</span></a></li> : ''}
                              {currentPage !== 1 && totalPages > 1 ? <li className='page-item anchors'><a href='javascript:void(0)' title='Previous' id='m_blockui_1_5' className={'m-datatable__pager-link m-datatable__pager-link--prev  page-link list links anchors' + previousClass} onClick={handlePrevious} data-page='4'><span aria-hidden='true'>&lt;</span><span className={'sr-only'}>Previous</span></a></li> : ''}
                              {listPage[0] && listPage[0].map(function (page, index) {
                                      if (page.number === currentPage) {
                                              page.class = 'm-datatable__pager-link--active activ'
                                              activeClass = 'actives'
                                            } else {
                                              page.class = ''
                                              activeClass = ''
                                            }
                                            return (<li key={index} className={'page-item' + activeClass}>
                                              <a href='javascript:void(0)' className={'m-datatable__pager-link m-datatable__pager-link-number actives  page-link list ' + page.class} data-page={page.number} title={page.number} onClick={(event) => { event.preventDefault(); handlePage(page.number) }} >{page.number}</a>
                                            </li>)
                                          })}
                              {currentPage !== totalPages &&
                                totalPages > 1 && (
                                <li className='page-item'><a href='javascript:void(0)' title='Next' className={'m-datatable__pager-link m-datatable__pager-link--next   page-link list links anchors' + nextClass} onClick={handleNext} data-page='4'><span aria-hidden='true'>&gt;</span><span className={'sr-only'}>Next</span></a></li>
                              )}
                              {currentPage !== totalPages &&
                                totalPages > 1 && (
                                <li className='page-item'><a href='javascript:void(0)' title='Next' className={'m-datatable__pager-link m-datatable__pager-link--next   page-link list links anchors' + nextClass} onClick={() => handleLast(totalPages)} data-page='4'><span aria-hidden='true'>&raquo;</span><span className={'sr-only'}>Next</span></a></li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className={`col-sm-12 col-md-6 text-right ${styles.topSpacing} `}>
                        {/* showing dropdown */}
                        <div className='showing-div showspace spaceMargin'>
                          <div className='dropdown dropup-showing'>
                            <button className='btn btn-default dropdown-toggle dropup-btn' type='button' data-toggle='dropdown'>{props.perPage}<span className='caret' /></button>
                            <ul className='dropdown-menu menu'>
                              <li><a href='javascript:void(0)' onClick={() => handledropdownChange(10)}>10</a></li>
                              <li><a href='javascript:void(0)' onClick={() => handledropdownChange(25)}>25</a></li>
                              <li><a href='javascript:void(0)' onClick={() => handledropdownChange(50)}>50</a></li>
                              <li><a href='javascript:void(0)' onClick={() => handledropdownChange(100)}>100</a></li>
                            </ul>
                          </div>
                          <span className='showing-text text-right showingText'> Showing {startValueOfRange} - {endValueOfRange} of {props.modelPrespectives.length} </span>
                        </div>
                      </div>
                    </div>
                    {/* original row */}
                    {/* <div className='row'>
                      <div className='col-md-12' id='scrolling_vertical'>
                        <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll pull-right' id='scrolling_vertical' style={{}}>
                          <div className='m-datatable__pager m-datatable--paging-loaded clearfix'>
                            <ul className='m-datatable__pager-nav  pag'>
                              {currentPage !== 1 && totalPages > 1 ? <li className='page-item'><a href='' title='Previous' id='m_blockui_1_5' className={'m-datatable__pager-link m-datatable__pager-link--prev  page-link list links anchors' + previousClass} onClick={handlePrevious} data-page='4'><span aria-hidden='true'>&laquo;</span><span className={'sr-only'}>Previous</span></a></li> : ''}
                              {currentPage !== 1 && totalPages > 1 ? <li className='page-item anchors'><a href='' title='Previous' id='m_blockui_1_5' className={'m-datatable__pager-link m-datatable__pager-link--prev  page-link list links anchors' + previousClass} onClick={handlePrevious} data-page='4'><span aria-hidden='true'>&lt;</span><span className={'sr-only'}>Previous</span></a></li> : ''}
                              {listPage[0] && listPage[0].map(function (page, index) {
                                      if (page.number === currentPage) {
                                              page.class = 'm-datatable__pager-link--active activ'
                                              activeClass = 'actives'
                                            } else {
                                              page.class = ''
                                              activeClass = ''
                                            }
                                            return (<li key={index} className={'page-item' + activeClass}>
                                              <a href='' className={'m-datatable__pager-link m-datatable__pager-link-number actives  page-link list ' + page.class} data-page={page.number} title={page.number} onClick={(event) => { event.preventDefault(); handlePage(page.number) }} >{page.number}</a>
                                            </li>)
                                          })}
                              {currentPage !== totalPages &&
                                totalPages > 1 && (
                                <li className='page-item'><a href='' title='Next' className={'m-datatable__pager-link m-datatable__pager-link--next   page-link list links anchors' + nextClass} onClick={handleNext} data-page='4'><span aria-hidden='true'>&gt;</span><span className={'sr-only'}>Next</span></a></li>
                              )}
                              {currentPage !== totalPages &&
                                totalPages > 1 && (
                                <li className='page-item'><a href='' title='Next' className={'m-datatable__pager-link m-datatable__pager-link--next   page-link list links anchors' + nextClass} onClick={handleNext} data-page='4'><span aria-hidden='true'>&raquo;</span><span className={'sr-only'}>Next</span></a></li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <ReactModal isOpen={props.addSettings.isModalOpen}
        onRequestClose={closeModal}
        // className='modal-dialog modal-lg'
        style={customStylescrud}
        >
        {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
        <div className={''}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                {props.addSettings.createResponse === null && (<h4 className='modal-title' id='exampleModalLabel'>Add Exclusion</h4>)}
                {props.addSettings.createResponse !== null && (<h4 className='modal-title' id='exampleModalLabel'>Create Report</h4>)}
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body' style={{'height': 'calc(70vh - 30px)', 'overflow': 'auto'}}>
                {props.addSettings.createResponse === null && (<div className='col-md-12'>
                  {/* {messageBlock} */}
                  <div className='form-group m-form__group row'>
                    <div className='col-8'>
                      {/* <input className='form-control m-input' type='email' placeholder='Enter User Name' ref={input => (userName = input)} id='example-userName-input' /> */}
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-input' className='col-2 col-form-label'>Name</label>
                    <div className='col-8'>
                      <input className='form-control m-input' value={props.addSettings.name} onChange={editName} placeholder='Enter Name' id='example-email-input' autoComplete='off' />
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-input' className='col-2 col-form-label'>Description</label>
                    <div className='col-8'>
                      <textarea className='form-control m-input' value={props.addSettings.description} onChange={editDescription} placeholder='Enter Description' />
                    </div>
                  </div>
                  {businessPropertyList}
                  {connectionSelectBoxList}
                </div>)}
                {props.addSettings.createResponse !== null && (<div className='m-list-search__results'>
                  {messageList}
                </div>)}
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={closeModal} className='btn btn-outline-danger btn-sm'>Close</button>
                {props.addSettings.createResponse === null && (<button className='btn btn-outline-info btn-sm' onClick={createComponent} >Add</button>)}
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
      <ReactModal isOpen={props.addSettings.isEditModalOpen}
        onRequestClose={closeModal}
        // className='modal-dialog modal-lg'
        style={customStylescrud}
        >
        {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
        <div className={''}>
          <div className=''>
            <div className='modal-content' >
              <div className='modal-header'>
                {props.addSettings.updateResponse === null && (<h4 className='modal-title' id='exampleModalLabel'>Edit Perspective</h4>)}
                {props.addSettings.updateResponse !== null && (<h4 className='modal-title' id='exampleModalLabel'>Update Report</h4>)}
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body' style={{'height': 'calc(70vh - 30px)', 'overflow': 'auto'}}>
                {props.addSettings.updateResponse === null && (<div className='col-md-12'>
                  {/* {messageBlock} */}
                  <div className='form-group m-form__group row'>
                    <div className='col-8'>
                      {/* <input className='form-control m-input' type='email' placeholder='Enter User Name' ref={input => (userName = input)} id='example-userName-input' /> */}
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-input' className='col-2 col-form-label'>Name</label>
                    <div className='col-8'>
                      <input className='form-control m-input' value={props.addSettings.name} onChange={editName} placeholder='Enter Name' id='example-email-input' autoComplete='off' />
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-input' className='col-2 col-form-label'>Description</label>
                    <div className='col-8'>
                      <textarea className='form-control m-input' value={props.addSettings.description} onChange={editDescription} placeholder='Enter Description' />
                    </div>
                  </div>
                  {businessPropertyList}
                  {connectionSelectBoxList}
                </div>)}
                {props.addSettings.updateResponse !== null && (<div className='m-list-search__results'>
                  {messageList}
                </div>)}
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={closeModal} className='btn btn-outline-danger btn-sm'>Close</button>
                {props.addSettings.updateResponse === null && (<button className='btn btn-outline-info btn-sm' onClick={updateComponent} >Update</button>)}
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
      <ReactModal isOpen={props.addSettings.isDeleteModalOpen}
        onRequestClose={closeModal}
        className='modal-dialog '
        style={defaultStyle} >
        <div className={styles.modalwidth}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                {props.addSettings.deleteResponse === null && (<h4 className='modal-title' id='exampleModalLabel'>Delete Exclusion</h4>)}
                {props.addSettings.deleteResponse !== null && (<h4 className='modal-title' id='exampleModalLabel'>Delete Report</h4>)}
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              {props.addSettings.deleteResponse === null && (<div className='modal-body'>
                <div>
                  <h6>Confirm deletion of Exclusion {serviceName}</h6>
                </div>
              </div>)}
              {props.addSettings.deleteResponse !== null && (<div className='modal-body' style={{'height': 'calc(70vh - 30px)', 'overflow': 'auto'}} >
                {messageList}
              </div>)}
              <div className='modal-footer'>
                <button type='button' onClick={closeModal} id='m_login_signup' className='btn btn-outline-info btn-sm'>Close</button>
                {props.addSettings.deleteResponse === null && (<button type='button' id='m_login_signup' className='btn btn-outline-info btn-sm' onClick={removeComponent}>Confirm</button>)}
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  </div>
      )
  }
  PerspectiveExclusion.propTypes = {
    addSettings: PropTypes.any,
    modelPrespectives: PropTypes.any,
    currentPage: PropTypes.any,
    perPage: PropTypes.any,
    metaModelPerspectiveList: PropTypes.any,
    availableAction: PropTypes.any,
    connectionData: PropTypes.any
  }
