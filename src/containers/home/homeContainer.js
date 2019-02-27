import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Home from '../../components/home/homeComponent'
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
  fetchPackage: sagaActions.basicActions.fetchPackage
}

// If you want to use the function mapping
// export const propsMapping = (dispatch, ownProps) => {
//   return {
//     onClick: () => dispatch(actions.starsActions.FETCH_STARS)
//   }
// }

export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
      console.log('wiil mount', this.props)
      this.props.fetchPackage && this.props.fetchPackage()
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
        localStorage.setItem('packages', JSON.stringify(nextProps.packages))
      }
    }
  })
)(Home)
