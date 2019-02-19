import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_EX_USERS = 'saga/users/FETCH_EX_USERS'
export const FETCH_EX_USERS_SUCCESS = 'saga/users/FETCH_EX_USERS_SUCCESS'
export const FETCH_EX_USERS_FAILURE = 'saga/users/FETCH_EX_USERS_FAILURE'
export const FETCH_USERS = 'saga/users/FETCH_USERS'
export const FETCH_USERS_SUCCESS = 'saga/users/FETCH_USERS_SUCCESS'
export const FETCH_USERS_FAILURE = 'saga/users/FETCH_USERS_FAILURE'
export const ADD_USER = 'saga/users/ADD_USER'
export const ADD_USER_SUCCESS = 'saga/users/ADD_USER_SUCCESS'
export const ADD_USER_FAILURE = 'saga/users/ADD_USER_FAILURE'
export const UPDATE_USER = 'saga/users/UPDATE_USER'
export const UPDATE_USER_SUCCESS = 'saga/users/UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILURE = 'saga/users/UPDATE_USER_FAILURE'
export const DELETE_USER = 'saga/users/FETCH_AGREEMENT_ENTITLEMENTS'
export const DELETE_USER_SUCCESS = 'saga/users/FETCH_AGREEMENT_ENTITLEMENTS_SUCCESS'
export const DELETE_USER_FAILURE = 'saga/users/FETCH_AGREEMENT_ENTITLEMENTS_FAILURE'
export const FETCH_USER = 'saga/users/FETCH_USERS'
export const FETCH_USER_SUCCESS = 'saga/users/FETCH_USER_SUCCESS'
export const FETCH_USER_FAILURE = 'saga/users/FETCH_USER_FAILURE'
export const CHANGE_PASSWORD = 'saga/users/CHANGE_PASSWORD'
export const CHANGE_PASSWORD_SUCCESS = 'saga/users/CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAILURE = 'saga/users/CHANGE_PASSWORD_FAILURE'

export const actionCreators = {
  fetchExUsers: createAction(FETCH_EX_USERS),
  fetchExUsersSuccess: createAction(FETCH_EX_USERS_SUCCESS),
  fetchExUsersFailure: createAction(FETCH_EX_USERS_FAILURE),
  fetchUsers: createAction(FETCH_USERS),
  fetchUsersSuccess: createAction(FETCH_USERS_SUCCESS),
  fetchUsersFailure: createAction(FETCH_USERS_FAILURE),
  addUser: createAction(ADD_USER),
  addUserSuccess: createAction(ADD_USER_SUCCESS),
  addUserFailure: createAction(ADD_USER_FAILURE),
  updateUser: createAction(UPDATE_USER),
  updateUserSuccess: createAction(UPDATE_USER_SUCCESS),
  updateUserFailure: createAction(UPDATE_USER_FAILURE),
  deleteUser: createAction(DELETE_USER),
  deleteUserSuccess: createAction(DELETE_USER_SUCCESS),
  deleteUserFailure: createAction(DELETE_USER_FAILURE),
  fetchUser: createAction(FETCH_USER),
  fetchUserSuccess: createAction(FETCH_USER_SUCCESS),
  fetchUserFailure: createAction(FETCH_USER_FAILURE),
  changePassword: createAction(CHANGE_PASSWORD),
  changePasswordSuccess: createAction(CHANGE_PASSWORD_SUCCESS),
  changePasswordFailure: createAction(CHANGE_PASSWORD_FAILURE)
}

export default function * watchUserActions () {
  yield [
    takeLatest(FETCH_EX_USERS, getExUsers),
    takeLatest(FETCH_USERS, getUsers),
    takeLatest(ADD_USER, createUser),
    takeLatest(UPDATE_USER, updateUser),
    takeLatest(DELETE_USER, deleteUser),
    takeLatest(FETCH_USER, getUser),
    takeLatest(CHANGE_PASSWORD, changePassword)
  ]
}

export function * changePassword (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const changePassword = yield call(
      axios.post,
      api.forgotPassword,
      action.payload
    )
    yield put(actionCreators.changePasswordSuccess(changePassword.data))
  } catch (error) {
    yield put(actionCreators.changePasswordFailure(error))
  }
}

export function * getExUsers (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const exUsers = yield call(
      axios.get,
      api.getExternalUsers,
      {params: action.payload}
    )
    yield put(actionCreators.fetchExUsersSuccess(exUsers.data))
  } catch (error) {
    yield put(actionCreators.fetchExUsersFailure(error))
  }
}

export function * getUsers (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const users = yield call(
      axios.get,
      api.createUser
    )
    yield put(actionCreators.fetchUsersSuccess(users.data))
  } catch (error) {
    yield put(actionCreators.fetchUsersFailure(error))
  }
}

export function * getUser (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const user = yield call(
      axios.get,
      api.getUser(action.payload.userId)
    )
    yield put(actionCreators.fetchUserSuccess(user.data))
  } catch (error) {
    yield put(actionCreators.fetchUserFailure(error))
  }
}

export function * createUser (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const user = yield call(
      axios.post,
      api.createUser,
      action.payload
    )
    yield put(actionCreators.addUserSuccess(user.data))
  } catch (error) {
    yield put(actionCreators.addUserFailure(error))
  }
}

export function * updateUser (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const user = yield call(
      axios.patch,
      api.getUser(action.payload.userId),
      action.payload.data
    )
    yield put(actionCreators.updateUserSuccess(user.data))
  } catch (error) {
    yield put(actionCreators.updateUserFailure(error))
  }
}

export function * deleteUser (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const user = yield call(
      axios.delete,
      api.deleteUser(action.payload.user_id)
      // {params: action.payload}
    )
    yield put(actionCreators.deleteUserSuccess(user.data))
  } catch (error) {
    yield put(actionCreators.deleteUserFailure(error))
  }
}
