import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

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
      api.registerProcess
    )
    console.log('register Process response', registerProcess)
    yield put(actionCreators.fetchRegisterProcessSuccess(registerProcess.data))
  } catch (error) {
    yield put(actionCreators.fetchRegisterProcessFailure(error))
  }
}
