import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import DataModel from '../../components/dataModel/dataModelComponent'
import { actionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    starCount: state.basicReducer.count
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  increment: actionCreators.increment,
  decrement: actionCreators.decrement
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
    componentDidMount: function () {
      console.log('fetch data model', this.props)
    }
  })
)(DataModel)
