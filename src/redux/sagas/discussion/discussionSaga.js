import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api, { timeOut } from '../../../constants'

// Saga action strings
export const FETCH_DISCUSSIONS = 'saga/Discussion/FETCH_DISCUSSIONS'
export const FETCH_DISCUSSIONS_SUCCESS = 'saga/Discussion/FETCH_DISCUSSIONS_SUCCESS'
export const FETCH_DISCUSSIONS_FAILURE = 'saga/Discussion/FETCH_DISCUSSIONS_FAILURE'
export const FETCH_DISCUSSION_MESSAGES = 'saga/Discussion/FETCH_DISCUSSION_MESSAGES'
export const FETCH_DISCUSSION_MESSAGES_SUCCESS = 'saga/Discussion/FETCH_DISCUSSION_MESSAGES_SUCCESS'
export const FETCH_DISCUSSION_MESSAGES_FAILURE = 'saga/Discussion/FETCH_DISCUSSION_MESSAGES_FAILURE'
export const FETCH_ACCOUNT_ARTEFACTS = 'saga/Discussion/FETCH_ACCOUNT_ARTEFACTS'
export const FETCH_ACCOUNT_ARTEFACTS_SUCCESS = 'saga/Discussion/FETCH_ACCOUNT_ARTEFACTS_SUCCESS'
export const FETCH_ACCOUNT_ARTEFACTS_FAILURE = 'saga/Discussion/FETCH_ACCOUNT_ARTEFACTS_FAILURE'
export const FETCH_MODEL_ARTEFACTS = 'saga/Discussion/FETCH_MODEL_ARTEFACTS'
export const FETCH_MODEL_ARTEFACTS_SUCCESS = 'saga/Discussion/FETCH_MODEL_ARTEFACTS_SUCCESS'
export const FETCH_MODEL_ARTEFACTS_FAILURE = 'saga/Discussion/FETCH_MODEL_ARTEFACTS_FAILURE'
export const REPLY_DISCUSSION_MESSAGES = 'saga/Discussion/REPLY_DISCUSSION_MESSAGES'
export const REPLY_DISCUSSION_MESSAGES_SUCCESS = 'saga/Discussion/REPLY_DISCUSSION_MESSAGES_SUCCESS'
export const REPLY_DISCUSSION_MESSAGES_FAILURE = 'saga/Discussion/REPLY_DISCUSSION_MESSAGES_FAILURE'
export const CREATE_DISCUSSION = 'saga/Discussion/CREATE_DISCUSSION'
export const CREATE_DISCUSSION_SUCCESS = 'saga/Discussion/CREATE_DISCUSSION_SUCCESS'
export const CREATE_DISCUSSION_FAILURE = 'saga/Discussion/CREATE_DISCUSSION_FAILURE'

export const actionCreators = {
  fetchDiscussions: createAction(FETCH_DISCUSSIONS),
  fetchDiscussionsSuccess: createAction(FETCH_DISCUSSIONS_SUCCESS),
  fetchDiscussionsFailure: createAction(FETCH_DISCUSSIONS_FAILURE),
  fetchDiscussionMessages: createAction(FETCH_DISCUSSION_MESSAGES),
  fetchDiscussionMessagesSuccess: createAction(FETCH_DISCUSSION_MESSAGES_SUCCESS),
  fetchDiscussionMessagesFailure: createAction(FETCH_DISCUSSION_MESSAGES_FAILURE),
  fetchAccountArtefacts: createAction(FETCH_ACCOUNT_ARTEFACTS),
  fetchAccountArtefactsSuccess: createAction(FETCH_ACCOUNT_ARTEFACTS_SUCCESS),
  fetchAccountArtefactsFailure: createAction(FETCH_ACCOUNT_ARTEFACTS_FAILURE),
  fetchModelArtefacts: createAction(FETCH_MODEL_ARTEFACTS),
  fetchModelArtefactsSuccess: createAction(FETCH_MODEL_ARTEFACTS_SUCCESS),
  fetchModelArtefactsFailure: createAction(FETCH_MODEL_ARTEFACTS_FAILURE),
  replyDiscussionMessages: createAction(REPLY_DISCUSSION_MESSAGES),
  replyDiscussionMessagesSuccess: createAction(REPLY_DISCUSSION_MESSAGES_SUCCESS),
  replyDiscussionMessagesFailure: createAction(REPLY_DISCUSSION_MESSAGES_FAILURE),
  createDiscussion: createAction(CREATE_DISCUSSION),
  createDiscussionSuccess: createAction(CREATE_DISCUSSION_SUCCESS),
  createDiscussionFailure: createAction(CREATE_DISCUSSION_FAILURE)
}

