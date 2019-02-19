import {createAction, handleActions} from 'redux-actions'
import {
    FETCH_COMPONENTS_SUCCESS,
    FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS
} from '../../sagas/componentTypeComponent/componentTypeComponentSaga'
// Name Spaced Action Types
const SET_SELECT_OPTION = 'explorerReducer/SET_SELECT_OPTION'
const SET_FILTER_SETTINGS = 'explorerReducer/SET_FILTER_SETTINGS'
const RESET_RESPONSE = 'explorerReducer/RESET_RESPONSE'
const SET_CALLBACK = 'explorerReducer/SET_CALLBACK'
const SET_MODAL_SETTING = 'explorerReducer/SET_MODAL_SETTING'

export const actions = {
  FETCH_COMPONENTS_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS,
  SET_SELECT_OPTION,
  SET_FILTER_SETTINGS,
  RESET_RESPONSE,
  SET_CALLBACK,
  SET_MODAL_SETTING
}

export const actionCreators = {
  setSelectOption: createAction(SET_SELECT_OPTION),
  setCallback: createAction(SET_CALLBACK),
  setFilterSettings: createAction(SET_FILTER_SETTINGS),
  resetResponse: createAction(RESET_RESPONSE),
  setModalSetting: createAction(SET_MODAL_SETTING)
}

export const initialState = {
  selectedOption: '',
  components: '',
  componentRelationships: '',
  modelRelationshipData: '',
  callback: null,
  filterSettings: {
    filters: [],
    modelRelationshipData: [],
    startNode: {},
    setRelationshipData: false,
    selectedOption: null
  },
  modalSettings: {
    isPPTModalOpen: false,
    enterFileName: '',
    exportValidationClass: 'form-group m-form__group row'
  }
}

export default handleActions(
  {
    [SET_SELECT_OPTION]: (state, action) => ({
      ...state,
      selectedOption: action.payload
    }),
    [SET_FILTER_SETTINGS]: (state, action) => ({
      ...state,
      filterSettings: action.payload
    }),
    [FETCH_COMPONENTS_SUCCESS]: (state, action) => ({
      ...state,
      components: action.payload
    }),
    [FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS]: (state, action) => ({
      ...state,
      componentRelationships: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      componentRelationships: ''
    }),
    [SET_CALLBACK]: (state, action) => ({
      ...state,
      callback: action.payload
    }),
    [SET_MODAL_SETTING]: (state, action) => ({
      ...state,
      modalSettings: action.payload
    })
  },
  initialState
)
