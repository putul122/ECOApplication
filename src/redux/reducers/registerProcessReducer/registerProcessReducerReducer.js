import { createAction, handleActions } from 'redux-actions'
import { FETCH_REGISTER_PROCESS_SUCCESS } from '../../sagas/registerProcess/registerProcessSaga'
// Name Spaced Action Types
const ACCOUNT_CREATION = 'RegisterProcessReducer/ACCOUNT_CREATION'
const ABACUS_FILE_PROVISIONED = 'RegisterProcessReducer/ABACUS_FILE_PROVISIONED'
const COMPOSER_MODEL_CONNECTED = 'RegisterProcessReducer/COMPOSER_MODEL_CONNECTED'

export const actions = {
  ACCOUNT_CREATION,
  ABACUS_FILE_PROVISIONED,
  COMPOSER_MODEL_CONNECTED,
  FETCH_REGISTER_PROCESS_SUCCESS
}

export const actionCreators = {
  accountCreation: createAction(ACCOUNT_CREATION),
  abacusFileProvisioned: createAction(ABACUS_FILE_PROVISIONED),
  composerModelConnected: createAction(COMPOSER_MODEL_CONNECTED)
}

export const initialState = {
  isAccountCreated: false,
  isAbacusFileProvisioned: false,
  isComposerModelConnected: false,
  registerProcessResponse: ''
}

export default handleActions(
  {
    [ACCOUNT_CREATION]: (state, action) => ({
      ...state,
      isAccountCreated: action.payload
    }),
    [ABACUS_FILE_PROVISIONED]: (state, action) => ({
      ...state,
      isAbacusFileProvisioned: action.payload
    }),
    [COMPOSER_MODEL_CONNECTED]: (state, action) => ({
      ...state,
      isComposerModelConnected: action.payload
    }),
    [FETCH_REGISTER_PROCESS_SUCCESS]: (state, action) => ({
      ...state,
      registerProcessResponse: action.payload
    })
  },
  initialState
)
