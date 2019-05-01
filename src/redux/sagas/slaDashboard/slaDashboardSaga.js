import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
// import queryString from 'query-string'

import api from '../../../constants'

// Saga action strings

export const META_MODEL_SUCCESS = 'saga/slaDashboard/META_MODEL_SUCCESS'
export const GET_META_MODEL = 'saga/slaDashboard/GET_META_MODEL'
export const META_MODEL_FAILURE = 'saga/slaDashboard/META_MODEL_FAILURE'
export const MODEL_PERSPECTIVE_SUCCESS = 'saga/slaDashboard/MODEL_PERSPECTIVE_SUCCESS'
export const GET_MODEL_PERSPECTIVE = 'saga/slaDashboard/GET_MODEL_PERSPECTIVE'
export const MODEL_PERSPECTIVE_FAILURE = 'saga/slaDashboard/MODEL_PERSPECTIVE_FAILURE'
export const DROPDOWN_ITEMSDEP_SUCCESS = 'saga/slaDashboard/DROPDOWN_ITEMSDEP_SUCCESS'
export const GET_DROPDOWN_ITEMSDEP = 'saga/slaDashboard/GET_DROPDOWN_ITEMSDEP'
export const DROPDOWN_ITEMSDEP_FAILURE = 'saga/slaDashboard/DROPDOWN_ITEMSDEP_FAILURE'
export const DROPDOWN_ITEMSSUP_SUCCESS = 'saga/slaDashboard/DROPDOWN_ITEMSSUP_SUCCESS'
export const GET_DROPDOWN_ITEMSSUP = 'saga/slaDashboard/GET_DROPDOWN_ITEMSSUP'
export const DROPDOWN_ITEMSSUP_FAILURE = 'saga/slaDashboard/DROPDOWN_ITEMSSUP_FAILURE'
export const DROPDOWN_ITEMSSER_SUCCESS = 'saga/slaDashboard/DROPDOWN_ITEMSSER_SUCCESS'
export const GET_DROPDOWN_ITEMSSER = 'saga/slaDashboard/GET_DROPDOWN_ITEMSSER'
export const DROPDOWN_ITEMSSER_FAILURE = 'saga/slaDashboard/DROPDOWN_ITEMSSER_FAILURE'
export const DROPDOWN_ITEMSKPI_SUCCESS = 'saga/slaDashboard/DROPDOWN_ITEMSKPI_SUCCESS'
export const GET_DROPDOWN_ITEMSKPI = 'saga/slaDashboard/GET_DROPDOWN_ITEMSKPI'
export const DROPDOWN_ITEMSKPI_FAILURE = 'saga/slaDashboard/DROPDOWN_ITEMSKPI_FAILURE'

export const actionCreators = {
    metaModelSuccess: createAction(META_MODEL_SUCCESS),
    metaModelFailure: createAction(META_MODEL_FAILURE),
    getMDDATA: createAction(GET_META_MODEL),
    ModelPerspectiveSuccess: createAction(MODEL_PERSPECTIVE_SUCCESS),
    ModelPerspectiveFailure: createAction(MODEL_PERSPECTIVE_FAILURE),
    getMDPerspectiveDATA: createAction(GET_MODEL_PERSPECTIVE),
    getDropDownItemDepSuccess: createAction(DROPDOWN_ITEMSDEP_SUCCESS),
    getDropDownItemDepFailure: createAction(DROPDOWN_ITEMSDEP_FAILURE),
    getDropDownItemDep: createAction(GET_DROPDOWN_ITEMSDEP),
    getDropDownItemSupSuccess: createAction(DROPDOWN_ITEMSSUP_SUCCESS),
    getDropDownItemSupFailure: createAction(DROPDOWN_ITEMSSUP_FAILURE),
    getDropDownItemSup: createAction(GET_DROPDOWN_ITEMSSUP),
    getDropDownItemSerSuccess: createAction(DROPDOWN_ITEMSSER_SUCCESS),
    getDropDownItemSerFailure: createAction(DROPDOWN_ITEMSSER_FAILURE),
    getDropDownItemSer: createAction(GET_DROPDOWN_ITEMSSER),
    getDropDownItemKpiSuccess: createAction(DROPDOWN_ITEMSKPI_SUCCESS),
    getDropDownItemKpiFailure: createAction(DROPDOWN_ITEMSKPI_FAILURE),
    getDropDownItemKpi: createAction(GET_DROPDOWN_ITEMSKPI)
  }

export default function * watchSlaActions () {
  yield [
    takeLatest(GET_META_MODEL, getMetaModelData),
    takeLatest(GET_MODEL_PERSPECTIVE, getModelPerspective),
    takeLatest(GET_DROPDOWN_ITEMSDEP, getDropDownItemDepId),
    takeLatest(GET_DROPDOWN_ITEMSSUP, getDropDownItemSupId),
    takeLatest(GET_DROPDOWN_ITEMSSER, getDropDownItemSerId),
    takeLatest(GET_DROPDOWN_ITEMSKPI, getDropDownItemKpiId)
  ]
}

export function * getMetaModelData (action) {
  try {
    axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('userAccessToken')
    const metaModelPerpestives = yield call(
      axios.get,
      api.metaModelPerpestives,
      action.payload
    )
    yield put(actionCreators.metaModelSuccess(metaModelPerpestives.data))
  } catch (error) {
    yield put(actionCreators.metaModelFailure(error))
  }
}

export function * getModelPerspective (action) {
  try {
    console.log('getMDPerspectiveDATA')
    axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('userAccessToken')
    const ModelPerpestives = yield call(
      axios.get,
      api.modelperspectives,
      action.payload
    )
    yield put(actionCreators.ModelPerspectiveSuccess(ModelPerpestives.data))
  } catch (error) {
    yield put(actionCreators.ModelPerspectiveFailure(error))
  }
}

export function * getDropDownItemDepId (action) {
  try {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('userAccessToken')
    const ModelPerpestivesDropDown = yield call(
      axios.get,
      api.getDropDownItemsDep(action.payload.user_id),
      action.payload
    )
    yield put(actionCreators.getDropDownItemDepSuccess(ModelPerpestivesDropDown.data))
  } catch (error) {
    yield put(actionCreators.getDropDownItemDepFailure(error))
  }
}

export function * getDropDownItemSupId (action) {
  try {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('userAccessToken')
    const ModelPerpestivesDropDown = yield call(
      axios.get,
      api.getDropDownItemsSup(action.payload.user_id),
      action.payload
    )
    yield put(actionCreators.getDropDownItemSupSuccess(ModelPerpestivesDropDown.data))
  } catch (error) {
    yield put(actionCreators.getDropDownItemSupFailure(error))
  }
}

export function * getDropDownItemSerId (action) {
  try {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('userAccessToken')
    const ModelPerpestivesDropDown = yield call(
      axios.get,
      api.getDropDownItemsSer(action.payload.user_id),
      action.payload
    )
    yield put(actionCreators.getDropDownItemSerSuccess(ModelPerpestivesDropDown.data))
  } catch (error) {
    yield put(actionCreators.getDropDownItemSerFailure(error))
  }
}

export function * getDropDownItemKpiId (action) {
  try {
    axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('userAccessToken')
    const ModelPerpestivesDropDown = yield call(
      axios.get,
      api.getDropDownItemsKpi(action.payload.user_id),
      action.payload
    )
    yield put(actionCreators.getDropDownItemKpiSuccess(ModelPerpestivesDropDown.data))
  } catch (error) {
    yield put(actionCreators.getDropDownItemKpiFailure(error))
  }
}
