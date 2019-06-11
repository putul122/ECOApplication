import {connect} from 'react-redux'
// For Lifecycle composing
// import {compose, lifecycle} from 'recompose'
import kpiPerformanceView from '../../components/kpiPerformanceView/kpiPerformanceViewComponent'
import {actions as sagaActions} from '../../redux/sagas/'
import {actionCreators} from '../../redux/reducers/kpiPerformanceView/kpiPerformanceViewReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    showTabs: state.kpiPerformanceViewReducer.showTabs
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  setCurrentTab: actionCreators.setCurrentTab
}

// If you want to use the function mapping
// export const propsMapping = (dispatch, ownProps) => {
//   return {
//     onClick: () => dispatch(actions.starsActions.FETCH_STARS)
//   }
// }

export default connect(mapStateToProps, propsMapping)(kpiPerformanceView)

// export default compose(
//   connect(mapStateToProps, propsMapping),
//   lifecycle({
//     componentDidMount: function() {
//       if (this.props.fetchBasic) {
//         this.props.fetchBasic()
//       }
//     }
//   })
// )(KpiPerformanceView)
