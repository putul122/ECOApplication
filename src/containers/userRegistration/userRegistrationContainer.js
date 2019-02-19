// import { connect } from 'react-redux'
// import { compose, lifecycle } from 'recompose'
// import UserRegistration from '../../components/userRegistration/userRegistrationComponent'
// // import { actionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// // Global State
// export function mapStateToProps (state, props) {
//   return {
//     // breadcrumb: state.basicReducer.breadcrumb
//   }
// }
// // In Object form, each funciton is automatically wrapped in a dispatch
// export const propsMapping: Callbacks = {}

// // If you want to use the function mapping
// // export const propsMapping = (dispatch, ownProps) => {
// //   return {
// //     onClick: () => dispatch(actions.starsActions.FETCH_STARS)
// //   }
// // }

// export default compose(
//   connect(mapStateToProps, propsMapping),
//   lifecycle({
//     componentDidMount: function () {}
//   })
// )(UserRegistration)

import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import UserRegistration from '../../components/userRegistration/userRegistrationComponent'
import { actions as sagaActions } from '../../redux/sagas/'
// Global State
export function mapStateToProps (state, props) {
  return {
    isLoggedin: state.loginReducer.isLoggedin
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  registerUser: sagaActions.registerActions.registerUser
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
      console.log('component did mount lifecycle register model', this.props)
    },
    componentWillReceiveProps (nextProps) {
      if (nextProps.isLoggedin) {
        console.log('redirect after successfull login')
        localStorage.setItem('isLoggedin', nextProps.isLoggedin)
        this.props.history.push('/registering')
      }
    }
  })
)(UserRegistration)
