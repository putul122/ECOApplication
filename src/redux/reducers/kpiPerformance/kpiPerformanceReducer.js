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
const SET_PAYLOADFILTER_BLOCK = 'KpiPerformance/SET_PAYLOADFILTER_BLOCK'
const SET_GRAPH_DATA = 'KpiPerformance/SET_GRAPH_DATA'
export const actions = {
  RESET_RESPONSE,
  SET_ACTION_SETTINGS,
  SET_AVAILABLE_ACTION,
  SET_METAMODEL_DATA,
  SET_PAYLOADFILTER_BLOCK,
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
  SET_GRAPH_DATA
}

export const actionCreators = {
  resetResponse: createAction(RESET_RESPONSE),
  setActionSettings: createAction(SET_ACTION_SETTINGS),
  setAvailableAction: createAction(SET_AVAILABLE_ACTION),
  setMetaModelData: createAction(SET_METAMODEL_DATA),
  setPayloadFilterBlock: createAction(SET_PAYLOADFILTER_BLOCK),
  setGraphData: createAction(SET_GRAPH_DATA)
}

export const initialState = {
  metaModelPerspective: '',
  modelPrespectives: '',
  graphData: '',
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
  actionSettings: {
    departmentOption: [],
    supplierOption: [],
    agreementOption: [],
    serviceOption: [],
    kpiOption: [],
    selectedDepartment: [],
    selectedSupplier: [],
    selectedAgreement: [],
    selectedService: [],
    selectedKpi: [],
    startDate: null,
    endDate: null,
    allFilterDataProcessed: false
  },
  payloadFilterBlock: {
    startTime: '',
    endTime: '',
    agreementFilter: '',
    kpiFilter: {
      'constraint_perspective': {
        'parts': {
          '3': {
            'constraint_perspective': {
              'parts': {
                '4': {
                   'constraint_perspective': {
                    'parts': {
                      '4': {
                        'constraint_perspective': {
                          'parts': {
                            '4': {
                              'constraint_perspective': {
                                'subject_ids': []
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    departmentAndSupplierFilter: {
      'constraint_perspective': {
        'parts': {
          '2': {'target_component_ids': []},
          '3': {'target_component_ids': []}
        }
      }
    }
  }
}

export default handleActions({
  [FETCH_META_MODEL_PRESPECTIVE_SUCCESS]: (state, action) => ({
    ...state,
    metaModelPerspective: action.payload,
    availableAction: {...state.availableAction, 'toProcessMetaModel': true}
  }),
  [FETCH_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
    ...state,
    modelPrespectives: action.payload,
    availableAction: {...state.availableAction, 'toProcessGraphData': true}
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
    allDropdownData: action.payload,
    availableAction: {...state.availableAction, 'toProcessModelPerspectives': true}
  }),
  [SET_METAMODEL_DATA]: (state, action) => ({
    ...state,
    MetaModelData: action.payload
  }),
  [SET_PAYLOADFILTER_BLOCK]: (state, action) => ({
    ...state,
    payloadFilterBlock: action.payload
  }),
  [SET_GRAPH_DATA]: (state, action) => ({
    ...state,
    graphData: action.payload
  })
}, initialState)
