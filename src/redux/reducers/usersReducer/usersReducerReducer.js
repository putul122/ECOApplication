import { createAction, handleActions } from 'redux-actions'
import {
  FETCH_EX_USERS_SUCCESS,
  FETCH_USERS_SUCCESS,
  FETCH_USER_SUCCESS,
  ADD_USER_SUCCESS,
  FETCH_USERS_START,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  INVITE_USER_SUCCESS,
  OPEN_INVITE_USER,
  CLOSE_INVITE_USER
} from '../../sagas/user/userSaga'
import { FETCH_ROLES_SUCCESS } from '../../sagas/basic/basicSaga'
// Name Spaced Action Types
const SET_CURRENT_PAGE = 'UsersReducer/SET_CURRENT_PAGE'
const SET_USER_ACTION_SETTINGS = 'UsersReducer/SET_USER_ACTION_SETTINGS'
const SET_PER_PAGE = 'UsersReducer/SET_PER_PAGE'
const SET_ROLE_DATA = 'UsersReducer/SET_ROLE_DATA'
const SET_UPDATE_PAYLOAD = 'UsersReducer/SET_UPDATE_PAYLOAD'
const RESET_RESPONSE = 'UsersReducer/RESET_RESPONSE'
const SET_USERS_DATA = 'UsersReducer/SET_USERS_DATA'

export const actions = {
  FETCH_EX_USERS_SUCCESS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_START,
  FETCH_USER_SUCCESS,
  ADD_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  SET_CURRENT_PAGE,
  SET_USER_ACTION_SETTINGS,
  SET_PER_PAGE,
  SET_ROLE_DATA,
  RESET_RESPONSE,
  FETCH_ROLES_SUCCESS,
  SET_UPDATE_PAYLOAD,
  SET_USERS_DATA,
  INVITE_USER_SUCCESS,
  OPEN_INVITE_USER,
  CLOSE_INVITE_USER
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setUserActionSettings: createAction(SET_USER_ACTION_SETTINGS),
  setPerPage: createAction(SET_PER_PAGE),
  setRoleData: createAction(SET_ROLE_DATA),
  setUpdatePayload: createAction(SET_UPDATE_PAYLOAD),
  resetResponse: createAction(RESET_RESPONSE),
  setUsersData: createAction(SET_USERS_DATA)
}

export const initialState = {
  externalUsers: '',
  users: '',
  copyUsers: '',
  selectedUser: '',
  updatePayload: [],
  userRoles: '',
  roles: '',
  getUserResponse: '',
  createUserResponse: '',
  updateUserResponse: '',
  deleteUserResponse: '',
  currentPage: 1,
  perPage: 10,
  isLoading: false,
  userActionSettings: {
    selectedUser: null,
    selectedEmail: '',
    selectedRole: null,
    isAddModalOpen: false,
    isInviteUserModalOpen: false,
    isDeActivateModalOpen: false,
    isActivateModalOpen: false,
    userData: '',
    isUpdateModalOpen: false,
    updateUserData: {},
    validPassword: true,
    activateButton: false,
    isConfirmationModalOpen: false
  }
}

export default handleActions(
  {
    [FETCH_EX_USERS_SUCCESS]: (state, action) => ({
      ...state,
      externalUsers: action.payload
    }),
    [FETCH_USERS_SUCCESS]: (state, action) => ({
      ...state,
      isLoading: false,
      getUserResponse: action.payload
    }),
    [FETCH_USERS_START]: (state, action) => ({
      ...state,
      isLoading: true
    }),
    [FETCH_USER_SUCCESS]: (state, action) => ({
      ...state,
      selectedUser: action.payload
    }),
    [ADD_USER_SUCCESS]: (state, action) => ({
      ...state,
      createUserResponse: action.payload
    }),
    [UPDATE_USER_SUCCESS]: (state, action) => ({
      ...state,
      updateUserResponse: action.payload
    }),
    [DELETE_USER_SUCCESS]: (state, action) => ({
      ...state,
      deleteUserResponse: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [SET_USER_ACTION_SETTINGS]: (state, action) => ({
      ...state,
      userActionSettings: action.payload
    }),
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
    }),
    [SET_ROLE_DATA]: (state, action) => ({
      ...state,
      userRoles: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      getUserResponse: '',
      createUserResponse: '',
      deleteUserResponse: '',
      updateUserResponse: '',
      updatePayload: [],
      userRoles: ''
    }),
    [FETCH_ROLES_SUCCESS]: (state, action) => ({
      ...state,
      roles: action.payload
    }),
    [SET_UPDATE_PAYLOAD]: (state, action) => ({
      ...state,
      updatePayload: action.payload
    }),
    [SET_USERS_DATA]: (state, action) => ({
      ...state,
      users: action.payload.users,
      copyUsers: action.payload.copyUsers
    }),
    [INVITE_USER_SUCCESS]: (state, action) => {
      console.log(action.payload)
      return {
        ...state,
        createUserResponse: 'User successfully created',
        userActionSettings: {
          ...state.userActionSettings,
          isInviteUserModalOpen: false
        }
      }
    },
    [OPEN_INVITE_USER]: (state, action) => ({
      ...state,
      userActionSettings: {
        ...state.userActionSettings,
        isInviteUserModalOpen: true
      }
    }),
    [CLOSE_INVITE_USER]: (state, action) => ({
      ...state,
      userActionSettings: {
        ...state.userActionSettings,
        isInviteUserModalOpen: false
      }
    })
  },
  initialState
)
