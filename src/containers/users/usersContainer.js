import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Users from '../../components/users/usersComponent'
import { actions as sagaActions } from '../../redux/sagas/'

// Global State
export function mapStateToProps (state, props) {
  return {
    client_id: state.basicReducer.client_id,
    client_secret: state.basicReducer.client_secret,
    // authenticateUser: state.basicReducer.authenticateUser,
    // externalUsers: state.usersReducer.externalUsers,
    // users: state.usersReducer.users,
    // copyUsers: state.usersReducer.copyUsers,
    // selectedUser: state.usersReducer.selectedUser,
    // roles: state.usersReducer.roles,
    // userRoles: state.usersReducer.userRoles,
    // updatePayload: state.usersReducer.updatePayload,
    getUserResponse: state.usersReducer.getUserResponse,
    createUserResponse: state.usersReducer.createUserResponse,
    userActionSettings: state.usersReducer.userActionSettings
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUsers: sagaActions.userActions.fetchUsers,
  inviteUser: sagaActions.userActions.inviteUser,
  openInviteUser: sagaActions.userActions.openInviteUser,
  closeInviteUser: sagaActions.userActions.closeInviteUser,
  deleteUser: sagaActions.userActions.deleteUser,
  createUser: sagaActions.userActions.addUser
}

// eslint-disable-next-line
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-bottom-full-width',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '4000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut'
}

const UsersContainer = compose(
  connect(
    mapStateToProps,
    propsMapping
  ),

  lifecycle({
    shouldComponentUpdate: function (nextProps, nextState) {
      if (
        nextProps.userActionSettings.isInviteUserModalOpen !==
        this.props.userActionSettings.isInviteUserModalOpen
      ) {
        return true
      }
      if (nextProps.getUserResponse !== this.props.getUserResponse) {
        return true
      }
    },
    componentDidMount: function () {
      this.props.fetchUsers()
    }
  })
)(Users)

export default UsersContainer
