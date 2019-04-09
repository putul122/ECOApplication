import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_ROLES = 'saga/roles/FETCH_ROLES'
export const FETCH_ROLES_SUCCESS = 'saga/roles/FETCH_ROLES_SUCCESS'
export const FETCH_ROLES_FAILURE = 'saga/roles/FETCH_ROLES_FAILURE'
export const CREATE_ROLES = 'saga/roles/CREATE_ROLES'
export const CREATE_ROLES_SUCCESS = 'saga/roles/CREATE_ROLES_SUCCESS'
export const CREATE_ROLES_FAILURE = 'saga/roles/CREATE_ROLES_FAILURE'
export const DELETE_ROLE = 'saga/roles/DELETE_ROLE'
export const DELETE_ROLE_SUCCESS = 'saga/roles/DELETE_ROLE_SUCCESS'
export const DELETE_ROLE_FAILURE = 'saga/roles/DELETE_ROLE_FAILURE'
export const UPDATE_ROLE = 'saga/roles/UPDATE_ROLE'
export const UPDATE_ROLE_SUCCESS = 'saga/roles/UPDATE_ROLE_SUCCESS'
export const UPDATE_ROLE_FAILURE = 'saga/roles/UPDATE_ROLE_FAILURE'
export const FETCH_ROLE_BY_ID = 'saga/roles/FETCH_ROLE_BY_ID'
export const FETCH_ROLE_BY_ID_SUCCESS = 'saga/roles/FETCH_ROLE_BY_ID_SUCCESS'
export const FETCH_ROLE_BY_ID_FAILURE = 'saga/roles/FETCH_ROLE_BY_ID_FAILURE'

export const actionCreators = {
  fetchRoles: createAction(FETCH_ROLES),
  fetchRolesSuccess: createAction(FETCH_ROLES_SUCCESS),
  fetchRolesFailure: createAction(FETCH_ROLES_FAILURE),
  createRoles: createAction(CREATE_ROLES),
  createRolesSuccess: createAction(CREATE_ROLES_SUCCESS),
  createRolesFailure: createAction(CREATE_ROLES_FAILURE),
  deleteRole: createAction(DELETE_ROLE),
  deleteRoleSuccess: createAction(DELETE_ROLE_SUCCESS),
  deleteRoleFailure: createAction(DELETE_ROLE_FAILURE),
  updateRole: createAction(UPDATE_ROLE),
  updateRoleSuccess: createAction(UPDATE_ROLE_SUCCESS),
  updateRoleFailure: createAction(UPDATE_ROLE_FAILURE),
  fetchRoleById: createAction(FETCH_ROLE_BY_ID),
  fetchRoleByIdSuccess: createAction(FETCH_ROLE_BY_ID_SUCCESS),
  fetchRoleByIdFailure: createAction(FETCH_ROLE_BY_ID_FAILURE)
}

export default function * watchRoles () {
  //  takeLatest(ROLES, roles)
   yield [
    takeLatest(FETCH_ROLES, getRoles),
    // takeLatest(FETCH_PROJECTS_SUMMARY, getProjectsSummary),
    // takeLatest(FETCH_PROJECT_BY_ID, getProjectById),
    // takeLatest(FETCH_PROJECT_ENTITLEMENTS, getProjectEntitlements),
    // takeLatest(FETCH_PROJECT_PROPERTIES, getProjectProperties),
    // takeLatest(UPDATE_PROJECT_PROPERTIES, updateProjectProperties),
    // takeLatest(UPDATE_PROJECT, updateProjectData),
    // takeLatest(FETCH_COMPONENT_TYPE_COMPONENTS, getComponentTypeComponents),
    // takeLatest(ADD_PROJECT_ENTITLEMENTS, addProjectEntitlements),
    // takeLatest(UPDATE_PROJECT_ENTITLEMENTS, updateProjectEntitlements),
    // takeLatest(DELETE_PROJECT_ENTITLEMENTS, deleteProjectEntitlements),
    takeLatest(UPDATE_ROLE, updateRole),
    takeLatest(DELETE_ROLE, deleteRole),
    takeLatest(CREATE_ROLES, createRoles),
    takeLatest(FETCH_ROLE_BY_ID, getRoleById)
]
}

export function * getRoles (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const roles = yield call(
      axios.get,
      api.getRoles,
      {params: action.payload}
    )
    yield put(actionCreators.fetchRolesSuccess(roles.data))
  } catch (error) {
    yield put(actionCreators.fetchRolesFailure(error))
  }
}

export function * createRoles (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const role = yield call(
      axios.post,
      api.createRole,
      action.payload
    )
    yield put(actionCreators.createRolesSuccess(role.data))
  } catch (error) {
    yield put(actionCreators.createRolesFailure(error))
  }
}

export function * deleteRole (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const roleDelete = yield call(
      axios.delete,
      api.deleteRole(action.payload.role_id)
     )
    yield put(actionCreators.deleteRoleSuccess(roleDelete.data))
  } catch (error) {
    yield put(actionCreators.deleteRoleFailure(error))
  }
}

export function * updateRole (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const role = yield call(
      axios.patch,
      api.updateRole(action.payload.role_id),
      action.payload.data
    )
    yield put(actionCreators.updateRoleSuccess(role.data))
  } catch (error) {
    yield put(actionCreators.updateRoleFailure(error))
  }
}

export function * getRoleById (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const role = yield call(
      axios.get,
      api.getRole(action.payload.role_id),
      action.payload.data
    )
    yield put(actionCreators.fetchRoleByIdSuccess(role.data))
  } catch (error) {
    yield put(actionCreators.fetchRoleByIdFailure(error))
  }
}
