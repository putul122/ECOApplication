import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'
// Saga action strings

export const PENALTY_SCORECARD_SUCCESS = 'saga/slaDashboard/PENALTY_SCORECARD_SUCCESS'
export const GET_PENALTY_SCORECARD = 'saga/slaDashboard/GET_PENALTY_SCORECARD'
export const PENALTY_SCORECARD_FAILURE = 'saga/slaDashboard/PENALTY_SCORECARD_FAILURE'

export const actionCreators = {
    penaltyScoreCardSuccess: createAction(PENALTY_SCORECARD_SUCCESS),
    penaltyScoreCardFailure: createAction(PENALTY_SCORECARD_FAILURE),
    getPenaltyScoreCardData: createAction(GET_PENALTY_SCORECARD)
}

export default function * watchPenaltyScoreCardActions () {
  yield [
    takeLatest(GET_PENALTY_SCORECARD, getpenaltyScoreCardData)
  ]
}

export function * getpenaltyScoreCardData (action) {
  try {
    axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('userAccessToken')
    const penaltyScoreCard = yield call(
      axios.get,
      api.penaltyScoreCardApi,
      action.payload
    )
    yield put(actionCreators.penaltyScoreCardSuccess(penaltyScoreCard.data))
  } catch (error) {
    yield put(actionCreators.penaltyScoreCardFailure(error))
  }
}
