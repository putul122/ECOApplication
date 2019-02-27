import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Perspectives from '../../components/perspectives/perspectivesComponent'
import { actions as sagaActions } from '../../redux/sagas'
import { actionCreators } from '../../redux/reducers/perspectivesReducer/perspectivesReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
import _ from 'lodash'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    modelPrespectives: state.perspectivesReducer.modelPrespectives,
    metaModelPerspective: state.perspectivesReducer.metaModelPerspective,
    currentPage: state.perspectivesReducer.currentPage,
    perPage: state.perspectivesReducer.perPage,
    crude: state.perspectivesReducer.crude,
    addSettings: state.perspectivesReducer.addSettings,
    availableAction: state.perspectivesReducer.availableAction,
    perPage: state.perspectivesReducer.perPage,
    createComponentResponse: state.perspectivesReducer.createComponentResponse,
    deleteComponentResponse: state.perspectivesReducer.deleteComponentResponse,
    connectionData: state.perspectivesReducer.connectionData
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  setModalOpenStatus: basicActionCreators.setModalOpenStatus,
  fetchModelPrespectives: sagaActions.modelActions.fetchModelPrespectives,
  fetchMetaModelPrespective: sagaActions.modelActions.fetchMetaModelPrespective,
  fetchCategory: sagaActions.serviceActions.fetchCategory,
  fetchOwner: sagaActions.serviceActions.fetchOwner,
  setCurrentPage: actionCreators.setCurrentPage,
  setAddSettings: actionCreators.setAddSettings,
  setPerPage: actionCreators.setPerPage,
  setAvailableAction: actionCreators.setAvailableAction,
  resetResponse: actionCreators.resetResponse,
  addComponentComponent: sagaActions.applicationDetailActions.addComponentComponent,
  deletecomponentTypeComponent: sagaActions.componentTypeComponentActions.deletecomponentTypeComponent,
  setConnectionData: actionCreators.setConnectionData
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
      mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let payload = {}
      payload['meta_model_perspective_id[0]'] = this.props.match.params.id
      payload['view_key[0]'] = this.props.match.params.viewKey
      this.props.fetchModelPrespectives && this.props.fetchModelPrespectives(payload)
      let metaModelPrespectivePayload = {}
      metaModelPrespectivePayload.id = this.props.match.params.id
      metaModelPrespectivePayload.viewKey = {viewKey: this.props.match.params.viewKey}
      this.props.fetchMetaModelPrespective && this.props.fetchMetaModelPrespective(metaModelPrespectivePayload)
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      let componentTypes = appPackage.resources[0].component_types
      let componentTypeIdForCategory = _.result(_.find(componentTypes, function (obj) {
        return obj.key === 'Service Category'
      }), 'component_type')
      let componentTypeIdForOwner = _.result(_.find(componentTypes, function (obj) {
        return obj.key === 'Department'
      }), 'component_type')
      this.props.fetchCategory && this.props.fetchCategory(componentTypeIdForCategory)
      this.props.fetchOwner && this.props.fetchOwner(componentTypeIdForOwner)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      // mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.modelPrespectives && nextProps.modelPrespectives !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
      }
      if (nextProps.metaModelPerspective && nextProps.metaModelPerspective !== '' && nextProps.availableAction.toProcess) {
        if (nextProps.metaModelPerspective.resources[0].crude) {
          let availableAction = {...nextProps.availableAction}
          let crude = nextProps.crude
          let mask = nextProps.metaModelPerspective.resources[0].crude
          let labelParts = nextProps.metaModelPerspective.resources[0].parts
          let connectionData = []
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
              obj.componentId = data.constraint.component_type.id
              connectionData.push(obj)
            }
          })
          nextProps.setConnectionData(connectionData)
          availableAction['toProcess'] = false
          nextProps.setAvailableAction(availableAction)
        }
      }
      if (nextProps.createComponentResponse && nextProps.createComponentResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.createComponentResponse.error_code === null) {
          let payload = {}
          payload['meta_model_perspective_id[0]'] = this.props.match.params.id
          payload['view_key[0]'] = this.props.match.params.viewKey
          this.props.fetchModelPrespectives && this.props.fetchModelPrespectives(payload)
          // eslint-disable-next-line
          toastr.success('Successfully added Component ' +  nextProps.addSettings.name , 'Nice!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.createComponentResponse.error_message, nextProps.createComponentResponse.error_code)
        }
        nextProps.resetResponse()
      }
      if (nextProps.deleteComponentResponse && nextProps.deleteComponentResponse !== '') {
        if (nextProps.deleteComponentResponse.error_code === null) {
          // eslint-disable-next-line
          toastr.success('The ' + this.props.deleteComponentResponse.resources[0].name + ' was successfully deleted', 'Zapped!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.deleteComponentResponse.error_message, nextProps.deleteComponentResponse.error_code)
        }
        this.props.resetResponse()
      }
    }
  })
)(Perspectives)
