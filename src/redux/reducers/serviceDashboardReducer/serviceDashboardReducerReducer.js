import {createAction, handleActions} from 'redux-actions'
import {
    FETCH_MODEL_PRESPECTIVES_SUCCESS
} from '../../sagas/model/modelSaga'
// Name Spaced Action Types
const SET_DASHBOARD_PERSPECTIVES = 'serviceDashboardReducer/SET_DASHBOARD_PERSPECTIVES'

export const actions = {
    FETCH_MODEL_PRESPECTIVES_SUCCESS,
    SET_DASHBOARD_PERSPECTIVES
}

export const actionCreators = {
  setDashboardPerspectives: createAction(SET_DASHBOARD_PERSPECTIVES)
}

export const initialState = {
    dashboardPerspectives: '',
    data: ''
}

export default handleActions(
  {
    [FETCH_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      dashboardPerspectives: action.payload
    }),
    [SET_DASHBOARD_PERSPECTIVES]: (state, action) => ({
      ...state,
      data: action.payload
    })
  },
  initialState
)
