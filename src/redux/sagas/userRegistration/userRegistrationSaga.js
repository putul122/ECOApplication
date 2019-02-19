import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const REGISTER_USER = 'saga/UserRegistration/REGISTER_USER'
export const REGISTER_USER_SUCCESS = 'saga/UserRegistration/REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILURE = 'saga/UserRegistration/REGISTER_USER_FAILURE'

export const actionCreators = {
  registerUser: createAction(REGISTER_USER),
  registerUserSuccess: createAction(REGISTER_USER_SUCCESS),
  registerUserFailure: createAction(REGISTER_USER_FAILURE)
}

export default function * watchRegisterUser () {
  yield takeLatest(REGISTER_USER, registerUser)
}

export function * registerUser (action) {
  try {
    console.log('action c user', action)
    const registerUser = yield call(
      axios.post,
      api.registerUser,
      action.payload
    )
    yield put(actionCreators.registerUserSuccess(registerUser.data.data))
  } catch (error) {
    yield put(actionCreators.registerUserFailure(error))
  }
}
