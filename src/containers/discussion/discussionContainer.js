import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Discusson from '../../components/discussion/discussionComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/discussionReducer/discussionReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    discussionSlide: state.discussionReducer.discussionSlide,
    hideSlideAction: state.discussionReducer.hideSlideAction,
    discussions: state.discussionReducer.discussions,
    discussionMessages: state.discussionReducer.discussionMessages,
    discussionId: state.discussionReducer.discussionId,
    artefactAccounts: state.discussionReducer.artefactAccounts,
    artefactModels: state.discussionReducer.artefactModels,
    formattedAccounts: state.discussionReducer.formattedAccounts,
    formattedModels: state.discussionReducer.formattedModels,
    formattedTags: state.discussionReducer.formattedTags,
    newMessage: state.discussionReducer.newMessage,
    replySettings: state.discussionReducer.replySettings,
    createMessageResponse: state.discussionReducer.createMessageResponse,
    isAccordianOpen: state.discussionReducer.isAccordianOpen
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  setQuickslideDiscussion: actionCreators.setQuickslideDiscussion,
  setDiscussionId: actionCreators.setDiscussionId,
  fetchDiscussions: sagaActions.discussionActions.fetchDiscussions,
  fetchDiscussionMessages: sagaActions.discussionActions.fetchDiscussionMessages,
  fetchAccountArtefacts: sagaActions.discussionActions.fetchAccountArtefacts,
  fetchModelArtefacts: sagaActions.discussionActions.fetchModelArtefacts,
  replyDiscussionMessages: sagaActions.discussionActions.replyDiscussionMessages,
  setFormattedAccountData: actionCreators.setFormattedAccountData,
  setFormattedModelData: actionCreators.setFormattedModelData,
  setMessageData: actionCreators.setMessageData,
  setReplySettings: actionCreators.setReplySettings,
  setAccordianOpenFlag: actionCreators.setAccordianOpenFlag,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus
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
export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
      let payload = {
        'context_type_key': this.props.type,
        'context_id': this.props.match.params.id
      }
      let accountPayload = {
        'search': '',
        page_size: 1000,
        page: 1
      }
      let modelPayload = {
        'search': '',
        page_size: 100,
        page: 1
      }
      this.props.fetchDiscussions && this.props.fetchDiscussions(payload)
      this.props.fetchAccountArtefacts && this.props.fetchAccountArtefacts(accountPayload)
      this.props.fetchModelArtefacts && this.props.fetchModelArtefacts(modelPayload)
    },
    componentDidMount: function () {
        console.log('component did mount')
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.artefactAccounts && nextProps.artefactAccounts !== this.props.artefactAccounts) {
        if (nextProps.artefactAccounts.result_code === 0) {
          let accountsData = nextProps.artefactAccounts.resources.map(function (account, index) {
            let obj = {}
            obj.id = account.id
            obj.display = account.name.trim()
            return obj
          })
          accountsData.shift()
          this.props.setFormattedAccountData && this.props.setFormattedAccountData(accountsData)
        }
      }
      if (nextProps.artefactModels && nextProps.artefactModels !== this.props.artefactModels) {
        if (nextProps.artefactModels.result_code === 0) {
          let modelData = nextProps.artefactModels.resources.map(function (model, index) {
            let obj = {}
            obj.id = model.id
            obj.display = model.name.trim()
            return obj
          })
          this.props.setFormattedModelData && this.props.setFormattedModelData(modelData)
        }
      }
      if (nextProps.createMessageResponse && nextProps.createMessageResponse !== this.props.createMessageResponse) {
        if (nextProps.createMessageResponse.result_code === 0) {
          let payload = {
            id: this.props.discussionId
          }
          this.props.fetchDiscussionMessages && this.props.fetchDiscussionMessages(payload)
        }
      }
      if (nextProps.discussions && nextProps.discussions !== '' && nextProps.discussions !== this.props.discussions) {
        if (!nextProps.discussions.error_code) {
          let clickFrom = JSON.parse(localStorage.getItem('clickFrom'))
          if (clickFrom && clickFrom.component === 'Activity Feed') {
            this.props.setQuickslideDiscussion('m-quick-sidebar--on')
            let discussionId = clickFrom.discussionId
            if (discussionId) {
              let payload = {
                id: discussionId
              }
              this.props.setDiscussionId(discussionId)
              this.props.setAccordianOpenFlag(true)
              this.props.fetchDiscussionMessages && this.props.fetchDiscussionMessages(payload)
            } else {
              console.log('discussion id is null')
            }
            localStorage.removeItem('clickFrom')
          }
        }
      }
      if (nextProps.discussionMessages && nextProps.discussionMessages !== '' && nextProps.discussionMessages !== this.props.discussionMessages) {
        if (nextProps.discussionMessages.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.discussionMessages.error_message, nextProps.discussionMessages.error_source)
        }
      }
    }
  })
)(Discusson)
