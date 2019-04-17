import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api, { timeOut } from '../../../constants'

// Saga action strings
export const FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES = 'saga/componentModalView/FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES'
export const FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS = 'saga/componentModalView/FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE = 'saga/componentModalView/FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE'
export const FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS = 'saga/componentModalView/FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS'
export const FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS = 'saga/componentModalView/FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE = 'saga/componentModalView/FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE'

export const actionCreators = {
  fetchcomponentTypeComponentProperties: createAction(FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES),
  fetchcomponentTypeComponentPropertiesSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS),
  fetchcomponentTypeComponentPropertiesFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE),
  fetchcomponentTypeComponentRelationships: createAction(FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS),
  fetchcomponentTypeComponentRelationshipsSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS),
  fetchcomponentTypeComponentRelationshipsFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE)
}

export default function * watchComponentModalView () {
  yield [
    takeLatest(FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES, getComponentTypeComponentProperties),
    takeLatest(FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS, getComponentTypeComponentRelationships)
  ]
}

export function * getComponentTypeComponentProperties (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentProperty(action.payload),
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchcomponentTypeComponentPropertiesSuccess(componentTypes.data))
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
      yield put(actionCreators.fetchcomponentTypeComponentPropertiesSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchcomponentTypeComponentPropertiesFailure(error))
    }
  }
}

export function * getComponentTypeComponentRelationships (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentRelationships(action.payload),
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchcomponentTypeComponentRelationshipsSuccess(componentTypes.data))
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
      yield put(actionCreators.fetchcomponentTypeComponentRelationshipsSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchcomponentTypeComponentRelationshipsFailure(error))
    }
  }
}
