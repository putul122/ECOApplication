import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import HeaderComponent from '../../components/header/headerComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    isLoggedin: state.loginReducer.isLoggedin,
    modalIsOpen: state.basicReducer.modalIsOpen,
    isQuickSlideOpen: state.basicReducer.isQuickSlideOpen,
    isLoginSlideOpen: state.basicReducer.isLoginSlideOpen,
    notificationFlag: state.basicReducer.notificationFlag,
    selectedPackageName: state.basicReducer.selectedPackageName,
    packages: state.basicReducer.packages,
    updateNotificationViewStatusResponse: state.basicReducer.updateNotificationViewStatusResponse
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
    setModalOpenStatus: actionCreators.setModalOpenStatus,
    setQuickslideFlag: actionCreators.setQuickslideFlag,
    setLoginslideFlag: actionCreators.setLoginslideFlag,
    setNotificationFlag: actionCreators.setNotificationFlag,
    resetNotificationResponse: actionCreators.resetNotificationResponse,
    setSelectedPackageName: actionCreators.setSelectedPackageName,
    setAllPackage: actionCreators.setAllPackage,
    updateNotificationViewStatus: sagaActions.basicActions.updateNotificationViewStatus
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
      let selectedPackage = JSON.parse(localStorage.getItem('selectedPackage'))
      let allPackage = JSON.parse(localStorage.getItem('packages'))
      if (selectedPackage) {
        this.props.setSelectedPackageName(selectedPackage.name || '')
      }
      if (allPackage) {
        this.props.setAllPackage(allPackage)
      }
    },
    componentWillReceiveProps (nextProps) {
      if (nextProps.isQuickSlideOpen && nextProps.isQuickSlideOpen !== this.props.isQuickSlideOpen) {
        if (nextProps.isQuickSlideOpen) {
          if (this.props.notificationFlag) {
            console.log('call me')
            console.log(this.props)
          }
        }
      }
      if (nextProps.updateNotificationViewStatusResponse && nextProps.updateNotificationViewStatusResponse !== '' && nextProps.updateNotificationViewStatusResponse !== this.props.updateNotificationViewStatusResponse) {
        if (nextProps.updateNotificationViewStatusResponse.result_code === 0) {
          console.log('call me')
          console.log(nextProps)
          // this.props.resetNotificationResponse()
          this.props.setNotificationFlag && this.props.setNotificationFlag(false)
        }
      }
    }
  })
)(HeaderComponent)
