import { createAction, handleActions } from 'redux-actions'
import { FETCH_PACKAGES_LISTING_SUCCESS, CREATE_PACKAGE_SUCCESS, DELETE_PACKAGE_SUCCESS } from '../../sagas/packages/packagesSaga'
// // Name Spaced Action Types

const SET_PACKAGES_ACTION_SETTINGS = 'packagesReducer/SET_PACKAGES_ACTION_SETTINGS'
const SET_CURRENT_PAGE = 'packagesReducer/SET_CURRENT_PAGE'
const SET_PER_PAGE = 'packagesReducer/SET_PER_PAGE'
const RESET_RESPONSE = 'packagesReducer/RESET_RESPONSE'
const SET_CRUDE_VALUES = 'packagesListingReducer/SET_CRUDE_VALUES'
const SET_CRUDE_VALUES_FLAG = 'packagesListingReducer/SET_CRUDE_VALUES_FLAG'

export const actions = {
    SET_PACKAGES_ACTION_SETTINGS,
    FETCH_PACKAGES_LISTING_SUCCESS,
    CREATE_PACKAGE_SUCCESS,
    SET_CURRENT_PAGE,
    SET_PER_PAGE,
    RESET_RESPONSE,
    SET_CRUDE_VALUES,
    SET_CRUDE_VALUES_FLAG,
    DELETE_PACKAGE_SUCCESS
    // DELETE_ROLE_SUCCESS
 }

export const actionCreators = {
   setPackagesActionSettings: createAction(SET_PACKAGES_ACTION_SETTINGS),
   setCurrentPage: createAction(SET_CURRENT_PAGE),
   setPerPage: createAction(SET_PER_PAGE),
   resetResponse: createAction(RESET_RESPONSE),
   setCrudeValues: createAction(SET_CRUDE_VALUES),
   setCrudeValuesflag: createAction(SET_CRUDE_VALUES_FLAG)
}

export const initialState = {
  packagesListing: '',
  package: '',
  deletePackageResponse: '',
  isCrudSelected: {
    None: false,
    Create: false,
    Update: false,
    Delete: false,
    Read: false
  },
  packagesActionSettings: {
    isAddPackagesModalOpen: false,
    isDeletePackagesModalOpen: false,
    isEditPackagesModalOpen: false
    // deleteRoleData: ''
  },
  currentPage: 1,
  perPage: 10,
  crude: {
    None: 0,
    Create: 1,
    Update: 4,
    Delete: 8,
    Read: 2
  }

}

export default handleActions(
  {
    [FETCH_PACKAGES_LISTING_SUCCESS]: (state, action) => ({
      ...state,
      packagesListing: action.payload
    }),
    [SET_PACKAGES_ACTION_SETTINGS]: (state, action) => ({
      ...state,
      packagesActionSettings: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
    }),
    [SET_CRUDE_VALUES]: (state, action) => ({
      ...state,
      crude: action.payload
    }),
    [SET_CRUDE_VALUES_FLAG]: (state, action) => ({
      ...state,
      isCrudSelected: action.payload
    }),
    [CREATE_PACKAGE_SUCCESS]: (state, action) => ({
      ...state,
      package: action.payload
    }),
    [DELETE_PACKAGE_SUCCESS]: (state, action) => ({
      ...state,
      deletePackageResponse: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      resetResponse: action.payload,
      package: '',
      deletePackageResponse: ''
    })
    // [DELETE_ROLE_SUCCESS]: (state, action) => ({
    //   ...state,
    //   deleteRoleResponse: action.payload
    // })
  },
  initialState
)
