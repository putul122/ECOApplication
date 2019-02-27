import {createAction, handleActions} from 'redux-actions'
import {
    FETCH_MODEL_PRESPECTIVES_SUCCESS
} from '../../sagas/model/modelSaga'
// Name Spaced Action Types
const SET_MODAL_OPEN_STATUS = 'serviceDashboardReducer/SET_MODAL_OPEN_STATUS'

export const actions = {
    FETCH_MODEL_PRESPECTIVES_SUCCESS
}

export const actionCreators = {
  setModalOpenStatus: createAction(SET_MODAL_OPEN_STATUS)
}

export const initialState = {
    dashboardPerspectives: '',
    isModalOpen: false
}

export default handleActions(
  {
    [FETCH_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      dashboardPerspectives: action.payload
    }),
    [SET_MODAL_OPEN_STATUS]: (state, action) => ({
      ...state,
      isModalOpen: action.payload
    })
  },
  initialState
)
