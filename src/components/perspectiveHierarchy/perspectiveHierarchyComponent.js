import React from 'react'
import _ from 'lodash'
import ReactModal from 'react-modal'
import Select from 'react-select'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types'
import styles from './perspectiveHierarchyComponent.scss'
import 'react-datepicker/dist/react-datepicker.css'
ReactModal.setAppElement('#root')
let comparer = function (otherArray) {
  return function (current) {
    return otherArray.filter(function (other) {
      return other.value === current.value && other.display === current.display
    }).length === 0
  }
}
const customStylescrud = { content: { top: '10%', left: '8%', background: 'none', border: '0px', overflow: 'none', margin: 'auto' } }
export default function PerspectiveHierarchy (props) {
  let perspectiveName = ''
  let standardPropertyList = ''
  let connectionSelectBoxList = ''
  let businessPropertyList = ''
  let searchTextBox
  let perPage = props.perPage
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let modelPrespectivesList = ''
  let totalPages
  let tableHeader = []
  let messageList = ''
  let serviceName = props.addSettings.deleteObject ? props.addSettings.deleteObject.subject_name : ''
  let expandSettings = props.expandSettings
  if (props.addSettings.isModalOpen) {
    if (props.addSettings.selectedData) {
      perspectiveName = props.addSettings.selectedData.name
    } else {
      perspectiveName = props.metaModelPerspective ? props.metaModelPerspective.resources[0].name : ''
    }
  } else {
    perspectiveName = props.metaModelPerspective ? props.metaModelPerspective.resources[0].name : ''
  }
  console.log('perspectives props', props, searchTextBox, expandSettings)
  let handleClick = function (data, level) {
    console.log(data)
    console.log('level', level)
    let expandFlag = true
    let expandSettings = {...props.expandSettings}
    let selectedObject = expandSettings.selectedObject[level]
    if (selectedObject && selectedObject.name === data.name) {
      expandFlag = !selectedObject.expandFlag
      if (!expandFlag) {
        if (level > 0) {
          level = level - 1
          expandSettings.selectedObject.length = level + 1
          expandSettings.metaModelPerspectives.length = level + 1
          expandSettings.modelPerspectives.length = level + 1
        } else {
          level = null
          expandSettings.selectedObject.length = 0
          expandSettings.metaModelPerspectives.length = 0
          expandSettings.modelPerspectives.length = 0
        }
      }
    } else {
      expandFlag = true
      expandSettings.metaModelPerspectives[level] = data.metaModelPerspectives
      expandSettings.selectedObject[level] = data
      expandSettings.selectedObject[level].expandFlag = expandFlag
    }
    if (expandFlag) {
      if (data.metaModelPerspectives) {
        expandSettings.processAPIResponse = true
        let payload = {}
        payload['meta_model_perspective_id'] = data.metaModelPerspectives.id
        payload['view_key'] = data.metaModelPerspectives.view_key
        payload['parent_reference'] = data.parentReference
        if (data.containerPerspectiveId) {
          payload['container_meta_model_perspective_id'] = data.containerPerspectiveId
          payload['container_view_key'] = data.containerPerspectiveViewKey
        }
        props.fetchNestedModelPrespectives(payload)
      }
    }
    expandSettings.level = level
    props.setExpandSettings(expandSettings)
    // eslint-disable-next-line
    // mApp && mApp.block('#supplierList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  }
  let editProperty = function (index, value) {
    let connectionData = {...props.connectionData}
    let customerProperty = connectionData.customerProperty
    let propertyType = customerProperty[index].type_property.property_type
    if (propertyType.key === 'Boolean') {
      customerProperty[index].type_property.boolean_value = value
    } else if (propertyType.key === 'Integer') {
      customerProperty[index].type_property.int_value = value
    } else if (propertyType.key === 'Decimal') {
      customerProperty[index].type_property.float_value = value
    } else if (propertyType.key === 'DateTime') {
      customerProperty[index].type_property.date_time_value = value.format('DD MMM YYYY')
    } else if (propertyType.key === 'Text') {
      customerProperty[index].type_property.text_value = value
    } else {
      customerProperty[index].type_property.other_value = value
    }
    connectionData.customerProperty = customerProperty
    props.setConnectionData(connectionData)
  }
  let handlePropertySelect = function (index) {
    return function (newValue: any, actionMeta: any) {
      console.log('newValue', newValue)
      console.log('actionMeta', actionMeta)
      let connectionData = JSON.parse(JSON.stringify(props.connectionData))
      let customerProperty = connectionData.customerProperty
      if (actionMeta.action === 'select-option') {
        customerProperty[index].type_property.value_set_value = newValue
      }
      if (actionMeta.action === 'clear') {
        customerProperty[index].type_property.value_set_value = newValue
      }
      connectionData.customerProperty = customerProperty
      props.setConnectionData(connectionData)
    }
  }
  let handleBlurdropdownChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handledropdownChange = function (event) {
    console.log('handle change', event.target.value, typeof event.target.value)
    props.setPerPage(parseInt(event.target.value))
  }
  let openUpdateModal = function (data) {
    console.log('data', data)
    let addSettings = {...props.addSettings}
    let labelParts = props.metaModelPerspective.resources[0].parts
    let selectedValues = []
    let setCustomerProperty = []
    if (data.parts) {
      labelParts.forEach(function (partData, ix) {
        if (partData.standard_property !== null && partData.type_property === null) { // Standard Property
          if (partData.name === 'Name') {
            addSettings.name = data.parts[ix].value
          }
          if (partData.name === 'Description') {
            addSettings.description = data.parts[ix].value
          }
        } else if (partData.standard_property === null && partData.type_property === null) { // Connection Property
          if (data.parts[ix].value.length > 0) {
            // todo write code for multiple component
            let eachSelectedValues = []
            data.parts[ix].value.forEach(function (value, ix) {
              let targetComponent = value.target_component
              targetComponent.label = targetComponent.name
              targetComponent.value = targetComponent.id
              eachSelectedValues.push(targetComponent)
            })
            selectedValues.push(eachSelectedValues)
          } else {
            selectedValues.push(null)
          }
        } else if (partData.standard_property === null && partData.type_property !== null) { // Customer Property
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
            value = data.parts[ix].value !== null ? data.parts[ix].value.boolean_value : ''
          } else if (labelParts[ix].type_property.property_type.key === 'List') {
            value = data.parts[ix].value !== null ? data.parts[ix].value.value_set_value : ''
          } else {
            value = data.parts[ix].value !== null ? data.parts[ix].value.other_value : ''
          }
          setCustomerProperty.push(value)
        }
      })
    }
    addSettings.isEditModalOpen = true
    addSettings.updateObject = data
    addSettings.updateResponse = null
    props.setAddSettings(addSettings)
    let connectionData = {...props.connectionData}
    let existingCustomerProperty = connectionData.customerProperty.map(function (data, index) {
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
    connectionData.customerProperty = existingCustomerProperty
    connectionData.selectedValues = selectedValues
    connectionData.initialSelectedValues = JSON.parse(JSON.stringify(selectedValues))
    props.setConnectionData(connectionData)
  }
  let openModal = function (data, level) {
    let addSettings = {...props.addSettings}
    let perspectiveId = ''
    let viewKey = ''
    addSettings.isModalOpen = true
    addSettings.name = ''
    addSettings.description = ''
    addSettings.selectedData = data
    // props.setAddSettings(addSettings)
    console.log('open modal', data, level)
    if (level === 'ParentNode') {
      let appPackage = JSON.parse(localStorage.getItem('slaPackages'))
      let perspectives = appPackage.resources[0].perspectives
      perspectiveId = props.match.params.id
      viewKey = _.result(_.find(perspectives, function (obj) {
        return (obj.perspective === parseInt(perspectiveId) && obj.role_key === 'Create')
      }), 'view_key')

      console.log('view_key key', viewKey, perspectiveId, perspectives)
      if (viewKey) {
        let payload = {}
        payload.id = perspectiveId
        payload.viewKey = {'view_key': viewKey}
        props.fetchCrudMetaModelPrespective && props.fetchCrudMetaModelPrespective(payload)
        // eslint-disable-next-line
        mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      }
    }
    if (level === 'ChildrenNode') {
      if (data) {
        console.log(data)
        if (data.containerPerspectiveId === null) {
          console.log('if data', data)
          let rolePerspectives = data.rolePerspectives
          let payload = {}
          perspectiveId = rolePerspectives.Create.part_perspective_id
          viewKey = rolePerspectives.Create.part_perspective_view_key
          if (rolePerspectives) {
            payload.id = rolePerspectives.Create.part_perspective_id
            payload.viewKey = {'view_key': rolePerspectives.Create.part_perspective_view_key}
            props.fetchCrudMetaModelPrespective && props.fetchCrudMetaModelPrespective(payload)
            // eslint-disable-next-line
            mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
          }
        } else {
          console.log('else data', data)
          let payload = {}
          perspectiveId = data.containerPerspectiveId
          viewKey = data.containerPerspectiveViewKey
          payload.id = data.containerPerspectiveId
          payload.viewKey = {'view_key': data.containerPerspectiveViewKey}
          props.fetchCrudMetaModelPrespective && props.fetchCrudMetaModelPrespective(payload)
          // eslint-disable-next-line
          mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        }
      }
    }
    addSettings.initiatedFrom = level
    addSettings.perspectiveId = perspectiveId
    addSettings.viewKey = viewKey
    props.setAddSettings(addSettings)
    // let connectionData = {...props.connectionData}
    // let selectedValues = []
    // connectionData.selectedValues.forEach(function (data) {
    //   selectedValues.push(null)
    // })
    // let resetCustomerProperty = connectionData.customerProperty.map(function (data, index) {
    //   if (data.type_property.property_type.key === 'Boolean') {
    //     data.type_property.boolean_value = null
    //   } else if (data.type_property.property_type.key === 'Integer') {
    //     data.type_property.int_value = null
    //   } else if (data.type_property.property_type.key === 'Decimal') {
    //     data.type_property.float_value = null
    //   } else if (data.type_property.property_type.key === 'DateTime') {
    //     data.type_property.date_time_value = null
    //   } else if (data.type_property.property_type.key === 'Text') {
    //     data.type_property.text_value = null
    //   } else if (data.type_property.property_type.key === 'List') {
    //     data.type_property.value_set_value = null
    //   } else {
    //     data.type_property.other_value = null
    //   }
    //   return data
    // })
    // connectionData.selectedValues = selectedValues
    // connectionData.customerProperty = resetCustomerProperty
    // props.setConnectionData(connectionData)
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
    addSettings.selectedData = null
    props.setAddSettings(addSettings)
    props.setConnectionData('')
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
    // eslint-disable-next-line
    mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let addSettings = JSON.parse(JSON.stringify(props.addSettings))
    let patchPayload = []
    let obj = {}
    obj.op = 'add'
    obj.path = '/-'
    obj.value = {}
    obj.value.parts = []
    let connectionData = {...props.connectionData}
    connectionData.selectedValues.forEach(function (data, index) {
      if (Array.isArray(data)) {
        if (data.length > 0) {
          let connections = []
          data.forEach(function (selectedValue, ix) {
            let obj = {}
            obj.target_id = selectedValue.id
            connections.push(obj)
          })
          obj.value.parts[connectionData.data[index].partIndex] = {'value': connections}
        } else {
          obj.value.parts[connectionData.data[index].partIndex] = {}
        }
      } else {
        if (data) {
          let connections = []
          let obj = {}
          obj.target_id = data.id
          connections.push(obj)
          obj.value.parts[connectionData.data[index].partIndex] = {'value': connections}
        } else {
          obj.value.parts[connectionData.data[index].partIndex] = {}
        }
      }
    })
    connectionData.standardProperty.forEach(function (data, index) {
      if (data.standard_property === 'name') {
        obj.value.parts[data.partIndex] = {'value': addSettings.name}
      } else if (data.standard_property === 'description') {
        obj.value.parts[data.partIndex] = {'value': addSettings.description}
      }
    })
    connectionData.customerProperty.forEach(function (data, index) {
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
    })
    patchPayload.push(obj)
    let payload = {}
    payload.queryString = {}
    payload.queryString.meta_model_perspective_id = props.addSettings.perspectiveId
    payload.queryString.view_key = props.addSettings.viewKey
    payload.queryString.apply_changes = true
    if (addSettings.initiatedFrom === 'ChildrenNode') {
      payload.queryString.parent_reference = addSettings.selectedData.parentReference
    }
    payload.data = {}
    payload.data[props.addSettings.perspectiveId] = patchPayload
    console.log('payload', payload)
    props.updateModelPrespectives(payload)
  }
  let updateComponent = function (event) {
    event.preventDefault()
    // eslint-disable-next-line
    mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
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
        } else if (partData.standard_property === null && partData.type_property === null) { // Connection Property
          let dataIndex = connectionData.data.findIndex(p => p.name === partData.name)
          console.log('dataIndex', dataIndex)
          if (dataIndex !== -1) {
            // found index
            let max = connectionData.data[dataIndex].max
            let initialSelectedValue = connectionData.initialSelectedValues[dataIndex]
            let selectedValue = connectionData.selectedValues[dataIndex]
            console.log('initialSelectedValue', initialSelectedValue)
            console.log('selectedValue', selectedValue)
            let onlyInInitial = []
            if (initialSelectedValue) {
              if (max === 1) {
                let temp = []
                temp.push(initialSelectedValue)
                initialSelectedValue = temp
              }
            }
            if (selectedValue) {
              if (max === 1) {
                let temp = []
                temp.push(selectedValue)
                selectedValue = temp
              }
            }
            if (initialSelectedValue) {
              if (selectedValue) {
                onlyInInitial = initialSelectedValue.filter(comparer(selectedValue))
              } else {
                onlyInInitial = initialSelectedValue
              }
            }
            let onlyInFinal = []
            if (selectedValue) {
              if (initialSelectedValue) {
                onlyInFinal = selectedValue.filter(comparer(initialSelectedValue))
              } else {
                onlyInFinal = selectedValue
              }
            }
            // remove operation payload
            if (onlyInInitial.length > 0) {
              let connectionIdArray = data.parts[index].value
              let value = []
              onlyInInitial.forEach(function (removeData, rid) {
                let found = _.find(connectionIdArray, function (obj) { return (obj.target_component.id === removeData.id) })
                console.log('found ----', found)
                if (found) {
                  // set connection id
                  value.push(found.connection.id)
                }
              })
              let obj = {}
              obj.op = 'remove'
              obj.value = value
              valueType = 'value/-'
              obj.path = '/' + data.subject_id + '/parts/' + index + '/' + valueType
              patchPayload.push(obj)
              console.log('connectionId obj', connectionIdArray, obj)
            }
            console.log('index', dataIndex)
            console.log('onlyInInitial', onlyInInitial)
            console.log('onlyInFinal', onlyInFinal)
            let existingTargetComponent = connectionData.selectedValues[dataIndex]
            console.log('existingTargetComponent', existingTargetComponent)
            if (onlyInFinal.length > 0) {
              let value = []
              onlyInFinal.forEach(function (targetComponent, rid) {
                value.push(targetComponent.id)
              })
              let obj = {}
              obj.op = 'add'
              obj.value = value
              valueType = 'value/-'
              obj.path = '/' + data.subject_id + '/parts/' + index + '/' + valueType
              patchPayload.push(obj)
              console.log('add obj', obj)
            }
          } else {
            console.log('index', dataIndex)
          }
        } if (partData.standard_property === null && partData.type_property !== null) {
          let obj = {}
          obj.op = 'replace'
          let customerProperty = _.find(connectionData.customerProperty, function (obj) {
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
    let payload = {}
    payload.queryString = {}
    payload.queryString.meta_model_perspective_id = props.metaModelPerspective.resources[0].id
    payload.queryString.apply_changes = true
    payload.data = {}
    payload.data[props.metaModelPerspective.resources[0].id] = patchPayload
    console.log('payload', payload)
    console.log('updateComponentModelPrespectives', props.updateComponentModelPrespectives)
    props.updateComponentModelPrespectives(payload)
  }
  let removeComponent = function (event) {
    event.preventDefault()
    let addSettings = {...props.addSettings}
    if (addSettings.deleteObject) {
      let payload = {
        'id': addSettings.deleteObject.subject_id
      }
      props.deleteComponentModelPerspectives(payload)
    }
    closeModal()
  }
  let buildRow = function (childData, currentLevel) {
    let childLabelParts = props.expandSettings.metaModelPerspectives[currentLevel].parts
    console.log('childLabelParts', childLabelParts)
    let childRowColumn = []
    let faClass = 'fa fa-plus'
    let selectedObject = {}
    console.log('currentLevel', currentLevel)
    let headerColumn = []
    props.headerData.headerColumn.forEach(function (data, index) {
      let obj = {}
      obj.name = data
      obj.isProcessed = false
      obj.level = currentLevel
      headerColumn.push(obj)
    })
    if (childData) {
      childLabelParts.forEach(function (labelData, cix) {
        if (labelData.standard_property !== null && labelData.type_property === null) { // Standard Property
          if (labelData.standard_property === 'name') {
            selectedObject.name = childData[cix] ? childData[cix].value : ''
          }
        } else if (labelData.standard_property === null && labelData.type_property === null) { // Connection Property
          if (labelData.constraint_perspective) {
            selectedObject.parentReference = childData[cix] ? childData[cix].value.parent_reference : null
            selectedObject.metaModelPerspectives = childLabelParts[cix].constraint_perspective
            selectedObject.containerPerspectiveId = childLabelParts[cix].container_perspective_id
            selectedObject.containerPerspectiveViewKey = childLabelParts[cix].container_perspective_view_key
            selectedObject.rolePerspectives = childLabelParts[cix].role_perspectives
          }
        }
      })
      childLabelParts.forEach(function (labelData, cix) {
        let childValue
        if (labelData.standard_property !== null && labelData.type_property === null) { // Standard Property
          if (labelData.standard_property === 'name') {
            childValue = childData[cix] ? childData[cix].value : ''
            // selectedObject.name = childValue
            let columnId = props.headerData.headerColumn.indexOf(labelData.name)
            if (columnId !== -1) {
              headerColumn[columnId].isProcessed = true
              headerColumn[columnId].level = currentLevel
              if (columnId > 0) {
                for (let i = 0; i < columnId; i++) {
                  headerColumn[columnId].isProcessed = true
                  headerColumn[columnId].level = currentLevel
                  childRowColumn.push(<td className='' key={'ch_' + '_' + currentLevel + '_start' + i}>{''}</td>)
                }
              }
            }
            if (props.expandSettings.level >= 0 && (props.expandSettings.selectedObject[currentLevel] && props.expandSettings.selectedObject[currentLevel].name === childValue)) {
              faClass = 'fa fa-minus'
            }
            childRowColumn.push(<td className='' key={'ch_' + '_' + currentLevel + '_' + cix}><i className={faClass} aria-hidden='true' onClick={(event) => { event.preventDefault(); handleClick(selectedObject, currentLevel + 1) }} style={{'cursor': 'pointer'}} /> {childValue}</td>)
          }
        } else if (labelData.standard_property === null && labelData.type_property === null) { // Connection Property
          // console.log('partData', partData, labelParts[ix], ix)
          if (labelData.constraint_perspective) {
            // selectedObject.parentReference = childPartData.value.parent_reference
            childValue = labelData.constraint_perspective.name
            // selectedObject.metaModelPerspectives = childLabelParts[cix].constraint_perspective
            childRowColumn.push(<td className='' key={'ch_' + '_' + currentLevel + '_' + cix}><a onClick={() => openModal(selectedObject, 'ChildrenNode')} href='javascript:void(0);' >{'Add ' + childValue}</a></td>)
            let columnId = props.headerData.headerColumn.indexOf(labelData.name)
            if (columnId !== -1) {
              headerColumn[columnId].isProcessed = true
              headerColumn[columnId].level = 0
            }
          }
        }
      })
      console.log('generate rows headerColumn', headerColumn)
      // headerColumn.forEach(function (columnData, cid) {
      //   if (!columnData.isProcessed) {
      //     childRowColumn.push(<td className='' key={'ch_' + '_' + currentLevel + '_last' + cid} >{''}</td>)
      //   }
      // })
    }
    console.log('childRowColumn ->>>>>>>>>>', childRowColumn)
    return childRowColumn
  }
  let genericExpandRow = function (parentRowName, startLevel) {
    console.log('generic function', startLevel)
    let childList = []
    let expandSettings = JSON.parse(JSON.stringify(props.expandSettings))
    let expandLevel = expandSettings.level
    let rowToExpand = false
    expandSettings.selectedObject.forEach(function (data, index) {
      if (data.name === parentRowName) {
        rowToExpand = true
      }
    })
    if (rowToExpand) {
      startLevel = expandLevel
      console.log('expand level', startLevel)
      do {
        console.log('current process level', startLevel)
        if (expandLevel - startLevel >= 0 && startLevel >= 0) {
          if (expandSettings.selectedObject[startLevel].expandFlag) {
            // faClass = 'fa fa-minus'
            console.log('expandSettings', expandSettings)
            if (props.expandSettings.modelPerspectives[startLevel] && props.expandSettings.modelPerspectives[startLevel].length > 0) {
              let childLabelParts = props.expandSettings.metaModelPerspectives[startLevel].parts
              console.log('childLabelParts', childLabelParts, props.expandSettings.modelPerspectives[startLevel])
              let parentList = []
              props.expandSettings.modelPerspectives[startLevel].forEach(function (childData, idx) {
                let childRowColumn = []
                console.log('childData inside loop', childData)
                console.log('start startLevel', startLevel)
                childRowColumn = buildRow(childData.parts, startLevel)
                console.log('childRowColumn', childRowColumn, idx)
                parentList.push(
                  <tr>
                    {childRowColumn}
                  </tr>
                )
                let found = []
                if (childList.length > 0) {
                  let selectedObject = expandSettings.selectedObject[startLevel + 1]
                  let parts = childData.parts
                  console.log('selectedObject', selectedObject)
                  console.log('parts', parts)
                  found = _.filter(parts, {'value': selectedObject.name})
                  console.log('foundfoundfound', found)
                }
                console.log('parentList', parentList, idx)
                if (found.length > 0) {
                  if (childList.length > 0) {
                    childList.forEach(function (rowData, rix) {
                      parentList.push(rowData)
                    })
                    console.log('if id ==== 0')
                    console.log('child list', childList)
                    console.log('parent list', parentList)
                  }
                }
              })
              childList = parentList
              console.log('child list outer', childList)
            } else {
              // childList = []
              // childList.push((
              //   <tr key={0}>
              //     <td colSpan='5'>{'No data to display'}</td>
              //   </tr>
              // ))
            }
          }
        }
        if (expandLevel - startLevel >= 0 && startLevel >= 0) {
          startLevel = startLevel - 1
          // value = expandSettings.selectedObject[startLevel].name
          console.log('startLevel', startLevel)
          // console.log('startLevel value', value)
        } else {
          console.log(' why else equal', startLevel, expandLevel)
          break
        }
        console.log('/// check conditions')
        console.log(expandLevel, '-----', startLevel)
        console.log(expandLevel > startLevel)
        console.log(expandLevel >= startLevel)
        console.log('/// end conditions')
      } while (expandLevel - startLevel >= 0)
      if (startLevel === -1) {
        console.log('nested if equal', startLevel, childList)
        return childList
      }
    } else {
      return ''
    }
  }
  if (!props.headerData.toProcess) {
    if (props.headerData.metaModelPerspective.length > 0) {
      tableHeader = []
      props.headerData.metaModelPerspective.forEach(function (data, index) {
        data.parts.forEach(function (partData, idx) {
          if (partData.standard_property !== null && partData.type_property === null) { // Standard Property
            if (partData.standard_property === 'name') {
              tableHeader.push(<th key={index + 'col' + idx} className=''><h5>{partData.name}</h5></th>)
            }
          } else if (partData.standard_property === null && partData.type_property === null && partData.constraint_perspective === null) { // Connection Property
            tableHeader.push(<th key={index + 'col' + idx} className=''><h5>{partData.name}</h5></th>)
          }
        })
      })
    }
    tableHeader.push(<th key={'last'} className=''><h5>Action</h5></th>)
  }
  let listModelPrespectives = function () {
    console.log('list modal pers', props)
    if (props.modelPrespectives !== '' && props.metaModelPerspective !== '') {
      let labelParts = props.metaModelPerspective.resources[0].parts
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
      console.log('list props', props)
      if (props.modelPrespectives.length > 1 && !props.expandSettings.processAPIResponse) {
        let modelPrespectives = _.filter(props.modelPrespectives, {'error_code': null})
        modelPrespectives.splice(-1, 1)
        if (modelPrespectives.length > 1) {
          let expandSettings = JSON.parse(JSON.stringify(props.expandSettings))
          // let expandLevel = expandSettings.level
          modelPrespectivesList = modelPrespectives.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
            if (data.error_code === null) {
              let headerColumn = []
              props.headerData.headerColumn.forEach(function (data, index) {
                let obj = {}
                obj.name = data
                obj.isProcessed = false
                obj.level = null
                headerColumn.push(obj)
              })
              let rowColumn = []
              let faClass = 'fa fa-plus'
              let childList = ''
              let selectedObject = {}
              if (data.parts) {
                data.parts.forEach(function (partData, ix) {
                  let value
                  if (labelParts[ix].standard_property !== null && labelParts[ix].type_property === null) { // Standard Property
                    // console.log('partData standard property', partData, labelParts[ix], ix)
                    if (labelParts[ix].standard_property === 'name') {
                      value = partData ? partData.value : ''
                      selectedObject.name = value
                      let columnId = props.headerData.headerColumn.indexOf(labelParts[ix].name)
                      if (columnId !== -1) {
                        headerColumn[columnId].isProcessed = true
                        headerColumn[columnId].level = 0
                      }
                      if (expandSettings.level !== null) {
                        // expand row is clicked for first row
                        if (expandSettings.level >= 0) {
                          let startLevel = 0
                          childList = genericExpandRow(value, startLevel)
                          console.log('childList main function', childList)
                        }
                      }
                      if (expandSettings.level >= 0 && (expandSettings.selectedObject[0] && expandSettings.selectedObject[0].name === value)) {
                        faClass = 'fa fa-minus'
                      }
                      rowColumn.push(<td className='' key={'ch_' + index + '_' + ix}><i className={faClass} aria-hidden='true' onClick={(event) => { event.preventDefault(); handleClick(selectedObject, 0) }} style={{'cursor': 'pointer'}} /> {value}</td>)
                    }
                  } else if (labelParts[ix].standard_property === null && labelParts[ix].type_property === null && labelParts[ix].constraint_perspective === null) { // Connection Property
                    let targetComponents = []
                    partData.value.forEach(function (data, index) {
                      targetComponents.push(data.target_component.name)
                    })
                    value = targetComponents.toString()
                    let columnId = props.headerData.headerColumn.indexOf(labelParts[ix].name)
                    if (columnId !== -1) {
                      headerColumn[columnId].isProcessed = true
                      headerColumn[columnId].level = 0
                    }
                    rowColumn.push(<td className='' key={'ch_' + index + '_' + ix}>{value}</td>)
                  } else if (labelParts[ix].constraint_perspective !== null) { // Perspectives Property
                    selectedObject.parentReference = partData.value.parent_reference
                    value = labelParts[ix].constraint_perspective.name
                    selectedObject.metaModelPerspectives = labelParts[ix].constraint_perspective
                    selectedObject.containerPerspectiveId = labelParts[ix].container_perspective_id
                    selectedObject.containerPerspectiveViewKey = labelParts[ix].container_perspective_view_key
                    selectedObject.rolePerspectives = labelParts[ix].role_perspectives
                    let columnId = props.headerData.headerColumn.indexOf(labelParts[ix].name)
                    if (columnId !== -1) {
                      headerColumn[columnId].isProcessed = true
                      headerColumn[columnId].level = 0
                    }
                    rowColumn.push(<td className='' key={'ch_' + index + '_' + ix}><a href='javascript:void(0);' onClick={(event) => openModal(selectedObject, 'ChildrenNode')} >{'Add ' + value}</a></td>)
                  }
                  // console.log('value', value)
                  // if (toPush) {
                  //   rowColumn.push(<td className='' key={'ch_' + index + '_' + ix}>{isName && (<i className={faClass} aria-hidden='true' onClick={(event) => { event.preventDefault(); handleClick(selectedObject, 0) }} style={{'cursor': 'pointer'}} />)} {value}</td>)
                  // }
                })
              }
              console.log('headerColumn ----', headerColumn)
              headerColumn.forEach(function (columnData, cid) {
                if (!columnData.isProcessed) {
                  rowColumn.push(<td className='' key={'ch_' + index + '_emp' + cid} >{''}</td>)
                }
              })
              let availableAction = {...props.availableAction}
              let list = []
              if (availableAction.Update) {
                list.push(<a href='javascript:void(0);' onClick={(event) => { event.preventDefault(); openUpdateModal(data) }} >{'Edit'}</a>)
              }
              if (availableAction.Delete) {
                list.push(<a onClick={(event) => { event.preventDefault(); openDeleteModal(data) }} href='javascript:void(0);'>{'Delete'}</a>)
              }
              rowColumn.push(<td className='' key={'last' + index} >{list}</td>)
              return (
                <table style={{'tableLayout': 'fixed', 'width': '100%'}} className='table table-striped- table-bordered table-hover table-checkable responsive no-wrap dataTable dtr-inline collapsed' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                  {index === 0 && (<thead>
                    {tableHeader}
                  </thead>)}
                  <tbody>
                    <tr key={'tr' + index}>
                      {rowColumn}
                    </tr>
                    {childList}
                  </tbody>
                </table>
              )
            }
          })
          // props.setConnectionData(connectionData)
        } else {
          modelPrespectivesList = []
          modelPrespectivesList.push((
            <tr key={0}>
              <td colSpan={labelParts.length}>{'No data to display'}</td>
            </tr>
          ))
        }
      } else {
        modelPrespectivesList = []
        modelPrespectivesList.push((
          <tr key={0}>
            <td colSpan={labelParts.length}>{'No data to display'}</td>
          </tr>
        ))
      }
    }
  }
  if (props.modelPrespectives && props.modelPrespectives !== '') {
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
  let handlePrevious = function (event) {
    event.preventDefault()
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
  let handlePage = function (page) {
    if (page === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else if (page === totalPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    handleListAndPagination(page)
  }
  // if (props.metaModelPerspective && props.metaModelPerspective !== '' && props.metaModelPerspective.error_code === null) {
  //   perspectiveName = props.metaModelPerspective.resources[0].name
  //   if (props.metaModelPerspective.resources[0].parts.length > 0) {
  //     tableHeader = []
  //     props.metaModelPerspective.resources[0].parts.forEach(function (data, index) {
  //       if (data.standard_property !== null && data.type_property === null) { // Standard Property
  //         if (data.standard_property === 'name') {
  //           tableHeader.push(<th key={index} className=''><h5>{data.name}</h5></th>)
  //         }
  //       } else if (data.standard_property === null && data.type_property === null && data.constraint_perspective === null) { // Connection Property
  //         tableHeader.push(<th key={index} className=''><h5>{data.name}</h5></th>)
  //       } else if (data.standard_property === null && data.type_property === null && data.constraint_perspective !== null) { // Perspective Property
  //         tableHeader.push(<th key={index} className=''><h5>{data.name}</h5></th>)
  //       }
  //     })
  //   }
  //   tableHeader.push(<th key={'last'} className=''><h5>Action</h5></th>)
  // }
  let handleSelectChange = function (index) {
    return function (newValue: any, actionMeta: any) {
      console.log('newValue', newValue)
      console.log('actionMeta', actionMeta)
      console.log('index', index)
      let connectionData = {...props.connectionData}
      let selectedValues = connectionData.selectedValues
      if (actionMeta.action === 'select-option' || actionMeta.action === 'remove-value') {
        selectedValues[index] = newValue
        connectionData.selectedValues = selectedValues
        props.setConnectionData(connectionData)
      }
      if (actionMeta.action === 'clear') {
        selectedValues[index] = null
        connectionData.selectedValues = selectedValues
        props.setConnectionData(connectionData)
      }
    }
  }
  if (props.connectionData !== '' && props.connectionData.operation.isComplete) {
    // eslint-disable-next-line
    mApp && mApp.unblockPage()
    let connectionData = {...props.connectionData}
    console.log('props', props.connectionData)
    connectionSelectBoxList = connectionData.data.map(function (data, index) {
      let selectOptions = connectionData.selectOption[index].map(function (component, id) {
        component.value = component.id
        component.label = component.name
        return component
      })
      return (<div className='form-group row'>
        <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
        <div className='col-8'>
          <Select
            className='input-sm m-input'
            placeholder={'Select ' + data.name}
            isMulti={data.max !== 1}
            isClearable
            value={connectionData.selectedValues[index]}
            onChange={handleSelectChange(index)}
            options={selectOptions}
          />
        </div>
      </div>)
    })
    console.log('connectionSelectBoxList', connectionSelectBoxList)
    standardPropertyList = connectionData.standardProperty.map(function (data, index) {
      if (data.standard_property === 'name') {
        return (
          <div className='form-group m-form__group row'>
            <label htmlFor='example-input' className='col-2 col-form-label'>Name</label>
            <div className='col-8'>
              <input className='form-control m-input' value={props.addSettings.name} onChange={editName} placeholder='Enter Name' id='example-email-input' autoComplete='off' />
            </div>
          </div>
        )
      }
      if (data.standard_property === 'description') {
        return (
          <div className='form-group m-form__group row'>
            <label htmlFor='example-input' className='col-2 col-form-label'>Description</label>
            <div className='col-8'>
              <textarea className='form-control m-input' value={props.addSettings.description} onChange={editDescription} placeholder='Enter Description' />
            </div>
          </div>
        )
      }
    })
    businessPropertyList = connectionData.customerProperty.map(function (data, index) {
      let value = null
      if (data.type_property.property_type.key === 'Integer') {
        value = data.type_property.int_value
        return (<div className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <div className='col-8 form-group m-form__group has-info'>
            <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
            {false && (<div className='form-control-feedback'>should be Number</div>)}
          </div>
        </div>)
      } else if (data.type_property.property_type.key === 'Decimal') {
        value = data.type_property.float_value
        return (<div className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <div className='col-8 form-group m-form__group has-info'>
            <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
            {false && (<div className='form-control-feedback'>should be Number</div>)}
          </div>
        </div>)
      } else if (data.type_property.property_type.key === 'DateTime') {
        value = data.type_property.date_time_value ? moment(data.type_property.date_time_value).format('DD MMM YYYY') : ''
        return (<div className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <div className='col-8 form-group m-form__group has-info'>
            <DatePicker
              className='input-sm form-control m-input'
              selected={data.type_property.date_time_value ? moment(data.type_property.date_time_value) : ''}
              dateFormat='DD MMM YYYY'
              onSelect={(date) => { editProperty(index, date) }}
              />
            {/* <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' /> */}
            {false && (<div className='form-control-feedback'>should be Date</div>)}
          </div>
        </div>)
      } else if (data.type_property.property_type.key === 'Text') {
        value = data.type_property.text_value
        return (<div className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <div className='col-8 form-group m-form__group has-info'>
            <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
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
        return (<div className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <Select
            className='col-8 input-sm m-input'
            placeholder='Select Options'
            isClearable
            defaultValue={dvalue}
            onChange={handlePropertySelect(index)}
            isSearchable={false}
            name={'selectProperty'}
            options={propertyOption}
            />
        </div>)
      } else {
        value = data.type_property.other_value
        return (<div className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <div className='col-8 form-group m-form__group has-info'>
            <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
            {true && (<div className='form-control-feedback'>should be Text</div>)}
          </div>
        </div>)
      }
    })
    console.log('businessPropertyList', businessPropertyList)
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
                        <button type='button' onClick={(event) => openModal(null, 'ParentNode')} className='btn btn-outline-info btn-sm' style={{'float': 'right'}}>Add {perspectiveName}</button>&nbsp;
                      </div>)}
                    </div>
                    <br />
                    <div id='m_table_1_wrapper' className='dataTables_wrapper dt-bootstrap4'>
                      <div className='row' style={{'marginBottom': '20px'}}>
                        <div className='col-sm-12 col-md-6'>
                          <div className='dataTables_length' id='m_table_1_length' style={{'display': 'flex'}}>
                            <h5 style={{'margin': '8px'}}>Show</h5>
                            <select value={props.perPage} name='m_table_1_length' onBlur={handleBlurdropdownChange} onChange={handledropdownChange} aria-controls='m_table_1' className='custom-select custom-select-sm form-control form-control-sm' style={{'height': '40px'}}>
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                            </select>
                            <h5 style={{'margin': '8px'}}>Entries</h5>
                            {/* </label> */}
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div className='dataTables_length pull-right' id='m_table_1_length' style={{'display': 'flex'}}>
                            <div style={{'display': 'flex'}}>
                              <h5 style={{'margin': '10px'}}>Search</h5>
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
                      </div>
                    </div>
                    <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '100vh'}}>
                      {modelPrespectivesList}
                    </div>
                    <div className='row'>
                      <div className='col-md-12' id='scrolling_vertical'>
                        <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll pull-right' id='scrolling_vertical' style={{}}>
                          <div className='m-datatable__pager m-datatable--paging-loaded clearfix'>
                            <ul className='m-datatable__pager-nav'>
                              <li><a href='' title='Previous' id='m_blockui_1_5' className={'m-datatable__pager-link m-datatable__pager-link--prev ' + previousClass} onClick={handlePrevious} data-page='4'><i className='la la-angle-left' /></a></li>
                              {listPage[0] && listPage[0].map(function (page, index) {
                                      if (page.number === currentPage) {
                                              page.class = 'm-datatable__pager-link--active'
                                            } else {
                                              page.class = ''
                                            }
                                            return (<li key={index} >
                                              <a href='' className={'m-datatable__pager-link m-datatable__pager-link-number ' + page.class} data-page={page.number} title={page.number} onClick={(event) => { event.preventDefault(); handlePage(page.number) }} >{page.number}</a>
                                            </li>)
                                          })}
                              <li><a href='' title='Next' className={'m-datatable__pager-link m-datatable__pager-link--next ' + nextClass} onClick={handleNext} data-page='4'><i className='la la-angle-right' /></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
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
                {props.addSettings.createResponse === null && (<h4 className='modal-title' id='exampleModalLabel'>Add {perspectiveName}</h4>)}
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
                  {/* <div className='form-group m-form__group row'>
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
                  </div> */}
                  {standardPropertyList}
                  {'businessPropertyList'}
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
                {props.addSettings.updateResponse === null && (<h4 className='modal-title' id='exampleModalLabel'>Edit {perspectiveName}</h4>)}
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
                  {'businessPropertyList'}
                  {'connectionSelectBoxList'}
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
        style={{'content': {'top': '20%'}}} >
        <div className={styles.modalwidth}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Delete {perspectiveName}</h4>
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <div>
                  <h6>Confirm deletion of {perspectiveName} {serviceName}</h6>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={closeModal} id='m_login_signup' className='btn btn-outline-info btn-sm'>Close</button>
                <button type='button' id='m_login_signup' className='btn btn-outline-info btn-sm' onClick={removeComponent}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
    {/* <Discussion name={'Entitlements'} TypeKey='Entitlement' type='ComponentType' {...props} />
    <NewDiscussion contextId={contextId} name={'Entitlements'} type='ComponentType' {...props} /> */}
  </div>
      )
  }
  PerspectiveHierarchy.propTypes = {
    addSettings: PropTypes.any,
    modelPrespectives: PropTypes.any,
    metaModelPerspective: PropTypes.any,
    currentPage: PropTypes.any,
    perPage: PropTypes.any,
    // crude: PropTypes.any,
    availableAction: PropTypes.any,
    connectionData: PropTypes.any,
    expandSettings: PropTypes.any,
    headerData: PropTypes.any
  }
