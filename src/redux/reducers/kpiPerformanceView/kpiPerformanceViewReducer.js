import { createAction, handleActions } from 'redux-actions'
// Name Spaced Action Types
const SET_CURRENT_TAB = 'KpiPerformanceView/SET_CURRENT_TAB'
export const actions = {
  SET_CURRENT_TAB
}

export const actionCreators = {
  setCurrentTab: createAction(SET_CURRENT_TAB)
}

export const initialState = {
  showTabs: {'showScore': ' active show', 'showPenalty': ''}
}

export default handleActions({
  [SET_CURRENT_TAB]: (state, action) => ({
    ...state,
    showTabs: action.payload
  })
}, initialState)
