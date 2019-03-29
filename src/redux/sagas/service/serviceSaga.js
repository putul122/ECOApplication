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

export const actionCreators = {
  fetchDropdownData: createAction(FETCH_DROPDOWN_DATA),
  fetchDropdownDataSuccess: createAction(FETCH_DROPDOWN_DATA_SUCCESS),
  fetchDropdownDataFailure: createAction(FETCH_DROPDOWN_DATA_FAILURE),
  fetchNestedModelPrespectives: createAction(FETCH_NESTED_MODEL_PRESPECTIVES),
  fetchNestedModelPrespectivesSuccess: createAction(FETCH_NESTED_MODEL_PRESPECTIVES_SUCCESS),
  fetchNestedModelPrespectivesFailure: createAction(FETCH_NESTED_MODEL_PRESPECTIVES_FAILURE)
}

export default function * watchServices () {
  yield [
    takeLatest(FETCH_DROPDOWN_DATA, getDropdownData),
    takeLatest(FETCH_NESTED_MODEL_PRESPECTIVES, getNestedModelPrespectives)
  ]
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
