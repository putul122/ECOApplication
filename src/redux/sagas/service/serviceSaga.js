import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api, { timeOut } from '../../../constants'

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
export const UPDATE_NESTED_MODEL_PRESPECTIVES = 'saga/service/UPDATE_NESTED_MODEL_PRESPECTIVES'
export const UPDATE_NESTED_MODEL_PRESPECTIVES_SUCCESS = 'saga/service/UPDATE_NESTED_MODEL_PRESPECTIVES_SUCCESS'
export const UPDATE_NESTED_MODEL_PRESPECTIVES_FAILURE = 'saga/service/UPDATE_NESTED_MODEL_PRESPECTIVES_FAILURE'
export const REMOVE_MODEL_PRESPECTIVES = 'saga/service/REMOVE_MODEL_PRESPECTIVES'
export const REMOVE_MODEL_PRESPECTIVES_SUCCESS = 'saga/service/REMOVE_MODEL_PRESPECTIVES_SUCCESS'
export const REMOVE_MODEL_PRESPECTIVES_FAILURE = 'saga/service/REMOVE_MODEL_PRESPECTIVES_FAILURE'

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
  fetchCrudModelPrespectivesFailure: createAction(FETCH_CRUD_MODEL_PRESPECTIVES_FAILURE),
  updateNestedModelPrespectives: createAction(UPDATE_NESTED_MODEL_PRESPECTIVES),
  updateNestedModelPrespectivesSuccess: createAction(UPDATE_NESTED_MODEL_PRESPECTIVES_SUCCESS),
  updateNestedModelPrespectivesFailure: createAction(UPDATE_NESTED_MODEL_PRESPECTIVES_FAILURE),
  removeModelPrespectives: createAction(REMOVE_MODEL_PRESPECTIVES),
  removeModelPrespectivesSuccess: createAction(REMOVE_MODEL_PRESPECTIVES_SUCCESS),
  removeModelPrespectivesFailure: createAction(REMOVE_MODEL_PRESPECTIVES_FAILURE)
}

export default function * watchServices () {
  yield [
    takeLatest(FETCH_DROPDOWN_DATA, getDropdownData),
    takeLatest(FETCH_NESTED_MODEL_PRESPECTIVES, getNestedModelPrespectives),
    takeLatest(FETCH_CRUD_META_MODEL_PRESPECTIVE, getMetaModelPrespective),
    takeLatest(FETCH_CRUD_MODEL_PRESPECTIVES, getCrudModelPrespectives),
    takeLatest(UPDATE_NESTED_MODEL_PRESPECTIVES, updateNestedModelPrespectives),
    takeLatest(REMOVE_MODEL_PRESPECTIVES, removeModelPrespectives)
  ]
}

export function * removeModelPrespectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const modelPrespectives = yield call(
      axios.patch,
      api.getModelPerspectives,
      action.payload.data,
      {params: action.payload.queryString},
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.removeModelPrespectivesSuccess(modelPrespectives.data))
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
      yield put(actionCreators.removeModelPrespectivesSuccess(errorObj))
    } else {
      yield put(actionCreators.removeModelPrespectivesFailure(error))
    }
  }
}

export function * updateNestedModelPrespectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const modelPrespectives = yield call(
      axios.patch,
      api.getModelPerspective(action.payload.id),
      action.payload.data,
      {params: action.payload.queryString},
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.updateNestedModelPrespectivesSuccess(modelPrespectives.data))
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
      yield put(actionCreators.updateNestedModelPrespectivesSuccess(errorObj))
    } else {
      yield put(actionCreators.updateNestedModelPrespectivesFailure(error))
    }
  }
}

export function * getCrudModelPrespectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    axios.defaults.headers.common['responseType'] = 'stream'
    const modelPrespectives = yield call(
      axios.get,
      api.getModelPerspective(action.payload.id),
      {params: action.payload.data},
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchCrudModelPrespectivesSuccess(modelPrespectives.data))
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
      yield put(actionCreators.fetchCrudModelPrespectivesSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchCrudModelPrespectivesFailure(error))
    }
  }
}

export function * getMetaModelPrespective (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const metaModelPrespective = yield call(
      axios.get,
      api.getMetaModelPerspective(action.payload.id),
      {params: action.payload.viewKey},
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchCrudMetaModelPrespectiveSuccess(metaModelPrespective.data))
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
      yield put(actionCreators.fetchCrudMetaModelPrespectiveSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchCrudMetaModelPrespectiveFailure(error))
    }
  }
}

export function * getDropdownData (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const dropdownData = yield call(
      axios.get,
      api.getComponentTypeComponents(action.payload),
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchDropdownDataSuccess(dropdownData.data))
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
      yield put(actionCreators.fetchDropdownDataSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchDropdownDataFailure(error))
    }
  }
}

export function * getNestedModelPrespectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    axios.defaults.headers.common['responseType'] = 'stream'
    const modelPrespectives = yield call(
      axios.get,
      api.getModelPerspectives,
      {params: action.payload},
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchNestedModelPrespectivesSuccess(modelPrespectives.data))
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
      yield put(actionCreators.fetchNestedModelPrespectivesSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchNestedModelPrespectivesFailure(error))
    }
  }
}
