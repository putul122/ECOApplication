import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api, { timeOut } from '../../../constants'

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
export const FETCH_PACKAGE = 'saga/Basic/FETCH_PACKAGE'
export const FETCH_PACKAGE_SUCCESS = 'saga/Basic/FETCH_PACKAGE_SUCCESS'
export const FETCH_PACKAGE_FAILURE = 'saga/Basic/FETCH_PACKAGE_FAILURE'
export const FETCH_SLA_PACKAGE = 'saga/Basic/FETCH_SLA_PACKAGE'
export const FETCH_SLA_PACKAGE_SUCCESS = 'saga/Basic/FETCH_SLA_PACKAGE_SUCCESS'
export const FETCH_SLA_PACKAGE_FAILURE = 'saga/Basic/FETCH_SLA_PACKAGE_FAILURE'
export const FETCH_ALL_PACKAGES = 'saga/Basic/FETCH_ALL_PACKAGES'
export const FETCH_ALL_PACKAGES_SUCCESS = 'saga/Basic/FETCH_ALL_PACKAGES_SUCCESS'
export const FETCH_ALL_PACKAGES_FAILURE = 'saga/Basic/FETCH_ALL_PACKAGES_FAILURE'

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
  fetchRolesFailure: createAction(FETCH_ROLES_FAILURE),
  fetchPackage: createAction(FETCH_PACKAGE),
  fetchPackageSuccess: createAction(FETCH_PACKAGE_SUCCESS),
  fetchPackageFailure: createAction(FETCH_PACKAGE_FAILURE),
  fetchSLAPackage: createAction(FETCH_SLA_PACKAGE),
  fetchSLAPackageSuccess: createAction(FETCH_SLA_PACKAGE_SUCCESS),
  fetchSLAPackageFailure: createAction(FETCH_SLA_PACKAGE_FAILURE),
  fetchAllPackages: createAction(FETCH_ALL_PACKAGES),
  fetchAllPackagesSuccess: createAction(FETCH_ALL_PACKAGES_SUCCESS),
  fetchAllPackagesFailure: createAction(FETCH_ALL_PACKAGES_FAILURE)
}

export default function * watchBasic () {
  yield [
    takeLatest(FETCH_CLIENT_ACCESS_TOKEN, getClientAccessToken),
    takeLatest(FETCH_USER_AUTHENTICATION, getUserAuthentication),
    takeLatest(UPDATE_NOTIFICATION_VIEW_STATUS, updateNotificationViewStatus),
    takeLatest(FETCH_ROLES, getRoles),
    takeLatest(FETCH_PACKAGE, getPackage),
    takeLatest(FETCH_SLA_PACKAGE, getSLAPackage),
    takeLatest(FETCH_ALL_PACKAGES, getAllPackages)
  ]
}

export function * getClientAccessToken (action) {
  try {
    const clientAccessToken = yield call(
      axios.post,
      api.clientAccessToken,
      action.payload,
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchClientAccessTokenSuccess(clientAccessToken.data))
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
      yield put(actionCreators.fetchClientAccessTokenSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchClientAccessTokenFailure(error))
    }
  }
}

export function * getUserAuthentication (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const userAuthentication = yield call(
      axios.get,
      api.authenticateUser,
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchUserAuthenticationSuccess(userAuthentication.data))
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
      yield put(actionCreators.fetchUserAuthenticationSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchUserAuthenticationFailure(error))
    }
  }
}

export function * updateNotificationViewStatus (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const updateNotificationViewStatus = yield call(
      axios.patch,
      api.updateNotificationViewStatus,
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.updateNotificationViewStatusSuccess(updateNotificationViewStatus.data))
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
      yield put(actionCreators.updateNotificationViewStatusSuccess(errorObj))
    } else {
      yield put(actionCreators.updateNotificationViewStatusFailure(error))
    }
  }
}

export function * getRoles (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const roles = yield call(
      axios.get,
      api.getRoles,
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchRolesSuccess(roles.data))
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
      yield put(actionCreators.fetchRolesSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchRolesFailure(error))
    }
  }
}

export function * getPackage (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const packages = yield call(
      axios.get,
      api.getPackage,
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchPackageSuccess(packages.data))
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
      yield put(actionCreators.fetchPackageSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchPackageFailure(error))
    }
  }
}

export function * getSLAPackage (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const packages = yield call(
      axios.get,
      api.getSLAPackage,
      {'timeout': timeOut.duration}
    )
    yield put(actionCreators.fetchSLAPackageSuccess(packages.data))
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
      yield put(actionCreators.fetchSLAPackageSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchSLAPackageFailure(error))
    }
  }
}

export function * getAllPackages (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const packages = yield call(
      axios.get,
      api.getAllPackages,
      {'timeout': timeOut.duration}
    )
    // const packages1 = yield call(
    //   axios.get,
    //   {'timeout': 4000}
    // )
    // console.log('packages1', packages1)
    yield put(actionCreators.fetchAllPackagesSuccess(packages.data))
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
      yield put(actionCreators.fetchAllPackagesSuccess(errorObj))
    } else {
      yield put(actionCreators.fetchAllPackagesFailure(error))
    }
  }
}
