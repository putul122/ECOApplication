import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api, { timeOut } from '../../../constants'

// Saga action strings
export const LOGIN_USER = 'saga/Login/LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'saga/Login/LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'saga/Login/LOGIN_USER_FAILURE'

export const actionCreators = {
  loginUser: createAction(LOGIN_USER),
  loginUserSuccess: createAction(LOGIN_USER_SUCCESS),
  loginUserFailure: createAction(LOGIN_USER_FAILURE)
}

export default function * watchLoginUser () {
  yield takeLatest(LOGIN_USER, loginUser)
}

export function * loginUser (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const loginUser = yield call(
      axios.post,
      api.loginUser,
      action.payload,
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.loginUserSuccess(loginUser.data))
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
      yield put(actionCreators.loginUserSuccess(errorObj))
    } else {
      yield put(actionCreators.loginUserFailure(error))
    }
  }
}
