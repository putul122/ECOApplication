import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'

// Saga action strings
export const FETCH_STARS = 'saga/KpiPerformance/FETCH_STARS'
export const FETCH_STARS_SUCCESS = 'saga/KpiPerformance/FETCH_STARS_SUCCESS'
export const FETCH_STARS_FAILURE = 'saga/KpiPerformance/FETCH_STARS_FAILURE'

export const actionCreators = {
  fetchStars: createAction(FETCH_STARS),
  fetchStarsSuccess: createAction(FETCH_STARS_SUCCESS),
  fetchStarsFailure: createAction(FETCH_STARS_FAILURE)
}

export default function * watchKpiPerformance () {
  yield takeLatest(FETCH_STARS, getKpiPerformance)
}

export function * getKpiPerformance (action) {
  try {
    const repoInfo = yield call(axios.get, 'https://api.github.com/repos/ericwooley/react-native-redux-jest-starter-kit')
    yield put(actions.fetchStarsSuccess(repoInfo.data.stargazers_count))
  } catch (error) {
    yield put(actions.fetchStarsFailure(error))
  }
}

