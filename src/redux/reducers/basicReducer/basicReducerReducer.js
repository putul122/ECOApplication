import { createAction, handleActions } from 'redux-actions'
import { FETCH_CLIENT_ACCESS_TOKEN_SUCCESS, FETCH_USER_AUTHENTICATION_SUCCESS, UPDATE_NOTIFICATION_VIEW_STATUS_SUCCESS } from '../../sagas/basic/basicSaga'
// Name Spaced Action Types
const INCREMENT = 'BasicReducer/INCREMENT'
const DECREMENT = 'BasicReducer/DECREMENT'
const SET_MODAL_OPEN_STATUS = 'BasicReducer/SET_MODAL_OPEN_STATUS'
const SET_CONFIRMATION_MODAL_OPEN_STATUS = 'BasicReducer/SET_CONFIRMATION_MODAL_OPEN_STATUS'
const SET_CURRENT_PAGE = 'BasicReducer/SET_CURRENT_PAGE'
const SET_QUICKSLIDE_FLAG = 'BasicReducer/SET_QUICKSLIDE_FLAG'
const SET_LOGINSLIDE_FLAG = 'BasicReducer/SET_LOGINSLIDE_FLAG'
const SET_BREADCRUMB = 'BasicReducer/SET_BREADCRUMB'
const SET_API_CALLING_STATUS = 'BasicReducer/SET_API_CALLING_STATUS'
const SET_TOASTER_SUCCESS_STATUS = 'BasicReducer/SET_TOASTER_SUCCESS_STATUS'
const SET_DELETE_MODAL_OPEN_STATUS = 'BasicReducer/SET_DELETE_MODAL_OPEN_STATUS'
const SET_DROPDOWN_FLAG = 'BasicReducer/SET_DROPDOWN_FLAG'
const SET_REDIRECT_FLAG = 'BasicReducer/SET_REDIRECT_FLAG'
const SET_ADD_REDIRECT_FLAG = 'BasicReducer/SET_ADD_REDIRECT_FLAG'
const SET_NOTIFICATION_FLAG = 'BasicReducer/SET_NOTIFICATION_FLAG'
const TOGGLE_FLIPIN_X = 'BasicReducer/TOGGLE_FLIPIN_X'
const RESET_NOTIFICATION_RESPONSE = 'BasicReducer/RESET_NOTIFICATION_RESPONSE'

export const actions = {
  INCREMENT,
  DECREMENT,
  FETCH_CLIENT_ACCESS_TOKEN_SUCCESS,
  SET_MODAL_OPEN_STATUS,
  SET_CONFIRMATION_MODAL_OPEN_STATUS,
  SET_CURRENT_PAGE,
  SET_QUICKSLIDE_FLAG,
  SET_LOGINSLIDE_FLAG,
  SET_BREADCRUMB,
  SET_API_CALLING_STATUS,
  SET_TOASTER_SUCCESS_STATUS,
  SET_DROPDOWN_FLAG,
  SET_REDIRECT_FLAG,
  SET_ADD_REDIRECT_FLAG,
  SET_DELETE_MODAL_OPEN_STATUS,
  SET_NOTIFICATION_FLAG,
  TOGGLE_FLIPIN_X,
  UPDATE_NOTIFICATION_VIEW_STATUS_SUCCESS,
  RESET_NOTIFICATION_RESPONSE
  }

export const actionCreators = {
  increment: createAction(INCREMENT),
  decrement: createAction(DECREMENT),
  setModalOpenStatus: createAction(SET_MODAL_OPEN_STATUS),
  setConfirmationModalOpenStatus: createAction(SET_CONFIRMATION_MODAL_OPEN_STATUS),
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setDeleteModalOpenStatus: createAction(SET_DELETE_MODAL_OPEN_STATUS),
  setQuickslideFlag: createAction(SET_QUICKSLIDE_FLAG),
  setLoginslideFlag: createAction(SET_LOGINSLIDE_FLAG),
  setBreadcrumb: createAction(SET_BREADCRUMB),
  setApiCallingStatus: createAction(SET_API_CALLING_STATUS),
  setToasterSuccessStatus: createAction(SET_TOASTER_SUCCESS_STATUS),
  setDropdownFlag: createAction(SET_DROPDOWN_FLAG),
  setRedirectFlag: createAction(SET_REDIRECT_FLAG),
  setAddRedirectFlag: createAction(SET_ADD_REDIRECT_FLAG),
  setNotificationFlag: createAction(SET_NOTIFICATION_FLAG),
  toggleFlipInX: createAction(TOGGLE_FLIPIN_X),
  resetNotificationResponse: createAction(RESET_NOTIFICATION_RESPONSE)
}

