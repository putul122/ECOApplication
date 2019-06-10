import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
// import queryString from 'query-string'

import api from '../../../constants'

// Saga action strings

export const GET_META_MODEL = 'saga/agreementScoring/GET_META_MODEL'
export const META_MODEL_SUCCESS = 'saga/agreementScoring/META_MODEL_SUCCESS'
export const META_MODEL_FAILURE = 'saga/agreementScoring/META_MODEL_FAILURE'
export const MODEL_PERSPECTIVE_SUCCESS = 'saga/agreementScoring/MODEL_PERSPECTIVE_SUCCESS'
export const MODEL_PERSPECTIVE_START = 'saga/agreementScoring/MODEL_PERSPECTIVE_START'
export const GET_MODEL_PERSPECTIVE = 'saga/agreementScoring/GET_MODEL_PERSPECTIVE'
export const MODEL_PERSPECTIVE_FAILURE = 'saga/agreementScoring/MODEL_PERSPECTIVE_FAILURE'

export const actionCreators = {
  getMDDATA: createAction(GET_META_MODEL),
  metaModelSuccess: createAction(META_MODEL_SUCCESS),
  metaModelFailure: createAction(META_MODEL_FAILURE),
  getMDPerspectiveDATA: createAction(GET_MODEL_PERSPECTIVE),
  ModelPerspectiveStart: createAction(MODEL_PERSPECTIVE_START),
  ModelPerspectiveSuccess: createAction(MODEL_PERSPECTIVE_SUCCESS),
  ModelPerspectiveFailure: createAction(MODEL_PERSPECTIVE_FAILURE)
}

export default function * watchAgreementScoringActions () {
  yield [
    takeLatest(GET_META_MODEL, getMetaModelData),
    takeLatest(GET_MODEL_PERSPECTIVE, getModelPerspective)
  ]
}

export function * getMetaModelData (action) {
  try {
    axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('userAccessToken')
    const metaModelPerpestives = yield call(
      axios.get,
      api.scoringMetaModelPerpestives,
      action.payload
    )
    yield put(actionCreators.metaModelSuccess(metaModelPerpestives.data))
  } catch (error) {
    yield put(actionCreators.metaModelFailure(error))
  }
}

export function * getModelPerspective (action) {
  try {
    yield put(actionCreators.ModelPerspectiveStart())
    axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('userAccessToken')
    const ModelPerpestives = yield call(
      axios.get,
      api.scoringModelperspectives,
      action.payload
    )
    yield put(actionCreators.ModelPerspectiveSuccess(ModelPerpestives.data))
  } catch (error) {
    yield put(actionCreators.ModelPerspectiveFailure(error))
  }
}
