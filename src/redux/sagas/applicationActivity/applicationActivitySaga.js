import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api, { timeOut } from '../../../constants'

// Saga action strings
export const ACTIVITY_MESSAGE = 'saga/Login/ACTIVITY_MESSAGE'
export const ACTIVITY_MESSAGE_SUCCESS = 'saga/Login/ACTIVITY_MESSAGE_SUCCESS'
export const ACTIVITY_MESSAGE_FAILURE = 'saga/Login/ACTIVITY_MESSAGE_FAILURE'

export const actionCreators = {
  activityMessage: createAction(ACTIVITY_MESSAGE),
  activityMessageSuccess: createAction(ACTIVITY_MESSAGE_SUCCESS),
  activityMessageFailure: createAction(ACTIVITY_MESSAGE_FAILURE)
}

export default function * watchApplicationActivity () {
  yield takeLatest(ACTIVITY_MESSAGE, activityMessage)
}

export function * activityMessage (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const activityMessage = yield call(
      axios.get,
      api.getActivityMessage(),
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.activityMessageSuccess(activityMessage.data))
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
      yield put(actionCreators.activityMessageSuccess(errorObj))
    } else {
      yield put(actionCreators.activityMessageFailure(error))
    }
  }
}
