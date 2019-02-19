import { handleActions } from 'redux-actions'
import { REGISTER_USER_SUCCESS } from '../../sagas/userRegistration/userRegistrationSaga'
// Name Spaced Action Types

export const actions = {
    REGISTER_USER_SUCCESS
}

export const actionCreators = {}

export const initialState = {
  token: '',
  isLoggedin: localStorage.getItem('isLoggedin') ? localStorage.getItem('isLoggedin') : false
}

export default handleActions(
  {
    [REGISTER_USER_SUCCESS]: (state, action) => ({
        ...state,
        token: action.payload,
        isLoggedin: true
    })
  },
  initialState
)
