import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ApplicationDetail from '../../components/applicationDetail/applicationDetailComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as applicationDetailActionCreators } from '../../redux/reducers/applicationDetailReducer/applicationDetailReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    componentDetail: state.applicationDetailReducer.componentDetail,
    componentConstraints: state.applicationDetailReducer.componentConstraints,
    componentComponents: state.applicationDetailReducer.componentComponents,
    currentPage: state.applicationDetailReducer.currentPage,
    perPage: state.applicationDetailReducer.perPage,
    addComponent: state.applicationDetailReducer.addComponent,
    modalIsOpen: state.basicReducer.modalIsOpen,
    successmodalIsOpen: state.basicReducer.successmodalIsOpen
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchComponentById: sagaActions.applicationDetailActions.fetchComponentById,
  fetchComponentConstraint: sagaActions.applicationDetailActions.fetchComponentConstraint,
  fetchComponentComponent: sagaActions.applicationDetailActions.fetchComponentComponent,
  searchComponentComponent: sagaActions.applicationDetailActions.searchComponentComponent,
  selectedComponentType: applicationDetailActionCreators.selectedComponentType,
  setCurrentPage: applicationDetailActionCreators.setCurrentPage,
  setPerPage: applicationDetailActionCreators.setPerPage,
  addComponentComponent: sagaActions.applicationDetailActions.addComponentComponent,
  resetAddComponentResponse: applicationDetailActionCreators.resetAddComponentResponse,
  setAddRedirectFlag: basicActionCreators.setAddRedirectFlag,
  setRedirectFlag: basicActionCreators.setRedirectFlag,
  setBreadcrumb: basicActionCreators.setBreadcrumb,
  setModalOpenStatus: basicActionCreators.setModalOpenStatus,
  setConfirmationModalOpenStatus: basicActionCreators.setConfirmationModalOpenStatus,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus
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
      const componentTypeId = this.props.match.params.id
      this.props.selectedComponentType(componentTypeId)
      let payload = {
        'id': componentTypeId,
        'ComponentTypeComponent': {
          'search': '',
          'page_size': this.props.perPage,
          'page': 1,
          'recommended': true
        }
      }
      // eslint-disable-next-line
      mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      this.props.fetchComponentById && this.props.fetchComponentById(payload)
      this.props.fetchComponentById && this.props.fetchComponentConstraint(payload)
      this.props.fetchComponentComponent && this.props.fetchComponentComponent(payload)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      $('[data-toggle="tooltip"]').tooltip()
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('comp will receive props mountct', this.props)
      console.log('comp will receive props mountct', nextProps)
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.componentComponents && nextProps.componentComponents !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblock('#style-1')
      }
      if (nextProps.addComponent !== '') {
      if (nextProps.addComponent && nextProps.addComponent !== '') {
        if (nextProps.addComponent.error_code === null) {
          let newComponent = nextProps.addComponent.resources[0].name
          let componentId = nextProps.addComponent.resources[0].id
          // eslint-disable-next-line
          toastr.success('We\'ve added the ' +  newComponent  +  ' to your model' , 'Nice!')
          nextProps.history.push('/components/' + componentId)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.addComponent.error_message, nextProps.addComponent.error_code)
        }
        nextProps.resetAddComponentResponse()
      }
    }
    if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
      this.props.setCurrentPage(1)
      const componentTypeId = this.props.match.params.id
      // eslint-disable-next-line
      mApp.block('#style-1', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let payload = {
        'id': componentTypeId,
        'ComponentTypeComponent': {
          'search': '',
          'page_size': nextProps.perPage,
          'page': 1,
          'recommended': true
        }
      }
      this.props.fetchComponentComponent && this.props.fetchComponentComponent(payload)
    }
      if (nextProps.componentDetail && (nextProps.componentDetail !== this.props.componentDetail)) {
        // eslint-disable-next-line
        mApp.unblockPage()
        if (nextProps.componentDetail.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.componentDetail.error_message, nextProps.componentDetail.error_code)
          this.props.history.push('/component_types')
        } else {
          let breadcrumb = {
            title: nextProps.componentDetail.resources[0].name,
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
                name: nextProps.componentDetail.resources[0].name,
                href: '/component_types/' + nextProps.componentDetail.resources[0].id,
                separator: false
              }
            ]
          }
          this.props.setBreadcrumb && this.props.setBreadcrumb(breadcrumb)
        }
      }
    }
  })
)(ApplicationDetail)
