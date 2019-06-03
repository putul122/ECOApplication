import {createAction, handleActions} from 'redux-actions'
import {
    FETCH_MODEL_PRESPECTIVES_SUCCESS,
    FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
    UPDATE_MODEL_PRESPECTIVES_SUCCESS
    // DELETE_COMPONENT_MODEL_PERSPECTIVES_SUCCESS
    // UPDATE_COMPONENT_MODEL_PRESPECTIVES_SUCCESS
} from '../../sagas/model/modelSaga'
// import {DELETE_COMPONENT_TYPE_COMPONENT_SUCCESS} from '../../sagas/componentTypeComponent/componentTypeComponentSaga'
// import {ADD_COMPONENT_COMPONENT_SUCCESS} from '../../sagas/applicationDetail/applicationDetailSaga'
import {
  FETCH_DROPDOWN_DATA_SUCCESS,
  FETCH_ALL_DROPDOWN_DATA_SUCCESS,
  FETCH_NESTED_MODEL_PRESPECTIVES_SUCCESS,
  FETCH_CRUD_META_MODEL_PRESPECTIVE_SUCCESS,
  FETCH_CRUD_MODEL_PRESPECTIVES_SUCCESS,
  UPDATE_NESTED_MODEL_PRESPECTIVES_SUCCESS,
  REMOVE_MODEL_PRESPECTIVES_SUCCESS
} from '../../sagas/service/serviceSaga'
// Name Spaced Action Types
const SET_ADD_SETTINGS = 'balancedScorecardReducer/SET_ADD_SETTINGS'
const SET_CURRENT_PAGE = 'balancedScorecardReducer/SET_CURRENT_PAGE'
const SET_AVAILABLE_ACTION = 'balancedScorecardReducer/SET_AVAILABLE_ACTION'
const SET_PER_PAGE = 'balancedScorecardReducer/SET_PER_PAGE'
const RESET_RESPONSE = 'balancedScorecardReducer/RESET_RESPONSE'
const SET_CONNECTION_DATA = 'balancedScorecardReducer/SET_CONNECTION_DATA'
const SET_EXPAND_SETTINGS = 'balancedScorecardReducer/SET_EXPAND_SETTINGS'
const SET_HEADER_DATA = 'balancedScorecardReducer/SET_HEADER_DATA'
const SET_MODAL_PERSPECTIVES_DATA = 'balancedScorecardReducer/SET_MODAL_PERSPECTIVES_DATA'
const SET_AVAILABLE_CRUD_OPERATION = 'balancedScorecardReducer/SET_AVAILABLE_CRUD_OPERATION'

export const actions = {
  FETCH_MODEL_PRESPECTIVES_SUCCESS,
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
  FETCH_NESTED_MODEL_PRESPECTIVES_SUCCESS,
  SET_CURRENT_PAGE,
  SET_ADD_SETTINGS,
  SET_AVAILABLE_ACTION,
  SET_PER_PAGE,
  UPDATE_MODEL_PRESPECTIVES_SUCCESS,
  RESET_RESPONSE,
  // DELETE_COMPONENT_MODEL_PERSPECTIVES_SUCCESS,
  // UPDATE_COMPONENT_MODEL_PRESPECTIVES_SUCCESS,
  UPDATE_NESTED_MODEL_PRESPECTIVES_SUCCESS,
  SET_CONNECTION_DATA,
  FETCH_DROPDOWN_DATA_SUCCESS,
  SET_EXPAND_SETTINGS,
  SET_HEADER_DATA,
  SET_MODAL_PERSPECTIVES_DATA,
  SET_AVAILABLE_CRUD_OPERATION
}

export const actionCreators = {
  setAddSettings: createAction(SET_ADD_SETTINGS),
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setAvailableAction: createAction(SET_AVAILABLE_ACTION),
  setPerPage: createAction(SET_PER_PAGE),
  resetResponse: createAction(RESET_RESPONSE),
  setConnectionData: createAction(SET_CONNECTION_DATA),
  setExpandSettings: createAction(SET_EXPAND_SETTINGS),
  setHeaderData: createAction(SET_HEADER_DATA),
  setModalPerspectivesData: createAction(SET_MODAL_PERSPECTIVES_DATA),
  setAvailableCrudOperation: createAction(SET_AVAILABLE_CRUD_OPERATION)
}

export const initialState = {
  modelPrespectives: '',
  copyModelPrespectives: '',
  modelPrespectiveData: '',
  metaModelPerspective: '',
  crudMetaModelPerspective: '',
  nestedModelPerspectives: '',
  crudModelPerspectives: '',
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
    isNexusPoint: false,
    groupCollection: [],
    groupedPairedList: [],
    groupedPairedTitle: '',
    name: '',
    description: '',
    selectedCategory: null,
    selectedOwner: null,
    deleteObject: null,
    deleteOperationLevel: null,
    updateObject: null,
    createResponse: null,
    updateResponse: null,
    deleteResponse: null,
    selectedData: null,
    perspectiveId: null,
    viewKey: null,
    initiatedFrom: null
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
  availableCrudOperation: [],
  connectionData: '',
  createComponentResponse: '',
  updateComponentResponse: '',
  deleteComponentResponse: '',
  dropdownData: '',
  expandSettings: {
    level: null,
    blankColumn: [],
    selectedObject: [],
    modelPerspectives: [],
    metaModelPerspectives: [],
    processAPIResponse: false
  },
  headerData: {
    metaModelPerspective: [],
    toProcess: false,
    processedIndex: [],
    headerColumn: []
  },
  allDropdownData: ''
}

export default handleActions(
  {
    [FETCH_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      modelPrespectiveData: action.payload
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
    [UPDATE_NESTED_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      updateComponentResponse: action.payload
    }),
    [REMOVE_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      deleteComponentResponse: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      createComponentResponse: '',
      updateComponentResponse: '',
      deleteComponentResponse: '',
      dropdownData: '',
      nestedModelPerspectives: '',
      allDropdownData: '',
      modelPrespectiveData: ''
    }),
    [SET_CONNECTION_DATA]: (state, action) => ({
      ...state,
      connectionData: action.payload
    }),
    [FETCH_DROPDOWN_DATA_SUCCESS]: (state, action) => ({
      ...state,
      dropdownData: action.payload
    }),
    [SET_EXPAND_SETTINGS]: (state, action) => ({
      ...state,
      expandSettings: action.payload
    }),
    [FETCH_NESTED_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      nestedModelPerspectives: action.payload,
      expandSettings: {...state.expandSettings, 'processAPIResponse': true}
    }),
    [SET_HEADER_DATA]: (state, action) => ({
      ...state,
      headerData: action.payload
    }),
    [FETCH_CRUD_META_MODEL_PRESPECTIVE_SUCCESS]: (state, action) => ({
      ...state,
      crudMetaModelPerspective: action.payload,
      availableAction: {...state.availableAction, 'toProcess': true}
    }),
    [FETCH_CRUD_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      crudModelPerspectives: action.payload,
      availableAction: {...state.availableAction, 'toProcessCrudModel': true}
    }),
    [FETCH_ALL_DROPDOWN_DATA_SUCCESS]: (state, action) => ({
      ...state,
      allDropdownData: action.payload
    }),
    [SET_MODAL_PERSPECTIVES_DATA]: (state, action) => ({
      ...state,
      modelPrespectives: action.payload.data,
      copyModelPrespectives: action.payload.copyData
    }),
    [SET_AVAILABLE_CRUD_OPERATION]: (state, action) => ({
      ...state,
      availableCrudOperation: action.payload
    })
  },
  initialState
)
