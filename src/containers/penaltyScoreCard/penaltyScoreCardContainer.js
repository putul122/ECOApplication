import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import PenaltyScoreCard from '../../components/penaltyScoreCard/penaltyScoreCardComponent'
import { actions as sagaActions } from '../../redux/sagas/'
// import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    penaltyScoreCardData: state.penaltyScoreCardReducer.penaltyScoreCardData
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  getPenaltyScoreCardData: sagaActions.scoreCardActions.getPenaltyScoreCardData
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

const PenaltyScoreCardContainer = compose(
  connect(
    mapStateToProps,
    propsMapping
  ),

  lifecycle({
    // shouldComponentUpdate: function (nextProps, nextState) {
    //   if (
    //     nextProps.userActionSettings.isInviteUserModalOpen !==
    //     this.props.userActionSettings.isInviteUserModalOpen
    //   ) {
    //     return true
    //   }
    //   if (nextProps.getUserResponse !== this.props.getUserResponse) {
    //     return true
    //   }
    // },
    componentDidMount: function () {},
    componentWillReceiveProps: function (nextProps) {
      let breadcrumb = {
        title: 'Users',
        items: [
          {
            name: 'Home',
            href: '/home',
            separator: false
          },
          {
            separator: true
          },
          {
            name: 'Sladashboard',
            href: '/sla-dashboard',
            separator: false
          }
        ]
      }
      this.props.setBreadcrumb && this.props.setBreadcrumb(breadcrumb)
    }
  })
)(PenaltyScoreCard)

export default PenaltyScoreCardContainer
