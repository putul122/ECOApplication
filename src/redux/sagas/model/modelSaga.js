import axios from 'axios'
// import httpAdapter from 'axios/lib/adapters/http'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api, { timeOut } from '../../../constants'
// const OUTPUT = 'output.json'
// const output = fs.createWriteStream(OUTPUT)
// Saga action strings
export const FETCH_META_MODEL_PRESPECTIVE = 'saga/Model/FETCH_META_MODEL_PRESPECTIVE'
export const FETCH_META_MODEL_PRESPECTIVE_SUCCESS = 'saga/Model/FETCH_META_MODEL_PRESPECTIVE_SUCCESS'
export const FETCH_META_MODEL_PRESPECTIVE_FAILURE = 'saga/Model/FETCH_META_MODEL_PRESPECTIVE_FAILURE'
export const FETCH_MODEL_PRESPECTIVES = 'saga/Model/FETCH_MODEL_PRESPECTIVES'
export const FETCH_MODEL_PRESPECTIVES_SUCCESS = 'saga/Model/FETCH_MODEL_PRESPECTIVES_SUCCESS'
export const FETCH_MODEL_PRESPECTIVES_FAILURE = 'saga/Model/FETCH_MODEL_PRESPECTIVES_FAILURE'
export const UPDATE_MODEL_PRESPECTIVES = 'saga/Model/UPDATE_MODEL_PRESPECTIVES'
export const UPDATE_MODEL_PRESPECTIVES_SUCCESS = 'saga/Model/UPDATE_MODEL_PRESPECTIVES_SUCCESS'
export const UPDATE_MODEL_PRESPECTIVES_FAILURE = 'saga/Model/UPDATE_MODEL_PRESPECTIVES_FAILURE'
export const FETCH_ALL_MODEL_PRESPECTIVES = 'saga/Model/FETCH_ALL_MODEL_PRESPECTIVES'
export const FETCH_ALL_MODEL_PRESPECTIVES_SUCCESS = 'saga/Model/FETCH_ALL_MODEL_PRESPECTIVES_SUCCESS'
export const FETCH_ALL_MODEL_PRESPECTIVES_FAILURE = 'saga/Model/FETCH_ALL_MODEL_PRESPECTIVES_FAILURE'
export const UPDATE_ALL_MODEL_PRESPECTIVES = 'saga/Model/UPDATE_ALL_MODEL_PRESPECTIVES'
export const UPDATE_ALL_MODEL_PRESPECTIVES_SUCCESS = 'saga/Model/UPDATE_ALL_MODEL_PRESPECTIVES_SUCCESS'
export const UPDATE_ALL_MODEL_PRESPECTIVES_FAILURE = 'saga/Model/UPDATE_ALL_MODEL_PRESPECTIVES_FAILURE'
export const FETCH_COMPONENT_MODEL_PRESPECTIVES = 'saga/Model/FETCH_COMPONENT_MODEL_PRESPECTIVES'
export const FETCH_COMPONENT_MODEL_PRESPECTIVES_SUCCESS = 'saga/Model/FETCH_COMPONENT_MODEL_PRESPECTIVES_SUCCESS'
export const FETCH_COMPONENT_MODEL_PRESPECTIVES_FAILURE = 'saga/Model/FETCH_COMPONENT_MODEL_PRESPECTIVES_FAILURE'
export const FETCH_META_MODEL_PRESPECTIVES = 'saga/Model/FETCH_META_MODEL_PRESPECTIVES'
export const FETCH_META_MODEL_PRESPECTIVES_SUCCESS = 'saga/Model/FETCH_META_MODEL_PRESPECTIVES_SUCCESS'
export const FETCH_META_MODEL_PRESPECTIVES_FAILURE = 'saga/Model/FETCH_META_MODEL_PRESPECTIVES_FAILURE'
export const DELETE_COMPONENT_MODEL_PERSPECTIVES = 'saga/Model/DELETE_COMPONENT_MODEL_PERSPECTIVES'
export const DELETE_COMPONENT_MODEL_PERSPECTIVES_SUCCESS = 'saga/Model/DELETE_COMPONENT_MODEL_PERSPECTIVES_SUCCESS'
export const DELETE_COMPONENT_MODEL_PERSPECTIVES_FAILURE = 'saga/Model/DELETE_COMPONENT_MODEL_PERSPECTIVES_FAILURE'
export const UPDATE_COMPONENT_MODEL_PRESPECTIVES = 'saga/Model/UPDATE_COMPONENT_MODEL_PRESPECTIVES'
export const UPDATE_COMPONENT_MODEL_PRESPECTIVES_SUCCESS = 'saga/Model/UPDATE_COMPONENT_MODEL_PRESPECTIVES_SUCCESS'
export const UPDATE_COMPONENT_MODEL_PRESPECTIVES_FAILURE = 'saga/Model/UPDATE_COMPONENT_MODEL_PRESPECTIVES_FAILURE'

