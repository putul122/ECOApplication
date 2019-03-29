import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import PerspectiveHierarchy from '../../components/perspectiveHierarchy/perspectiveHierarchyComponent'
import { actions as sagaActions } from '../../redux/sagas'
import { actionCreators } from '../../redux/reducers/perspectiveHierarchy/perspectiveHierarchyReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
console.log('sagaActions', sagaActions)
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    modelPrespectives: state.perspectiveHierarchyReducer.modelPrespectives,
    metaModelPerspective: state.perspectiveHierarchyReducer.metaModelPerspective,
    currentPage: state.perspectiveHierarchyReducer.currentPage,
    perPage: state.perspectiveHierarchyReducer.perPage,
    crude: state.perspectiveHierarchyReducer.crude,
    addSettings: state.perspectiveHierarchyReducer.addSettings,
    availableAction: state.perspectiveHierarchyReducer.availableAction,
    createComponentResponse: state.perspectiveHierarchyReducer.createComponentResponse,
    deleteComponentResponse: state.perspectiveHierarchyReducer.deleteComponentResponse,
    connectionData: state.perspectiveHierarchyReducer.connectionData,
    updateComponentResponse: state.perspectiveHierarchyReducer.updateComponentResponse,
    dropdownData: state.perspectiveHierarchyReducer.dropdownData,
    expandSettings: state.perspectiveHierarchyReducer.expandSettings,
    nestedModelPerspectives: state.perspectiveHierarchyReducer.nestedModelPerspectives,
    headerData: state.perspectiveHierarchyReducer.headerData
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  setModalOpenStatus: basicActionCreators.setModalOpenStatus,
  fetchModelPrespectives: sagaActions.modelActions.fetchModelPrespectives,
  fetchMetaModelPrespective: sagaActions.modelActions.fetchMetaModelPrespective,
  fetchDropdownData: sagaActions.serviceActions.fetchDropdownData,
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
// eslint-disable-next-line
export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
      // eslint-disable-next-line
      // mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let payload = {}
      payload['meta_model_perspective_id[0]'] = this.props.match.params.id
      payload['view_key[0]'] = this.props.match.params.viewKey
      this.props.fetchModelPrespectives && this.props.fetchModelPrespectives(payload)
      let metaModelPrespectivePayload = {}
      metaModelPrespectivePayload.id = this.props.match.params.id
      metaModelPrespectivePayload.viewKey = {'view_key': this.props.match.params.viewKey}
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
      if (nextProps.modelPrespectives && nextProps.modelPrespectives !== '') {
        // eslint-disable-next-line
        // mApp && mApp.unblockPage()
      }
      if (nextProps.metaModelPerspective && nextProps.metaModelPerspective !== '' && nextProps.availableAction.toProcess) {
        if (nextProps.metaModelPerspective.resources[0].crude) {
          let availableAction = {...nextProps.availableAction}
          let crude = nextProps.crude
          let mask = nextProps.metaModelPerspective.resources[0].crude
          let labelParts = nextProps.metaModelPerspective.resources[0].parts
          let connectionData = {}
          connectionData.operation = {
            toCallApi: true,
            isComplete: false,
            processIndex: 0
          }
          connectionData.selectedValues = []
          let cData = []
          let customerProperty = []
          for (let option in crude) {
            if (crude.hasOwnProperty(option)) {
              if (mask & crude[option]) {
                availableAction[option] = true
              }
            }
          }
          labelParts.forEach(function (data, index) {
            if (data.standard_property === null && data.type_property === null) {
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
            if (data.standard_property === null && data.type_property !== null) {
              data.partIndex = index
              customerProperty.push(data)
            }
          })
          connectionData.data = cData
          connectionData.customerProperty = customerProperty
          connectionData.selectOption = []
          nextProps.setConnectionData(connectionData)
          availableAction['toProcess'] = false
          nextProps.setAvailableAction(availableAction)
          let headerData = {...this.props.headerData}
          let metaData = []
          metaData.push(nextProps.metaModelPerspective.resources[0])
          headerData.metaModelPerspective = metaData
          headerData.toProcess = true
          this.props.setHeaderData(headerData)
        }
      }
      if (nextProps.createComponentResponse && nextProps.createComponentResponse !== '') {
        let addSettings = {...nextProps.addSettings}
        addSettings.name = ''
        addSettings.description = ''
        addSettings.createResponse = nextProps.createComponentResponse
        nextProps.setAddSettings(addSettings)
        let payload = {}
        payload['meta_model_perspective_id[0]'] = this.props.match.params.id
        payload['view_key[0]'] = this.props.match.params.viewKey
        this.props.fetchModelPrespectives && this.props.fetchModelPrespectives(payload)
        nextProps.resetResponse()
      }
      if (nextProps.updateComponentResponse && nextProps.updateComponentResponse !== '') {
        let addSettings = {...nextProps.addSettings}
        addSettings.name = ''
        addSettings.description = ''
        addSettings.updateResponse = nextProps.updateComponentResponse
        nextProps.setAddSettings(addSettings)
        let payload = {}
        payload['meta_model_perspective_id[0]'] = this.props.match.params.id
        payload['view_key[0]'] = this.props.match.params.viewKey
        this.props.fetchModelPrespectives && this.props.fetchModelPrespectives(payload)
        nextProps.resetResponse()
      }
      if (nextProps.deleteComponentResponse && nextProps.deleteComponentResponse !== '') {
        if (nextProps.deleteComponentResponse.error_code === null) {
          // eslint-disable-next-line
          toastr.success('The ' + nextProps.deleteComponentResponse.resources[0].name + ' was successfully deleted', 'Zapped!')
          let payload = {}
          payload['meta_model_perspective_id[0]'] = this.props.match.params.id
          payload['view_key[0]'] = this.props.match.params.viewKey
          this.props.fetchModelPrespectives && this.props.fetchModelPrespectives(payload)
          // eslint-disable-next-line
          mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.deleteComponentResponse.error_message, nextProps.deleteComponentResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.connectionData !== '' && nextProps.connectionData.operation.toCallApi && !nextProps.connectionData.operation.isComplete) {
        console.log('nextProps.connectionData', nextProps.connectionData)
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
        }
        nextProps.setConnectionData(connectionData)
      }
      if (nextProps.dropdownData !== '') {
        console.log('nextProps.dropdownData', nextProps.dropdownData)
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
        console.log('nextProps.nestedModelPerspectives', nextProps.nestedModelPerspectives)
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
        console.log('to prosess header data', nextProps.headerData)
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
                    metaModelPerspective.push(partData.constraint_perspective)
                    processedIndex.push(index)
                    toProcess = true
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
              data.parts.forEach(function (partData, idx) {
                if (partData.standard_property !== null && partData.type_property === null) { // Standard Property
                  if (partData.standard_property === 'name') {
                    headerColumn.push(partData.name)
                  }
                } else if (partData.standard_property === null && partData.type_property === null && partData.constraint_perspective === null) { // Connection Property
                  headerColumn.push(partData.name)
                }
              })
            })
          }
          headerData.headerColumn = headerColumn
        }
        this.props.setHeaderData(headerData)
      }
    }
  })
)(PerspectiveHierarchy)