export const initialState = {
  // count: 0,
  // string: 'number',
  modalIsOpen: false,
  successmodalIsOpen: false,
  currentPage: 1,
  isQuickSlideOpen: false,
  deletemodalIsOpen: false,
  isLoginSlideOpen: false,
  isApiCalling: false,
  isRedirect: false,
  showToasterSuccess: localStorage.getItem('showToasterSuccess') || false,
  breadcrumb: '',
  clientAccessToken: '',
  client_id: 'eco_conductor_web_ui',
  // client_id: 'telkom_eco_web_ui',
  client_secret: 'Pm41WXE9WU4nVCVdTDlVdUh5PE4iS1dbO1VFNi1ZTnGMzX0pBVDdSciszMkhfI3M4SEVbLQ',
  // client_secret: 'SysHZjmhytHtZwQA4DRctXKU4TTvQajTu2zVANUU9PKmAUnC2gnMUfRxNpbXHJdu',
  authenticateUser: '',
  isDropDownOpen: false,
  notificationFlag: false,
  flipInX: 'm-login--signin',
  updateNotificationViewStatusResponse: ''
}

export default handleActions(
  {
    [INCREMENT]: (state, action) => ({
      ...state,
      count: state.count + action.payload
    }),
    [DECREMENT]: (state, action) => ({
      ...state,
      count: state.count - action.payload
    }),
    [FETCH_CLIENT_ACCESS_TOKEN_SUCCESS]: (state, action) => ({
      ...state,
      clientAccessToken: action.payload
    }),
    [SET_MODAL_OPEN_STATUS]: (state, action) => ({
      ...state,
      modalIsOpen: action.payload
    }),
    [SET_CONFIRMATION_MODAL_OPEN_STATUS]: (state, action) => ({
      ...state,
      successmodalIsOpen: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [SET_QUICKSLIDE_FLAG]: (state, action) => ({
      ...state,
      isQuickSlideOpen: action.payload
    }),
    [SET_LOGINSLIDE_FLAG]: (state, action) => ({
      ...state,
      isLoginSlideOpen: action.payload
    }),
    [SET_BREADCRUMB]: (state, action) => ({
      ...state,
      breadcrumb: action.payload
    }),
    [SET_REDIRECT_FLAG]: (state, action) => ({
      ...state,
      isRedirect: action.payload
    }),
    [SET_API_CALLING_STATUS]: (state, action) => ({
      ...state,
      isApiCalling: action.payload
    }),
    [SET_TOASTER_SUCCESS_STATUS]: (state, action) => ({
      ...state,
      showToasterSuccess: action.payload
    }),
    [SET_DELETE_MODAL_OPEN_STATUS]: (state, action) => ({
      ...state,
      deletemodalIsOpen: action.payload
    }),
    [FETCH_USER_AUTHENTICATION_SUCCESS]: (state, action) => ({
      ...state,
      authenticateUser: action.payload
    }),
    [SET_DROPDOWN_FLAG]: (state, action) => ({ ...state,
      isDropDownOpen: action.payload
    }),
    [SET_NOTIFICATION_FLAG]: (state, action) => ({ ...state,
      notificationFlag: action.payload,
      updateNotificationViewStatusResponse: ''
    }),
    [TOGGLE_FLIPIN_X]: (state, action) => ({ ...state,
      flipInX: action.payload
    }),
    [UPDATE_NOTIFICATION_VIEW_STATUS_SUCCESS]: (state, action) => ({ ...state,
      updateNotificationViewStatusResponse: action.payload
    }),
    [RESET_NOTIFICATION_RESPONSE]: (state, action) => ({ ...state,
      updateNotificationViewStatusResponse: ''
    })
  },
  initialState
)