export default function * watchDiscussions () {
  yield [
    takeLatest(FETCH_DISCUSSIONS, getDiscussions),
    takeLatest(FETCH_DISCUSSION_MESSAGES, getDiscussionMessages),
    takeLatest(FETCH_ACCOUNT_ARTEFACTS, getAccountArtefacts),
    takeLatest(FETCH_MODEL_ARTEFACTS, getModelArtefacts),
    takeLatest(REPLY_DISCUSSION_MESSAGES, replyDiscussionMessages),
    takeLatest(CREATE_DISCUSSION, createDiscussion)
  ]
}

export function * getDiscussions (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const discussions = yield call(
      axios.get,
      api.getDiscussions,
      {params: action.payload},
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchDiscussionsSuccess(discussions.data))
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      let errorObj = {
        'count': 0,
        'error_code': error.code,
        'error_message': 'Server didnot respond in ' + error.config.timeout + 'ms while calling API ' + error.config.url,
        'error_source': '',
        'links': [],
        'resources': [],
        'result_code': null
      }
      yield put(actionCreators.fetchDiscussionsSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchDiscussionsFailure(error))
    }
  }
}

export function * getDiscussionMessages (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const discussionMessages = yield call(
      axios.get,
      api.getDiscussionMessages(action.payload.id),
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchDiscussionMessagesSuccess(discussionMessages.data))
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      let errorObj = {
        'count': 0,
        'error_code': error.code,
        'error_message': 'Server didnot respond in ' + error.config.timeout + 'ms while calling API ' + error.config.url,
        'error_source': '',
        'links': [],
        'resources': [],
        'result_code': null
      }
      yield put(actionCreators.fetchDiscussionMessagesSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchDiscussionMessagesFailure(error))
    }
  }
}

export function * replyDiscussionMessages (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const discussionMessages = yield call(
      axios.post,
      api.getDiscussionMessages(action.payload.id),
      action.payload.data,
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.replyDiscussionMessagesSuccess(discussionMessages.data))
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      let errorObj = {
        'count': 0,
        'error_code': error.code,
        'error_message': 'Server didnot respond in ' + error.config.timeout + 'ms while calling API ' + error.config.url,
        'error_source': '',
        'links': [],
        'resources': [],
        'result_code': null
      }
      yield put(actionCreators.replyDiscussionMessagesSuccess(errorObj))
    } else {
      yield put(actionCreators.replyDiscussionMessagesFailure(error))
    }
  }
}

export function * getAccountArtefacts (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const viewAccountArtefact = yield call(
      axios.get,
      api.getAccountArtefacts,
      {params: action.payload},
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchAccountArtefactsSuccess(viewAccountArtefact.data))
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      let errorObj = {
        'count': 0,
        'error_code': error.code,
        'error_message': 'Server didnot respond in ' + error.config.timeout + 'ms while calling API ' + error.config.url,
        'error_source': '',
        'links': [],
        'resources': [],
        'result_code': null
      }
      yield put(actionCreators.fetchAccountArtefactsSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchAccountArtefactsFailure(error))
    }
  }
}

export function * getModelArtefacts (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const viewModelArtefact = yield call(
      axios.get,
      api.getModelArtefacts,
      {params: action.payload},
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchModelArtefactsSuccess(viewModelArtefact.data))
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      let errorObj = {
        'count': 0,
        'error_code': error.code,
        'error_message': 'Server didnot respond in ' + error.config.timeout + 'ms while calling API ' + error.config.url,
        'error_source': '',
        'links': [],
        'resources': [],
        'result_code': null
      }
      yield put(actionCreators.fetchModelArtefactsSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchModelArtefactsFailure(error))
    }
  }
}

export function * createDiscussion (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const createDiscussion = yield call(
      axios.post,
      api.createDiscussion,
      action.payload,
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.createDiscussionSuccess(createDiscussion.data))
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      let errorObj = {
        'count': 0,
        'error_code': error.code,
        'error_message': 'Server didnot respond in ' + error.config.timeout + 'ms while calling API ' + error.config.url,
        'error_source': '',
        'links': [],
        'resources': [],
        'result_code': null
      }
      yield put(actionCreators.createDiscussionSuccess(errorObj))
    } else {
      yield put(actionCreators.createDiscussionFailure(error))
    }
  }
}
