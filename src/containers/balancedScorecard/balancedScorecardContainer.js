import {connect} from 'react-redux'
import BalancedScorecard from '../../components/balancedScorecard/balancedScorecardComponent'
// For Lifecycle composing
import {compose, lifecycle} from 'recompose'
import {actions as sagaActions} from '../../redux/sagas/'
import {actionCreators} from '../../redux/reducers/balancedScorecard/balancedScorecardReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    modelPrespectives: state.balancedScorecardReducer.modelPrespectives,
    metaModelPerspective: state.balancedScorecardReducer.metaModelPerspective,
    crudMetaModelPerspective: state.balancedScorecardReducer.crudMetaModelPerspective,
    currentPage: state.balancedScorecardReducer.currentPage,
    perPage: state.balancedScorecardReducer.perPage,
    crude: state.balancedScorecardReducer.crude,
    addSettings: state.balancedScorecardReducer.addSettings,
    availableAction: state.balancedScorecardReducer.availableAction,
    createComponentResponse: state.balancedScorecardReducer.createComponentResponse,
    deleteComponentResponse: state.balancedScorecardReducer.deleteComponentResponse,
    connectionData: state.balancedScorecardReducer.connectionData,
    updateComponentResponse: state.balancedScorecardReducer.updateComponentResponse,
    dropdownData: state.balancedScorecardReducer.dropdownData,
    expandSettings: state.balancedScorecardReducer.expandSettings,
    nestedModelPerspectives: state.balancedScorecardReducer.nestedModelPerspectives,
    headerData: state.balancedScorecardReducer.headerData,
    crudModelPerspectives: state.balancedScorecardReducer.crudModelPerspectives,
    allDropdownData: state.balancedScorecardReducer.allDropdownData
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  setModalOpenStatus: basicActionCreators.setModalOpenStatus,
  fetchModelPrespectives: sagaActions.modelActions.fetchModelPrespectives,
  fetchMetaModelPrespective: sagaActions.modelActions.fetchMetaModelPrespective,
  fetchDropdownData: sagaActions.serviceActions.fetchDropdownData,
  fetchAllDropdownData: sagaActions.serviceActions.fetchAllDropdownData,
  fetchCrudMetaModelPrespective: sagaActions.serviceActions.fetchCrudMetaModelPrespective,
  setCurrentPage: actionCreators.setCurrentPage,
  setAddSettings: actionCreators.setAddSettings,
  setPerPage: actionCreators.setPerPage,
  setAvailableAction: actionCreators.setAvailableAction,
  resetResponse: actionCreators.resetResponse,
  addComponentComponent: sagaActions.applicationDetailActions.addComponentComponent,
  deleteComponentModelPerspectives: sagaActions.modelActions.deleteComponentModelPerspectives,
  setConnectionData: actionCreators.setConnectionData,
  updateModelPrespectives: sagaActions.modelActions.updateModelPrespectives,
  updateComponentModelPrespectives: sagaActions.modelActions.updateComponentModelPrespectives,
  fetchNestedModelPrespectives: sagaActions.serviceActions.fetchNestedModelPrespectives,
  fetchCrudModelPrespectives: sagaActions.serviceActions.fetchCrudModelPrespectives,
  updateNestedModelPrespectives: sagaActions.serviceActions.updateNestedModelPrespectives,
  removeModelPrespectives: sagaActions.serviceActions.removeModelPrespectives,
  setExpandSettings: actionCreators.setExpandSettings,
  setHeaderData: actionCreators.setHeaderData
}

// If you want to use the function mapping
// export const propsMapping = (dispatch, ownProps) => {
//   return {
//     onClick: () => dispatch(actions.starsActions.FETCH_STARS)
//   }
// }
// eslint-disable-next-line
toastr.options = {
  'closeButton': false,
  'debug': false,
  'newestOnTop': false,
  'progressBar': false,
  'positionClass': 'toast-bottom-full-width',
  'preventDuplicates': false,
  'onclick': null,
  'showDuration': '300',
  'hideDuration': '1000',
  'timeOut': '4000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
}
let perspectiveId = 72
let perspectiveViewKey = 'PenaltyAgreementList'

