import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_CATEGORY = 'saga/service/FETCH_CATEGORY'
export const FETCH_CATEGORY_SUCCESS = 'saga/service/FETCH_CATEGORY_SUCCESS'
export const FETCH_CATEGORY_FAILURE = 'saga/service/FETCH_CATEGORY_FAILURE'
export const FETCH_OWNER = 'saga/service/FETCH_OWNER'
export const FETCH_OWNER_SUCCESS = 'saga/service/FETCH_OWNER_SUCCESS'
export const FETCH_OWNER_FAILURE = 'saga/service/FETCH_OWNER_FAILURE'

export const actionCreators = {
  fetchCategory: createAction(FETCH_CATEGORY),
  fetchCategorySuccess: createAction(FETCH_CATEGORY_SUCCESS),
  fetchCategoryFailure: createAction(FETCH_CATEGORY_FAILURE),
  fetchOwner: createAction(FETCH_OWNER),
  fetchOwnerSuccess: createAction(FETCH_OWNER_SUCCESS),
  fetchOwnerFailure: createAction(FETCH_OWNER_FAILURE)
}

export default function * watchServices () {
  yield [
    takeLatest(FETCH_CATEGORY, getCategory),
    takeLatest(FETCH_OWNER, getOwner)
  ]
}

export function * getCategory (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const categories = yield call(
      axios.get,
      api.getComponentTypeComponents(action.payload)
    )
    yield put(actionCreators.fetchCategorySuccess(categories.data))
  } catch (error) {
    yield put(actionCreators.fetchCategoryFailure(error))
  }
}

export function * getOwner (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const owners = yield call(
      axios.get,
      api.getComponentTypeComponents(action.payload)
    )
    yield put(actionCreators.fetchOwnerSuccess(owners.data))
  } catch (error) {
    yield put(actionCreators.fetchOwnerFailure(error))
  }
}
