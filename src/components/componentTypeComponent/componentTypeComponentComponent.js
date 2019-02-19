import React from 'react'
import styles from './componentTypeComponentComponent.scss'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ComponentModelComponent from '../componentModel/componentModelComponent'
import Discussion from '../../containers/discussion/discussionContainer'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import Select from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')
const NEWCOMPONENT = '99999'
var divStyle = {
  // width: '900px',
  // height: '700px',
  'overflowY': 'scroll',
  'overflowX': 'scroll',
  'border': '1px solid #000000'
}

const customStylescrud = { content: { top: '20%', background: 'none', border: '0px', overflow: 'none' } }

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: 'none',
    background: 'none',
    transform: 'translate(-50%, -50%)'
  }
}

export default function ComponentTypeComponent (props) {
    console.log('component type component properties', props)
    let isParentSelected = props.addNewConnectionSettings.isParentSelected
    let ComponentTypeName
    let componentTypeComponentName
    let componentNameMessage
    let componentTypeComponentDescription
    let componentTypeComponentProperties = props.componentTypeComponentProperties.resources ? [...props.componentTypeComponentProperties.resources] : ''
    let componentTypeComponentData = props.componentTypeComponentData
    let copiedComponentProperties = props.copiedComponentProperties
    let componentPropertiesPayload = {...props.componentPropertiesPayload}
    let componentTypeComponentPropertiesList
    let componentTypeComponentRelationships = props.componentTypeComponentRelationships // relationshipData.resources // props.componentTypeComponentRelationships.data
    let modelRelationshipData = ''
    let parentComponentRelationshipList = ''
    let outgoingComponentRelationshipList = ''
    let incomingComponentRelationshipList = ''
    let childComponentRelationshipList = ''
    let startNode = {}
    let showProperties = props.showTabs.showProperty
    let showRelationships = props.showTabs.showRelationship
    let childrenList
    let openDiscussionModal = function (event) {
      event.preventDefault()
      props.setDiscussionModalOpenStatus(true)
      props.setDropdownFlag(false)
    }
    // Code for Delete Modal begins
    let removeComponent = function (event) {
      event.preventDefault()
      let payload = {
         'id': props.match.params.id
        }
        props.deletecomponentTypeComponent(payload)
        props.setDeleteModalOpenStatus(false)
      }
    let openDeleteModal = function (event) {
      event.preventDefault()
      props.setDeleteModalOpenStatus(true)
      props.setDropdownFlag(false)
      }
    let closeDeleteModal = function (event) {
      props.setDeleteModalOpenStatus(false)
    }
    // Code for Delete Modal ends
    // Code for listing in Delete Modal begins
    if (componentTypeComponentRelationships !== '') {
      let child = _.filter(componentTypeComponentRelationships.resources, {'relationship_type': 'Child'})
        childrenList = child.map(function (element, index) {
          return (<span><a>{element.target_component.name}</a><br /></span>)
        })
      }
     // Code for listing in Delete Modal ends
    let showProperty = function (event) {
      let payload = {'showProperty': ' active show', 'showRelationship': ''}
      props.setCurrentTab(payload)
    }
    let showRelationship = function (event) {
      let payload = {'showProperty': '', 'showRelationship': ' active show'}
      props.setCurrentTab(payload)
    }
    let dropDownClass = ''
    if (props.isDropDownOpen) { dropDownClass = 'm-dropdown--open' } else { dropDownClass = '' }
    let openDropDown = function (event) {
      event.preventDefault()
      props.setDropdownFlag(true)
    }
    let closeDropDown = function (event) {
      event.preventDefault()
      props.setDropdownFlag(false)
    }
    let editComponent = function (event) {
      event.preventDefault()
      // props.setEditComponentFlag(true)
      let payloadComponentData = {...props.componentTypeComponentData.resources[0]}
      props.copyComponentProperties({'resources': JSON.parse(JSON.stringify(componentTypeComponentProperties))})
      props.copyComponentData(payloadComponentData)
      props.setEditComponentFlag(true)
    }
    let cancelEditComponent = function (event) {
      event.preventDefault()
      let copiedComponentData = {...props.copiedComponentData}
      let payload = {}
      payload.property = copiedComponentProperties
      payload.component = {}
      payload.component.resources = []
      payload.component.resources = [...payload.component.resources, copiedComponentData]
      props.restoreComponentProperties(payload)
      props.setEditComponentFlag(false)
      props.setDropdownFlag(false)
    }
    let saveComponentProperty = function (event) {
      props.setConfirmationModalOpenStatus(true)
    }
    let closeConfirmationModal = function (event) {
      event.preventDefault()
      props.setConfirmationModalOpenStatus(false)
    }
    let submitUpdates = function (event) {
      event.preventDefault()
      props.setEditComponentFlag(false)
      props.setDropdownFlag(false)
      let payload = {}
      payload.componentId = props.componentTypeComponentData.resources[0].id
      payload.property = componentPropertiesPayload.property
      payload.component = componentPropertiesPayload.component
      props.updateComponentTypeComponentProperties(payload)
      props.updateComponentTypeComponent(payload)
      props.setConfirmationModalOpenStatus(false)
    }
    let handlePropertySelect = function (index, childIndex) {
      return function (newValue: any, actionMeta: any) {
        if (actionMeta.action === 'select-option') {
          if (newValue !== null) {
            let payload
            let typeProperty = componentTypeComponentProperties[index].properties[childIndex].type_property
            componentTypeComponentProperties[index].properties[childIndex].value_set_value = newValue
            payload = { 'op': 'replace', 'path': `/${typeProperty}/value_set_value`, 'value': {id: newValue.value} }

            if (componentPropertiesPayload.property.length === 0) {
              componentPropertiesPayload.property.push(payload)
            } else {
              if (payload.path === componentPropertiesPayload.property[componentPropertiesPayload.property.length - 1].path) {
                componentPropertiesPayload.property[componentPropertiesPayload.property.length - 1] = payload
              } else {
                componentPropertiesPayload.property.push(payload)
              }
            }
            let editPayload = {}
            editPayload.component = componentTypeComponentData
            editPayload.property = {resources: componentTypeComponentProperties}
            props.editComponentProperties(editPayload)
            props.pushComponentPropertyPayload(componentPropertiesPayload)
          }
        }
        if (actionMeta.action === 'clear') {
          let payload
          let typeProperty = componentTypeComponentProperties[index].properties[childIndex].type_property
          componentTypeComponentProperties[index].properties[childIndex].value_set_value = newValue
          payload = { 'op': 'replace', 'path': `/${typeProperty}/value_set_value`, 'value': newValue }

          if (componentPropertiesPayload.property.length === 0) {
            componentPropertiesPayload.property.push(payload)
          } else {
            if (payload.path === componentPropertiesPayload.property[componentPropertiesPayload.property.length - 1].path) {
              componentPropertiesPayload.property[componentPropertiesPayload.property.length - 1] = payload
            } else {
              componentPropertiesPayload.property.push(payload)
            }
          }
          let editPayload = {}
          editPayload.component = componentTypeComponentData
          editPayload.property = {resources: componentTypeComponentProperties}
          props.editComponentProperties(editPayload)
          props.pushComponentPropertyPayload(componentPropertiesPayload)
        }
      }
    }
    let editDateProperty = function (index, childIndex, value) {
      let payload
      let typeProperty = componentTypeComponentProperties[index].properties[childIndex].type_property
      let selectedDate = value.format('DD MMM YYYY')
      componentTypeComponentProperties[index].properties[childIndex].date_time_value = value.format('DD MMM YYYY')
      payload = { 'op': 'replace', 'path': `/${typeProperty}/date_time_value`, 'value': selectedDate }
      if (componentPropertiesPayload.property.length === 0) {
        componentPropertiesPayload.property.push(payload)
      } else {
        if (payload.path === componentPropertiesPayload.property[componentPropertiesPayload.property.length - 1].path) {
          componentPropertiesPayload.property[componentPropertiesPayload.property.length - 1] = payload
        } else {
          componentPropertiesPayload.property.push(payload)
        }
      }
      let editPayload = {}
      editPayload.component = componentTypeComponentData
      editPayload.property = {resources: componentTypeComponentProperties}
      props.editComponentProperties(editPayload)
      props.pushComponentPropertyPayload(componentPropertiesPayload)
    }
    let editTextProperty = function (index, childIndex, value) {
      let payload
      let typeProperty = componentTypeComponentProperties[index].properties[childIndex].type_property
      if (componentTypeComponentProperties[index].properties[childIndex].property_type.key === 'Boolean') {
        componentTypeComponentProperties[index].properties[childIndex].boolean_value = value
        payload = { 'op': 'replace', 'path': `/${typeProperty}/boolean_value`, 'value': value }
      } else if (componentTypeComponentProperties[index].properties[childIndex].property_type.key === 'Integer') {
        componentTypeComponentProperties[index].properties[childIndex].int_value = value
        payload = { 'op': 'replace', 'path': `/${typeProperty}/int_value`, 'value': value }
      } else if (componentTypeComponentProperties[index].properties[childIndex].property_type.key === 'Decimal') {
        componentTypeComponentProperties[index].properties[childIndex].float_value = value
        payload = { 'op': 'replace', 'path': `/${typeProperty}/float_value`, 'value': value }
      } else if (componentTypeComponentProperties[index].properties[childIndex].property_type.key === 'DateTime') {
        componentTypeComponentProperties[index].properties[childIndex].date_time_value = value
        payload = { 'op': 'replace', 'path': `/${typeProperty}/date_time_value`, 'value': value }
      } else if (componentTypeComponentProperties[index].properties[childIndex].property_type.key === 'Text') {
        componentTypeComponentProperties[index].properties[childIndex].text_value = value
        payload = { 'op': 'replace', 'path': `/${typeProperty}/text_value`, 'value': value }
      } else {
        componentTypeComponentProperties[index].properties[childIndex].other_value = value
        payload = { 'op': 'replace', 'path': `/${typeProperty}/other_value`, 'value': value }
        componentTypeComponentProperties[index].properties[childIndex].showMessage = false
      }
      if (componentPropertiesPayload.property.length === 0) {
        componentPropertiesPayload.property.push(payload)
      } else {
        if (payload.path === componentPropertiesPayload.property[componentPropertiesPayload.property.length - 1].path) {
          componentPropertiesPayload.property[componentPropertiesPayload.property.length - 1] = payload
        } else {
          componentPropertiesPayload.property.push(payload)
        }
      }
      let editPayload = {}
      editPayload.component = componentTypeComponentData
      editPayload.property = {resources: componentTypeComponentProperties}
      props.editComponentProperties(editPayload)
      props.pushComponentPropertyPayload(componentPropertiesPayload)
    }
    let editComponentName = function (event) {
      let value = event.target.value
      let payload = { 'op': 'replace', 'path': '/name', 'value': value }
      let componentPayload
      if (value === '') {
        componentTypeComponentData.resources[0].nameMessage = true
      } else {
        componentTypeComponentData.resources[0].nameMessage = false
        if (componentPropertiesPayload.component.length === 0) {
          componentPropertiesPayload.component.push(payload)
        } else if (componentPropertiesPayload.component.length === 1) {
          if (componentPropertiesPayload.component[0].path === '/name') {
            componentPropertiesPayload.component[0].value = value
          } else {
            componentPropertiesPayload.component.push(payload)
          }
        } else {
          componentPayload = componentPropertiesPayload.component.map((payload, index) => {
            if (payload.path === '/name') {
              payload.value = value
              return payload
            } else {
              return payload
            }
          })
          componentPropertiesPayload.component = componentPayload
        }
      }
      componentTypeComponentData.resources[0].name = value
      let editPayload = {}
      editPayload.component = componentTypeComponentData
      editPayload.property = {resources: componentTypeComponentProperties}
      props.editComponentProperties(editPayload)
    }
    let editComponentDescription = function (event) {
      let value = event.target.value
      let payload = { 'op': 'replace', 'path': '/description', 'value': value }
      let componentPayload
      if (componentPropertiesPayload.component.length === 0) {
        componentPropertiesPayload.component.push(payload)
      } else if (componentPropertiesPayload.component.length === 1) {
        if (componentPropertiesPayload.component[0].path === '/description') {
          componentPropertiesPayload.component[0].value = value
        } else {
          componentPropertiesPayload.component.push(payload)
        }
      } else {
        componentPayload = componentPropertiesPayload.component.map((payload, index) => {
          if (payload.path === '/description') {
            payload.value = value
            return payload
          } else {
            return payload
          }
        })
        componentPropertiesPayload.component = componentPayload
      }
      componentTypeComponentData.resources[0].description = value
      let editPayload = {}
      editPayload.component = componentTypeComponentData
      editPayload.property = {resources: componentTypeComponentProperties}
      props.editComponentProperties(editPayload)
    }
    // Start Update Connection Code
    // Code for Delete Relationship begins here
    let removeComponentRelationship = function (event) {
      event.preventDefault()
      let payload = {}
      payload.componentId = props.componentTypeComponentData.resources[0].id
      let relationshipType = props.relationshipActionSettings.selectedObject.relationship_type
      if (relationshipType === 'Parent') {
        payload.deletePayload = { 'parent': true }
        payload.relationshipId = props.relationshipActionSettings.relationshipId
        payload.relationshipType = 'parent'
      } else if (relationshipType === 'Child') {
        payload.deletePayload = { 'child': true }
        payload.relationshipId = props.relationshipActionSettings.relationshipId
        payload.relationshipType = 'child'
      } else if (relationshipType === 'ConnectFrom' || relationshipType === 'ConnectTo') {
        payload.deletePayload = {}
        payload.relationshipId = props.relationshipActionSettings.relationshipId
        payload.relationshipType = 'others'
      }
      props.deleteComponentRelationship(payload)
    }
    // Code for Delete relationship ends here
    let componentRelationshipPropertiesList = ''
    // let relationshipPropertyPayload = JSON.parse(JSON.stringify(props.relationshipPropertyPayload))
    let relationshipPropertyPayload = props.relationshipPropertyPayload
    let componentRelationshipProperties = props.relationshipProperty.resources ? [...props.relationshipProperty.resources[0].properties] : ''
    let updateRelationshipProperty = function (event) {
      event.preventDefault()
      let payload = {}
      payload.componentId = props.componentTypeComponentData.resources[0].id
      payload.relationshipId = props.relationshipActionSettings.relationshipId
      payload.payloadData = relationshipPropertyPayload
      props.updateRelationshipProperty(payload)
    }
    let handleRelationshipPropertySelect = function (index, childIndex) {
      return function (newValue: any, actionMeta: any) {
        if (actionMeta.action === 'select-option') {
          if (newValue !== null) {
            let payload
            let typeProperty = componentRelationshipProperties[index].properties[childIndex].type_property
            componentRelationshipProperties[index].properties[childIndex].value_set_value = newValue
            payload = { 'op': 'replace', 'path': `/${typeProperty}/value_set_value`, 'value': {id: newValue.value} }

            if (relationshipPropertyPayload.length === 0) {
              relationshipPropertyPayload.push(payload)
            } else {
              if (payload.path === relationshipPropertyPayload[relationshipPropertyPayload.length - 1].path) {
                relationshipPropertyPayload[relationshipPropertyPayload.length - 1] = payload
              } else {
                relationshipPropertyPayload.push(payload)
              }
            }
            let editPayload = {}
            editPayload.resources = []
            let propObject = {}
            propObject.properties = componentRelationshipProperties
            editPayload.resources.push(propObject)
            props.editComponentRelationshipProperties(editPayload)
            props.editComponentRelationshipPropertyPayload(relationshipPropertyPayload)
          }
        }
        if (actionMeta.action === 'clear') {
          let payload
          let typeProperty = componentRelationshipProperties[index].properties[childIndex].type_property
          componentRelationshipProperties[index].properties[childIndex].value_set_value = newValue
          payload = { 'op': 'replace', 'path': `/${typeProperty}/value_set_value`, 'value': newValue }

          if (relationshipPropertyPayload.length === 0) {
            relationshipPropertyPayload.push(payload)
          } else {
            if (payload.path === relationshipPropertyPayload[relationshipPropertyPayload.length - 1].path) {
              relationshipPropertyPayload[relationshipPropertyPayload.length - 1] = payload
            } else {
              relationshipPropertyPayload.push(payload)
            }
          }
          let editPayload = {}
          editPayload.resources = []
          let propObject = {}
          propObject.properties = componentRelationshipProperties
          editPayload.resources.push(propObject)
          props.editComponentRelationshipProperties(editPayload)
          props.editComponentRelationshipPropertyPayload(relationshipPropertyPayload)
        }
      }
    }
    let editDateRelationshipProperty = function (index, childIndex, value) {
      let payload
      let typeProperty = componentRelationshipProperties[index].properties[childIndex].type_property
      let selectedDate = value.format('DD MMM YYYY')
      componentRelationshipProperties[index].properties[childIndex].date_time_value = value.format('DD MMM YYYY')
      payload = { 'op': 'replace', 'path': `/${typeProperty}/date_time_value`, 'value': selectedDate }
      if (relationshipPropertyPayload.length === 0) {
        relationshipPropertyPayload.push(payload)
      } else {
        if (payload.path === relationshipPropertyPayload[relationshipPropertyPayload.length - 1].path) {
          relationshipPropertyPayload[relationshipPropertyPayload.length - 1] = payload
        } else {
          relationshipPropertyPayload.push(payload)
        }
      }
      let editPayload = {}
      editPayload.resources = []
      let propObject = {}
      propObject.properties = componentRelationshipProperties
      editPayload.resources.push(propObject)
      props.editComponentRelationshipProperties(editPayload)
      props.editComponentRelationshipPropertyPayload(relationshipPropertyPayload)
    }
    let editTextRelationshipProperty = function (index, childIndex, value) {
      let payload
      let typeProperty = componentRelationshipProperties[index].properties[childIndex].type_property
      if (componentRelationshipProperties[index].properties[childIndex].property_type.key === 'Boolean') {
        componentRelationshipProperties[index].properties[childIndex].boolean_value = value
        payload = { 'op': 'replace', 'path': `/${typeProperty}/boolean_value`, 'value': value }
      } else if (componentRelationshipProperties[index].properties[childIndex].property_type.key === 'Integer') {
        componentRelationshipProperties[index].properties[childIndex].int_value = value
        payload = { 'op': 'replace', 'path': `/${typeProperty}/int_value`, 'value': value }
      } else if (componentRelationshipProperties[index].properties[childIndex].property_type.key === 'Decimal') {
        componentRelationshipProperties[index].properties[childIndex].float_value = value
        payload = { 'op': 'replace', 'path': `/${typeProperty}/float_value`, 'value': value }
      } else if (componentRelationshipProperties[index].properties[childIndex].property_type.key === 'DateTime') {
        componentRelationshipProperties[index].properties[childIndex].date_time_value = value
        payload = { 'op': 'replace', 'path': `/${typeProperty}/date_time_value`, 'value': value }
      } else if (componentRelationshipProperties[index].properties[childIndex].property_type.key === 'Text') {
        componentRelationshipProperties[index].properties[childIndex].text_value = value
        payload = { 'op': 'replace', 'path': `/${typeProperty}/text_value`, 'value': value }
      } else {
        componentRelationshipProperties[index].properties[childIndex].other_value = value
        payload = { 'op': 'replace', 'path': `/${typeProperty}/other_value`, 'value': value }
        componentRelationshipProperties[index].properties[childIndex].showMessage = false
      }
      if (relationshipPropertyPayload.length === 0) {
        relationshipPropertyPayload.push(payload)
      } else {
        if (payload.path === relationshipPropertyPayload[relationshipPropertyPayload.length - 1].path) {
          relationshipPropertyPayload[relationshipPropertyPayload.length - 1] = payload
        } else {
          relationshipPropertyPayload.push(payload)
        }
      }
      let editPayload = {}
      editPayload.resources = []
      let propObject = {}
      propObject.properties = componentRelationshipProperties
      editPayload.resources.push(propObject)
      props.editComponentRelationshipProperties(editPayload)
      props.editComponentRelationshipPropertyPayload(relationshipPropertyPayload)
    }
    let closeRelationshipActionModal = function (event) {
      let settingPayload = {...props.relationshipActionSettings, 'isModalOpen': false}
      props.setRelationshipActionSettings(settingPayload)
      props.resetComponentRelationshipProperties()
    }
    if (props.relationshipProperty !== '' && componentRelationshipProperties.length > 0) {
      componentRelationshipPropertiesList = componentRelationshipProperties.map(function (property, index) {
        let propertyProperties = property.properties
        let childProperties = propertyProperties.map(function (childProperty, childIndex) {
          let value
          let htmlElement
          if (childProperty.property_type.key === 'Integer') {
            value = childProperty.int_value
            htmlElement = function () {
              return (<div className='col-8 form-group m-form__group has-info'>
                <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextRelationshipProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
                {true && (<div className='form-control-feedback'>should be Number</div>)}
              </div>)
            }
          } else if (childProperty.property_type.key === 'Decimal') {
            value = childProperty.float_value
            htmlElement = function () {
              return (<div className='col-8 form-group m-form__group has-info'>
                <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextRelationshipProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
                {true && (<div className='form-control-feedback'>should be Number</div>)}
              </div>)
            }
          } else if (childProperty.property_type.key === 'DateTime') {
            // value = childProperty.date_time_value
            value = childProperty.date_time_value ? moment(childProperty.date_time_value).format('DD MMM YYYY') : ''
            htmlElement = function () {
              return (<div className='col-8 form-group m-form__group has-info'>
                <DatePicker
                  className='input-sm form-control m-input'
                  selected={childProperty.date_time_value ? moment(childProperty.date_time_value) : ''}
                  dateFormat='DD MMM YYYY'
                  onSelect={(date) => { editDateRelationshipProperty(index, childIndex, date) }}
                  />
                {/* <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextRelationshipProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' /> */}
                {true && (<div className='form-control-feedback'>should be Date</div>)}
              </div>)
            }
          } else if (childProperty.property_type.key === 'Text') {
            value = childProperty.text_value
            htmlElement = function () {
              return (<div className='col-8 form-group m-form__group has-info'>
                <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextRelationshipProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
                {true && (<div className='form-control-feedback'>should be Text</div>)}
              </div>)
            }
          } else if (childProperty.property_type.key === 'List') {
            let childPropertyOption = childProperty.value_set.values.map((option, opIndex) => {
              option.label = option.name
              option.value = option.id
              return option
            })
            let dvalue = childProperty.value_set_value
            if (childProperty.value_set_value !== null) {
              dvalue.label = childProperty.value_set_value.name
              dvalue.value = childProperty.value_set_value.id
            }
            value = childProperty.value_set_value ? childProperty.value_set_value.name : null
            htmlElement = function () {
              return (<Select
                className='col-7 input-sm m-input'
                placeholder='Select Options'
                isClearable
                defaultValue={dvalue}
                onChange={handleRelationshipPropertySelect(index, childIndex)}
                isSearchable={false}
                name={'selectProperty'}
                options={childPropertyOption}
              />)
            }
          } else {
            value = childProperty.other_value
            htmlElement = function () {
              return (<div className='col-8 form-group m-form__group has-info'>
                <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextRelationshipProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
                {true && (<div className='form-control-feedback'>should be Text</div>)}
              </div>)
            }
          }
          return (
            <tr key={'child' + childIndex}>
              <td><p className={styles.labelbold}>{childProperty.name}</p></td>
              <td>
                {props.relationshipActionSettings.actionType === 'view' && (<p>{value}</p>)}
                {props.relationshipActionSettings.actionType === 'edit' && htmlElement()}
              </td>
            </tr>
          )
        })
        return (
          <tbody key={index} className={'col-6'}>
            <tr>
              <td><span className={styles.labelbold}>Type</span></td>
              <td><span>{property.name}</span></td>
            </tr>
            {childProperties}
          </tbody>
        )
      })
    } else {
      componentRelationshipPropertiesList = ReactHtmlParser('<div class="row align-items-center justify-content-center"><h2>No data to Display</h2></div>')
    }
    // End Update Connection Code
    // Model ADD new Connections Code
    let openModal = function (event) {
      // event.preventDefault()
      let parent = _.filter(componentTypeComponentRelationships.resources, {'relationship_type': 'Parent'})
      let isParentSelected = parent.length > 0
      props.setModalOpenStatus(true)
      let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': false, 'firstSelectboxIndex': null, 'isParentSelected': isParentSelected, 'secondSelectboxSelected': false, 'showCreateConnectionButton': false, 'slectedConstraintObject': {}, 'relationshipText': '', 'newConnectionArray': []}
      props.setAddConnectionSettings(payload)
      componentPropertiesPayload.relationship = []
      props.pushComponentPropertyPayload(componentPropertiesPayload)
    }
    let closeModal = function (event) {
      // event.preventDefault()
      props.setModalOpenStatus(false)
      let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': false, 'secondSelectboxSelected': false, 'slectedConstraintObject': {}, 'relationshipText': '', 'newConnectionArray': []}
      props.setAddConnectionSettings(payload)
      // props.setRelationshipsValue({'resources': newRelationshipArray})
    }
    let addConnectionClass = props.addNewConnectionSettings.showCreateConnectionButton ? '' : 'disabled ' + styles.pointerDisabled
    let addRelationshipClass = props.addNewConnectionSettings.showAddRelationshipButton ? '' : 'disabled ' + styles.pointerDisabled
    let SelectedData
    // let selectComponentOptions = ''
    let selectComponentOptions1 = ''
    // let optionItems = ''
    let newRelationshipArray = [...props.addNewConnectionSettings.newConnectionArray]
    // Action for first select
    let handleFirstSelect = function (newValue: any, actionMeta: any) {
      console.group('Value Changed first select')
      console.log(newValue)
      console.log(`action: ${actionMeta.action}`)
      console.groupEnd()
      if (actionMeta.action === 'select-option') {
        if (newValue !== null) {
          let index = newValue.id
        // let constraintObject = props.componentTypeComponentConstraints.resources[index]
          let constraintObject = _.find(props.componentTypeComponentConstraints.resources, function (obj) {
                                      return (parseInt(obj.id) === parseInt(index) && obj.constraint_type === newValue.constraint_type)
                                  })
          let targetComponentTypeId = parseInt(constraintObject.target_component_type.id)
          let isWaitingForApiResponse = props.addNewConnectionSettings.isWaitingForApiResponse
          if (props.addNewConnectionSettings.targetComponentTypeId !== targetComponentTypeId) {
            // call api
            let apiPayload = {
              'componentTypeId': targetComponentTypeId
            }
            props.fetchComponentTypeComponents && props.fetchComponentTypeComponents(apiPayload)
            isWaitingForApiResponse = true
          }
          let displayText = newValue.display_name
          let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': true, 'firstSelectboxIndex': newValue, 'targetComponentTypeId': targetComponentTypeId, 'isWaitingForApiResponse': isWaitingForApiResponse, 'secondSelectboxSelected': false, 'slectedConstraintObject': constraintObject, 'relationshipText': displayText, 'selectedComponentObject': {}}
          props.setAddConnectionSettings(payload)
        } else {
          let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': false, 'firstSelectboxIndex': newValue, 'secondSelectboxSelected': false, 'slectedConstraintObject': {}, 'relationshipText': '', 'selectedComponentObject': {}}
          props.setAddConnectionSettings(payload)
        }
      }
      if (actionMeta.action === 'clear') {
        let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': false, 'firstSelectboxIndex': null, 'secondSelectboxSelected': false, 'slectedConstraintObject': {}, 'relationshipText': '', 'selectedComponentObject': {}}
        props.setAddConnectionSettings(payload)
      }
    }
    let addRelationShip = function () {
      let displayName = props.addNewConnectionSettings.relationshipText + ' ' + props.addNewConnectionSettings.componentText
      let targetComponent = {}
      let payload = {}
      payload.op = 'add'
      payload.value = {}
      payload.value.relationship_type = props.addNewConnectionSettings.slectedConstraintObject.constraint_type
      payload.value.target_component = {}
      if (typeof props.addNewConnectionSettings.selectedComponentObject.id !== 'undefined') {
        payload.value.target_component.id = props.addNewConnectionSettings.selectedComponentObject.id
      } else {
        payload.value.target_component.name = props.addNewConnectionSettings.selectedComponentObject.name
        payload.value.target_component.component_type = {}
        payload.value.target_component.component_type.id = props.addNewConnectionSettings.slectedConstraintObject.target_component_type.id
      }
      payload.value.relationship_type = props.addNewConnectionSettings.slectedConstraintObject.constraint_type
      if (props.addNewConnectionSettings.slectedConstraintObject.constraint_type !== 'Parent' && props.addNewConnectionSettings.slectedConstraintObject.constraint_type !== 'Child') {
        payload.value.connection = {}
        payload.value.connection.connection_type = props.addNewConnectionSettings.slectedConstraintObject.connection_type.id
      }
      if (props.addNewConnectionSettings.slectedConstraintObject.constraint_type === 'Parent') {
        payload.path = '/-' // '/parent'
      } else if (props.addNewConnectionSettings.slectedConstraintObject.constraint_type === 'Child') {
        payload.path = '/-' // '/children'
      } else if (props.addNewConnectionSettings.slectedConstraintObject.constraint_type === 'ConnectTo') {
        payload.path = '/-' // '/'
        payload.value.connection = {}
        payload.value.connection.connection_type = {}
        payload.value.connection.connection_type.id = props.addNewConnectionSettings.slectedConstraintObject.connection_type.id
      } else if (props.addNewConnectionSettings.slectedConstraintObject.constraint_type === 'ConnectFrom') {
        payload.path = '/-' // '/'
        payload.value.connection = {}
        payload.value.connection.connection_type = {}
        payload.value.connection.connection_type.id = props.addNewConnectionSettings.slectedConstraintObject.connection_type.id
      }
      targetComponent.name = props.addNewConnectionSettings.selectedComponentObject.name
      targetComponent.id = props.addNewConnectionSettings.selectedComponentObject.id
      targetComponent.component_type = props.addNewConnectionSettings.slectedConstraintObject.target_component_type
      let component = {}
      component.name = props.componentTypeComponentData.resources[0].name
      component.id = props.componentTypeComponentData.resources[0].id
      let newConnection = {}
      newConnection.display_name = displayName
      newConnection.relationship_type = props.addNewConnectionSettings.slectedConstraintObject.constraint_type
      newConnection.component = component
      newConnection.payload = payload
      // eslint-disable-next-line
      newConnection.target_component = targetComponent
      newConnection.connection = props.addNewConnectionSettings.slectedConstraintObject.connection_type
      newRelationshipArray.push(newConnection)
      let isParentSelected = newConnection.relationship_type === 'Parent'
      let settingPayload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': false, 'firstSelectboxIndex': null, 'secondSelectboxSelected': false, 'isParentSelected': isParentSelected, 'newConnectionArray': newRelationshipArray, 'showCreateConnectionButton': true, 'slectedConstraintObject': {}, 'selectedComponentObject': {}}
      props.setAddConnectionSettings(settingPayload)
      componentPropertiesPayload.relationship.push(payload)
      props.pushComponentPropertyPayload(componentPropertiesPayload)
    }
    let addConnections = function () {
      console.log(componentPropertiesPayload.relationship)
      // comment this below line when actual api work in correct response
      // props.setRelationshipsValue({'resources': newRelationshipArray})
      let payload = {}
      payload.componentId = props.componentTypeComponentData.resources[0].id
      payload.relationship = componentPropertiesPayload.relationship
      props.updateComponentTypeComponentRelationships(payload)
      // showToaster()
      closeModal()
    }
    let handleSecondSelect = function (newValue: any, actionMeta: any) {
      console.group('Value Changed')
      console.log(newValue)
      console.log(`action: ${actionMeta.action}`)
      console.groupEnd()
      if (actionMeta.action === 'select-option') {
        if (newValue !== null) {
          // let index = newValue.value
          if (newValue.value === NEWCOMPONENT) {
            let componentObject = {}
            componentObject.name = ''
            let showAddRelationshipButton = false
            let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': true, 'isNewComponent': true, 'selectedComponentObject': componentObject, 'componentText': componentObject.name, 'newComponentName': componentObject.name, 'showAddRelationshipButton': showAddRelationshipButton}
            props.setAddConnectionSettings(payload)
          } else {
            let componentObject = newValue // props.componentTypeComponents.resources[index]
            let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': true, 'isNewComponent': false, 'selectedComponentObject': componentObject, 'componentText': componentObject.name}
            props.setAddConnectionSettings(payload)
          }
        } else {
          let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': false, 'isNewComponent': false, 'selectedComponentObject': {}, 'componentText': ''}
          props.setAddConnectionSettings(payload)
        }
      }
      if (actionMeta.action === 'clear') {
        let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': false, 'isNewComponent': false, 'selectedComponentObject': {}, 'componentText': ''}
        props.setAddConnectionSettings(payload)
      }
      if (actionMeta.action === 'create-option') {
        if (newValue !== null) {
          let componentObject = {}
          componentObject.name = newValue.value // props.componentTypeComponents.resources[index]
          let showAddRelationshipButton = newValue.value.length >= 1
          let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': true, 'isNewComponent': true, 'selectedComponentObject': componentObject, 'componentText': componentObject.name, 'newComponentName': componentObject.name, 'showAddRelationshipButton': showAddRelationshipButton}
          props.setAddConnectionSettings(payload)
        } else {
          let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': false, 'selectedComponentObject': {}, 'componentText': ''}
          props.setAddConnectionSettings(payload)
        }
      }
    }
    let handleInputChange = function (inputValue: any, actionMeta: any) {
      console.group('Input Changed')
      console.log(inputValue)
      console.log(`action: ${actionMeta.action}`)
      console.groupEnd()
    }
    let removeRelationship = function (index) {
      let newConnection = [...props.addNewConnectionSettings.newConnectionArray]
      newConnection.splice(index, 1)
      let showCreateConnectionButton = newConnection.length > 0 || false
      let payload = {...props.addNewConnectionSettings, 'newConnectionArray': newConnection, 'showCreateConnectionButton': showCreateConnectionButton}
      props.setAddConnectionSettings(payload)
      // props.setRelationshipsValue({'resources': newConnection})
      // modelRelationshipData = newConnection
      if (newConnection.length > 0) {
        let payload = []
        newConnection.forEach(function (data, index) {
          payload.push(data.payload)
        })
        componentPropertiesPayload.relationship = payload
        props.pushComponentPropertyPayload(componentPropertiesPayload)
      } else {
        componentPropertiesPayload.relationship = []
        props.pushComponentPropertyPayload(componentPropertiesPayload)
      }
    }
    let handleNewComponent = function (event) {
      let newComponent = event.target.value
      let componentObject = {}
      componentObject.name = newComponent
      let showAddRelationshipButton = newComponent.length >= 1
      let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': true, 'isNewComponent': true, 'selectedComponentObject': componentObject, 'componentText': newComponent, 'newComponentName': newComponent, 'showAddRelationshipButton': showAddRelationshipButton}
      props.setAddConnectionSettings(payload)
    }

    if (props.componentTypeComponentConstraints !== '' && props.componentTypeComponentConstraints !== '') {
      console.log('componentTypeComponentConstraints', props.componentTypeComponentConstraints)
      SelectedData = props.componentTypeComponentConstraints.resources.filter(function (constraint) {
          if (constraint.target_component_type !== null) {
          return constraint
          }
        }).map(function (constraint, index) {
        if (constraint.target_component_type !== null) {
          let data = {}
          if (constraint.constraint_type === 'Parent') {
            // data.display_name = props.componentTypeComponentData.resources[0].name + ' ' + constraint.constraint_type + ' Components'
            data.display_name = props.componentTypeComponentData.resources[0].name + ' is Child of ' + constraint.target_component_type.name
            data.isParent = true
          } else if (constraint.constraint_type === 'Child') {
            // data.display_name = props.componentTypeComponentData.resources[0].name + ' ' + constraint.constraint_type + ' Components'
            data.display_name = props.componentTypeComponentData.resources[0].name + ' is Parent of ' + constraint.target_component_type.name
            data.isParent = false
          } else if (constraint.constraint_type === 'ConnectFrom') {
            data.display_name = props.componentTypeComponentData.resources[0].name + ' ' + constraint.connection_type.name + ' ' + constraint.target_component_type.name
            data.isParent = false
          } else if (constraint.constraint_type === 'ConnectTo') {
            data.display_name = constraint.target_component_type.name + ' ' + constraint.connection_type.name + ' ' + props.componentTypeComponentData.resources[0].name
            data.isParent = false
          }
          data.disabled = true
          data.id = constraint.id
          data.constraint_type = constraint.constraint_type
          data.target_component_type = constraint.target_component_type
          data.name = constraint.name
          data.is_disabled = true
          data.value = constraint.id
          data.label = data.display_name
          return data
        } else {
          return false
        }
      })
    }

    if (props.componentTypeComponents !== '' && props.componentTypeComponents !== '' && props.componentTypeComponents.error_code === null) {
      if (props.componentTypeComponents.resources.length > 0) {
        selectComponentOptions1 = props.componentTypeComponents.resources.map((component, index) => {
          let option = {...component}
          option.value = component.name
          option.label = component.name
          return option
        })
        if (props.addNewConnectionSettings.firstSelectboxIndex !== null) {
          let newOption = {}
          newOption.value = NEWCOMPONENT
          newOption.label = 'New ' + props.addNewConnectionSettings.firstSelectboxIndex.target_component_type.name
          selectComponentOptions1.push(newOption)
        }
      }
    }

    if (props.componentTypeComponentData !== '') {
      // let icon = props.componentTypeComponentData.resources[0].links.find(function (link) { console.log(link); return link.rel === 'icon' })
      // console.log('_-------------------------------> icon', icon)
      componentTypeComponentName = props.componentTypeComponentData.resources[0].name
      ComponentTypeName = props.componentTypeComponentData.resources[0].component_type.name
      componentNameMessage = props.componentTypeComponentData.resources[0].nameMessage
      componentTypeComponentDescription = props.componentTypeComponentData.resources[0].description
      startNode.name = props.componentTypeComponentData.resources[0].name
      startNode.title = props.componentTypeComponentData.resources[0].name
    }

    let toggleExpandIcon = function (index) {
      // eslint-disable-next-line
      let iconClass = $('#expandIcon' + index).attr('class')
      if (iconClass === 'fa fa-plus') {
        // eslint-disable-next-line
        $('#expandIcon' + index).removeClass('fa-plus').addClass('fa-minus')
      } else {
        // eslint-disable-next-line
        $('#expandIcon' + index).removeClass('fa-minus').addClass('fa-plus')
      }
    }

    if (componentTypeComponentProperties !== '') {
      console.log('original', componentTypeComponentProperties)
      componentTypeComponentPropertiesList = componentTypeComponentProperties.map(function (property, index) {
        let propertyProperties = property.properties
        let childProperties = propertyProperties.map(function (childProperty, childIndex) {
          let value
          let htmlElement
          // console.log('childProperty', childProperty)
          if (childProperty.property_type.key === 'Integer') {
            value = childProperty.int_value
            htmlElement = function () {
              return (<div className='col-8 form-group m-form__group has-info'>
                <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
                {true && (<div className='form-control-feedback'>should be Number</div>)}
              </div>)
            }
          } else if (childProperty.property_type.key === 'Decimal') {
            value = childProperty.float_value
            htmlElement = function () {
              return (<div className='col-8 form-group m-form__group has-info'>
                <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
                {true && (<div className='form-control-feedback'>should be Number</div>)}
              </div>)
            }
          } else if (childProperty.property_type.key === 'DateTime') {
            value = childProperty.date_time_value ? moment(childProperty.date_time_value).format('DD MMM YYYY') : ''
            htmlElement = function () {
              return (<div className='col-8 form-group m-form__group has-info'>
                <DatePicker
                  className='input-sm form-control m-input'
                  selected={childProperty.date_time_value ? moment(childProperty.date_time_value) : ''}
                  dateFormat='DD MMM YYYY'
                  onSelect={(date) => { editDateProperty(index, childIndex, date) }}
                  />
                {/* <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' /> */}
                {true && (<div className='form-control-feedback'>should be Date</div>)}
              </div>)
            }
          } else if (childProperty.property_type.key === 'Text') {
            value = childProperty.text_value
            htmlElement = function () {
              return (<div className='col-8 form-group m-form__group has-info'>
                <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
                {true && (<div className='form-control-feedback'>should be Text</div>)}
              </div>)
            }
          } else if (childProperty.property_type.key === 'List') {
            let childPropertyOption = childProperty.value_set.values.map((option, opIndex) => {
              option.label = option.name
              option.value = option.id
              return option
            })
            let dvalue = childProperty.value_set_value
            if (childProperty.value_set_value !== null) {
              dvalue.label = childProperty.value_set_value.name
              dvalue.value = childProperty.value_set_value.id
            }
            value = childProperty.value_set_value ? childProperty.value_set_value.name : null
            htmlElement = function () {
              return (<Select
                className='col-7 input-sm m-input'
                placeholder='Select Options'
                isClearable
                defaultValue={dvalue}
                onChange={handlePropertySelect(index, childIndex)}
                isSearchable={false}
                name={'selectProperty'}
                options={childPropertyOption}
              />)
            }
          } else {
            value = childProperty.other_value
            htmlElement = function () {
              return (<div className='col-8 form-group m-form__group has-info'>
                <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
                {true && (<div className='form-control-feedback'>should be Text</div>)}
              </div>)
            }
          }
          return (
            <tr key={'child' + childIndex}>
              <td><span className={styles.labelbold}>{childProperty.name}</span></td>
              <td>
                {!props.isEditComponent && (<span>{value}</span>)}
                {props.isEditComponent && htmlElement()}
              </td>
            </tr>
          )
        })
        return (
          <tbody key={index} className={'col-6'}>
            <tr id={'property' + index} onClick={(event) => { event.preventDefault(); toggleExpandIcon(index) }} data-toggle='collapse' data-target={'#expand' + index} style={{cursor: 'pointer'}}>
              <td><icon id={'expandIcon' + index} className={'fa fa-plus'} aria-hidden='true' />&nbsp;</td>
              <td><span className={styles.labelbold}>{property.name}</span></td>
            </tr>
            <tr className='collapse' id={'expand' + index}>
              <td colSpan='2'>
                <table>
                  {childProperties}
                </table>
              </td>
            </tr>
          </tbody>
        )
      })
    } else {
      console.log('check properties else', props)
    }

    if (componentTypeComponentRelationships !== '') {
      modelRelationshipData = componentTypeComponentRelationships.resources
      let parent = _.filter(componentTypeComponentRelationships.resources, {'relationship_type': 'Parent'})
      let outgoing = _.filter(componentTypeComponentRelationships.resources, {'relationship_type': 'ConnectFrom'})
      outgoing = _.orderBy(outgoing, ['connection.name', 'target_component.name'], ['asc', 'asc'])
      let incoming = _.filter(componentTypeComponentRelationships.resources, {'relationship_type': 'ConnectTo'})
      incoming = _.orderBy(incoming, ['connection.name', 'target_component.name'], ['asc', 'asc'])
      let child = _.filter(componentTypeComponentRelationships.resources, {'relationship_type': 'Child'})
      let parentComponentRelationshipListFn = function () {
        if (parent.length > 0) {
          let childElementList = parent.map(function (element, i) {
          let relationshipActionSettings = {...props.relationshipActionSettings}
          relationshipActionSettings.relationshipText = parent[0].component.name + ' ' + parent[0].relationship_type + ' Components'
          relationshipActionSettings.relationshipId = element.target_component.id
          return (<span className='row' style={{'padding': '5px'}}>
            <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
            <div className='dropdown pull-right col-md-2'>
              <button className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' data-toggle='dropdown' data-hover='dropdown' aria-haspopup='true' aria-expanded='false'><i className='la la-ellipsis-h' /></button>
              <div className={styles.dropmenu}>
                <ul className='dropdown-menu'>
                  <li><a href='javascript:void(0);'><h6>Relationships Action</h6></a></li>
                  <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.actionType = 'view'; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >View</a></li>
                  <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'edit'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >Edit</a></li>
                  <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'delete'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >Delete</a></li>
                </ul>
              </div>
            </div>
            <br />
          </span>)
        })
        return (
          <div className='m-accordion__item' style={{'overflow': 'visible'}}>
            <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + parent[0].relationship_type} aria-expanded='true'>
              <span className='m-accordion__item-title'>{parent[0].component.name} {'is Child of'} {parent[0].target_component.component_type.name}</span>
              <span className='m-accordion__item-mode' />
            </div>
            <div className='m-accordion__item-body collapse' id={'m_accordion_2_item_1_body' + parent[0].relationship_type} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
              <div className='m-accordion__item-content'>
                {childElementList}
              </div>
            </div>
          </div>
          )
        } else {
          console.log('parent else')
          return false
        }
      }
      let childComponentRelationshipListFn = function () {
        if (child.length > 0) {
          let childElementList = child.map(function (element, i) {
          let relationshipActionSettings = {...props.relationshipActionSettings}
          relationshipActionSettings.relationshipText = child[0].component.name + ' ' + child[0].relationship_type + ' Components'
          relationshipActionSettings.relationshipId = element.target_component.id
          return (<span className='row' style={{'padding': '5px'}}>
            <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
            <div className='dropdown pull-right col-md-2'>
              <button className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' data-toggle='dropdown' data-hover='dropdown' aria-haspopup='true' aria-expanded='false'><i className='la la-ellipsis-h' /></button>
              <div className={styles.dropmenu}>
                <ul className='dropdown-menu'>
                  <li><a href='javascript:void(0);'><h6>Relationships Action</h6></a></li>
                  <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.actionType = 'view'; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >View</a></li>
                  <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'edit'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >Edit</a></li>
                  <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'delete'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >Delete</a></li>
                </ul>
              </div>
            </div>
            <br />
          </span>)
        })
        return (
          <div className='m-accordion__item' style={{'overflow': 'visible'}}>
            <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + child[0].relationship_type} aria-expanded='true'>
              <span className='m-accordion__item-title'>{child[0].component.name} {'is Parent of'} {child[0].target_component.component_type.name}</span>
              <span className='m-accordion__item-mode' />
            </div>
            <div className='m-accordion__item-body collapse' id={'m_accordion_2_item_1_body' + child[0].relationship_type} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
              <div className='m-accordion__item-content'>
                {childElementList}
              </div>
            </div>
          </div>
          )
        } else {
          console.log('child else')
          return false
        }
      }
      let outgoingComponentRelationshipListFn = function () {
        if (outgoing.length > 0) {
          let outgoingElements = []
          var outgoingGroup = _.chain(outgoing)
          .groupBy('connection.name')
          .mapValues(connectionTypeGroup => _.groupBy(connectionTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component.component_type.name))
          .value()
          let outerKey = 0
          for (let connectionKey in outgoingGroup) {
            if (outgoingGroup.hasOwnProperty(connectionKey)) {
              outerKey++
              let innerKey = 0
              for (let targetComponentTypeKey in outgoingGroup[connectionKey]) {
                if (outgoingGroup[connectionKey].hasOwnProperty(targetComponentTypeKey)) {
                  innerKey++
                  let relationshipActionSettings = {...props.relationshipActionSettings}
                  relationshipActionSettings.relationshipText = outgoingGroup[connectionKey][targetComponentTypeKey][0].component.name + ' ' + connectionKey + ' ' + targetComponentTypeKey
                  relationshipActionSettings.relationshipId = outgoingGroup[connectionKey][targetComponentTypeKey][0].connection.id
                  let childElementList = outgoingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                    return (<span className='row' style={{'padding': '5px'}}>
                      <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
                      <div className='dropdown pull-right col-md-2'>
                        <button className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' data-toggle='dropdown' data-hover='dropdown' aria-haspopup='true' aria-expanded='false'><i className='la la-ellipsis-h' /></button>
                        <div className={styles.dropmenu}>
                          <ul className='dropdown-menu'>
                            <li><a href='javascript:void(0);'><h6>Relationships Action</h6></a></li>
                            <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.actionType = 'view'; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>View</a></li>
                            <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'edit'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>Edit</a></li>
                            <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'delete'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>Delete</a></li>
                          </ul>
                        </div>
                      </div>
                      <br />
                    </span>)
                  })
                  // let cleanKey = targetComponentTypeKey.replace(/ /g, '')
                  outgoingElements.push(
                    <div className='m-accordion__item' style={{'overflow': 'visible'}}>
                      <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#outgoing_accordion_body' + outerKey + '-' + innerKey} aria-expanded='false'>
                        <span className='m-accordion__item-title'>{outgoingGroup[connectionKey][targetComponentTypeKey][0].component.name} {connectionKey} {targetComponentTypeKey}</span>
                        <span className='m-accordion__item-mode' />
                      </div>
                      <div className='m-accordion__item-body collapse' id={'outgoing_accordion_body' + outerKey + '-' + innerKey} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
                        <div className='m-accordion__item-content'>
                          {childElementList}
                        </div>
                      </div>
                    </div>
                  )
                }
              }
            }
          }
          return outgoingElements
        } else {
          console.log('outgoing else')
          return false
        }
      }
      let incomingComponentRelationshipListFn = function () {
        if (incoming.length > 0) {
          var incomingGroup = _.chain(incoming)
          .groupBy('connection.name')
          .mapValues(connectionTypeGroup => _.groupBy(connectionTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component.component_type.name))
          .value()
          let incomingElements = []
          let outerKey = 0
          for (let connectionKey in incomingGroup) {
            if (incomingGroup.hasOwnProperty(connectionKey)) {
              outerKey++
              let innerKey = 0
              for (let targetComponentTypeKey in incomingGroup[connectionKey]) {
                if (incomingGroup[connectionKey].hasOwnProperty(targetComponentTypeKey)) {
                  innerKey++
                  let relationshipActionSettings = {...props.relationshipActionSettings}
                  relationshipActionSettings.relationshipText = targetComponentTypeKey + ' ' + connectionKey + ' ' + incomingGroup[connectionKey][targetComponentTypeKey][0].component.name
                  relationshipActionSettings.relationshipId = incomingGroup[connectionKey][targetComponentTypeKey][0].connection.id
                  let childElementList = incomingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                    return (<span className='row' style={{'padding': '5px'}}>
                      <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
                      <div className='dropdown pull-right col-md-2'>
                        <button className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' data-toggle='dropdown' data-hover='dropdown' aria-haspopup='true' aria-expanded='false'><i className='la la-ellipsis-h' /></button>
                        <div className={styles.dropmenu}>
                          <ul className='dropdown-menu'>
                            <li><a href='javascript:void(0);'><h6>Relationships Action</h6></a></li>
                            <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'view'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>View</a></li>
                            <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'edit'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>Edit</a></li>
                            <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'delete'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>Delete</a></li>
                          </ul>
                        </div>
                      </div>
                      <br />
                    </span>)
                  })
                  // let cleanKey = targetComponentTypeKey.replace(/ /g, '')
                  incomingElements.push(
                    <div className='m-accordion__item' style={{'overflow': 'visible'}}>
                      <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#incoming_accordion_body' + outerKey + '-' + innerKey} aria-expanded='true'>
                        <span className='m-accordion__item-title'>{targetComponentTypeKey} {connectionKey} {incomingGroup[connectionKey][targetComponentTypeKey][0].component.name}</span>
                        <span className='m-accordion__item-mode' />
                      </div>
                      <div className='m-accordion__item-body collapse' id={'incoming_accordion_body' + outerKey + '-' + innerKey} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
                        <div className='m-accordion__item-content'>
                          {childElementList}
                        </div>
                      </div>
                    </div>
                  )
                }
              }
            }
          }
          return incomingElements
        } else {
          console.log('incoming else')
          return false
        }
      }

      parentComponentRelationshipList = parentComponentRelationshipListFn()
      outgoingComponentRelationshipList = outgoingComponentRelationshipListFn()
      incomingComponentRelationshipList = incomingComponentRelationshipListFn()
      childComponentRelationshipList = childComponentRelationshipListFn()
    }

    return (
      <div>
        <div className='m-alert m-alert--icon m-alert--air m-alert--square alert alert-dismissible m--margin-bottom-30' role='alert'>
          <div className='m-alert__icon'>
            <i className={' fa fa-share'} />
            {/* <img className={styles.iconcenter} src={ComponentTypeIcon.href} alt={ComponentName} /> */}
          </div>
          <div className='m-alert__text'>
            <div className='row'>
              {!props.isEditComponent && (<h2 className=''>{componentTypeComponentName}</h2>)}
              {props.isEditComponent && (<div className='col-8 form-group m-form__group has-danger'>
                <input type='text' className='form-control m-input' onChange={editComponentName} value={componentTypeComponentName} placeholder='Component Name' aria-describedby='basic-addon2' />
                {componentNameMessage && (<div className='form-control-feedback'>Component name required</div>)}
              </div>)}
              {props.isEditComponent && (<div className='col-3 pull-right'>
                <button onClick={cancelEditComponent} className='btn btn-outline-info btn-sm'>Cancel</button>
                <button onClick={saveComponentProperty} className='btn btn-outline-info btn-sm'>Save</button>
              </div>)}
              {!props.isEditComponent && (<div className={'pull-left m-dropdown m-dropdown--inline m-dropdown--arrow m-dropdown--align-left m-dropdown--align-push ' + dropDownClass}>
                <a href='javascript:void(0);' className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' onClick={openDropDown}>
                  <i className='la la-ellipsis-h' />
                </a>
                <div className='m-dropdown__wrapper' style={{zIndex: 101}}>
                  <span className='m-dropdown__arrow m-dropdown__arrow--left m-dropdown__arrow--adjust' style={{right: 'auto', left: '29.5px'}} />
                  <div className='m-dropdown__inner'>
                    <div className='m-dropdown__body'>
                      <div className='m-dropdown__content'>
                        <ul className='m-nav'>
                          <li className='m-nav__section m-nav__section--first'>
                            <span className='m-nav__section-text'>Quick Actions</span>
                          </li>
                          <li className='m-nav__item'>
                            <a href='javascript:void(0);' onClick={editComponent} className='m-nav__link'>
                              <i className='m-nav__link-icon flaticon-edit-1' />
                              <span className='m-nav__link-text'>Update Properties</span>
                            </a>
                          </li>
                          <li className='m-nav__item'>
                            <a href='javascript:void(0);' onClick={openDiscussionModal} className='m-nav__link'>
                              <i className='m-nav__link-icon 	flaticon-users' />
                              <span className='m-nav__link-text'>Start new discussion</span>
                            </a>
                          </li>
                          <li className='m-nav__item'>
                            <a href='' className='m-nav__link' onClick={openDeleteModal}>
                              <i className='m-nav__link-icon flaticon-delete-1' />
                              <span className='m-nav__link-text'>Delete</span>
                            </a>
                          </li>
                          {/* <li className='m-nav__item'>
                            <a href='' className='m-nav__link' onClick={openDeleteModal}>
                              <i className='m-nav__link-icon flaticon-delete-1' />
                              <span className='m-nav__link-text'>Delete</span>
                            </a>
                          </li> */}
                          <li className='m-nav__separator m-nav__separator--fit' />
                          <li className='m-nav__item'>
                            <a href='javascript:void(0);' className='btn btn-outline-danger m-btn m-btn--pill m-btn--wide btn-sm' onClick={closeDropDown}>Cancel</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)}
            </div>
            <br />
            {!props.isEditComponent && (<p className='col-8'>{componentTypeComponentDescription}</p>)}
            {props.isEditComponent && (<input type='text' className='col-8 form-control m-input' onChange={editComponentDescription} value={componentTypeComponentDescription} placeholder='Component Description' aria-describedby='basic-addon2' />)}
          </div>
        </div>
        <div className={styles.borderline}>
          <div className='row'>
            <div className='col-sm-12 col-md-5' >
              <div className={styles.tabsprops}>
                <ul className='nav nav-tabs' role='tablist'>
                  <li className='nav-item'>
                    <a className={'nav-link' + showProperties} data-toggle='tab' onClick={showProperty} href='javascript:void(0);'>Properties</a>
                  </li>
                  <li className='nav-item'>
                    <a className={'nav-link' + showRelationships} data-toggle='tab' onClick={showRelationship} href='javascript:void(0);'>Relationships</a>
                  </li>
                </ul>
                <div className='tab-content'>
                  <div className={'tab-pane' + showProperties} id='m_tabs_3_1' role='tabpanel'>
                    <table className={'table table-striped- table-bordered table-hover table-checkable dataTable dtr-inline collapsed ' + styles.borderless}>
                      {componentTypeComponentPropertiesList}
                    </table>
                  </div>
                  <div className={'tab-pane' + showRelationships} id='m_tabs_3_2' role='tabpanel'>
                    <div className='row'>
                      <div className='col-6' />
                      <div className='col-6 float-right'>
                        <button onClick={openModal} className={'btn btn-sm btn-outline-info pull-right'}>Add Relationship</button>
                      </div>
                    </div>
                    <div className={'row'} style={{'marginTop': '20px'}}>
                      <div className='m--space-10' />
                      <div className='accordion m-accordion m-accordion--bordered' id='m_accordion_2' role='tablist' aria-multiselectable='true'>
                        {parentComponentRelationshipList}
                        {outgoingComponentRelationshipList}
                        {incomingComponentRelationshipList}
                        {childComponentRelationshipList}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-7'>
              <div className='m--space-10' />
              <div className={''}>
                <h2>{componentTypeComponentName} Model Diagram</h2><br />
                <div className='row'>
                  <div id='divPaperWrapper' style={divStyle}>
                    <ComponentModelComponent startNode={startNode} onUse={'ComponentPage'} relationships={modelRelationshipData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ReactModal isOpen={props.deletemodalIsOpen}
              onRequestClose={closeModal}
              style={customStyles} >
              <div className={styles.modalwidth}>
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h6 className='modal-title' id='exampleModalLabel'>Deleting the {componentTypeComponentName} {ComponentTypeName}, are you sure?</h6>
                      <button type='button' onClick={closeDeleteModal} className='close' data-dismiss='modal' aria-label='Close'>
                        <span aria-hidden='true'>×</span>
                      </button>
                    </div>
                    <div className='modal-body'>
                      <h6>Deleting the {componentTypeComponentName} {ComponentTypeName} will also delete the following:</h6>
                      <div>
                        <h5>Children Components</h5>
                        {childrenList}
                      </div>
                      <div>
                        <h5>Relationships</h5>
                        {parentComponentRelationshipList}
                        {outgoingComponentRelationshipList}
                        {incomingComponentRelationshipList}
                        {childComponentRelationshipList}
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button type='button' onClick={closeDeleteModal} id='m_login_signup' className={styles.buttonbg}>Back</button>
                      <button type='button' id='m_login_signup' className={styles.buttonbg} onClick={removeComponent}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </ReactModal>
            <ReactModal isOpen={props.modalIsOpen}
              onRequestClose={closeModal}
              shouldCloseOnOverlayClick={false}
              className='modal-dialog modal-lg'
              style={{'content': {'top': '20%'}}}
              // className={''}
              >
              {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
              <div>
                <div>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h4 className='modal-title' id='exampleModalLabel'>{'How is the ' + componentTypeComponentName + ' related to other things'}</h4>
                      <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                        <span aria-hidden='true'>×</span>
                      </button>
                    </div>
                    <div className='modal-body'>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='SelectRelationship' className='col-5 col-form-label'>Choose Relationship Type</label>
                        <div className='col-7'>
                          <Select
                            className='input-sm m-input'
                            placeholder='Choose Relationships Type'
                            isClearable
                            isOptionDisabled={(option) => { return (isParentSelected && option.isParent) }}
                            // defaultValue={childPropertyOption[0]}
                            // isDisabled={false}
                            // isLoading={false}
                            // isClearable={true}
                            value={props.addNewConnectionSettings.firstSelectboxIndex}
                            // clearValue={() => { return true }}
                            onChange={handleFirstSelect}
                            isSearchable={false}
                            name='selectConstraint'
                            options={SelectedData}
                          />
                        </div>
                      </div>
                      {props.addNewConnectionSettings.firstSelectboxSelected === true && !props.addNewConnectionSettings.isWaitingForApiResponse && (
                        <div className='form-group m-form__group row'>
                          <label htmlFor='SelectRelatedComponent' className='col-5 col-form-label'>Choose Select Related Component</label>
                          <div className='col-7'>
                            {/* <select className='form-control m-input' onBlur={handleSecondSelect} >{selectComponentOptions}</select> */}
                            <CreatableSelect
                              isClearable
                              className='input-sm m-input'
                              // name='component-select'
                              // value={props.addNewConnectionSettings.secondSelectboxValue}
                              onChange={handleSecondSelect}
                              onInputChange={handleInputChange}
                              options={selectComponentOptions1}
                              // isOptionDisabled={(option) => option.is_disabled === true}
                            />
                          </div>
                          <div className='m--space-10' />
                        </div>
                      )}
                      {props.addNewConnectionSettings.secondSelectboxSelected === true && !props.addNewConnectionSettings.isNewComponent && (
                        <div className='row'>
                          <p className='col-8'>{props.addNewConnectionSettings.relationshipText + ' ' + props.addNewConnectionSettings.componentText}</p>
                          <div className='col-4'>
                            <button onClick={addRelationShip} className={'btn btn-sm btn-outline-info' + ' '}>Add Relationships</button>
                          </div>
                          <div className='m--space-10' />
                        </div>
                      )}
                      {props.addNewConnectionSettings.secondSelectboxSelected === true && props.addNewConnectionSettings.isNewComponent && (
                        <div className='row'>
                          <p className='col-5'>{props.addNewConnectionSettings.relationshipText + ' '}</p>
                          <input type='text' className='col-4 form-control m-input' onChange={handleNewComponent} value={props.addNewConnectionSettings.newComponentName} placeholder='New Component' aria-describedby='basic-addon2' />
                          <div className='col-3'>
                            <button onClick={addRelationShip} className={'btn btn-sm btn-outline-info' + ' ' + addRelationshipClass}>Add Relationships</button>
                          </div>
                          <div className='m--space-10' />
                        </div>
                      )}
                      <div className='col-md-12'>
                        <div className='m--space-10' />
                        <div className='m--space-10' />
                        <hr size='3' />
                        {props.addNewConnectionSettings.newConnectionArray.length > 0 &&
                          props.addNewConnectionSettings.newConnectionArray.map(function (connection, index) {
                            return (
                              <div className='row'>
                                <p className='col-8'>{connection.display_name}</p>
                                <div className='col-4'>
                                  <a href='javscript:void(0);' onClick={() => { removeRelationship(index) }} >remove</a>
                                </div>
                              </div>)
                          })
                        }
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button onClick={closeModal} className='btn btn-sm btn-outline-info'>Cancel</button>
                      <button onClick={addConnections} className={'btn btn-sm btn-info ' + addConnectionClass}>Confirm</button>
                    </div>
                  </div>
                </div>
              </div>
            </ReactModal>
            <ReactModal isOpen={props.successmodalIsOpen}
              style={customStyles} >
              {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
              <div className={styles.modalwidth}>
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h4 className='modal-title' id='exampleModalLabel'>Confirmation</h4>
                    </div>
                    <div className='modal-body'>
                      <p className={styles.confirmsg}>Some of the required properties do not have any values.</p>
                      <p className={styles.confirmsg}>Are you sure you want to continue?</p>
                    </div>
                    <div className='modal-footer'>
                      <button onClick={closeConfirmationModal} className='btn btn-sm btn-outline-info'>Back</button>
                      <button onClick={submitUpdates} id='m_login_signup' className='btn btn-sm btn-info'>Submit Updates</button>
                    </div>
                  </div>
                </div>
              </div>
            </ReactModal>
            <ReactModal isOpen={props.relationshipActionSettings.isModalOpen}
              onRequestClose={closeRelationshipActionModal}
              shouldCloseOnOverlayClick={false}
              className=''// style={{'content': {'top': '20%', 'display': 'block'}}
              style={customStylescrud}>
              {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
              <div className={''} id='relationshipPropertyContent'>
                <div className='modal-dialog modal-lg'>
                  <div className='modal-content' >
                    <div className='modal-header'>
                      {(props.relationshipActionSettings.actionType === 'edit' || props.relationshipActionSettings.actionType === 'view') && (
                        <h4 className='modal-title' id='exampleModalLabel'>{'Relationship details for ' + props.relationshipActionSettings.relationshipText + ': ' + props.relationshipActionSettings.componentName}</h4>
                      )}
                      {props.relationshipActionSettings.actionType === 'delete' && (
                        <h4 className='modal-title' id='exampleModalLabel'>Deleting Relationship, are you sure?</h4>
                      )}
                      <button type='button' onClick={closeRelationshipActionModal} className='close' data-dismiss='modal' aria-label='Close'>
                        <span aria-hidden='true'>×</span>
                      </button>
                    </div>
                    <div className='modal-body' style={{'height': 'calc(50vh - 65px)', 'overflow': 'auto'}}>
                      { componentRelationshipPropertiesList !== '' && (
                      <table className={'table ' + styles.borderless}>
                        {componentRelationshipPropertiesList}
                      </table>
                      )}
                      {props.relationshipActionSettings.actionType === 'delete' && (
                      <h4>Are you sure you want to remove the following relationship?</h4>
                      )}
                      {props.relationshipActionSettings.actionType === 'delete' && (
                      <h5 style={{'text-align': 'center'}}>{'' + props.relationshipActionSettings.relationshipText + ': ' + props.relationshipActionSettings.componentName}</h5>
                      )}
                    </div>
                    <div className='modal-footer'>
                      <button onClick={closeRelationshipActionModal} className='btn btn-sm btn-outline-info'>Cancel</button>
                      {props.relationshipActionSettings.actionType === 'edit' && (
                      <button onClick={updateRelationshipProperty} className={'btn btn-sm btn-info '}>Update</button>
                      )}
                      {props.relationshipActionSettings.actionType === 'delete' && (
                      <button onClick={removeComponentRelationship} className={'btn btn-sm btn-info '}>Delete</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ReactModal>
          </div>
        </div>
        <Discussion name={componentTypeComponentName} type='Component' {...props} />
        <NewDiscussion contextId={props.match.params.id} name={componentTypeComponentName} type='Component' {...props} />
      </div>
    )
}

ComponentTypeComponent.propTypes = {
  // deleteRelationshipResponse: PropTypes.any,
  // setRelationshipActionSettings: PropTypes.func,
  match: PropTypes.any,
  relationshipPropertyPayload: PropTypes.any,
  relationshipActionSettings: PropTypes.any,
  relationshipProperty: PropTypes.any,
  // resetUpdateRelationshipResponse: PropTypes.func,
  // updateRelationshipResponse: PropTypes.any,
  successmodalIsOpen: PropTypes.any,
  componentPropertiesPayload: PropTypes.any,
  copiedComponentProperties: PropTypes.any,
  // copiedComponentData: PropTypes.any,
  addNewConnectionSettings: PropTypes.any,
  componentTypeComponentData: PropTypes.any,
  componentTypeComponentProperties: PropTypes.any,
  componentTypeComponents: PropTypes.any,
  componentTypeComponentConstraints: PropTypes.any,
  showTabs: PropTypes.any,
  isEditComponent: PropTypes.any,
  // setCurrentTab: PropTypes.func,
  // setEditComponentFlag: PropTypes.func,
  modalIsOpen: PropTypes.any,
  // setModalOpenStatus: PropTypes.func
  componentTypeComponentRelationships: PropTypes.any,
  isDropDownOpen: PropTypes.any,
  // isDiscussionModalOpen: PropTypes.any,
  // setDeleteModalOpenStatus: PropTypes.func,
  // history: PropTypes.any,
  deletemodalIsOpen: PropTypes.any
  // deletecomponentTypeComponent: PropTypes.func
}
