import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Home from '../../components/home/homeComponent'
import _ from 'lodash'
import { actions as sagaActions } from '../../redux/sagas/'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    packages: state.basicReducer.packages
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchAllPackages: sagaActions.basicActions.fetchAllPackages
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
      console.log('wiil mount', this.props)
      this.props.fetchAllPackages && this.props.fetchAllPackages()
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
    },
    componentDidMount: function () {},
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.packages && nextProps.packages !== this.props.packages) {
        if (nextProps.packages.error_code === null) {
          localStorage.setItem('packages', JSON.stringify(nextProps.packages))
          let packages = nextProps.packages.resources
          if (packages.length > 0) {
            let defaultPackage = _.find(packages, function (obj) {
              return obj.key === 'ECO_DEFAULT'
            })
            let defaultSelectedPackage = null
            if (defaultPackage) {
              defaultSelectedPackage = defaultPackage
            } else {
              defaultSelectedPackage = packages[0]
            }
            localStorage.setItem('selectedPackage', JSON.stringify(defaultSelectedPackage))
          }
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.packages.error_message, nextProps.packages.error_code)
        }
      }
    }
  })
)(Home)
