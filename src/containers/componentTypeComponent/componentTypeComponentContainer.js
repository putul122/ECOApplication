import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import componentTypeComponent from '../../components/componentTypeComponent/componentTypeComponentComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
import { actionCreators as componentTypeComponentActionCreators } from '../../redux/reducers/componentTypeComponentReducer/componentTypeComponentReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    componentTypeComponentData: state.componentTypeComponentReducer.componentTypeComponentData,
    componentTypeComponentProperties: state.componentTypeComponentReducer.componentTypeComponentProperties,
    copiedComponentProperties: state.componentTypeComponentReducer.copiedComponentProperties,
    copiedComponentData: state.componentTypeComponentReducer.copiedComponentData,
    componentPropertiesPayload: state.componentTypeComponentReducer.componentPropertiesPayload,
    // componentDetail: state.applicationDetailReducer.componentDetail,
    componentTypeComponentRelationships: state.componentTypeComponentReducer.componentTypeComponentRelationships,
    updateRelationshipResponse: state.componentTypeComponentReducer.updateRelationshipResponse,
    componentTypeComponents: state.componentTypeComponentReducer.componentTypeComponents,
    componentTypeComponentConstraints: state.componentTypeComponentReducer.componentTypeComponentConstraints,
    showTabs: state.componentTypeComponentReducer.showTabs,
    isEditComponent: state.componentTypeComponentReducer.isEditComponent,
    addNewConnectionSettings: state.componentTypeComponentReducer.addNewConnectionSettings,
    isDropDownOpen: state.basicReducer.isDropDownOpen,
    modalIsOpen: state.basicReducer.modalIsOpen,
    successmodalIsOpen: state.basicReducer.successmodalIsOpen,
    deletemodalIsOpen: state.basicReducer.deletemodalIsOpen,
    deleteComponent: state.componentTypeComponentReducer.deleteComponent,
    relationshipActionSettings: state.componentTypeComponentReducer.relationshipActionSettings,
    relationshipProperty: state.componentTypeComponentReducer.relationshipProperty,
    relationshipPropertyPayload: state.componentTypeComponentReducer.relationshipPropertyPayload,
    updateRelationshipPropertyResponse: state.componentTypeComponentReducer.updateRelationshipPropertyResponse,
    deleteRelationshipResponse: state.componentTypeComponentReducer.deleteRelationshipResponse,
    updateComponentPropertyResponse: state.componentTypeComponentReducer.updateComponentPropertyResponse,
    isDiscussionModalOpen: state.componentTypeComponentReducer.isDiscussionModalOpen
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  setBreadcrumb: basicActionCreators.setBreadcrumb,
  // fetchComponentById: sagaActions.applicationDetailActions.fetchComponentById,
  fetchComponentTypeComponent: sagaActions.componentTypeComponentActions.fetchComponentTypeComponent,
  fetchcomponentTypeComponentProperties: sagaActions.componentTypeComponentActions.fetchcomponentTypeComponentProperties,
  fetchcomponentTypeComponentRelationships: sagaActions.componentTypeComponentActions.fetchcomponentTypeComponentRelationships,
  updateComponentTypeComponentRelationships: sagaActions.componentTypeComponentActions.updateComponentTypeComponentRelationships,
  updateComponentTypeComponentProperties: sagaActions.componentTypeComponentActions.updateComponentTypeComponentProperties,
  updateComponentTypeComponent: sagaActions.componentTypeComponentActions.updateComponentTypeComponent,
  fetchComponentConstraints: sagaActions.componentTypeComponentActions.fetchComponentConstraints,
  fetchComponentTypeComponents: sagaActions.componentTypeComponentActions.fetchComponentTypeComponents,
  setModalOpenStatus: basicActionCreators.setModalOpenStatus,
  setCurrentTab: componentTypeComponentActionCreators.setCurrentTab,
  setEditComponentFlag: componentTypeComponentActionCreators.setEditComponentFlag,
  copyComponentProperties: componentTypeComponentActionCreators.copyComponentProperties,
  resetUpdateRelationshipResponse: componentTypeComponentActionCreators.resetUpdateRelationshipResponse,
  copyComponentData: componentTypeComponentActionCreators.copyComponentData,
  restoreComponentProperties: componentTypeComponentActionCreators.restoreComponentProperties,
  editComponentProperties: componentTypeComponentActionCreators.editComponentProperties,
  pushComponentPropertyPayload: componentTypeComponentActionCreators.pushComponentPropertyPayload,
  setRelationshipsValue: componentTypeComponentActionCreators.setRelationshipsValue,
  setAddConnectionSettings: componentTypeComponentActionCreators.setAddConnectionSettings,
  setDropdownFlag: basicActionCreators.setDropdownFlag,
  setConfirmationModalOpenStatus: basicActionCreators.setConfirmationModalOpenStatus,
  deletecomponentTypeComponent: sagaActions.componentTypeComponentActions.deletecomponentTypeComponent,
  setDeleteModalOpenStatus: basicActionCreators.setDeleteModalOpenStatus,
  setRedirectFlag: basicActionCreators.setRedirectFlag,
  setAddRedirectFlag: basicActionCreators.setAddRedirectFlag,
  setRelationshipActionSettings: componentTypeComponentActionCreators.setRelationshipActionSettings,
  resetComponentRelationshipProperties: componentTypeComponentActionCreators.resetComponentRelationshipProperties,
  editComponentRelationshipProperties: componentTypeComponentActionCreators.editComponentRelationshipProperties,
  editComponentRelationshipPropertyPayload: componentTypeComponentActionCreators.editComponentRelationshipPropertyPayload,
  resetResponse: componentTypeComponentActionCreators.resetResponse,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus,
  viewRelationshipProperty: sagaActions.componentTypeComponentActions.viewRelationshipProperty,
  updateRelationshipProperty: sagaActions.componentTypeComponentActions.updateRelationshipProperty,
  deleteComponentRelationship: sagaActions.componentTypeComponentActions.deleteComponentRelationship
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

