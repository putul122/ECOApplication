import { createAction, handleActions } from 'redux-actions'
import {
  FETCH_MODEL_PRESPECTIVES_SUCCESS,
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS
} from '../../sagas/model/modelSaga'
import {
  FETCH_ALL_DROPDOWN_DATA_SUCCESS
} from '../../sagas/service/serviceSaga'

// Name Spaced Action Types
const RESET_RESPONSE = 'KpiPerformance/RESET_RESPONSE'
const SET_ACTION_SETTINGS = 'KpiPerformance/SET_ACTION_SETTINGS'
const SET_AVAILABLE_ACTION = 'KpiPerformance/SET_AVAILABLE_ACTION'
const SET_METAMODEL_DATA = 'KpiPerformance/SET_METAMODEL_DATA'
export const actions = {
  RESET_RESPONSE,
  SET_ACTION_SETTINGS,
  SET_AVAILABLE_ACTION,
  SET_METAMODEL_DATA,
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS
}

export const actionCreators = {
  resetResponse: createAction(RESET_RESPONSE),
  setActionSettings: createAction(SET_ACTION_SETTINGS),
  setAvailableAction: createAction(SET_AVAILABLE_ACTION),
  setMetaModelData: createAction(SET_METAMODEL_DATA)
}

export const initialState = {
  metaModelPerspective: '',
  modelPerspective: '',
  MetaModelData: {
    metaModelPerspective: [],
    toProcess: false,
    processedIndex: [],
    headerColumn: []
  },
  availableAction: {
    toProcess: false,
    toProcessMetaModel: false,
    toProcessModelPerspectives: false,
    toProcessCrudModel: false
  },
  allDropdownData: '',
  actionSettings: {}
}

export default handleActions({
  [FETCH_META_MODEL_PRESPECTIVE_SUCCESS]: (state, action) => ({
    ...state,
    metaModelPerspective: action.payload,
    availableAction: {...state.availableAction, 'toProcessMetaModel': true}
  }),
  [FETCH_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
    ...state,
    modelPerspective: action.payload
  }),
  [SET_ACTION_SETTINGS]: (state, action) => ({
    ...state,
    actionSettings: action.payload
  }),
  [SET_AVAILABLE_ACTION]: (state, action) => ({
    ...state,
    availableAction: action.payload
  }),
  [FETCH_ALL_DROPDOWN_DATA_SUCCESS]: (state, action) => ({
    ...state,
    allDropdownData: action.payload
  }),
  [SET_METAMODEL_DATA]: (state, action) => ({
    ...state,
    MetaModelData: action.payload
  })
}, initialState)