// export default connect(mapStateToProps, propsMapping)(BalancedScorecard)
export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
      // eslint-disable-next-line
      mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let payload = {}
      payload['meta_model_perspective_id[0]'] = perspectiveId
      payload['view_key[0]'] = perspectiveViewKey
      this.props.fetchModelPrespectives && this.props.fetchModelPrespectives(payload)
      let metaModelPrespectivePayload = {}
      metaModelPrespectivePayload.id = perspectiveId
      metaModelPrespectivePayload.viewKey = {'view_key': perspectiveViewKey}
      this.props.fetchMetaModelPrespective && this.props.fetchMetaModelPrespective(metaModelPrespectivePayload)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      // mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('nextProps', nextProps)
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.modelPrespectives && nextProps.modelPrespectives !== '' && nextProps.availableAction.toProcessModelPerspectives && nextProps.modelPrespectives !== this.props.modelPrespectives) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        let availableAction = nextProps.availableAction
        availableAction['toProcessModelPerspectives'] = false
        nextProps.setAvailableAction(availableAction)
      }
      if (nextProps.crudModelPerspectives && nextProps.crudModelPerspectives !== '' && !nextProps.availableAction.toProcess && nextProps.connectionData !== '' && nextProps.availableAction.toProcessCrudModel) {
        if (nextProps.crudModelPerspectives.error_code === null) {
          let addSettings = JSON.parse(JSON.stringify(nextProps.addSettings))
          let labelParts = nextProps.crudMetaModelPerspective.resources[0].parts
          let data = nextProps.crudModelPerspectives.resources[0]
          let selectedValues = []
          let setCustomerProperty = []
          if (!addSettings.isNexusPoint) {
            if (data.parts) {
              labelParts.forEach(function (partData, ix) {
                if (partData.standard_property !== null && partData.type_property === null) { // Standard Property
                  if (partData.standard_property === 'name') {
                    addSettings.name = data.parts[ix].value
                  }
                  if (partData.standard_property === 'description') {
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
          }
          addSettings.isEditModalOpen = true
          addSettings.updateObject = data
          addSettings.updateResponse = null
          nextProps.setAddSettings(addSettings)
          let connectionData = {...nextProps.connectionData}
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
          nextProps.setConnectionData(connectionData)
          let availableAction = nextProps.availableAction
          availableAction['toProcessCrudModel'] = false
          nextProps.setAvailableAction(availableAction)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.crudModelPerspectives.error_message, nextProps.crudModelPerspectives.error_code)
        }
      }
      if (nextProps.crudMetaModelPerspective && nextProps.crudMetaModelPerspective !== '' && nextProps.availableAction.toProcess) {
        if (nextProps.crudMetaModelPerspective.resources[0].crude) {
          let addSettings = JSON.parse(JSON.stringify(nextProps.addSettings))
          let availableAction = {...nextProps.availableAction}
          let crude = nextProps.crude
          let mask = nextProps.crudMetaModelPerspective.resources[0].crude
          let labelParts = nextProps.crudMetaModelPerspective.resources[0].parts
          let connectionData = {}
          connectionData.operation = {
            toCallApi: true,
            isComplete: false,
            processIndex: 0
          }
          connectionData.selectedValues = []
          let cData = []
          let standardProperty = []
          let customerProperty = []
          for (let option in crude) {
            if (crude.hasOwnProperty(option)) {
              if (mask & crude[option]) {
                availableAction[option] = true
              }
            }
          }
          labelParts.forEach(function (data, index) {
            if (data.standard_property === null && data.type_property === null && data.constraint_perspective === null) {
              let obj = {}
              obj.name = data.name
              if (data.constraint_inverted) {
                obj.componentId = data.constraint.component_type.id
              } else {
                obj.componentId = data.constraint.target_component_type.id
              }
              obj.data = null
              obj.processed = false
              obj.partIndex = index
              obj.max = data.constraint.max
              obj.min = data.constraint.min
              cData.push(obj)
              connectionData.selectedValues.push(null)
            }
            if (data.standard_property === null && data.type_property === null && data.constraint_perspective !== null) {
              if (data.nexus) {
                let payload = {}
                payload['meta_model_perspective_id[0]'] = data.constraint_perspective.id
                payload['view_key[0]'] = data.constraint_perspective.view_key
                console.log('dropcall', nextProps)
                payload['filter[0]'] = addSettings.selectedData.childFilter
                nextProps.fetchAllDropdownData && nextProps.fetchAllDropdownData(payload)
                addSettings.isNexusPoint = true
                nextProps.setAddSettings(addSettings)
              }
            }
            if (data.standard_property !== null && data.type_property === null) {
              data.partIndex = index
              standardProperty.push(data)
            }
            if (data.standard_property === null && data.type_property !== null) {
              data.partIndex = index
              customerProperty.push(data)
            }
          })
          connectionData.data = cData
          connectionData.customerProperty = customerProperty
          connectionData.standardProperty = standardProperty
          connectionData.selectOption = []
          nextProps.setConnectionData(connectionData)
          availableAction['toProcess'] = false
          nextProps.setAvailableAction(availableAction)
        }
      }
      if (nextProps.metaModelPerspective && nextProps.metaModelPerspective !== '' && nextProps.availableAction.toProcessMetaModel) {
        let headerData = {...this.props.headerData}
        let availableAction = {...nextProps.availableAction}
        let crude = nextProps.crude
        let mask = nextProps.metaModelPerspective.resources[0].crude
        let metaData = []
        metaData.push(nextProps.metaModelPerspective.resources[0])
        headerData.metaModelPerspective = metaData
        headerData.toProcess = true
        nextProps.setHeaderData(headerData)
        availableAction['toProcessMetaModel'] = false
        for (let option in crude) {
          if (crude.hasOwnProperty(option)) {
            if (mask & crude[option]) {
              availableAction[option] = true
            }
          }
        }
        nextProps.setAvailableAction(availableAction)
      }
      if (nextProps.createComponentResponse && nextProps.createComponentResponse !== '') {
        let addSettings = {...nextProps.addSettings}
        addSettings.name = ''
        addSettings.description = ''
        addSettings.createResponse = nextProps.createComponentResponse
        nextProps.setAddSettings(addSettings)
        // eslint-disable-next-line
        mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        let payload = {}
        if (addSettings.initiatedFrom === 'ParentNode') {
          payload['meta_model_perspective_id[0]'] = perspectiveId
          payload['view_key[0]'] = perspectiveViewKey
          this.props.fetchModelPrespectives && this.props.fetchModelPrespectives(payload)
        } else {
          let selectedObject = this.props.expandSettings.selectedObject[this.props.expandSettings.level] || null
          if (selectedObject) {
            if (selectedObject.expandFlag) {
              payload['meta_model_perspective_id'] = selectedObject.metaModelPerspectives.id
              payload['view_key'] = selectedObject.metaModelPerspectives.view_key
              payload['parent_reference'] = selectedObject.parentReference
              if (selectedObject.containerPerspectiveId) {
                payload['container_meta_model_perspective_id'] = selectedObject.containerPerspectiveId
                payload['container_view_key'] = selectedObject.containerPerspectiveViewKey
              }
              this.props.fetchNestedModelPrespectives && this.props.fetchNestedModelPrespectives(payload)
            }
          }
          // payload['meta_model_perspective_id'] = addSettings.selectedData.metaModelPerspectives.id
          // payload['view_key'] = addSettings.selectedData.metaModelPerspectives.view_key
          // payload['parent_reference'] = addSettings.selectedData.parentReference
          // payload['container_meta_model_perspective_id'] = addSettings.selectedData.containerPerspectiveId
          // payload['container_view_key'] = addSettings.selectedData.containerPerspectiveViewKey
          // this.props.fetchNestedModelPrespectives && this.props.fetchNestedModelPrespectives(payload)
        }
        nextProps.resetResponse()
      }
      if (nextProps.updateComponentResponse && nextProps.updateComponentResponse !== '') {
        let addSettings = {...nextProps.addSettings}
        addSettings.name = ''
        addSettings.description = ''
        addSettings.updateResponse = nextProps.updateComponentResponse
        nextProps.setAddSettings(addSettings)
        let payload = {}
        // eslint-disable-next-line
        mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        if (addSettings.initiatedFrom === 'ParentNode') {
          payload['meta_model_perspective_id[0]'] = perspectiveId
          payload['view_key[0]'] = perspectiveViewKey
          this.props.fetchModelPrespectives && this.props.fetchModelPrespectives(payload)
        } else {
          let selectedObject = this.props.expandSettings.selectedObject[this.props.expandSettings.level] || null
          if (selectedObject) {
            if (selectedObject.expandFlag) {
              payload['meta_model_perspective_id'] = selectedObject.metaModelPerspectives.id
              payload['view_key'] = selectedObject.metaModelPerspectives.view_key
              payload['parent_reference'] = selectedObject.parentReference
              if (selectedObject.containerPerspectiveId) {
                payload['container_meta_model_perspective_id'] = selectedObject.containerPerspectiveId
                payload['container_view_key'] = selectedObject.containerPerspectiveViewKey
              }
              this.props.fetchNestedModelPrespectives && this.props.fetchNestedModelPrespectives(payload)
            }
          }
          // payload['meta_model_perspective_id'] = addSettings.selectedData.metaModelPerspectives.id
          // payload['view_key'] = addSettings.selectedData.metaModelPerspectives.view_key
          // payload['parent_reference'] = addSettings.selectedData.parentReference
          // payload['container_meta_model_perspective_id'] = addSettings.selectedData.containerPerspectiveId
          // payload['container_view_key'] = addSettings.selectedData.containerPerspectiveViewKey
          // this.props.fetchNestedModelPrespectives && this.props.fetchNestedModelPrespectives(payload)
        }
        nextProps.resetResponse()
      }
      if (nextProps.deleteComponentResponse && nextProps.deleteComponentResponse !== '') {
        let addSettings = {...nextProps.addSettings}
        addSettings.deleteResponse = nextProps.deleteComponentResponse
        nextProps.setAddSettings(addSettings)
        let payload = {}
        // eslint-disable-next-line
        mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        if (addSettings.initiatedFrom === 'ParentNode') {
          payload['meta_model_perspective_id[0]'] = perspectiveId
          payload['view_key[0]'] = perspectiveViewKey
          this.props.fetchModelPrespectives && this.props.fetchModelPrespectives(payload)
        } else {
          let selectedObject = this.props.expandSettings.selectedObject[this.props.expandSettings.level] || null
          if (selectedObject) {
            if (selectedObject.expandFlag) {
              payload['meta_model_perspective_id'] = selectedObject.metaModelPerspectives.id
              payload['view_key'] = selectedObject.metaModelPerspectives.view_key
              payload['parent_reference'] = selectedObject.parentReference
              if (selectedObject.containerPerspectiveId) {
                payload['container_meta_model_perspective_id'] = selectedObject.containerPerspectiveId
                payload['container_view_key'] = selectedObject.containerPerspectiveViewKey
              }
              this.props.fetchNestedModelPrespectives && this.props.fetchNestedModelPrespectives(payload)
            }
          }
          // let selectedObject = this.props.expandSettings.selectedObject[addSettings.deleteOperationLevel] || null
          // payload['meta_model_perspective_id'] = selectedObject.rolePerspectives.Delete.part_perspective_id
          // payload['view_key'] = selectedObject.rolePerspectives.Delete.part_perspective_view_key
          // payload['parent_reference'] = selectedObject.rolePerspectives.parentReference
          // payload['container_meta_model_perspective_id'] = addSettings.selectedData.containerPerspectiveId
          // payload['container_view_key'] = addSettings.selectedData.containerPerspectiveViewKey
          // this.props.fetchNestedModelPrespectives && this.props.fetchNestedModelPrespectives(payload)
        }
        nextProps.resetResponse()
      }
      if (nextProps.connectionData !== '' && nextProps.connectionData.operation.toCallApi && !nextProps.connectionData.operation.isComplete) {
        let connectionData = {...nextProps.connectionData}
        let processIndex = nextProps.connectionData.operation.processIndex
        let totalLength = nextProps.connectionData.data.length
        if (processIndex < totalLength) {
          let processData = nextProps.connectionData.data[processIndex]
          nextProps.fetchDropdownData && nextProps.fetchDropdownData(processData.componentId)
          connectionData.operation.processIndex = processIndex + 1
          connectionData.operation.toCallApi = false
        }
        if (processIndex === totalLength) {
          connectionData.operation.isComplete = true
          if (!nextProps.addSettings.isNexusPoint) {
            // eslint-disable-next-line
            mApp && mApp.unblockPage()
          }
        }
        nextProps.setConnectionData(connectionData)
      }
      if (nextProps.allDropdownData !== '') {
        if (nextProps.allDropdownData.length > 0) {
          let services = []
          let kpi = []
          let timeGranularity = []
          let initialValues = []
          let metricSelectNames = []
          nextProps.allDropdownData.forEach(function (data, index) {
            if (data.parts) {
              data.parts.forEach(function (dataParts, partIndex) {
                if (partIndex === 0) {
                  if (dataParts.value.length > 0) {
                    let serviceData = dataParts.value[0].target_component
                    serviceData.subjectId = data.subject_id
                    // serviceData.subjectName = data.subject_name
                    services.push(serviceData)
                    if (index === 0) {
                      let obj = {}
                      obj.name = 'Services'
                      obj.placeHolder = dataParts.value[0].name
                      metricSelectNames.push(obj)
                      initialValues.push(null)
                    }
                  }
                }
                if (partIndex === 1) {
                  if (dataParts.value.length > 0) {
                    let kpiData = dataParts.value[0].target_component
                    kpiData.subjectId = data.subject_id
                    // kpiData.subjectName = data.subject_name
                    kpi.push(kpiData)
                    if (index === 0) {
                      let obj = {}
                      obj.name = 'KPI'
                      obj.placeHolder = dataParts.value[0].name
                      metricSelectNames.push(obj)
                      initialValues.push(null)
                    }
                  }
                }
                if (partIndex === 2) {
                  if (dataParts.value.length > 0) {
                    let timeGranularityData = dataParts.value[0].target_component
                    timeGranularityData.subjectId = data.subject_id
                    // timeGranularityData.subjectName = data.subject_name
                    timeGranularity.push(timeGranularityData)
                    if (index === 0) {
                      let obj = {}
                      obj.name = 'Time Granularity'
                      obj.placeHolder = dataParts.value[0].name
                      metricSelectNames.push(obj)
                      initialValues.push(null)
                    }
                  }
                }
              })
            }
          })
          let connectionData = {...nextProps.connectionData}
          let metricSelectOption = []
          metricSelectOption.push(services)
          metricSelectOption.push(kpi)
          metricSelectOption.push(timeGranularity)
          connectionData.metricSelectOption = metricSelectOption
          connectionData.backupMetricSelectOption = metricSelectOption
          connectionData.metricSelectedValue = initialValues
          connectionData.metricSelectNames = metricSelectNames
          connectionData.isMetric = true
          connectionData.operation.isComplete = true
          nextProps.setConnectionData(connectionData)
          // eslint-disable-next-line
          mApp && mApp.unblockPage()
        }
        this.props.resetResponse()
      }
      if (nextProps.dropdownData !== '') {
        if (nextProps.dropdownData.error_code === null) {
          let connectionData = {...nextProps.connectionData}
          connectionData.selectOption.push(nextProps.dropdownData.resources)
          connectionData.operation.toCallApi = true
          nextProps.setConnectionData(connectionData)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.dropdownData.error_message, nextProps.dropdownData.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.nestedModelPerspectives !== '' && nextProps.expandSettings.processAPIResponse) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.nestedModelPerspectives.length > 0) {
          let expandSettings = JSON.parse(JSON.stringify(nextProps.expandSettings))
          let level = expandSettings.level
          let modelPerspectives = []
          nextProps.nestedModelPerspectives.forEach(function (data, index) {
            if (data.parts) {
              modelPerspectives.push(data)
            }
          })
          expandSettings.modelPerspectives[level] = modelPerspectives
          expandSettings.processAPIResponse = false
          nextProps.setExpandSettings(expandSettings)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.nestedModelPerspectives.error_message, nextProps.nestedModelPerspectives.error_code)
        }
        nextProps.resetResponse()
      }
      if (nextProps.headerData.toProcess) {
        let headerData = JSON.parse(JSON.stringify(nextProps.headerData))
        let metaModelPerspective = JSON.parse(JSON.stringify(headerData.metaModelPerspective))
        let processedIndex = headerData.processedIndex
        let toProcess = false
        if (nextProps.headerData.metaModelPerspective.length > 0) {
          nextProps.headerData.metaModelPerspective.forEach(function (data, index) {
            if (!processedIndex.includes(index)) {
              if (data.parts.length > 0) {
                data.parts.forEach(function (partData, idx) {
                  if (partData.constraint_perspective !== null) {
                    // if (!partData.group_with_previous) {
                      metaModelPerspective.push(partData.constraint_perspective)
                      processedIndex.push(index)
                      toProcess = true
                    // }
                  }
                })
              }
            }
          })
        }
        headerData.metaModelPerspective = metaModelPerspective
        headerData.processedIndex = processedIndex
        headerData.toProcess = toProcess
        if (!toProcess) {
          let headerColumn = []
          if (metaModelPerspective.length > 0) {
            metaModelPerspective.forEach(function (data, index) {
              // if (data.view_key === nextProps.match.params.viewKey) {
                data.parts.forEach(function (partData, idx) {
                  if (partData.standard_property !== null && partData.type_property === null) { // Standard Property
                    if (partData.standard_property === 'name') {
                      headerColumn.push(partData.name)
                    }
                  } else if (partData.standard_property === null && partData.type_property === null && partData.constraint_perspective === null) { // Connection Property
                    headerColumn.push(partData.name)
                  }
                })
              // } else {
              //   headerColumn.push(data.name)
              // }
            })
          }
          headerData.headerColumn = headerColumn
        }
        this.props.setHeaderData(headerData)
      }
    }
  })
)(BalancedScorecard)
