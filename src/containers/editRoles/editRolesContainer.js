import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import EditRoles from '../../components/editRoles/editRolesComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/editRolesReducer/editRolesReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    rolesData: state.editRolesReducer.rolesData,
    updateRoleValue: state.editRolesReducer.updateRoleValue,
    updateRoleResponse: state.editRolesReducer.updateRoleResponse
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
fetchRoleById: sagaActions.rolesActions.fetchRoleById,
setUpdateRoleValue: actionCreators.setUpdateRoleValue,
updateRole: sagaActions.rolesActions.updateRole
//   setCreateUserProcessStatus: signUpActionCreators.setCreateUserProcessStatus,
//   toggleFlipInX: basicActionCreators.toggleFlipInX
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
    componentDidMount: function () {
      let payload = {}
      payload.role_id = this.props.match.params.id
      this.props.fetchRoleById && this.props.fetchRoleById(payload)
    },
    componentWillReceiveProps (nextProps) {
      console.log('next props', nextProps)
      if (nextProps.isLoggedin) {
        localStorage.setItem('isLoggedin', nextProps.isLoggedin)
      }
      if (nextProps.rolesData && nextProps.rolesData !== '' && nextProps.rolesData.error_code === null && nextProps.rolesData !== this.props.rolesData) {
        let updateRoleValue = this.props.updateRoleValue
        updateRoleValue.name = nextProps.rolesData.resources[0].name || ''
        this.props.setUpdateRoleValue(updateRoleValue)
      }
      if (nextProps.updateRoleResponse && nextProps.updateRoleResponse !== this.props.updateRoleResponse) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.updateRoleResponse.error_code === null) {
          // eslint-disable-next-line
          toastr.success('The ' + this.props.rolesData.resources[0].name + ' was successfully updated', 'Good Stuff!')
          this.props.history.push('/roles')
        }
      }
    }
  })
)(EditRoles)
