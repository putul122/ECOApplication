import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Packages from '../../components/packages/packagesComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/packagesReducer/packagesReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
// import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    packagesActionSettings: state.packagesListingReducer.packagesActionSettings,
    packagesListing: state.packagesListingReducer.packagesListing,
    currentPage: state.packagesListingReducer.currentPage,
    perPage: state.packagesListingReducer.perPage,
    resetResponse: state.packagesListingReducer.resetResponse,
    package: state.packagesListingReducer.package,
    deletePackageResponse: state.packagesListingReducer.deletePackageResponse,
    crude: state.packagesListingReducer.crude,
    isCrudSelected: state.packagesListingReducer.isCrudSelected
    // crudeSettings: state.perspectivesListingReducer.crudeSettings
    // createRolesResponse: state.rolesReducer.createRolesResponse,
    // deleteRoleResponse: state.rolesReducer.deleteRoleResponse
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  setPackagesActionSettings: actionCreators.setPackagesActionSettings,
  fetchPackagesListing: sagaActions.packagesListingActions.fetchPackagesListing,
  createPackage: sagaActions.packagesListingActions.createPackage,
  deletePackage: sagaActions.packagesListingActions.deletePackage,
  setCurrentPage: actionCreators.setCurrentPage,
  setPerPage: actionCreators.setPerPage,
  setTypesFlag: actionCreators.setTypesFlag,
  setCrudeValuesflag: actionCreators.setCrudeValuesflag,
  setBreadcrumb: basicActionCreators.setBreadcrumb,
  resetResponse: actionCreators.resetResponse
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
        title: 'Packages',
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
            name: 'Packages',
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
      this.props.fetchPackagesListing && this.props.fetchPackagesListing(payload)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      let payload = {
        'search': '',
        'page_size': this.props.perPage,
        'page': 1
      }
      console.log('demo', nextProps)
      if (nextProps.packagesListing && nextProps.packagesListing !== this.props.packagesListing) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#entitlementList')
      }
      if (nextProps.package && nextProps.package !== '') {
        if (nextProps.package.error_code === null) {
          // eslint-disable-next-line
          toastr.success('We\'ve added the ' +  nextProps.package.resources[0].name  +  ' to your model' , 'Nice!')
          this.props.fetchPackagesListing && this.props.fetchPackagesListing(payload)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.package.error_message, nextProps.package.error_code)
        }
        this.props.resetResponse()
      }
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
)(Packages)
