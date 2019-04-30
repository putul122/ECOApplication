import {createAction, handleActions} from 'redux-actions'
import {
    FETCH_MODEL_PRESPECTIVES_SUCCESS,
    FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
    UPDATE_MODEL_PRESPECTIVES_SUCCESS,
    DELETE_COMPONENT_MODEL_PERSPECTIVES_SUCCESS,
    UPDATE_COMPONENT_MODEL_PRESPECTIVES_SUCCESS
} from '../../sagas/model/modelSaga'
// import {DELETE_COMPONENT_TYPE_COMPONENT_SUCCESS} from '../../sagas/componentTypeComponent/componentTypeComponentSaga'
// import {ADD_COMPONENT_COMPONENT_SUCCESS} from '../../sagas/applicationDetail/applicationDetailSaga'
import {FETCH_DROPDOWN_DATA_SUCCESS} from '../../sagas/service/serviceSaga'
// Name Spaced Action Types
const SET_ADD_SETTINGS = 'perspectiveExclusionReducer/SET_ADD_SETTINGS'
const SET_CURRENT_PAGE = 'perspectiveExclusionReducer/SET_CURRENT_PAGE'
const SET_AVAILABLE_ACTION = 'perspectiveExclusionReducer/SET_AVAILABLE_ACTION'
const SET_PER_PAGE = 'perspectiveExclusionReducer/SET_PER_PAGE'
const RESET_RESPONSE = 'perspectiveExclusionReducer/RESET_RESPONSE'
const SET_CONNECTION_DATA = 'perspectiveExclusionReducer/SET_CONNECTION_DATA'
const SET_HEADER_DATA = 'perspectiveExclusionReducer/SET_HEADER_DATA'

export const actions = {
  FETCH_MODEL_PRESPECTIVES_SUCCESS,
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
  SET_CURRENT_PAGE,
  SET_ADD_SETTINGS,
  SET_AVAILABLE_ACTION,
  SET_PER_PAGE,
  UPDATE_MODEL_PRESPECTIVES_SUCCESS,
  RESET_RESPONSE,
  DELETE_COMPONENT_MODEL_PERSPECTIVES_SUCCESS,
  UPDATE_COMPONENT_MODEL_PRESPECTIVES_SUCCESS,
  SET_CONNECTION_DATA,
  FETCH_DROPDOWN_DATA_SUCCESS,
  SET_HEADER_DATA
}

export const actionCreators = {
  setAddSettings: createAction(SET_ADD_SETTINGS),
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setAvailableAction: createAction(SET_AVAILABLE_ACTION),
  setPerPage: createAction(SET_PER_PAGE),
  resetResponse: createAction(RESET_RESPONSE),
  setConnectionData: createAction(SET_CONNECTION_DATA),
  setHeaderData: createAction(SET_HEADER_DATA)
}

export const initialState = {
  modelPrespectives: '',
  metaModelPerspective: '',
  currentPage: 1,
  perPage: 10,
  crude: {
    None: 0,
    Create: 1,
    Read: 2,
    Update: 4,
    Delete: 8,
    Exclude: 16
  },
  addSettings: {
    isDeleteModalOpen: false,
    isModalOpen: false,
    isEditModalOpen: false,
    name: '',
    description: '',
    selectedCategory: null,
    selectedOwner: null,
    deleteObject: null,
    updateObject: null,
    createResponse: null,
    updateResponse: null
  },
  availableAction: {
    Create: false,
    Read: false,
    Update: false,
    Delete: false,
    toProcess: false,
    toProcessMetaModel: false,
    toProcessModelPerspectives: false,
    toProcessCrudModel: false
  },
  connectionData: '',
  createComponentResponse: '',
  updateComponentResponse: '',
  deleteComponentResponse: '',
  dropdownData: '',
  headerData: {
    metaModelPerspective: [],
    toProcess: false,
    processedIndex: [],
    headerColumn: [],
    toBuildConnectionData: false
  }
}

export default handleActions(
  {
    [FETCH_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      modelPrespectives: action.payload
    }),
    [FETCH_META_MODEL_PRESPECTIVE_SUCCESS]: (state, action) => ({
      ...state,
      metaModelPerspective: action.payload,
      availableAction: {...state.availableAction, 'toProcessMetaModel': true}
    }),
    [SET_ADD_SETTINGS]: (state, action) => ({
      ...state,
      addSettings: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [SET_AVAILABLE_ACTION]: (state, action) => ({
      ...state,
      availableAction: action.payload
    }),
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
    }),
    [UPDATE_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      createComponentResponse: action.payload
    }),
    [UPDATE_COMPONENT_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      updateComponentResponse: action.payload
    }),
    [DELETE_COMPONENT_MODEL_PERSPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      deleteComponentResponse: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      createComponentResponse: '',
      updateComponentResponse: '',
      deleteComponentResponse: '',
      dropdownData: ''
    }),
    [SET_CONNECTION_DATA]: (state, action) => ({
      ...state,
      connectionData: action.payload
    }),
    [FETCH_DROPDOWN_DATA_SUCCESS]: (state, action) => ({
      ...state,
      dropdownData: action.payload
    }),
    [SET_HEADER_DATA]: (state, action) => ({
      ...state,
      headerData: action.payload
    })
  },
  initialState
)
