import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import PerspectivesListing from '../../components/perspectivesListing/perspectivesListingComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/perspectivesListingReducer/perspectivesListingReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
// import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    perspectivesActionSettings: state.perspectivesListingReducer.perspectivesActionSettings,
    perspectivesListing: state.perspectivesListingReducer.perspectivesListing,
    currentPage: state.perspectivesListingReducer.currentPage,
    perPage: state.perspectivesListingReducer.perPage,
    resetResponse: state.perspectivesListingReducer.resetResponse,
    componentTypes: state.perspectivesListingReducer.componentTypes
    // createRolesResponse: state.rolesReducer.createRolesResponse,
    // deleteRoleResponse: state.rolesReducer.deleteRoleResponse
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  setPerspectivesActionSettings: actionCreators.setPerspectivesActionSettings,
  fetchPerspectivesListing: sagaActions.perspectivesListingActions.fetchPerspectivesListing,
  fetchComponentTypes: sagaActions.perspectivesListingActions.fetchComponentTypes,
  setCurrentPage: actionCreators.setCurrentPage,
  setPerPage: actionCreators.setPerPage,
//   createRoles: sagaActions.rolesActions.createRoles,
//   deleteRole: sagaActions.rolesActions.deleteRole,
  setBreadcrumb: basicActionCreators.setBreadcrumb
//   resetResponse: actionCreators.resetResponse
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
      let breadcrumb = {
        title: 'Perspectives',
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
            name: 'Perspectives',
            href: '/roles',
            separator: false
          }
        ]
      }
      this.props.setBreadcrumb && this.props.setBreadcrumb(breadcrumb)
      let userAccessToken = localStorage.getItem('userAccessToken')
      if (!userAccessToken) {
        window.location.href = window.location.origin
      }
      console.log('my props', this.props)
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let payload = {
        'search': '',
        'page_size': this.props.perPage,
        'page': 1
      }
      console.log('paylod', payload)
      this.props.fetchPerspectivesListing && this.props.fetchPerspectivesListing(payload)
      this.props.fetchComponentTypes && this.props.fetchComponentTypes(payload)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
    //   let payload = {
    //     'search': '',
    //     'page_size': this.props.perPage,
    //     'page': 1
    //   }
    //   console.log('demo', nextProps)
      if (nextProps.perspectivesListing && nextProps.perspectivesListing !== this.props.perspectivesListing) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#entitlementList')
      }
    //   if (nextProps.createRolesResponse && nextProps.createRolesResponse !== '') {
    //     if (nextProps.createRolesResponse.error_code === null) {
    //       // eslint-disable-next-line
    //       toastr.success('We\'ve added the ' +  nextProps.createRolesResponse.resources[0].name  +  'role to your model' , 'Nice!')
    //       this.props.fetchRoles && this.props.fetchRoles(payload)
    //     } else {
    //       // eslint-disable-next-line
    //       toastr.error(nextProps.createRolesResponse.error_message, nextProps.createRolesResponse.error_code)
    //     }
    //     this.props.resetResponse()
    //   }
    //   if (nextProps.deleteRoleResponse && nextProps.deleteRoleResponse !== '') {
    //     // eslint-disable-next-line
    //     mApp && mApp.unblockPage()
    //     if (nextProps.deleteRoleResponse.error_code === null) {
    //       this.props.fetchRoles && this.props.fetchRoles(payload)
    //       // eslint-disable-next-line
    //       toastr.success('The Role is successfully deleted', 'Zapped')
    //       } else {
    //       // eslint-disable-next-line
    //       toastr.error(nextProps.deleteRoleResponse.error_message, nextProps.deleteRoleResponse.error_code)
    //     }
    //     this.props.resetResponse()
    //   }
      if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
        this.props.setCurrentPage(1)
        // eslint-disable-next-line
        mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        let payload = {
          'search': '',
          'page_size': nextProps.perPage,
          'page': 1
        }
        this.props.fetchPerspectivesListing && this.props.fetchPerspectivesListing(payload)
      }
    }
  })
)(PerspectivesListing)
