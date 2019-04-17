import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api, { timeOut } from '../../../constants'

// Saga action strings
export const CREATE_USER = 'saga/signUp/CREATE_USER'
export const CREATE_USER_SUCCESS = 'saga/signUp/CREATE_USER_SUCCESS'
export const CREATE_USER_FAILURE = 'saga/signUp/CREATE_USER_FAILURE'

export const actionCreators = {
  createUser: createAction(CREATE_USER),
  createUserSuccess: createAction(CREATE_USER_SUCCESS),
  createUserFailure: createAction(CREATE_USER_FAILURE)
}

export default function * watchCreateUser () {
  yield takeLatest(CREATE_USER, createUser)
}

export function * createUser (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const registerUser = yield call(
      axios.post,
      api.createUser,
      action.payload,
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.createUserSuccess(registerUser.data))
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
      yield put(actionCreators.createUserSuccess(errorObj))
    } else {
      yield put(actionCreators.createUserFailure(error))
    }
  }
}
