import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api, { timeOut } from '../../../constants'

// Saga action strings
export const FETCH_REGISTER_PROCESS = 'saga/RegisterProcess/FETCH_REGISTER_PROCESS'
export const FETCH_REGISTER_PROCESS_SUCCESS = 'saga/RegisterProcess/FETCH_REGISTER_PROCESS_SUCCESS'
export const FETCH_REGISTER_PROCESS_FAILURE = 'saga/RegisterProcess/FETCH_REGISTER_PROCESS_FAILURE'

export const actionCreators = {
  fetchRegisterProcess: createAction(FETCH_REGISTER_PROCESS),
  fetchRegisterProcessSuccess: createAction(FETCH_REGISTER_PROCESS_SUCCESS),
  fetchRegisterProcessFailure: createAction(FETCH_REGISTER_PROCESS_FAILURE)
}

export default function * watchRegisterProcess () {
  yield takeLatest(FETCH_REGISTER_PROCESS, getRegisterProcess)
}

export function * getRegisterProcess (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const registerProcess = yield call(
      axios.get,
      api.registerProcess,
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchRegisterProcessSuccess(registerProcess.data))
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
      yield put(actionCreators.fetchRegisterProcessSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchRegisterProcessFailure(error))
    }
  }
}
