import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Breadcrumb from '../../components/breadcrumb/breadcrumbComponent'
// import { actionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    breadcrumb: state.basicReducer.breadcrumb
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {}

// If you want to use the function mapping
// export const propsMapping = (dispatch, ownProps) => {
//   return {
//     onClick: () => dispatch(actions.starsActions.FETCH_STARS)
//   }
// }

export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentDidMount: function () {}
  })
)(Breadcrumb)