export const actionCreators = {
  fetchMetaModelPrespective: createAction(FETCH_META_MODEL_PRESPECTIVE),
  fetchMetaModelPrespectiveSuccess: createAction(FETCH_META_MODEL_PRESPECTIVE_SUCCESS),
  fetchMetaModelPrespectiveFailure: createAction(FETCH_META_MODEL_PRESPECTIVE_FAILURE),
  fetchModelPrespectives: createAction(FETCH_MODEL_PRESPECTIVES),
  fetchModelPrespectivesSuccess: createAction(FETCH_MODEL_PRESPECTIVES_SUCCESS),
  fetchModelPrespectivesFailure: createAction(FETCH_MODEL_PRESPECTIVES_FAILURE),
  updateModelPrespectives: createAction(UPDATE_MODEL_PRESPECTIVES),
  updateModelPrespectivesSuccess: createAction(UPDATE_MODEL_PRESPECTIVES_SUCCESS),
  updateModelPrespectivesFailure: createAction(UPDATE_MODEL_PRESPECTIVES_FAILURE),
  fetchAllModelPrespectives: createAction(FETCH_ALL_MODEL_PRESPECTIVES),
  fetchAllModelPrespectivesSuccess: createAction(FETCH_ALL_MODEL_PRESPECTIVES_SUCCESS),
  fetchAllModelPrespectivesFailure: createAction(FETCH_ALL_MODEL_PRESPECTIVES_FAILURE),
  updateAllModelPrespectives: createAction(UPDATE_ALL_MODEL_PRESPECTIVES),
  updateAllModelPrespectivesSuccess: createAction(UPDATE_ALL_MODEL_PRESPECTIVES_SUCCESS),
  updateAllModelPrespectivesFailure: createAction(UPDATE_ALL_MODEL_PRESPECTIVES_FAILURE),
  fetchComponentModelPrespectives: createAction(FETCH_COMPONENT_MODEL_PRESPECTIVES),
  fetchComponentModelPrespectivesSuccess: createAction(FETCH_COMPONENT_MODEL_PRESPECTIVES_SUCCESS),
  fetchComponentModelPrespectivesFailure: createAction(FETCH_COMPONENT_MODEL_PRESPECTIVES_FAILURE),
  fetchMetaModelPrespectives: createAction(FETCH_META_MODEL_PRESPECTIVES),
  fetchMetaModelPrespectivesSuccess: createAction(FETCH_META_MODEL_PRESPECTIVES_SUCCESS),
  fetchMetaModelPrespectivesFailure: createAction(FETCH_META_MODEL_PRESPECTIVES_FAILURE),
  deleteComponentModelPerspectives: createAction(DELETE_COMPONENT_MODEL_PERSPECTIVES),
  deleteComponentModelPerspectivesSuccess: createAction(DELETE_COMPONENT_MODEL_PERSPECTIVES_SUCCESS),
  deleteComponentModelPerspectivesFailure: createAction(DELETE_COMPONENT_MODEL_PERSPECTIVES_FAILURE),
  updateComponentModelPrespectives: createAction(UPDATE_COMPONENT_MODEL_PRESPECTIVES),
  updateComponentModelPrespectivesSuccess: createAction(UPDATE_COMPONENT_MODEL_PRESPECTIVES_SUCCESS),
  updateComponentModelPrespectivesFailure: createAction(UPDATE_COMPONENT_MODEL_PRESPECTIVES_FAILURE)
}

