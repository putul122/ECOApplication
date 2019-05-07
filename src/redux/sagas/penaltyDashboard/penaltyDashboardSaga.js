import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
// import queryString from 'query-string'

import api from '../../../constants'

// Saga action strings

export const META_MODEL_SUCCESS = 'saga/penaltyDashboard/META_MODEL_SUCCESS'
export const GET_META_MODEL = 'saga/penaltyDashboard/GET_META_MODEL'
export const META_MODEL_FAILURE = 'saga/penaltyDashboard/META_MODEL_FAILURE'
export const MODEL_PERSPECTIVE_SUCCESS = 'saga/penaltyDashboard/MODEL_PERSPECTIVE_SUCCESS'
export const GET_MODEL_PERSPECTIVE = 'saga/penaltyDashboard/GET_MODEL_PERSPECTIVE'
export const MODEL_PERSPECTIVE_FAILURE = 'saga/penaltyDashboard/MODEL_PERSPECTIVE_FAILURE'
export const MMODEL_PERSPECTIVE_SUCCESS = 'saga/penaltyDashboard/MMODEL_PERSPECTIVE_SUCCESS'
export const GET_MMODEL_PERSPECTIVE = 'saga/penaltyDashboard/GET_MMODEL_PERSPECTIVE'
export const MMODEL_PERSPECTIVE_FAILURE = 'saga/penaltyDashboard/MMODEL_PERSPECTIVE_FAILURE'

export const actionCreators = {
    penaltymetaModelSuccess: createAction(META_MODEL_SUCCESS),
    penaltymetaModelFailure: createAction(META_MODEL_FAILURE),
    penaltygetMDDATA: createAction(GET_META_MODEL),
    penaltyModelPerspectiveSuccess: createAction(MODEL_PERSPECTIVE_SUCCESS),
    penaltyModelPerspectiveFailure: createAction(MODEL_PERSPECTIVE_FAILURE),
    penaltygetMDPerspectiveDATA: createAction(GET_MODEL_PERSPECTIVE),
    ModelPerspectiveSuccess: createAction(MMODEL_PERSPECTIVE_SUCCESS),
    ModelPerspectiveFailure: createAction(MMODEL_PERSPECTIVE_FAILURE)
    // getMDPerspectiveDATA: createAction(GET_MMODEL_PERSPECTIVE)
}

export default function * watchSlaActions () {
  yield [
    takeLatest(GET_META_MODEL, penaltygetMetaModelData),
    takeLatest(GET_MODEL_PERSPECTIVE, penaltygetModelPerspective)
    // takeLatest(GET_MODEL_PERSPECTIVE, getModelPerspective)

  ]
}

export function * penaltygetMetaModelData (action) {
  try {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('userAccessToken')
    const metaModelPerpestives = yield call(
      axios.get,
      api.penaltymetaModelPerpestives,
      action.payload
    )
    yield put(actionCreators.penaltymetaModelSuccess(metaModelPerpestives.data))
  } catch (error) {
    yield put(actionCreators.penaltymetaModelFailure(error))
  }
}

export function * penaltygetModelPerspective (action) {
  try {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('userAccessToken')
    const ModelPerpestives = yield call(
      axios.get,
      api.penaltymodelperspectives,
      action.payload
    )
    yield put(actionCreators.penaltyModelPerspectiveSuccess(ModelPerpestives.data))
  } catch (error) {
    yield put(actionCreators.penaltyModelPerspectiveFailure(error))
  }
}

// export function * getModelPerspective (action) {
//   try {
//     axios.defaults.headers.common['Authorization'] =
//       'Bearer ' + localStorage.getItem('userAccessToken')
//     const ModelPerpestives = yield call(
//       axios.get,
//       api.modelperspectives,
//       action.payload
//     )
//     yield put(actionCreators.ModelPerspectiveSuccess(ModelPerpestives.data))
//   } catch (error) {
//     yield put(actionCreators.ModelPerspectiveFailure(error))
//   }
// }
