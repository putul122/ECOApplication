import { createAction, handleActions } from 'redux-actions'
import { FETCH_ROLES_SUCCESS, CREATE_ROLES_SUCCESS, DELETE_ROLE_SUCCESS } from '../../sagas/roles/rolesSaga'
// // Name Spaced Action Types

const SET_ROLES_ACTION_SETTINGS = 'rolesReducer/SET_ROLES_ACTION_SETTINGS'
const SET_CURRENT_PAGE = 'rolesReducer/SET_CURRENT_PAGE'
const SET_PER_PAGE = 'rolesReducer/SET_PER_PAGE'
const RESET_RESPONSE = 'rolesReducer/RESET_RESPONSE'

export const actions = {
    SET_ROLES_ACTION_SETTINGS,
    FETCH_ROLES_SUCCESS,
    SET_CURRENT_PAGE,
    SET_PER_PAGE,
    CREATE_ROLES_SUCCESS,
    RESET_RESPONSE,
    DELETE_ROLE_SUCCESS
 }

export const actionCreators = {
   setRolesActionSettings: createAction(SET_ROLES_ACTION_SETTINGS),
   setCurrentPage: createAction(SET_CURRENT_PAGE),
   setPerPage: createAction(SET_PER_PAGE),
   resetResponse: createAction(RESET_RESPONSE)
}

export const initialState = {
  roles: '',
  createRolesResponse: '',
  deleteRoleResponse: '',
  updateRoleResponse: '',
  rolesActionSettings: {
    isAddModalOpen: false,
    isDeleteModalOpen: false,
    deleteRoleData: ''
  },
  currentPage: 1,
  perPage: 10
}

export default handleActions(
  { [FETCH_ROLES_SUCCESS]: (state, action) => ({
      ...state,
      roles: action.payload
    }),
    [SET_ROLES_ACTION_SETTINGS]: (state, action) => ({
      ...state,
      rolesActionSettings: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
    }),
    [CREATE_ROLES_SUCCESS]: (state, action) => ({
      ...state,
      createRolesResponse: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      resetResponse: action.payload,
      createRolesResponse: '',
      deleteRoleResponse: ''
    }),
    [DELETE_ROLE_SUCCESS]: (state, action) => ({
      ...state,
      deleteRoleResponse: action.payload
    })
  },
  initialState
)
