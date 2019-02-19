import { createAction, handleActions } from 'redux-actions'
import { FETCH_COMPONENT_SUCCESS, SEARCH_COMPONENT_SUCCESS } from '../../sagas/componentType/componentTypeSaga'
// Name Spaced Action Types
const SET_COMPONENT_TYPE_LOADING = 'ComponentTypeReducer/SET_COMPONENT_TYPE_LOADING'
const SET_SEARCH_OBJECT = 'ComponentTypeReducer/SET_SEARCH_OBJECT'
const SET_CURRENT_PAGE = 'ComponentTypeReducer/SET_CURRENT_PAGE'

export const actions = {
  FETCH_COMPONENT_SUCCESS,
  SEARCH_COMPONENT_SUCCESS,
  SET_COMPONENT_TYPE_LOADING,
  SET_CURRENT_PAGE,
  SET_SEARCH_OBJECT
}

export const actionCreators = {
    setComponentTypeLoading: createAction(SET_COMPONENT_TYPE_LOADING),
    setCurrentPage: createAction(SET_CURRENT_PAGE),
    setSearchObject: createAction(SET_SEARCH_OBJECT)
}

export const initialState = {
    componentTypes: '',
    isComponentTypeLoading: true,
    currentPage: 1,
    searchObject: {}
}

export default handleActions(
  {
    [FETCH_COMPONENT_SUCCESS]: (state, action) => ({
      ...state,
      componentTypes: action.payload,
      isComponentTypeLoading: false
    }),
    [SEARCH_COMPONENT_SUCCESS]: (state, action) => ({
      ...state,
      componentTypes: action.payload,
      currentPage: 1,
      isComponentTypeLoading: false
    }),
    [SET_COMPONENT_TYPE_LOADING]: (state, action) => ({
      ...state,
      isComponentTypeLoading: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [SET_SEARCH_OBJECT]: (state, action) => ({
      ...state,
      searchObject: action.payload
    })
  },
  initialState
)
