import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_CLIENT_ACCESS_TOKEN = 'saga/Basic/FETCH_CLIENT_ACCESS_TOKEN'
export const FETCH_CLIENT_ACCESS_TOKEN_SUCCESS = 'saga/Basic/FETCH_CLIENT_ACCESS_TOKEN_SUCCESS'
export const FETCH_CLIENT_ACCESS_TOKEN_FAILURE = 'saga/Basic/FETCH_CLIENT_ACCESS_TOKEN_FAILURE'
export const FETCH_USER_AUTHENTICATION = 'saga/Basic/FETCH_USER_AUTHENTICATION'
export const FETCH_USER_AUTHENTICATION_SUCCESS = 'saga/Basic/FETCH_USER_AUTHENTICATION_SUCCESS'
export const FETCH_USER_AUTHENTICATION_FAILURE = 'saga/Basic/FETCH_USER_AUTHENTICATION_FAILURE'
export const UPDATE_NOTIFICATION_VIEW_STATUS = 'saga/Basic/UPDATE_NOTIFICATION_VIEW_STATUS'
export const UPDATE_NOTIFICATION_VIEW_STATUS_SUCCESS = 'saga/Basic/UPDATE_NOTIFICATION_VIEW_STATUS_SUCCESS'
export const UPDATE_NOTIFICATION_VIEW_STATUS_FAILURE = 'saga/Basic/UPDATE_NOTIFICATION_VIEW_STATUS_FAILURE'
export const FETCH_ROLES = 'saga/Basic/FETCH_ROLES'
export const FETCH_ROLES_SUCCESS = 'saga/Basic/FETCH_ROLES_SUCCESS'
export const FETCH_ROLES_FAILURE = 'saga/Basic/FETCH_ROLES_FAILURE'

export const actionCreators = {
  fetchClientAccessToken: createAction(FETCH_CLIENT_ACCESS_TOKEN),
  fetchClientAccessTokenSuccess: createAction(FETCH_CLIENT_ACCESS_TOKEN_SUCCESS),
  fetchClientAccessTokenFailure: createAction(FETCH_CLIENT_ACCESS_TOKEN_FAILURE),
  fetchUserAuthentication: createAction(FETCH_USER_AUTHENTICATION),
  fetchUserAuthenticationSuccess: createAction(FETCH_USER_AUTHENTICATION_SUCCESS),
  fetchUserAuthenticationFailure: createAction(FETCH_USER_AUTHENTICATION_FAILURE),
  updateNotificationViewStatus: createAction(UPDATE_NOTIFICATION_VIEW_STATUS),
  updateNotificationViewStatusSuccess: createAction(UPDATE_NOTIFICATION_VIEW_STATUS_SUCCESS),
  updateNotificationViewStatusFailure: createAction(UPDATE_NOTIFICATION_VIEW_STATUS_FAILURE),
  fetchRoles: createAction(FETCH_ROLES),
  fetchRolesSuccess: createAction(FETCH_ROLES_SUCCESS),
  fetchRolesFailure: createAction(FETCH_ROLES_FAILURE)
}

export default function * watchBasic () {
  yield [
    takeLatest(FETCH_CLIENT_ACCESS_TOKEN, getClientAccessToken),
    takeLatest(FETCH_USER_AUTHENTICATION, getUserAuthentication),
    takeLatest(UPDATE_NOTIFICATION_VIEW_STATUS, updateNotificationViewStatus),
    takeLatest(FETCH_ROLES, getRoles)
  ]
}

export function * getClientAccessToken (action) {
  try {
    const clientAccessToken = yield call(
      axios.post,
      api.clientAccessToken,
      action.payload
    )
    yield put(actionCreators.fetchClientAccessTokenSuccess(clientAccessToken.data))
  } catch (error) {
    yield put(actionCreators.fetchClientAccessTokenFailure(error))
  }
}

export function * getUserAuthentication (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const userAuthentication = yield call(
      axios.get,
      api.authenticateUser
    )
    yield put(actionCreators.fetchUserAuthenticationSuccess(userAuthentication.data))
  } catch (error) {
    yield put(actionCreators.fetchUserAuthenticationFailure(error))
  }
}

export function * updateNotificationViewStatus (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const updateNotificationViewStatus = yield call(
      axios.patch,
      api.updateNotificationViewStatus
    )
    yield put(actionCreators.updateNotificationViewStatusSuccess(updateNotificationViewStatus.data))
  } catch (error) {
    yield put(actionCreators.updateNotificationViewStatusFailure(error))
  }
}

export function * getRoles (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const roles = yield call(
      axios.get,
      api.getRoles
    )
    yield put(actionCreators.fetchRolesSuccess(roles.data))
  } catch (error) {
    yield put(actionCreators.fetchRolesFailure(error))
  }
}