export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
      let userAccessToken = localStorage.getItem('userAccessToken')
      if (!userAccessToken) {
        window.location.href = window.location.origin
      }
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      const componentTypeComponentId = this.props.match.params.id
      // const componentTypeId = this.props.match.params.componentTypeId
      let payload = {
        // 'componentTypeId': componentTypeId,
        'componentTypeComponentId': componentTypeComponentId,
        'id': componentTypeComponentId
      }
      // eslint-disable-next-line
      mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // this.props.fetchComponentById && this.props.fetchComponentById({id: componentTypeId}) // componentType by id
      this.props.fetchComponentTypeComponent && this.props.fetchComponentTypeComponent(payload)
      this.props.fetchcomponentTypeComponentProperties && this.props.fetchcomponentTypeComponentProperties(payload)
      this.props.fetchcomponentTypeComponentRelationships && this.props.fetchcomponentTypeComponentRelationships(payload)
      this.props.fetchComponentConstraints && this.props.fetchComponentConstraints(payload)
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('will receive props mmmmmmmmmmmmm', nextProps)
      const componentTypeComponentId = this.props.match.params.id
      let payload = {
        'componentTypeComponentId': componentTypeComponentId,
        'id': componentTypeComponentId
      }
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.updateComponentPropertyResponse && nextProps.updateComponentPropertyResponse !== '') {
        if (nextProps.updateComponentPropertyResponse.error_code === null) {
          let payload = {
            'componentTypeId': this.props.componentTypeComponentData.resources[0].component_type.id,
            'componentTypeComponentId': this.props.componentTypeComponentData.resources[0].id,
            'id': componentTypeComponentId
          }
          this.props.fetchComponentTypeComponent && this.props.fetchComponentTypeComponent(payload)
          // eslint-disable-next-line
          toastr.success('The ' + this.props.componentTypeComponentData.resources[0].name + ' was successfully updated', 'Good Stuff!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateComponentPropertyResponse.error_message, nextProps.updateComponentPropertyResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.componentTypeComponentData && nextProps.componentTypeComponentData !== this.props.componentTypeComponentData) {
        if (nextProps.componentTypeComponentData.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.componentTypeComponentData.error_message, nextProps.componentTypeComponentData.error_code)
          this.props.history.push('/component_types')
        }
      }
      if (nextProps.componentTypeComponents && nextProps.componentTypeComponents !== this.props.componentTypeComponents) {
        let settingPayload = {...this.props.addNewConnectionSettings, 'isWaitingForApiResponse': false}
        this.props.setAddConnectionSettings(settingPayload)
      }
      if (nextProps.deleteComponent && nextProps.deleteComponent !== '') {
        if (nextProps.deleteComponent.error_code === null) {
          // eslint-disable-next-line
          toastr.success('The ' + this.props.componentTypeComponentData.resources[0].name + ' ' + this.props.componentTypeComponentData.resources[0].component_type.name + ' was successfully deleted', 'Zapped!')
          // eslint-disable-next-line
          window.location.href = window.location.origin + '/component_types/' + this.props.componentTypeComponentData.resources[0].component_type.id
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.deleteComponent.error_message, nextProps.deleteComponent.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.updateRelationshipResponse && nextProps.updateRelationshipResponse !== '') {
        if (nextProps.updateRelationshipResponse.error_code === null) {
          let payload = {
            'componentTypeId': this.props.componentTypeComponentData.resources[0].component_type.id,
            'componentTypeComponentId': this.props.componentTypeComponentData.resources[0].id,
            'id': componentTypeComponentId
          }
          this.props.fetchcomponentTypeComponentRelationships && this.props.fetchcomponentTypeComponentRelationships(payload)
          // eslint-disable-next-line
          toastr.success('We\'ve added the new relationships to the ' + this.props.componentTypeComponentData.resources[0].name + '', 'Connecting the dots!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateRelationshipResponse.error_message, nextProps.updateRelationshipResponse.error_code)
        }
        this.props.resetUpdateRelationshipResponse()
      }
      if (nextProps.relationshipActionSettings && nextProps.relationshipActionSettings !== this.props.relationshipActionSettings) {
        if (nextProps.relationshipActionSettings.isModalOpen) {
          if (nextProps.relationshipActionSettings.actionType === 'view' || nextProps.relationshipActionSettings.actionType === 'edit') {
            // eslint-disable-next-line
            mApp && mApp.block('#relationshipPropertyContent', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
            let payload = {}
            payload.componentId = this.props.componentTypeComponentData.resources[0].id
            payload.relationshipType = nextProps.relationshipActionSettings.selectedObject.relationship_type
            payload.relationshipId = nextProps.relationshipActionSettings.relationshipId
            this.props.viewRelationshipProperty(payload)
          }
        }
      }
      if (nextProps.deleteRelationshipResponse && nextProps.deleteRelationshipResponse !== this.props.deleteRelationshipResponse) {
        if (nextProps.relationshipActionSettings.actionType === 'delete' && nextProps.deleteRelationshipResponse.result_code === 0) {
          this.props.fetchcomponentTypeComponentRelationships && this.props.fetchcomponentTypeComponentRelationships(payload)
        }
      }
      if (nextProps.deleteRelationshipResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.deleteRelationshipResponse.error_code === null) {
          if (nextProps.relationshipActionSettings.actionType === 'delete' && nextProps.deleteRelationshipResponse.result_code === 0) {
            let payload = {
              'componentTypeId': this.props.componentTypeComponentData.resources[0].component_type.id,
              'componentTypeComponentId': this.props.componentTypeComponentData.resources[0].id,
              'id': componentTypeComponentId
            }
            this.props.fetchcomponentTypeComponentRelationships && this.props.fetchcomponentTypeComponentRelationships(payload)
          }
          // eslint-disable-next-line
          toastr.success('Successfully deleted relationship ' + this.props.relationshipActionSettings.relationshipText + ': ' + this.props.relationshipActionSettings.componentName + '', 'Disconnected')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.deleteRelationshipResponse.error_message, nextProps.deleteRelationshipResponse.error_code)
        }
        this.props.resetUpdateRelationshipResponse()
        let settingPayload = {...this.props.relationshipActionSettings, 'isModalOpen': false}
        this.props.setRelationshipActionSettings(settingPayload)
      }
      if (nextProps.updateRelationshipPropertyResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        this.props.resetUpdateRelationshipResponse()
        if (nextProps.updateRelationshipPropertyResponse.error_code === null) {
          // eslint-disable-next-line
          toastr.success('Successfully updated relationship ' + this.props.relationshipActionSettings.relationshipText + ': ' + this.props.relationshipActionSettings.componentName, 'Updated!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateRelationshipPropertyResponse.error_message, nextProps.updateRelationshipPropertyResponse.error_code)
        }
        let settingPayload = {...this.props.relationshipActionSettings, 'isModalOpen': false}
        this.props.setRelationshipActionSettings(settingPayload)
      }
      if (nextProps.relationshipProperty && nextProps.relationshipProperty !== this.props.relationshipProperty) {
        if (nextProps.relationshipProperty !== '') {
          console.log('got relationship data')
          // eslint-disable-next-line
          mApp && mApp.unblock('#relationshipPropertyContent')
        }
      }
      if (nextProps.componentTypeComponentData && (nextProps.componentTypeComponentData !== '') && nextProps.componentTypeComponentData !== this.props.componentTypeComponentData) {
        // eslint-disable-next-line
        mApp.unblockPage()
        let breadcrumb = {
          title: '',
          items: [
            {
              name: 'Home',
              href: '/home',
              separator: false
            },
            {
              separator: true
            },
            {
              name: 'Component Type',
              href: '/component_types',
              separator: false
            },
            {
              separator: true
            },
            {
              name: nextProps.componentTypeComponentData.resources[0].component_type.name || '',
              href: '/component_types/' + nextProps.componentTypeComponentData.resources[0].component_type.id,
              separator: false
            },
            {
              separator: true
            },
            {
              name: nextProps.componentTypeComponentData.resources[0].name,
              href: '/components/' + nextProps.componentTypeComponentData.resources[0].id,
              separator: false
            }
          ]
        }
        this.props.setBreadcrumb && this.props.setBreadcrumb(breadcrumb)
      }
    }
  })
)(componentTypeComponent)
