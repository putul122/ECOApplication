import { createAction, handleActions } from 'redux-actions'
import { FETCH_COMPONENT_BY_ID_SUCCESS, FETCH_COMPONENT_CONSTRAINT_SUCCESS, FETCH_COMPONENT_COMPONENT_SUCCESS, SEARCH_COMPONENT_COMPONENT_SUCCESS, ADD_COMPONENT_COMPONENT_SUCCESS } from '../../sagas/applicationDetail/applicationDetailSaga'
// Name Spaced Action Types
const SELECTED_COMPONENT_TYPE = 'applicationDetailReducer/SELECTED_COMPONENT_TYPE'
const SET_CURRENT_PAGE = 'applicationDetailReducer/SET_CURRENT_PAGE'
const SET_PER_PAGE = 'applicationDetailReducer/SET_PER_PAGE'
const RESET_ADD_COMPONENT_RESPONSE = 'applicationDetailReducer/RESET_ADD_COMPONENT_RESPONSE'

export const actions = {
  FETCH_COMPONENT_BY_ID_SUCCESS,
  FETCH_COMPONENT_CONSTRAINT_SUCCESS,
  FETCH_COMPONENT_COMPONENT_SUCCESS,
  SEARCH_COMPONENT_COMPONENT_SUCCESS,
  SET_CURRENT_PAGE,
  ADD_COMPONENT_COMPONENT_SUCCESS,
  RESET_ADD_COMPONENT_RESPONSE,
  SET_PER_PAGE
}

export const actionCreators = {
  selectedComponentType: createAction(SELECTED_COMPONENT_TYPE),
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setPerPage: createAction(SET_PER_PAGE),
  setAddRedirectFlag: createAction(ADD_COMPONENT_COMPONENT_SUCCESS),
  resetAddComponentResponse: createAction(RESET_ADD_COMPONENT_RESPONSE)
}

export const initialState = {
  componentDetail: '',
  componentConstraints: '',
  componentComponents: '',
  selectedComponentType: '',
  currentPage: 1,
  addComponent: false,
  perPage: 10
}

export default handleActions(
  {
    [FETCH_COMPONENT_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      componentDetail: action.payload
    }),
    [FETCH_COMPONENT_CONSTRAINT_SUCCESS]: (state, action) => ({
      ...state,
      componentConstraints: action.payload
    }),
    [FETCH_COMPONENT_COMPONENT_SUCCESS]: (state, action) => ({
      ...state,
      componentComponents: action.payload
    }),
    [SEARCH_COMPONENT_COMPONENT_SUCCESS]: (state, action) => ({
      ...state,
      componentComponents: action.payload,
      currentPage: 1
    }),
    [SELECTED_COMPONENT_TYPE]: (state, action) => ({
      ...state,
      selectedComponentType: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
    }),
    [ADD_COMPONENT_COMPONENT_SUCCESS]: (state, action) => ({
      ...state,
      addComponent: action.payload
    }),
    [RESET_ADD_COMPONENT_RESPONSE]: (state, action) => ({
      ...state,
      addComponent: ''
    })
  },
  initialState
)
