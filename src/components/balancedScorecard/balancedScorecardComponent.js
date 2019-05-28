import React from 'react'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import ReactModal from 'react-modal'
import Select from 'react-select'
import moment from 'moment'
import PropTypes from 'prop-types'
import styles from './balancedScorecardComponent.scss'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
ReactModal.setAppElement('#root')
let comparer = function (otherArray) {
  return function (current) {
    return otherArray.filter(function (other) {
      return other.value === current.value && other.display === current.display
    }).length === 0
  }
}
const customStylescrud = { content: { top: '10%', left: '8%', background: 'none', border: '0px', overflow: 'none', margin: 'auto' } }
export default function BalancedScorecard (props) {
  console.log('props ==========================', props, props.expandSettings)
  let defaultStyle = {'content': {'top': '20%'}}
  let copyModelPrespectives = props.copyModelPrespectives
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
  let deletePerspectiveName = props.addSettings.deleteObject ? props.addSettings.deleteObject.name : ''
  let updatePerspectiveName = props.addSettings.selectedData ? props.addSettings.selectedData.editName : ''
  // let expandSettings = props.expandSettings
  if (props.addSettings.isEditModalOpen) {
    if (props.addSettings.selectedData) {
      if (props.addSettings.selectedData.initiatedFrom === 'ParentNode') {
        updatePerspectiveName = props.addSettings.selectedData.name
      } else if (props.addSettings.selectedData.initiatedFrom === 'ChildrenNode') {
        updatePerspectiveName = props.addSettings.selectedData.editName
      }
    }
  }
  if (props.addSettings.isModalOpen) {
    if (props.addSettings.selectedData) {
      perspectiveName = props.addSettings.selectedData.metaModelPerspectives.name
    } else {
      perspectiveName = props.metaModelPerspective ? props.metaModelPerspective.resources[0].name : ''
    }
  } else {
    perspectiveName = props.metaModelPerspective ? props.metaModelPerspective.resources[0].name : ''
  }
  let handleInputChange = debounce((e) => {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let searchText = searchTextBox ? searchTextBox.value : ''
    let originalData = copyModelPrespectives
    if (searchText.trim() !== '') {
      if (originalData !== '') {
        let list = _.filter(originalData, function (data, index) {
          if (data.parts) {
            if ((data.parts[0].value.toLowerCase()).match(searchText.toLowerCase())) {
              return data
            }
          }
        })
        let payload = {}
        payload.data = list
        payload.copyData = props.copyModelPrespectives
        props.setModalPerspectivesData(payload)
      }
      // eslint-disable-next-line
      mApp && mApp.unblockPage()
    } else {
      let payload = {}
      payload.data = props.copyModelPrespectives
      payload.copyData = props.copyModelPrespectives
      props.setModalPerspectivesData(payload)
      // eslint-disable-next-line
      mApp && mApp.unblockPage()
    }
    props.setCurrentPage(1)
  }, 500)
  let handleClick = function (data, level) {
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
      if (data.rolePerspectives) {
        expandSettings.selectedObject[level].showChildExpandIcon = true
      } else {
        expandSettings.selectedObject[level].showChildExpandIcon = false
      }
    }
    if (expandFlag) {
      if (data.metaModelPerspectives) {
        expandSettings.processAPIResponse = true
        // eslint-disable-next-line
        mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        let payload = {}
        payload['meta_model_perspective_id'] = data.metaModelPerspectives.id
        payload['view_key'] = data.metaModelPerspectives.view_key
        payload['parent_reference'] = data.parentReference
        payload['filter[0]'] = data.childFilter
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
    props.setPerPage(parseInt(event.target.value))
  }
  let openModal = function (data, level, operationType) {
    let addSettings = {...props.addSettings}
    // check Expand level and set Level on open Modal operation
    // let expandSettings = {...props.expandSettings}
    // let levelName = ''
    // if (operationType === 'Add') {
    //   levelName = addSettings.name
    // } else if (operationType === 'Edit') {
    //   levelName = addSettings.editName
    // }
    // levelName = data.name
    // let selectedObjects = expandSettings.selectedObject
    // var index = selectedObjects.findIndex(function (selectedObject) {
    //   return selectedObject.name === levelName.toString()
    // })
    // console.log('found index', index, selectedObjects, levelName, data)
    // if (index >= 0) {
    //   expandSettings.selectedObject.length = index
    //   expandSettings.metaModelPerspectives.length = index
    //   expandSettings.modelPerspectives.length = index
    //   expandSettings.level = level
    //   props.setExpandSettings(expandSettings)
    // }
    // end of code for check level operation
    addSettings.isNexusPoint = false
    let perspectiveId = ''
    let viewKey = ''
    if (operationType === 'Add') {
      addSettings.isModalOpen = true
    } else if (operationType === 'Edit') {
      addSettings.isEditModalOpen = true
    }
    addSettings.name = ''
    addSettings.description = ''
    addSettings.selectedData = data
    if (level === 'ParentNode') {
      let packages = JSON.parse(localStorage.getItem('packages'))
      let perspectives = _.result(_.find(packages.resources, function (obj) {
        return obj.key === 'ECO_SLA'
      }), 'perspectives')
      if (operationType === 'Add') {
        let perspectiveObject = _.find(perspectives, function (obj) {
          return (obj.key === 'PenaltyAgreement_Add' && obj.role_key === 'Create')
        })
        perspectiveId = perspectiveObject.perspective
        viewKey = perspectiveObject.view_key
      } else if (operationType === 'Edit') {
        let perspectiveObject = _.find(perspectives, function (obj) {
          return (obj.key === 'PenaltyAgreement_Update' && obj.role_key === 'Update')
        })
        perspectiveId = perspectiveObject.perspective
        viewKey = perspectiveObject.view_key
      }
      if (viewKey) {
        let payload = {}
        payload.id = perspectiveId
        payload.viewKey = {'view_key': viewKey}
        props.fetchCrudMetaModelPrespective && props.fetchCrudMetaModelPrespective(payload)
        if (operationType === 'Edit') {
          let paydata = {}
          paydata['meta_model_perspective_id'] = perspectiveId
          paydata['view_key'] = viewKey
          let modelPerspectivePayload = {}
          modelPerspectivePayload.id = data.subjectId
          modelPerspectivePayload.data = paydata
          props.fetchCrudModelPrespectives(modelPerspectivePayload)
        }
        // eslint-disable-next-line
        mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      }
    }
    if (level === 'ChildrenNode') {
      if (data) {
        if (data.rolePerspectives) {
          let rolePerspectives = data.rolePerspectives
          let payload = {}
          if (operationType === 'Add') {
            perspectiveId = rolePerspectives.Create.part_perspective_id
            viewKey = rolePerspectives.Create.part_perspective_view_key
          } else if (operationType === 'Edit') {
            perspectiveId = rolePerspectives.Update.part_perspective_id
            viewKey = rolePerspectives.Update.part_perspective_view_key
          }
          payload.id = perspectiveId
          payload.viewKey = {}
          payload.viewKey.view_key = viewKey
          if (data.parentReference) {
            payload.viewKey.parent_reference = data.parentReference
          }
          props.fetchCrudMetaModelPrespective && props.fetchCrudMetaModelPrespective(payload)
          if (operationType === 'Edit') {
            let paydata = {}
            paydata['meta_model_perspective_id'] = perspectiveId
            paydata['view_key'] = viewKey
            if (data.parentReference) {
              paydata['parent_reference'] = data.parentReference
            }
            let modelPerspectivePayload = {}
            modelPerspectivePayload.id = data.editSubjectId
            modelPerspectivePayload.data = paydata
            props.fetchCrudModelPrespectives(modelPerspectivePayload)
          }
          // eslint-disable-next-line
          mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        } else {
          addSettings.isModalOpen = false
          addSettings.isEditModalOpen = false
          // let payload = {}
          // perspectiveId = data.metaModelPerspectives.id
          // let payloadData = {}
          // if (data.containerPerspectiveId !== null) {
          //   payloadData.
          // }
          // perspectiveId = data.containerPerspectiveId
          // viewKey = data.containerPerspectiveViewKey
          // payload.id = data.containerPerspectiveId
          // payload.viewKey = {'view_key': data.containerPerspectiveViewKey}
          // props.fetchCrudMetaModelPrespective && props.fetchCrudMetaModelPrespective(payload)
          // // eslint-disable-next-line
          // mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        }
      }
    }
    addSettings.initiatedFrom = level
    addSettings.perspectiveId = perspectiveId
    addSettings.viewKey = viewKey
    props.setAddSettings(addSettings)
  }
  let openDeleteModal = function (data, level, initiatedFrom) {
    let addSettings = {...props.addSettings}
    addSettings.isDeleteModalOpen = true
    addSettings.deleteObject = data
    addSettings.deleteOperationLevel = level
    addSettings.initiatedFrom = initiatedFrom
    props.setAddSettings(addSettings)
  }
  let closeModal = function () {
    let addSettings = {...props.addSettings}
    addSettings.isModalOpen = false
    addSettings.isDeleteModalOpen = false
    addSettings.isEditModalOpen = false
    addSettings.deleteObject = null
    addSettings.createResponse = null
    addSettings.updateResponse = null
    addSettings.deleteResponse = null
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
          let obj1 = {}
          obj1.target_id = data.id
          connections.push(obj1)
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
    if (addSettings.isNexusPoint) {
      let metricObject = {'target_id': connectionData.metricSelectedValue[0].subjectId}
      let metricPointArray = []
      metricPointArray.push(metricObject)
      obj.value.parts.push({'value': metricPointArray})
    }
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
  // let updateNexusComponent = function (event) {
  //   event.preventDefault()
  //   // eslint-disable-next-line
  //   mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  //   let addSettings = JSON.parse(JSON.stringify(props.addSettings))
  //   let updateObject = props.addSettings.updateObject
  //   let patchPayload = []
  //   let obj = {}
  //   obj.op = 'replace'
  //   obj.path = `/${updateObject.subject_id}/`
  //   obj.value = {}
  //   obj.value.parts = []
  //   let connectionData = JSON.parse(JSON.stringify(props.connectionData))
  //   let groupedPairedList = props.addSettings.groupedPairedList
  //   connectionData.selectedValues.forEach(function (data, index) {
  //     if (Array.isArray(data)) {
  //       if (data.length > 0) {
  //         let connections = []
  //         data.forEach(function (selectedValue, ix) {
  //           let obj = {}
  //           obj.target_id = selectedValue.id
  //           connections.push(obj)
  //         })
  //         let extraArray = []
  //         extraArray.push(connections)
  //         obj.value.parts[connectionData.data[index].partIndex] = {'value': extraArray}
  //       } else {
  //         // obj.value.parts[connectionData.data[index].partIndex] = {}
  //       }
  //     } else {
  //       if (data) {
  //         let connections = []
  //         let obj1 = {}
  //         obj1.target_id = data.id
  //         connections.push(obj1)
  //         let extraArray = []
  //         extraArray.push(connections)
  //         obj.value.parts[connectionData.data[index].partIndex] = {'value': extraArray}
  //       } else {
  //         // obj.value.parts[connectionData.data[index].partIndex] = {}
  //       }
  //     }
  //   })
  //   if (groupedPairedList.length > 0) {
  //     let groupedValues = []
  //     groupedPairedList.forEach(function (data, index) {
  //       let values = []
  //       if (data[0]) {
  //         let cObj = {}
  //         cObj.target_id = data[0].id
  //         values.push(cObj)
  //       }
  //       if (data[1]) {
  //         let cObj = {}
  //         cObj.target_id = data[1].id
  //         values.push(cObj)
  //       }
  //       groupedValues.push(values)
  //     })
  //     obj.value.parts.push({'value': groupedValues})
  //   }
  //   patchPayload.push(obj)
  //   let selectedData = addSettings.selectedData
  //   let payload = {}
  //   payload.id = updateObject.subject_id
  //   payload.queryString = {}
  //   payload.queryString.meta_model_perspective_id = props.crudMetaModelPerspective.resources[0].id
  //   payload.queryString.apply_changes = true
  //   if (addSettings.initiatedFrom === 'ChildrenNode') {
  //     payload.queryString.parent_reference = addSettings.selectedData.parentReference
  //     let viewKey = null
  //     if (selectedData.rolePerspectives) {
  //       if (selectedData.rolePerspectives.Update) {
  //         viewKey = selectedData.rolePerspectives.Update.part_perspective_view_key
  //       }
  //     }
  //     if (viewKey) {
  //       payload.queryString.view_key = viewKey
  //     }
  //   } else {
  //     payload.queryString.view_key = addSettings.viewKey
  //   }
  //   payload.data = patchPayload
  //   props.updateNestedModelPrespectives(payload)
  // }
  let updateComponent = function (event) {
    event.preventDefault()
    // eslint-disable-next-line
    mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let addSettings = JSON.parse(JSON.stringify(props.addSettings))
    let connectionData = JSON.parse(JSON.stringify(props.connectionData))
    let labelParts = props.crudMetaModelPerspective.resources[0].parts
    let data = addSettings.updateObject
    let patchPayload = []
    if (data.parts) {
      labelParts.forEach(function (partData, index) {
        let valueType = ''
        let obj = {}
        if (partData.standard_property !== null && partData.type_property === null) { // Standard Property
          obj.op = 'replace'
          valueType = partData.standard_property
          obj.path = '/parts/' + index + '/' + valueType
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
            let initialSelectedValue = connectionData.initialSelectedValues[dataIndex] || []
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
              obj.path = '/parts/' + index + '/' + valueType
              patchPayload.push(obj)
              console.log('connectionId obj', connectionIdArray, obj)
            }
            console.log('index', dataIndex)
            console.log('onlyInInitial', onlyInInitial)
            console.log('onlyInFinal', onlyInFinal)
            let existingTargetComponent = connectionData.selectedValues[dataIndex]
            console.log('existingTargetComponent', existingTargetComponent)
            if (onlyInFinal.length > 0) {
              let connections = []
              onlyInFinal.forEach(function (targetComponent, rid) {
                let obj = {}
                obj.target_id = targetComponent.id
                connections.push(obj)
              })
              let obj = {}
              obj.op = 'add'
              obj.value = connections
              valueType = 'value/-'
              obj.path = '/parts/' + index + '/' + valueType
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
            obj.path = '/parts/' + index + '/' + valueType
            patchPayload.push(obj)
          }
        }
      })
    }
    let selectedData = addSettings.selectedData
    let payload = {}
    payload.id = data.subject_id
    payload.queryString = {}
    payload.queryString.meta_model_perspective_id = props.crudMetaModelPerspective.resources[0].id
    payload.queryString.apply_changes = true
    if (addSettings.initiatedFrom === 'ChildrenNode') {
      payload.queryString.parent_reference = addSettings.selectedData.parentReference
      let viewKey = null
      if (selectedData.rolePerspectives) {
        if (selectedData.rolePerspectives.Update) {
          viewKey = selectedData.rolePerspectives.Update.part_perspective_view_key
        }
      }
      if (viewKey) {
        payload.queryString.view_key = viewKey
      }
    } else {
      payload.queryString.view_key = addSettings.viewKey
    }
    payload.data = patchPayload
    props.updateNestedModelPrespectives(payload)
  }
  let removeComponent = function (event) {
    event.preventDefault()
    // eslint-disable-next-line
    mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let removeObject = {}
    removeObject.op = 'remove'
    removeObject.path = `/${props.addSettings.deleteObject.subjectId}/`
    let payload = {}
    payload.id = props.addSettings.deleteObject.subjectId
    payload.queryString = {}
    if (props.addSettings.initiatedFrom === 'ParentNode') {
      let viewKey = null
      let packages = JSON.parse(localStorage.getItem('packages'))
      let perspectives = _.result(_.find(packages.resources, function (obj) {
        return obj.key === 'ECO_SLA'
      }), 'perspectives')
      let perspectiveObject = _.find(perspectives, function (obj) {
        return (obj.key === 'PenaltyAgreement_Delete' && obj.role_key === 'Delete')
      })
      let perspectiveId = perspectiveObject.perspective
      viewKey = perspectiveObject.view_key
      payload.queryString.meta_model_perspective_id = perspectiveId
      payload.queryString.view_key = viewKey
      payload.queryString.apply_changes = true
      payload.data = {}
      let patchData = []
      patchData.push(removeObject)
      payload.data[perspectiveId] = patchData
      console.log('remove payload data', payload)
      props.removeModelPrespectives(payload)
    } else if (props.addSettings.initiatedFrom === 'ChildrenNode') {
      if (props.addSettings.deleteOperationLevel !== null) {
        let selectedObject = props.expandSettings.selectedObject[props.addSettings.deleteOperationLevel] || null
        // get perspective id and view key for delete operation
        if (selectedObject) {
          let rolePerspectives = selectedObject.rolePerspectives
          let perspectiveId = rolePerspectives.Delete.part_perspective_id
          let viewKey = rolePerspectives.Delete.part_perspective_view_key
          payload.queryString.meta_model_perspective_id = perspectiveId
          payload.queryString.view_key = viewKey
          payload.queryString.apply_changes = true
          payload.queryString.parent_reference = selectedObject.parentReference
          payload.data = {}
          let patchData = []
          patchData.push(removeObject)
          payload.data[perspectiveId] = patchData
          console.log('remove payload data', payload)
          props.removeModelPrespectives(payload)
        }
      }
    }
  }
  let buildRow = function (childData, currentLevel, subjectId) {
    let childLabelParts = props.expandSettings.metaModelPerspectives[currentLevel].parts
    let expandSettings = JSON.parse(JSON.stringify(props.expandSettings))
    let editSelectedObject = expandSettings.selectedObject[currentLevel] || {}
    let showChildExpandIcon = props.expandSettings.selectedObject[currentLevel].showChildExpandIcon
    editSelectedObject.editSubjectId = subjectId
    let childRowColumn = []
    let faClass = 'fa fa-plus'
    let selectedObject = {}
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
          if (labelData.constraint_perspective && !labelData.nexus) {
            selectedObject.parentReference = childData[cix] ? childData[cix].value.parent_reference : null
            selectedObject.childFilter = childData[cix] ? childData[cix].value.child_filter : null
            selectedObject.metaModelPerspectives = childLabelParts[cix].constraint_perspective
            selectedObject.containerPerspectiveId = childLabelParts[cix].container_perspective_id
            selectedObject.containerPerspectiveViewKey = childLabelParts[cix].container_perspective_view_key
            selectedObject.rolePerspectives = childLabelParts[cix].role_perspectives
            selectedObject.subjectId = subjectId
            // selectedObject.groupWithPrevious = labelData.group_with_previous
          }
          // if (childLabelParts[cix].role_perspectives === null) {
          //   faClass = ''
          // }
        }
      })
      let totalMetricPoints = 0
      childLabelParts.forEach(function (labelData, cix) {
        let childValue
        if (labelData.standard_property !== null && labelData.type_property === null) { // Standard Property
          if (labelData.standard_property === 'name') {
            childValue = childData[cix] ? childData[cix].value : ''
            editSelectedObject.editName = childData[cix] ? childData[cix].value : ''
            // selectedObject.name = childValue
            let columnId = props.headerData.headerColumn.indexOf(labelData.name)
            if (columnId !== -1) {
              headerColumn[columnId].isProcessed = true
              headerColumn[columnId].level = currentLevel
              if (columnId > 0) {
                for (let i = 0; i < columnId; i++) {
                  headerColumn[i].isProcessed = true
                  headerColumn[i].level = currentLevel
                  childRowColumn.push(<td className='' key={'ch_' + '_' + currentLevel + '_start' + i}>{''}</td>)
                }
              }
            }
            if (props.expandSettings.level > currentLevel && currentLevel >= 0 && props.expandSettings.selectedObject[currentLevel + 1].name === childValue && showChildExpandIcon) {
              faClass = 'fa fa-minus'
            }
            if (!showChildExpandIcon) {
              faClass = ''
            }
            let availableAction = {...props.availableAction}
            let list = []
            if (showChildExpandIcon) {
              if (faClass !== '') {
                if (availableAction.Update) {
                  list.push(<a href='javascript:void(0);' onClick={(event) => { event.preventDefault(); openModal(editSelectedObject, 'ChildrenNode', 'Edit') }} > <img src='/assets/edit.png' alt='gear' className='td-icons' /></a>)
                }
                if (availableAction.Delete) {
                  list.push(<a href='javascript:void(0);' onClick={(event) => { event.preventDefault(); openDeleteModal(selectedObject, currentLevel, 'ChildrenNode') }} > <img src='/assets/rubbish-bin.png' alt='delete' className='td-icons' /></a>)
                }
              }
            }
            childRowColumn.push(<td className='' key={'ch_' + '_' + currentLevel + '_' + cix}>
              <i className={faClass} aria-hidden='true' onClick={(event) => { event.preventDefault(); handleClick(selectedObject, currentLevel + 1) }} style={{'cursor': 'pointer'}} /> {childValue}&nbsp;&nbsp;
              <div className='btn-group-sm m-btn-group--pill btn-group' role='group' aria-label='First group'>
                {list}
              </div>
            </td>)
          }
        } else if (labelData.standard_property === null && labelData.type_property === null) { // Connection Property
          // console.log('partData', partData, labelParts[ix], ix)
          if (labelData.constraint_perspective && !labelData.nexus) {
            if (totalMetricPoints > 0) {
              selectedObject.parentReference = childData[cix + totalMetricPoints - 1].value.parent_reference
            }
            // let columnHeaderName = labelData.constraint_perspective.name
            // if (columnHeaderName != null && columnHeaderName.length > 0 && columnHeaderName.charAt(columnHeaderName.length - 1) === 's') {
            //   childValue = columnHeaderName.substring(0, columnHeaderName.length - 1)
            // }
            childValue = labelData.constraint_perspective.name
            // selectedObject.metaModelPerspectives = childLabelParts[cix].constraint_perspective
            if (labelData.role_perspectives) {
              childRowColumn.push(<td className='' key={'ch_' + '_' + currentLevel + '_' + cix}><a onClick={() => openModal(selectedObject, 'ChildrenNode', 'Add')} href='javascript:void(0);' >{'Add ' + childValue}</a></td>)
            } else {
              childRowColumn.push(<td className='' key={'ch_' + '_' + currentLevel + '_' + cix}>{''}</td>)
            }
            let columnId = props.headerData.headerColumn.indexOf(childValue)
            if (columnId !== -1) {
              headerColumn[columnId].isProcessed = true
              headerColumn[columnId].level = 0
            }
          }
          if (labelData.constraint_perspective && labelData.nexus) {
            let metricMetaPerspectives = labelData.constraint_perspective
            totalMetricPoints = metricMetaPerspectives.parts.length
            metricMetaPerspectives.parts.forEach(function (metricData, mix) {
              let headerIndex = _.findIndex(headerColumn, function (o) { return o.name === metricData.name })
              if (headerIndex) {
                headerColumn[headerIndex].isProcessed = true
                headerColumn[headerIndex].level = currentLevel
                let subjectValue = childData[cix + mix] ? childData[cix + mix].value.subject_part.value : ''
                if (subjectValue.length > 0) {
                  childRowColumn.push(<td className='' key={'ch_' + '_' + currentLevel + '_start_metric' + mix}>{subjectValue[0].target_component.name}</td>)
                } else {
                  childRowColumn.push(<td className='' key={'ch_' + '_' + currentLevel + '_start_metric' + mix}>{''}</td>)
                }
              }
            })
          }
        }
      })
      let length = headerColumn.length
      headerColumn.forEach(function (columnData, cid) {
        if (!columnData.isProcessed & length !== cid + 1) {
          childRowColumn.push(<td className='' key={'ch_' + '_' + currentLevel + '_last' + cid} >{''}</td>)
        }
      })
    }
    return childRowColumn
  }
  let genericExpandRow = function (parentRowName) {
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
      // start from topmost level
      let startLevel = expandLevel
      do {
        if (expandLevel - startLevel >= 0 && startLevel >= 0) {
          if (expandSettings.selectedObject[startLevel].expandFlag) {
            // faClass = 'fa fa-minus'
            if (props.expandSettings.modelPerspectives[startLevel] && props.expandSettings.modelPerspectives[startLevel].length > 0) {
              // let childLabelParts = props.expandSettings.metaModelPerspectives[startLevel].parts
              let parentList = []
              props.expandSettings.modelPerspectives[startLevel].forEach(function (childData, idx) {
                let childRowColumn = []
                childRowColumn = buildRow(childData.parts, startLevel, childData.subject_id)
                parentList.push(
                  <tr>
                    {childRowColumn}
                  </tr>
                )
                let found = []
                if (childList.length > 0) {
                  let selectedObject = expandSettings.selectedObject[startLevel + 1]
                  let parts = childData.parts
                  found = _.filter(parts, {'value': selectedObject.name})
                }
                if (found.length > 0) {
                  if (childList.length > 0) {
                    childList.forEach(function (rowData, rix) {
                      parentList.push(rowData)
                    })
                  }
                }
              })
              childList = parentList
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
        } else {
          console.log(' why else equal', startLevel, expandLevel)
          break
        }
      } while (expandLevel - startLevel >= 0)
      if (startLevel === -1) {
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
    // tableHeader.push(<th key={'last'} className=''><h5>Action</h5></th>)
  }
  let listModelPrespectives = function () {
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
              selectedObject.subjectId = data.subject_id
              if (data.parts) {
                labelParts.forEach(function (labelData, cix) {
                  if (labelData.standard_property !== null && labelData.type_property === null) { // Standard Property
                    if (labelData.standard_property === 'name') {
                      selectedObject.name = data.parts[cix] ? data.parts[cix].value : ''
                    }
                  } else if (labelData.standard_property === null && labelData.type_property === null) { // Connection Property
                    if (labelData.constraint_perspective) {
                      selectedObject.parentReference = data.parts[cix] ? data.parts[cix].value.parent_reference : null
                      selectedObject.childFilter = data.parts[cix] ? data.parts[cix].value.child_filter : null
                      selectedObject.metaModelPerspectives = labelParts[cix].constraint_perspective
                      selectedObject.containerPerspectiveId = labelParts[cix].container_perspective_id
                      selectedObject.containerPerspectiveViewKey = labelParts[cix].container_perspective_view_key
                      selectedObject.rolePerspectives = labelParts[cix].role_perspectives
                      selectedObject.subjectId = data.subject_id
                    }
                  }
                })
                data.parts.forEach(function (partData, ix) {
                  let value
                  if (labelParts[ix].standard_property !== null && labelParts[ix].type_property === null) { // Standard Property
                    // console.log('partData standard property', partData, labelParts[ix], ix)
                    if (labelParts[ix].standard_property === 'name') {
                      value = partData ? partData.value : ''
                      // selectedObject.name = value
                      let columnId = props.headerData.headerColumn.indexOf(labelParts[ix].name)
                      if (columnId !== -1) {
                        headerColumn[columnId].isProcessed = true
                        headerColumn[columnId].level = 0
                      }
                      if (expandSettings.level !== null) {
                        // expand row is clicked for first row
                        if (expandSettings.level >= 0 && (expandSettings.selectedObject[0] && expandSettings.selectedObject[0].name === value && expandSettings.selectedObject[0].subjectId === data.subject_id)) {
                          childList = genericExpandRow(value)
                        }
                      }
                      if (expandSettings.level >= 0 && (expandSettings.selectedObject[0] && expandSettings.selectedObject[0].name === value && expandSettings.selectedObject[0].subjectId === data.subject_id)) {
                        faClass = 'fa fa-minus'
                      }
                      let availableAction = {...props.availableAction}
                      let list = []
                      if (availableAction.Update) {
                        list.push(<a href='javascript:void(0);' onClick={(event) => { event.preventDefault(); openModal(selectedObject, 'ParentNode', 'Edit') }} ><img src='/assets/edit.png' alt='gear' className='td-icons' /></a>)
                      }
                      if (availableAction.Delete) {
                        list.push(<a href='javascript:void(0);' onClick={(event) => { event.preventDefault(); openDeleteModal(selectedObject, null, 'ParentNode') }} ><img src='/assets/rubbish-bin.png' alt='delete' className='td-icons' /></a>)
                      }
                      rowColumn.push(<td className='' key={'ch_' + index + '_' + ix}><i className={faClass} aria-hidden='true' onClick={(event) => { event.preventDefault(); handleClick(selectedObject, 0) }} style={{'cursor': 'pointer'}} /> {value}&nbsp;&nbsp;
                        {list}
                      </td>)
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
                    // selectedObject.parentReference = partData.value.parent_reference
                    value = labelParts[ix].constraint_perspective.name
                    // selectedObject.metaModelPerspectives = labelParts[ix].constraint_perspective
                    // selectedObject.containerPerspectiveId = labelParts[ix].container_perspective_id
                    // selectedObject.containerPerspectiveViewKey = labelParts[ix].container_perspective_view_key
                    // selectedObject.rolePerspectives = labelParts[ix].role_perspectives
                    let columnId = props.headerData.headerColumn.indexOf(labelParts[ix].name)
                    if (columnId !== -1) {
                      headerColumn[columnId].isProcessed = true
                      headerColumn[columnId].level = 0
                    }
                    rowColumn.push(<td className='' key={'ch_' + index + '_' + ix}><a href='javascript:void(0);' onClick={(event) => openModal(selectedObject, 'ChildrenNode', 'Add')} >{'Add ' + value}</a></td>)
                  }
                  // console.log('value', value)
                  // if (toPush) {
                  //   rowColumn.push(<td className='' key={'ch_' + index + '_' + ix}>{isName && (<i className={faClass} aria-hidden='true' onClick={(event) => { event.preventDefault(); handleClick(selectedObject, 0) }} style={{'cursor': 'pointer'}} />)} {value}</td>)
                  // }
                })
              }
              let length = headerColumn.length
              headerColumn.forEach(function (columnData, cid) {
                if (!columnData.isProcessed & length !== cid + 1) {
                  rowColumn.push(<td className='' key={'ch_' + index + '_emp' + cid} >{''}</td>)
                }
              })
              // let availableAction = {...props.availableAction}
              // let list = []
              // if (availableAction.Update) {
              //   list.push(<a href='javascript:void(0);' onClick={(event) => { event.preventDefault(); openModal(selectedObject, 'ParentNode', 'Edit') }} >{'Edit'}</a>)
              // }
              // if (availableAction.Delete) {
              //   list.push(<a onClick={(event) => { event.preventDefault(); openDeleteModal(selectedObject) }} href='javascript:void(0);'>{'Delete'}</a>)
              // }
              // rowColumn.push(<td className='' key={'last' + index} >{list}</td>)
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
  let handleSelectChange = function (index, type) {
    return function (newValue: any, actionMeta: any) {
      console.log('newValue', newValue)
      console.log('actionMeta', actionMeta)
      console.log('index', index)
      console.log('type', type)
      let connectionData = {...props.connectionData}
      if (type === 'Connection') {
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
      if (type === 'Metric') {
        let selectedValues = connectionData.metricSelectedValue
        if (actionMeta.action === 'select-option' || actionMeta.action === 'remove-value') {
          selectedValues[index] = newValue
          connectionData.metricSelectedValue = selectedValues
          let subjectId = newValue.subjectId
          let selectOption = connectionData.metricSelectOption
          let backupSelectOption = connectionData.backupMetricSelectOption
          let selectOptionLength = selectOption.length
          for (let i = index + 1; i < selectOptionLength; i++) {
            if (selectOption[i]) {
              let filterObject = _.find(backupSelectOption[i], function (obj) {
                return obj.subjectId === subjectId
              })
              let filterArray = []
              filterArray.push(filterObject)
              selectOption[i] = filterArray
              selectedValues[i] = []
            }
          }
          connectionData.metricSelectOption = selectOption
          props.setConnectionData(connectionData)
        }
        if (actionMeta.action === 'clear') {
          let selectedValues = connectionData.selectedValues
          selectedValues[index] = null
          connectionData.metricSelectedValue = selectedValues
          let selectOption = connectionData.metricSelectOption
          let backupSelectOption = connectionData.backupMetricSelectOption
          let selectOptionLength = selectOption.length
          for (let i = index + 1; i < selectOptionLength; i++) {
            if (selectOption[i]) {
              let restoreList = backupSelectOption[i]
              selectOption[i] = restoreList
              selectedValues[i] = []
            }
          }
          connectionData.metricSelectOption = selectOption
          props.setConnectionData(connectionData)
        }
      }
    }
  }
  if (props.connectionData !== '' && props.connectionData.operation.isComplete) {
    // eslint-disable-next-line
    mApp && mApp.unblockPage()
    let connectionData = {...props.connectionData}
    // let addSettings = {...props.addSettings}
    if (connectionData.data.length > 0) {
      connectionSelectBoxList = connectionData.data.map(function (data, index) {
        let selectOptions = connectionData.selectOption[index].map(function (component, id) {
          component.value = component.id
          component.label = component.name
          return component
        })
        return (
          <div className='form-group row'>
            <div className='m-form__group col-12' style={{'display': 'flex'}} >
              <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
              <div className='col-9'>
                <Select
                  className='input-sm m-input'
                  placeholder={'Select ' + data.name}
                  isMulti={data.max !== 1}
                  isClearable
                  value={connectionData.selectedValues[index]}
                  onChange={handleSelectChange(index, 'Connection')}
                  options={selectOptions}
                />
              </div>
            </div>
          </div>
        )
      })
    }
    if (connectionData.isMetric) {
      if (connectionData.data.length === 0) {
        connectionSelectBoxList = []
      }
      connectionData.metricSelectNames.forEach(function (data, index) {
        let selectOptions = connectionData.metricSelectOption[index].map(function (component, id) {
          component.value = component.id
          component.label = component.name
          return component
        })
        connectionSelectBoxList.push(
          <div className='form-group row'>
            <div className='m-form__group col-12' style={{'display': 'flex'}} >
              <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
              <div className='col-9'>
                <Select
                  className='input-sm m-input'
                  placeholder={data.placeHolder}
                  isDisabled={props.addSettings.isEditModalOpen}
                  // isMulti={data.max !== 1}
                  isClearable
                  value={connectionData.metricSelectedValue[index]}
                  onChange={handleSelectChange(index, 'Metric')}
                  options={selectOptions}
                />
              </div>
            </div>
          </div>
        )
      })
    }
    standardPropertyList = connectionData.standardProperty.map(function (data, index) {
      if (data.standard_property === 'name') {
        return (
          <div className='form-group row'>
            <div className='m-form__group col-12' style={{'display': 'flex'}}>
              <label htmlFor='example-input' className='col-2 col-form-label'>Name</label>
              <div className='col-9'>
                <input className='form-control m-input' value={props.addSettings.name} onChange={editName} placeholder='Enter Name' id='example-email-input' autoComplete='off' />
              </div>
            </div>
          </div>
        )
      }
      if (data.standard_property === 'description') {
        return (
          <div className='form-group row'>
            <div className='m-form__group col-12' style={{'display': 'flex'}}>
              <label htmlFor='example-input' className='col-2 col-form-label'>Description</label>
              <div className='col-9'>
                <textarea className='form-control m-input' value={props.addSettings.description} onChange={editDescription} placeholder='Enter Description' />
              </div>
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
          <div className='m-form__group col-12' style={{'display': 'flex'}}>
            <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
            <div className='col-9 form-group m-form__group has-info'>
              <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Number</div>)}
            </div>
          </div>
        </div>)
      } else if (data.type_property.property_type.key === 'Decimal') {
        value = data.type_property.float_value
        return (<div className='form-group row'>
          <div className='m-form__group col-12' style={{'display': 'flex'}}>
            <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
            <div className='col-9 form-group m-form__group has-info'>
              <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Number</div>)}
            </div>
          </div>
        </div>)
      } else if (data.type_property.property_type.key === 'DateTime') {
        value = data.type_property.date_time_value ? moment(data.type_property.date_time_value).format('DD MMM YYYY') : null
        console.log('props', props)
        return (<div className='form-group row'>
          <div className='m-form__group col-12' style={{'display': 'flex'}}>
            <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
            <div className='col-9 form-group m-form__group has-info'>
              <DatePicker
                className='input-sm form-control m-input'
                selected={data.type_property.date_time_value ? moment(data.type_property.date_time_value) : ''}
                dateFormat='DD MMM YYYY'
                onSelect={(date) => { editProperty(index, date) }}
              />
              {/* <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' /> */}
              {false && (<div className='form-control-feedback'>should be Date</div>)}
            </div>
          </div>
        </div>)
      } else if (data.type_property.property_type.key === 'Text') {
        value = data.type_property.text_value
        return (<div className='form-group row'>
          <div className='m-form__group col-12' style={{'display': 'flex'}}>
            <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
            <div className='col-9 form-group m-form__group has-info'>
              <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Text</div>)}
            </div>
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
          <div className='m-form__group col-12' style={{'display': 'flex'}}>
            <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
            <Select
              className='col-9 input-sm m-input'
              placeholder='Select Options'
              isClearable
              defaultValue={dvalue}
              onChange={handlePropertySelect(index)}
              isSearchable={false}
              name={'selectProperty'}
              options={propertyOption}
              />
          </div>
        </div>)
      } else {
        value = data.type_property.other_value
        return (<div className='form-group row'>
          <div className='m-form__group col-12' style={{'display': 'flex'}}>
            <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
            <div className='col-9 form-group m-form__group has-info'>
              <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
              {true && (<div className='form-control-feedback'>should be Text</div>)}
            </div>
          </div>
        </div>)
      }
    })
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
                        <button type='button' onClick={(event) => openModal(null, 'ParentNode', 'Add')} className='btn btn-outline-info btn-sm' style={{'float': 'right'}}>Add {perspectiveName}</button>&nbsp;
                      </div>)}
                    </div>
                    <br />
                    <div id='ModelPerspectiveList' className='dataTables_wrapper dt-bootstrap4'>
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
                                <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onKeyUp={handleInputChange} />
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
        <div className={'blockNexusUI'}>
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
                  {standardPropertyList}
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
        <div className={'blockNexusUI'}>
          <div className=''>
            <div className='modal-content' >
              <div className='modal-header'>
                {props.addSettings.updateResponse === null && (<h4 className='modal-title' id='exampleModalLabel'>Edit {updatePerspectiveName}</h4>)}
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
                  {standardPropertyList}
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
                {props.addSettings.deleteResponse === null && (<h4 className='modal-title' id='exampleModalLabel'>Delete {deletePerspectiveName}</h4>)}
                {props.addSettings.deleteResponse !== null && (<h4 className='modal-title' id='exampleModalLabel'>Delete Report</h4>)}
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              {props.addSettings.deleteResponse === null && (<div className='modal-body'>
                <div>
                  <h6>Confirm deletion of {deletePerspectiveName}</h6>
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
    {/* <Discussion name={'Entitlements'} TypeKey='Entitlement' type='ComponentType' {...props} />
    <NewDiscussion contextId={contextId} name={'Entitlements'} type='ComponentType' {...props} /> */}
  </div>
      )
  }
  BalancedScorecard.propTypes = {
    addSettings: PropTypes.any,
    modelPrespectives: PropTypes.any,
    metaModelPerspective: PropTypes.any,
    currentPage: PropTypes.any,
    perPage: PropTypes.any,
    // crude: PropTypes.any,
    availableAction: PropTypes.any,
    connectionData: PropTypes.any,
    expandSettings: PropTypes.any,
    headerData: PropTypes.any,
    copyModelPrespectives: PropTypes.any
  }
