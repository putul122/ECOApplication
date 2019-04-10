import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ServiceDashboard from '../../components/serviceDashboard/serviceDashboardComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import _ from 'lodash'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    dashboardPerspectives: state.serviceDashboardReducer.dashboardPerspectives
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchModelPrespectives: sagaActions.modelActions.fetchModelPrespectives
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
      // eslint-disable-next-line
      mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let dashboardKey = this.props.match.params.dashboardKey
      let packages = JSON.parse(localStorage.getItem('packages'))
      let perspectives = _.result(_.find(packages.resources, function (obj) {
        return obj.key === dashboardKey
      }), 'perspectives')
      let count = 0
      let payload = {}
      perspectives.forEach(function (data, index) {
        if (data.role_key === 'Dashboard_Count') {
          payload['meta_model_perspective_id[' + count + ']'] = data.perspective
          payload['view_key[' + count + ']'] = data.view_key
          count++
        }
      })
      payload['count'] = true
      console.log('payload', payload)
      this.props.fetchModelPrespectives && this.props.fetchModelPrespectives(payload)
    },
    componentDidMount: function () {},
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.dashboardPerspectives && nextProps.dashboardPerspectives !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
      }
    }
  })
)(ServiceDashboard)
