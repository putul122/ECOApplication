import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_PACKAGES_LISTING = 'saga/packages/FETCH_PACKAGES_LISTING'
export const FETCH_PACKAGES_LISTING_SUCCESS = 'saga/packages/FETCH_PACKAGES_LISTING_SUCCESS'
export const FETCH_PACKAGES_LISTING_FAILURE = 'saga/packages/FETCH_PACKAGES_LISTING_FAILURE'
export const CREATE_PACKAGE = 'saga/packages/CREATE_PACKAGE'
export const CREATE_PACKAGE_SUCCESS = 'saga/packages/CREATE_PACKAGE_SUCCESS'
export const CREATE_PACKAGE_FAILURE = 'saga/packages/CREATE_PACKAGE_FAILURE'
export const DELETE_PACKAGE = 'saga/packages/DELETE_PACKAGE'
export const DELETE_PACKAGE_SUCCESS = 'saga/packages/DELETE_PACKAGE_SUCCESS'
export const DELETE_PACKAGE_FAILURE = 'saga/packages/DELETE_PACKAGE_FAILURE'
// export const UPDATE_ROLE = 'saga/roles/UPDATE_ROLE'
// export const UPDATE_ROLE_SUCCESS = 'saga/roles/UPDATE_ROLE_SUCCESS'
// export const UPDATE_ROLE_FAILURE = 'saga/roles/UPDATE_ROLE_FAILURE'
// export const FETCH_ROLE_BY_ID = 'saga/roles/FETCH_ROLE_BY_ID'
// export const FETCH_ROLE_BY_ID_SUCCESS = 'saga/roles/FETCH_ROLE_BY_ID_SUCCESS'
// export const FETCH_ROLE_BY_ID_FAILURE = 'saga/roles/FETCH_ROLE_BY_ID_FAILURE'

export const actionCreators = {
  fetchPackagesListing: createAction(FETCH_PACKAGES_LISTING),
  fetchPackagesListingSuccess: createAction(FETCH_PACKAGES_LISTING_SUCCESS),
  fetchPackagesListingFailure: createAction(FETCH_PACKAGES_LISTING_FAILURE),
  createPackage: createAction(CREATE_PACKAGE),
  createPackageSuccess: createAction(CREATE_PACKAGE_SUCCESS),
  createPackageFailure: createAction(CREATE_PACKAGE_FAILURE),
  deletePackage: createAction(DELETE_PACKAGE),
  deletePackageSuccess: createAction(DELETE_PACKAGE_SUCCESS),
  deletePackageFailure: createAction(DELETE_PACKAGE_FAILURE)
//   updateRole: createAction(UPDATE_ROLE),
//   updateRoleSuccess: createAction(UPDATE_ROLE_SUCCESS),
//   updateRoleFailure: createAction(UPDATE_ROLE_FAILURE),
//   fetchRoleById: createAction(FETCH_ROLE_BY_ID),
//   fetchRoleByIdSuccess: createAction(FETCH_ROLE_BY_ID_SUCCESS),
//   fetchRoleByIdFailure: createAction(FETCH_ROLE_BY_ID_FAILURE)
}

export default function * watchPackagesListing () {
  //  takeLatest(ROLES, roles)
   yield [
    takeLatest(FETCH_PACKAGES_LISTING, getPackagesListing),
    takeLatest(CREATE_PACKAGE, createPackage),
    takeLatest(DELETE_PACKAGE, deletePackage)
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

export function * getPackagesListing (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const packages = yield call(
      axios.get,
      api.getModelPackages,
      {params: action.payload}
    )
    yield put(actionCreators.fetchPackagesListingSuccess(packages.data))
  } catch (error) {
    yield put(actionCreators.fetchPackagesListingFailure(error))
  }
}

export function * createPackage (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const newpackage = yield call(
      axios.post,
      api.createPackage,
      action.payload
    )
    yield put(actionCreators.createPackageSuccess(newpackage.data))
  } catch (error) {
    yield put(actionCreators.createPackageFailure(error))
  }
}

export function * deletePackage (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const packageDelete = yield call(
      axios.delete,
      api.deletePackage(action.payload.model_package_key)
     )
    yield put(actionCreators.deletePackageSuccess(packageDelete.data))
  } catch (error) {
    yield put(actionCreators.deletePerspectiveFailure(error))
  }
}

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
