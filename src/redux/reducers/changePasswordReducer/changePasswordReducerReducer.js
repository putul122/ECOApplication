import { handleActions } from 'redux-actions'
import { CHANGE_PASSWORD_SUCCESS } from '../../sagas/user/userSaga'
// Name Spaced Action Types
// const SET_LOGIN_PROCESS_STATUS = 'BasicReducer/SET_LOGIN_PROCESS_STATUS'

export const actions = {
    CHANGE_PASSWORD_SUCCESS
    // SET_LOGIN_PROCESS_STATUS
}

export const actionCreators = {
//   setLoginProcessStatus: createAction(SET_LOGIN_PROCESS_STATUS)
}

export const initialState = {
//   token: '',
//   isLoggedin: localStorage.getItem('isLoggedin') ? localStorage.getItem('isLoggedin') : false,
//   loggedInresponse: '',
//   loginProcess: false
      forgotpasswordresponse: ''
}

export default handleActions(
  {
    [CHANGE_PASSWORD_SUCCESS]: (state, action) => ({
        ...state,
        forgotpasswordresponse: action.payload
        // isLoggedin: action.payload.error_code === null || false
    })
    // [SET_LOGIN_PROCESS_STATUS]: (state, action) => ({
    //   ...state,
    //   loginProcess: action.payload
    // })
  },
  initialState
)
