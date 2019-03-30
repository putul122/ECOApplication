import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_DROPDOWN_DATA = 'saga/service/FETCH_DROPDOWN_DATA'
export const FETCH_DROPDOWN_DATA_SUCCESS = 'saga/service/FETCH_DROPDOWN_DATA_SUCCESS'
export const FETCH_DROPDOWN_DATA_FAILURE = 'saga/service/FETCH_DROPDOWN_DATA_FAILURE'
export const FETCH_NESTED_MODEL_PRESPECTIVES = 'saga/service/FETCH_NESTED_MODEL_PRESPECTIVES'
export const FETCH_NESTED_MODEL_PRESPECTIVES_SUCCESS = 'saga/service/FETCH_NESTED_MODEL_PRESPECTIVES_SUCCESS'
export const FETCH_NESTED_MODEL_PRESPECTIVES_FAILURE = 'saga/service/FETCH_NESTED_MODEL_PRESPECTIVES_FAILURE'
export const FETCH_CRUD_META_MODEL_PRESPECTIVE = 'saga/service/FETCH_CRUD_META_MODEL_PRESPECTIVE'
export const FETCH_CRUD_META_MODEL_PRESPECTIVE_SUCCESS = 'saga/service/FETCH_CRUD_META_MODEL_PRESPECTIVE_SUCCESS'
export const FETCH_CRUD_META_MODEL_PRESPECTIVE_FAILURE = 'saga/service/FETCH_CRUD_META_MODEL_PRESPECTIVE_FAILURE'
export const FETCH_CRUD_MODEL_PRESPECTIVES = 'saga/service/FETCH_CRUD_MODEL_PRESPECTIVES'
export const FETCH_CRUD_MODEL_PRESPECTIVES_SUCCESS = 'saga/service/FETCH_CRUD_MODEL_PRESPECTIVES_SUCCESS'
export const FETCH_CRUD_MODEL_PRESPECTIVES_FAILURE = 'saga/service/FETCH_CRUD_MODEL_PRESPECTIVES_FAILURE'

export const actionCreators = {
  fetchDropdownData: createAction(FETCH_DROPDOWN_DATA),
  fetchDropdownDataSuccess: createAction(FETCH_DROPDOWN_DATA_SUCCESS),
  fetchDropdownDataFailure: createAction(FETCH_DROPDOWN_DATA_FAILURE),
  fetchNestedModelPrespectives: createAction(FETCH_NESTED_MODEL_PRESPECTIVES),
  fetchNestedModelPrespectivesSuccess: createAction(FETCH_NESTED_MODEL_PRESPECTIVES_SUCCESS),
  fetchNestedModelPrespectivesFailure: createAction(FETCH_NESTED_MODEL_PRESPECTIVES_FAILURE),
  fetchCrudMetaModelPrespective: createAction(FETCH_CRUD_META_MODEL_PRESPECTIVE),
  fetchCrudMetaModelPrespectiveSuccess: createAction(FETCH_CRUD_META_MODEL_PRESPECTIVE_SUCCESS),
  fetchCrudMetaModelPrespectiveFailure: createAction(FETCH_CRUD_META_MODEL_PRESPECTIVE_FAILURE),
  fetchCrudModelPrespectives: createAction(FETCH_CRUD_MODEL_PRESPECTIVES),
  fetchCrudModelPrespectivesSuccess: createAction(FETCH_CRUD_MODEL_PRESPECTIVES_SUCCESS),
  fetchCrudModelPrespectivesFailure: createAction(FETCH_CRUD_MODEL_PRESPECTIVES_FAILURE)
}

export default function * watchServices () {
  yield [
    takeLatest(FETCH_DROPDOWN_DATA, getDropdownData),
    takeLatest(FETCH_NESTED_MODEL_PRESPECTIVES, getNestedModelPrespectives),
    takeLatest(FETCH_CRUD_META_MODEL_PRESPECTIVE, getMetaModelPrespective),
    takeLatest(FETCH_CRUD_MODEL_PRESPECTIVES, getCrudModelPrespectives)
  ]
}

export function * getCrudModelPrespectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    axios.defaults.headers.common['responseType'] = 'stream'
    const modelPrespectives = yield call(
      axios.get,
      api.getModelPerspectives,
      {params: action.payload}
    )
    yield put(actionCreators.fetchCrudModelPrespectivesSuccess(modelPrespectives.data))
  } catch (error) {
    yield put(actionCreators.fetchCrudModelPrespectivesFailure(error))
  }
}

export function * getMetaModelPrespective (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const metaModelPrespective = yield call(
      axios.get,
      api.getMetaModelPerspective(action.payload.id),
      {params: action.payload.viewKey}
    )
    yield put(actionCreators.fetchCrudMetaModelPrespectiveSuccess(metaModelPrespective.data))
  } catch (error) {
    yield put(actionCreators.fetchCrudMetaModelPrespectiveFailure(error))
  }
}

export function * getDropdownData (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const dropdownData = yield call(
      axios.get,
      api.getComponentTypeComponents(action.payload)
    )
    yield put(actionCreators.fetchDropdownDataSuccess(dropdownData.data))
  } catch (error) {
    yield put(actionCreators.fetchDropdownDataFailure(error))
  }
}

export function * getNestedModelPrespectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    axios.defaults.headers.common['responseType'] = 'stream'
    const modelPrespectives = yield call(
      axios.get,
      api.getModelPerspectives,
      {params: action.payload}
    )
    yield put(actionCreators.fetchNestedModelPrespectivesSuccess(modelPrespectives.data))
  } catch (error) {
    yield put(actionCreators.fetchNestedModelPrespectivesFailure(error))
  }
}
