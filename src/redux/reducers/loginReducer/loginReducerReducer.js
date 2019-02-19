import { createAction, handleActions } from 'redux-actions'
import { LOGIN_USER_SUCCESS } from '../../sagas/login/loginSaga'
// Name Spaced Action Types
const SET_LOGIN_PROCESS_STATUS = 'BasicReducer/SET_LOGIN_PROCESS_STATUS'
const RESET_RESPONSE = 'explorerReducer/RESET_RESPONSE'

export const actions = {
  LOGIN_USER_SUCCESS,
  SET_LOGIN_PROCESS_STATUS,
  RESET_RESPONSE
}

export const actionCreators = {
  setLoginProcessStatus: createAction(SET_LOGIN_PROCESS_STATUS),
  resetResponse: createAction(RESET_RESPONSE)
}

export const initialState = {
  token: '',
  isLoggedin: localStorage.getItem('isLoggedin') ? localStorage.getItem('isLoggedin') : false,
  loggedInresponse: '',
  loginProcess: false
}

export default handleActions(
  {
    [LOGIN_USER_SUCCESS]: (state, action) => ({
        ...state,
        loggedInresponse: action.payload,
        isLoggedin: action.payload.error_code === null || false
    }),
    [SET_LOGIN_PROCESS_STATUS]: (state, action) => ({
      ...state,
      loginProcess: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      loggedInresponse: ''
    })
  },
  initialState
)
