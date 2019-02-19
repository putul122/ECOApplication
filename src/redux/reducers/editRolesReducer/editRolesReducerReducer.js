import { createAction, handleActions } from 'redux-actions'
import { UPDATE_ROLE_SUCCESS, FETCH_ROLE_BY_ID_SUCCESS } from '../../sagas/roles/rolesSaga'
// Name Spaced Action Types
const SET_UPDATE_ROLE_VALUE = 'editRolesReducer/SET_UPDATE_ROLE_VALUE'

export const actions = {
  UPDATE_ROLE_SUCCESS,
  FETCH_ROLE_BY_ID_SUCCESS,
  SET_UPDATE_ROLE_VALUE
}

export const actionCreators = {
//   setLoginProcessStatus: createAction(SET_LOGIN_PROCESS_STATUS)
  setUpdateRoleValue: createAction(SET_UPDATE_ROLE_VALUE)
}

export const initialState = {
  rolesData: '',
  updateRoleResponse: '',
  updateRoleValue: {
    'name': ''
  }
}

export default handleActions(
  {
    [UPDATE_ROLE_SUCCESS]: (state, action) => ({
      ...state,
      updateRoleResponse: action.payload
    }),
    [FETCH_ROLE_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      rolesData: action.payload
    }),
    [SET_UPDATE_ROLE_VALUE]: (state, action) => ({
      ...state,
      updateRoleValue: action.payload
    })
  },
  initialState
)
