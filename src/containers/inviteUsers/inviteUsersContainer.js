import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import InviteUsers from '../../components/inviteUsers/inviteUsersComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as loginActionCreators } from '../../redux/reducers/loginReducer/loginReducerReducer'

// Global State
export function mapStateToProps (state, props) {
    return {
        client_id: state.basicReducer.client_id,
        client_secret: state.basicReducer.client_secret,
        client_access_token: state.basicReducer.clientAccessToken.resources,
        loggedInresponse: state.loginReducer.loggedInresponse
    }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
    createUser: sagaActions.userActions.addUser,
    fetchClientAccessToken: sagaActions.basicActions.fetchClientAccessToken,
    loginUser: sagaActions.loginActions.loginUser,
    setLoginProcessStatus: loginActionCreators.setLoginProcessStatus,
    resetResponse: loginActionCreators.resetResponse
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

const InviteUsersContainer = compose(
    connect(
        mapStateToProps,
        propsMapping
    ), lifecycle({
        componentWillReceiveProps (nextProps) {
            // if (nextProps.isLoggedin) {
            //   localStorage.setItem('isLoggedin', nextProps.isLoggedin)
            //   this.props.history.push('/registering')
            // }
            if (nextProps.loggedInresponse) {
              console.log('login response', nextProps.loggedInresponse.error_code)
              if (nextProps.loggedInresponse.error_code === null) {
                nextProps.resetResponse()
                localStorage.setItem('userAccessToken', nextProps.loggedInresponse.resources[0]['access_token'])
                localStorage.setItem('isLoggedin', true)
                // eslint-disable-next-line
                toastr.success('you logged in successfully.')
                // window.location.href = window.location.origin + '/home'
                this.props.history.push('/home')
              } else {
              }

              if (nextProps.loggedInresponse !== this.props.loggedInresponse) {
                console.log('my props', nextProps)
                this.props.setLoginProcessStatus(false)
              }
            }
        },
        componentDidMount: function () {
            const payload = {
                client_secret: this.props.client_secret,
                client_id: this.props.client_id
              }

              this.props.fetchClientAccessToken && this.props.fetchClientAccessToken(payload)
        }
    })
)(InviteUsers)

export default InviteUsersContainer