export default function * watchModel () {
  yield [
    takeLatest(FETCH_META_MODEL_PRESPECTIVE, getMetaModelPrespective),
    takeLatest(FETCH_MODEL_PRESPECTIVES, getModelPerspectives),
    takeLatest(UPDATE_MODEL_PRESPECTIVES, updateModelPrespectives),
    takeLatest(FETCH_ALL_MODEL_PRESPECTIVES, getAllModelPerspectives),
    takeLatest(UPDATE_ALL_MODEL_PRESPECTIVES, updateAllModelPerspectives),
    takeLatest(FETCH_COMPONENT_MODEL_PRESPECTIVES, getComponentModelPerspectives),
    takeLatest(FETCH_META_MODEL_PRESPECTIVES, getMetaModelPrespectives),
    takeLatest(DELETE_COMPONENT_MODEL_PERSPECTIVES, deleteComponentModelPerspectives),
    takeLatest(UPDATE_COMPONENT_MODEL_PRESPECTIVES, updateComponentModelPrespectives)
  ]
}

export function * updateComponentModelPrespectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const modelPrespective = yield call(
      axios.patch,
      api.getModelPerspectives,
      action.payload.data,
      {params: action.payload.queryString},
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.updateComponentModelPrespectivesSuccess(modelPrespective.data))
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
      yield put(actionCreators.updateComponentModelPrespectivesSuccess(errorObj))
    } else {
      yield put(actionCreators.updateComponentModelPrespectivesFailure(error))
    }
  }
}

export function * deleteComponentModelPerspectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const deleteModelPerspective = yield call(
      axios.delete,
      api.deleteComponent(action.payload.id),
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.deleteComponentModelPerspectivesSuccess(deleteModelPerspective.data))
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
      yield put(actionCreators.deleteComponentModelPerspectivesSuccess(errorObj))
    } else {
      yield put(actionCreators.deleteComponentModelPerspectivesFailure(error))
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
    yield put(actionCreators.fetchMetaModelPrespectiveSuccess(metaModelPrespective.data))
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
      yield put(actionCreators.fetchMetaModelPrespectiveSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchMetaModelPrespectiveFailure(error))
    }
  }
}

export function * getModelPerspectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    axios.defaults.headers.common['responseType'] = 'stream'
    const modelPrespectives = yield call(
      axios.get,
      api.getModelPerspectives,
      {params: action.payload},
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchModelPrespectivesSuccess(modelPrespectives.data))
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
      yield put(actionCreators.fetchModelPrespectivesSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchModelPrespectivesFailure(error))
    }
  }
}

export function * getComponentModelPerspectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const componentModelPrespectives = yield call(
      axios.get,
      api.getComponentModelPerspectives(action.payload),
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchComponentModelPrespectivesSuccess(componentModelPrespectives.data))
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
      yield put(actionCreators.fetchComponentModelPrespectivesSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchComponentModelPrespectivesFailure(error))
    }
  }
}

export function * updateModelPrespectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const modelPrespectives = yield call(
      axios.patch,
      api.getModelPerspectives,
      action.payload.data,
      {params: action.payload.queryString},
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.updateModelPrespectivesSuccess(modelPrespectives.data))
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
      yield put(actionCreators.updateModelPrespectivesSuccess(errorObj))
    } else {
      yield put(actionCreators.updateModelPrespectivesFailure(error))
    }
  }
}

export function * getAllModelPerspectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    axios.defaults.headers.common['Accept'] = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const modelPrespectives = yield call(
      axios.get,
      api.getAllModelPerspectives(action.payload),
      {'responseType': 'blob'},
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchAllModelPrespectivesSuccess(modelPrespectives.data))
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
      yield put(actionCreators.fetchAllModelPrespectivesSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchAllModelPrespectivesFailure(error))
    }
  }
}

export function * updateAllModelPerspectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    axios.defaults.headers.common['Accept'] = 'application/json'
    axios.defaults.headers.common['Content-Type'] = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const modelPrespectives = yield call(
      axios.post,
      api.getAllModelPerspectives(action.payload.queryPart),
      action.payload.formData,
      {'headers': {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }},
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.updateAllModelPrespectivesSuccess(modelPrespectives.data))
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
      yield put(actionCreators.updateAllModelPrespectivesSuccess(errorObj))
    } else {
      yield put(actionCreators.updateAllModelPrespectivesFailure(error))
    }
  }
}

export function * getMetaModelPrespectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const metaModelPrespectives = yield call(
      axios.get,
      api.getMetaModelPerspectives,
      {params: action.payload},
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchMetaModelPrespectivesSuccess(metaModelPrespectives.data))
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
      yield put(actionCreators.fetchMetaModelPrespectivesSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchMetaModelPrespectivesFailure(error))
    }
  }
}
