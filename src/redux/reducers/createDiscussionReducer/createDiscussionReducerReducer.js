import { createAction, handleActions } from 'redux-actions'
import {
    CREATE_COMPONENT_DISCUSSION_SUCCESS,
    FETCH_ACCOUNT_ARTEFACTS_SUCCESS,
    FETCH_MODEL_ARTEFACTS_SUCCESS
} from '../../sagas/createDiscussion/createDiscussionSaga'

// Name Spaced Action Types
const SET_DISCUSSION_MODAL_OPEN_STATUS = 'CreateDiscussionReducer/SET_DISCUSSION_MODAL_OPEN_STATUS'
const SET_FORMATTED_ACCOUNT_DATA = 'CreateDiscussionReducer/SET_FORMATTED_ACCOUNT_DATA'
const SET_FORMATTED_MODEL_DATA = 'CreateDiscussionReducer/SET_FORMATTED_MODEL_DATA'
const SET_MESSAGE_DATA = 'CreateDiscussionReducer/SET_MESSAGE_DATA'
const SET_REPLY_SETTINGS = 'CreateDiscussionReducer/SET_REPLY_SETTINGS'
const RESET_CREATE_DISCUSSION_RESPONSE = 'CreateDiscussionReducer/RESET_CREATE_DISCUSSION_RESPONSE'

export const actions = {
    SET_DISCUSSION_MODAL_OPEN_STATUS,
    FETCH_ACCOUNT_ARTEFACTS_SUCCESS,
    FETCH_MODEL_ARTEFACTS_SUCCESS,
    SET_FORMATTED_ACCOUNT_DATA,
    SET_FORMATTED_MODEL_DATA,
    SET_MESSAGE_DATA,
    SET_REPLY_SETTINGS,
    CREATE_COMPONENT_DISCUSSION_SUCCESS
}

export const actionCreators = {
    setDiscussionModalOpenStatus: createAction(SET_DISCUSSION_MODAL_OPEN_STATUS),
    setFormattedAccountData: createAction(SET_FORMATTED_ACCOUNT_DATA),
    setFormattedModelData: createAction(SET_FORMATTED_MODEL_DATA),
    setMessageData: createAction(SET_MESSAGE_DATA),
    setReplySettings: createAction(SET_REPLY_SETTINGS),
    resetCreateDiscussionResponse: createAction(RESET_CREATE_DISCUSSION_RESPONSE)
}

export const initialState = {
    discussionmodalIsOpen: false,
    accountArtefactsData: '',
    modelArtefactsData: '',
    formattedAccounts: '',
    formattedModels: '',
    formattedTags: [{id: 1, display: '...'}],
    newMessage: '',
    replySettings: {
        // isModalOpen: false,
        // selectedMessage: '',
        // messageReply: '',
        tags: [{id: 1, display: '...'}]
    },
    createDiscussion: false
}

export default handleActions(
  {
    [SET_DISCUSSION_MODAL_OPEN_STATUS]: (state, action) => ({
        ...state,
        discussionmodalIsOpen: action.payload
    }),
    [CREATE_COMPONENT_DISCUSSION_SUCCESS]: (state, action) => ({
        ...state,
        createDiscussion: action.payload
    }),
    [RESET_CREATE_DISCUSSION_RESPONSE]: (state, action) => ({
        ...state,
        createDiscussion: ''
    }),
    [FETCH_ACCOUNT_ARTEFACTS_SUCCESS]: (state, action) => ({
        ...state,
        accountArtefactsData: action.payload
    }),
    [FETCH_MODEL_ARTEFACTS_SUCCESS]: (state, action) => ({
    ...state,
    modelArtefactsData: action.payload
    }),
    [SET_FORMATTED_ACCOUNT_DATA]: (state, action) => ({
    ...state,
    formattedAccounts: action.payload
    }),
    [SET_FORMATTED_MODEL_DATA]: (state, action) => ({
    ...state,
    formattedModels: action.payload
    }),
    [SET_MESSAGE_DATA]: (state, action) => ({
    ...state,
    newMessage: action.payload,
    formattedTags: action.payload.tags
    }),
    [SET_REPLY_SETTINGS]: (state, action) => ({
    ...state,
    replySettings: action.payload
    })
  },
  initialState
)
