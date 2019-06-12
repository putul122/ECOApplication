import { createAction, handleActions } from 'redux-actions'
import {
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS
} from '../../sagas/model/modelSaga'
import {
  FETCH_MODEL_PRESPECTIVES_SUCCESS
} from '../../sagas/kpiPerformance/kpiPerformanceSaga'

// Name Spaced Action Types
const SET_CURRENT_TAB = 'KpiPerformanceView/SET_CURRENT_TAB'
const SET_PAGE_SETTINGS = 'KpiPerformanceView/SET_PAGE_SETTINGS'
const SET_AVAILABLE_ACTION = 'KpiPerformanceView/SET_AVAILABLE_ACTION'
const SET_GRAPH_DATA = 'KpiPerformanceView/SET_GRAPH_DATA'
export const actions = {
  SET_CURRENT_TAB,
  SET_PAGE_SETTINGS,
  SET_AVAILABLE_ACTION,
  SET_GRAPH_DATA,
  FETCH_MODEL_PRESPECTIVES_SUCCESS
}

export const actionCreators = {
  setCurrentTab: createAction(SET_CURRENT_TAB),
  setPageSettings: createAction(SET_PAGE_SETTINGS),
  setAvailableAction: createAction(SET_AVAILABLE_ACTION),
  setGraphData: createAction(SET_GRAPH_DATA)
}

export const initialState = {
  modelPrespectives: '',
  metaModelPrespective: '',
  showTabs: {'showScore': ' active show', 'showPenalty': ''},
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
  },
  pageSettings: {},
  graphData: '',
  availableAction: {
    toProcessGraphData: false,
    toCallScorePenaltyAPI: false
  }
}

export default handleActions({
  [FETCH_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
    ...state,
    modelPrespectives: action.payload,
    availableAction: {...state.availableAction, 'toProcessGraphData': true}
  }),
  [FETCH_META_MODEL_PRESPECTIVE_SUCCESS]: (state, action) => ({
    ...state,
    metaModelPrespective: action.payload
    // availableAction: {...state.availableAction, 'toProcessGraphData': true}
  }),
  [SET_CURRENT_TAB]: (state, action) => ({
    ...state,
    showTabs: action.payload
  }),
  [SET_PAGE_SETTINGS]: (state, action) => ({
    ...state,
    pageSettings: action.payload
  }),
  [SET_AVAILABLE_ACTION]: (state, action) => ({
    ...state,
    availableAction: action.payload
  }),
  [SET_GRAPH_DATA]: (state, action) => ({
    ...state,
    graphData: action.payload
  })
}, initialState)
