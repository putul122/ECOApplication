import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ViewService from '../../components/viewService/viewServiceComponent'
// import { actions as sagaActions } from '../../redux/sagas/'
// import { actionCreators } from '../../redux/reducers/rolesReducer/rolesReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
// import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
      modalIsOpen: state.basicReducer.modalIsOpen
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  setModalOpenStatus: basicActionCreators.setModalOpenStatus
//   fetchPackage: sagaActions.basicActions.fetchPackage
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
    // componentWillMount: function () {
      // let breadcrumb = {
      //   title: 'Roles',
      //   items: [
      //     {
      //       name: 'Home',
      //       href: '/home',
      //       separator: false
      //     },
      //     {
      //       separator: true
      //     },
      //     {
      //       name: 'Roles',
      //       href: '/roles',
      //       separator: false
      //     }
      //   ]
      // }
      // this.props.setBreadcrumb && this.props.setBreadcrumb(breadcrumb)
      // let userAccessToken = localStorage.getItem('userAccessToken')
      // if (!userAccessToken) {
      //   window.location.href = window.location.origin
      // }
      // console.log('my props', this.props)
      // this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      // let payload = {
      //   'search': '',
      //   'page_size': this.props.perPage,
      //   'page': 1
      // }
      // console.log('paylod', payload)
      // this.props.fetchRoles && this.props.fetchRoles(payload)
    // },
    componentWillMount: function () {
      // eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      // this.props.fetchReviewsSummary && this.props.fetchReviewsSummary()
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      // mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function () {
    //   if (nextProps.packages && nextProps.packages !== this.props.packages) {
    //     localStorage.setItem('packages', JSON.stringify(nextProps.packages))
    //   }
      // let payload = {
      //   'search': '',
      //   'page_size': this.props.perPage,
      //   'page': 1
      // }
      // console.log('demo', nextProps)
      // if (nextProps.roles && nextProps.roles !== this.props.roles) {
      //   // eslint-disable-next-line
      //   mApp && mApp.unblock('#entitlementList')
      // }
      // if (nextProps.createRolesResponse && nextProps.createRolesResponse !== '') {
      //   if (nextProps.createRolesResponse.error_code === null) {
      //     // eslint-disable-next-line
      //     toastr.success('We\'ve added the ' +  nextProps.createRolesResponse.resources[0].name  +  'role to your model' , 'Nice!')
      //     // eslint-disable-next-line
      //     location.reload()
      //   } else {
      //     // eslint-disable-next-line
      //     toastr.error(nextProps.createRolesResponse.error_message, nextProps.createRolesResponse.error_code)
      //   }
      //   this.props.resetResponse()
      // }
      // if (nextProps.deleteRoleResponse && nextProps.deleteRoleResponse !== '') {
      //   // eslint-disable-next-line
      //   mApp && mApp.unblockPage()
      //   if (nextProps.deleteRoleResponse.error_code === null) {
      //     this.props.fetchRoles && this.props.fetchRoles(payload)
      //     // eslint-disable-next-line
      //     toastr.success('The Role is successfully deleted', 'Zapped')
      //     } else {
      //     // eslint-disable-next-line
      //     toastr.error(nextProps.deleteRoleResponse.error_message, nextProps.deleteRoleResponse.error_code)
      //   }
      //   this.props.resetResponse()
      // }
      // if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
      //   this.props.setCurrentPage(1)
      //   // eslint-disable-next-line
      //   mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      //   let payload = {
      //     'search': '',
      //     'page_size': nextProps.perPage,
      //     'page': 1
      //   }
      //   this.props.fetchRoles && this.props.fetchRoles(payload)
      // }
    }
  })
)(ViewService)
