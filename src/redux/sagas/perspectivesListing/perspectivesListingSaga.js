import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_PERSPECTIVES_LISTING = 'saga/perspectivesListing/FETCH_PERSPECTIVES_LISTING'
export const FETCH_PERSPECTIVES_LISTING_SUCCESS = 'saga/perspectivesListing/FETCH_PERSPECTIVES_LISTING_SUCCESS'
export const FETCH_PERSPECTIVES_LISTING_FAILURE = 'saga/perspectivesListing/FETCH_PERSPECTIVES_LISTING_FAILURE'
export const FETCH_COMPONENT_TYPES = 'saga/perspectivesListing/FETCH_PERSPECTIVES_LISTING'
export const FETCH_COMPONENT_TYPES_SUCCESS = 'saga/perspectivesListing/FETCH_COMPONENT_TYPES_SUCCESS'
export const FETCH_COMPONENT_TYPES_FAILURE = 'saga/perspectivesListing/FETCH_COMPONENT_TYPES_FAILURE'
// export const CREATE_ROLES = 'saga/roles/CREATE_ROLES'
// export const CREATE_ROLES_SUCCESS = 'saga/roles/CREATE_ROLES_SUCCESS'
// export const CREATE_ROLES_FAILURE = 'saga/roles/CREATE_ROLES_FAILURE'
// export const DELETE_ROLE = 'saga/roles/DELETE_ROLE'
// export const DELETE_ROLE_SUCCESS = 'saga/roles/DELETE_ROLE_SUCCESS'
// export const DELETE_ROLE_FAILURE = 'saga/roles/DELETE_ROLE_FAILURE'
// export const UPDATE_ROLE = 'saga/roles/UPDATE_ROLE'
// export const UPDATE_ROLE_SUCCESS = 'saga/roles/UPDATE_ROLE_SUCCESS'
// export const UPDATE_ROLE_FAILURE = 'saga/roles/UPDATE_ROLE_FAILURE'
// export const FETCH_ROLE_BY_ID = 'saga/roles/FETCH_ROLE_BY_ID'
// export const FETCH_ROLE_BY_ID_SUCCESS = 'saga/roles/FETCH_ROLE_BY_ID_SUCCESS'
// export const FETCH_ROLE_BY_ID_FAILURE = 'saga/roles/FETCH_ROLE_BY_ID_FAILURE'

export const actionCreators = {
  fetchPerspectivesListing: createAction(FETCH_PERSPECTIVES_LISTING),
  fetchPerspectivesListingSuccess: createAction(FETCH_PERSPECTIVES_LISTING_SUCCESS),
  fetchPerspectivesListingFailure: createAction(FETCH_PERSPECTIVES_LISTING_FAILURE),
  fetchComponentTypes: createAction(FETCH_COMPONENT_TYPES),
  fetchComponentTypesSuccess: createAction(FETCH_COMPONENT_TYPES_SUCCESS),
  fetchComponentTypesFailure: createAction(FETCH_COMPONENT_TYPES_FAILURE)
//   createRoles: createAction(CREATE_ROLES),
//   createRolesSuccess: createAction(CREATE_ROLES_SUCCESS),
//   createRolesFailure: createAction(CREATE_ROLES_FAILURE),
//   deleteRole: createAction(DELETE_ROLE),
//   deleteRoleSuccess: createAction(DELETE_ROLE_SUCCESS),
//   deleteRoleFailure: createAction(DELETE_ROLE_FAILURE),
//   updateRole: createAction(UPDATE_ROLE),
//   updateRoleSuccess: createAction(UPDATE_ROLE_SUCCESS),
//   updateRoleFailure: createAction(UPDATE_ROLE_FAILURE),
//   fetchRoleById: createAction(FETCH_ROLE_BY_ID),
//   fetchRoleByIdSuccess: createAction(FETCH_ROLE_BY_ID_SUCCESS),
//   fetchRoleByIdFailure: createAction(FETCH_ROLE_BY_ID_FAILURE)
}

export default function * watchPerspectivesListing () {
  //  takeLatest(ROLES, roles)
   yield [
    takeLatest(FETCH_PERSPECTIVES_LISTING, getPerspectivesListing),
    takeLatest(FETCH_COMPONENT_TYPES, getComponentTypes)
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
    // takeLatest(UPDATE_ROLE, updateRole),
    // takeLatest(DELETE_ROLE, deleteRole),
    // takeLatest(CREATE_ROLES, createRoles),
    // takeLatest(FETCH_ROLE_BY_ID, getRoleById)
]
}

export function * getPerspectivesListing (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const perspectives = yield call(
      axios.get,
      api.getMetaModelPerspectivesListing,
      {params: action.payload}
    )
    yield put(actionCreators.fetchPerspectivesListingSuccess(perspectives.data))
  } catch (error) {
    yield put(actionCreators.fetchPerspectivesListingFailure(error))
  }
}

export function * getComponentTypes (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentTypes,
      {params: action.payload}
    )
    yield put(actionCreators.fetchComponentTypesSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentTypesFailure(error))
  }
}

// export function * deleteRole (action) {
//   try {
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
//     const roleDelete = yield call(
//       axios.delete,
//       api.deleteRole(action.payload.role_id)
//      )
//     yield put(actionCreators.deleteRoleSuccess(roleDelete.data))
//   } catch (error) {
//     yield put(actionCreators.deleteRoleFailure(error))
//   }
// }

// export function * updateRole (action) {
//   try {
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
//     const role = yield call(
//       axios.patch,
//       api.updateRole(action.payload.role_id),
//       action.payload.data
//     )
//     yield put(actionCreators.updateRoleSuccess(role.data))
//   } catch (error) {
//     yield put(actionCreators.updateRoleFailure(error))
//   }
// }

// export function * getRoleById (action) {
//   try {
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
//     const role = yield call(
//       axios.get,
//       api.getRole(action.payload.role_id),
//       action.payload.data
//     )
//     yield put(actionCreators.fetchRoleByIdSuccess(role.data))
//   } catch (error) {
//     yield put(actionCreators.fetchRoleByIdFailure(error))
//   }
// }
