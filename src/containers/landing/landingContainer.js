import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Landing from '../../components/landingComponent/landingComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    client_id: state.basicReducer.client_id,
    client_secret: state.basicReducer.client_secret,
    clientAccessToken: state.basicReducer.clientAccessToken,
    flipInX: state.basicReducer.flipInX
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchClientAccessToken: sagaActions.basicActions.fetchClientAccessToken,
  toggleFlipInX: actionCreators.toggleFlipInX
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
      console.log('landing will mount', this.props)
      let payload = {
        'client_id': this.props.client_id,
        'client_secret': this.props.client_secret
      }
      this.props.fetchClientAccessToken && this.props.fetchClientAccessToken(payload)
    },
    componentDidMount: function () {
      console.log('component did mount landing', this.props)
      // eslint-disable-next-line
      mApp && mApp.unblockPage()
    },
    componentWillReceiveProps (nextProps) {
      if (nextProps.clientAccessToken && nextProps.clientAccessToken !== '') {
        localStorage.setItem('clientAccessToken', nextProps.clientAccessToken.resources[0]['access_token'])
      }
    }
  })
)(Landing)
