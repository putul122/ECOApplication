import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ForgotPassword from '../../components/forgotPassword/forgotPasswordComponent'
import { actions as sagaActions } from '../../redux/sagas/'

// Global State
export function mapStateToProps (state, props) {
  return {
    client_id: state.basicReducer.client_id,
    client_secret: state.basicReducer.client_secret,
    forgotpasswordresponse: state.changePasswordReducer.forgotpasswordresponse
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  changePassword: sagaActions.userActions.changePassword
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
    componentDidMount: function () {},
    componentWillReceiveProps (nextProps) {
      console.log('next props for receiving the token', nextProps)
      if (nextProps.forgotpasswordresponse) {
        if (!nextProps.forgotpasswordresponse.error_code) {
          // eslint-disable-next-line
          toastr.success('Email sent successfully please check.')
          this.props.history.push('/')
        }
      }
    }
  })
)(ForgotPassword)
