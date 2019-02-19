import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_ACCOUNT_ARTEFACTS = 'saga/createDiscussion/FETCH_ACCOUNT_ARTEFACTS'
export const FETCH_ACCOUNT_ARTEFACTS_SUCCESS = 'saga/createDiscussion/FETCH_ACCOUNT_ARTEFACTS_SUCCESS'
export const FETCH_ACCOUNT_ARTEFACTS_FAILURE = 'saga/createDiscussion/FETCH_ACCOUNT_ARTEFACTS_FAILURE'
export const FETCH_MODEL_ARTEFACTS = 'saga/createDiscussion/FETCH_MODEL_ARTEFACTS'
export const FETCH_MODEL_ARTEFACTS_SUCCESS = 'saga/createDiscussion/FETCH_MODEL_ARTEFACTS_SUCCESS'
export const FETCH_MODEL_ARTEFACTS_FAILURE = 'saga/createDiscussion/FETCH_MODEL_ARTEFACTS_FAILURE'
export const CREATE_COMPONENT_DISCUSSION = 'saga/createDiscussion/CREATE_COMPONENT_DISCUSSION'
export const CREATE_COMPONENT_DISCUSSION_SUCCESS = 'saga/createDiscussion/CREATE_COMPONENT_DISCUSSION_SUCCESS'
export const CREATE_COMPONENT_DISCUSSION_FAILURE = 'saga/createDiscussion/CREATE_COMPONENT_DISCUSSION_FAILURE'

export const actionCreators = {
  fetchAccountArtefacts: createAction(FETCH_ACCOUNT_ARTEFACTS),
  fetchAccountArtefactsSuccess: createAction(FETCH_ACCOUNT_ARTEFACTS_SUCCESS),
  fetchAccountArtefactsFailure: createAction(FETCH_ACCOUNT_ARTEFACTS_FAILURE),
  fetchModelArtefacts: createAction(FETCH_MODEL_ARTEFACTS),
  fetchModelArtefactsSuccess: createAction(FETCH_MODEL_ARTEFACTS_SUCCESS),
  fetchModelArtefactsFailure: createAction(FETCH_MODEL_ARTEFACTS_FAILURE),
  createComponentDiscussion: createAction(CREATE_COMPONENT_DISCUSSION),
  createComponentDiscussionSuccess: createAction(CREATE_COMPONENT_DISCUSSION_SUCCESS),
  createComponentDiscussionFailure: createAction(CREATE_COMPONENT_DISCUSSION_FAILURE)
}

export default function * watchCreateDiscusssion () {
  yield [
    takeLatest(FETCH_ACCOUNT_ARTEFACTS, getAccountArtefacts),
    takeLatest(FETCH_MODEL_ARTEFACTS, getModelArtefacts),
    takeLatest(CREATE_COMPONENT_DISCUSSION, createComponentDiscussion)
  ]
}

export function * getAccountArtefacts (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const viewAccountArtefact = yield call(
      axios.get,
      api.getAccountArtefacts,
      {params: action.payload}
     )
    yield put(actionCreators.fetchAccountArtefactsSuccess(viewAccountArtefact.data))
  } catch (error) {
    yield put(actionCreators.fetchAccountArtefactsFailure(error))
  }
}

export function * getModelArtefacts (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const viewModelArtefact = yield call(
      axios.get,
      api.getModelArtefacts,
      {params: action.payload}
     )
    yield put(actionCreators.fetchModelArtefactsSuccess(viewModelArtefact.data))
  } catch (error) {
    yield put(actionCreators.fetchModelArtefactsFailure(error))
  }
}

export function * createComponentDiscussion (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const createDiscussion = yield call(
      axios.post,
      // api.addComponent,
      api.createDiscussion(action.payload),
      // {params: action.payload.component_type}
      action.payload
    )
    yield put(actionCreators.createComponentDiscussionSuccess(createDiscussion.data))
  } catch (error) {
    yield put(actionCreators.createComponentDiscussionFailure(error))
  }
}
