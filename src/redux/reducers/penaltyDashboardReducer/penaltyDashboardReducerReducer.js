import { handleActions } from 'redux-actions'
import {
  META_MODEL_SUCCESS,
  MODEL_PERSPECTIVE_SUCCESS,
  MMODEL_PERSPECTIVE_SUCCESS
} from '../../sagas/penaltyDashboard/penaltyDashboardSaga'

export const actions = {
  META_MODEL_SUCCESS,
  MODEL_PERSPECTIVE_SUCCESS,
  MMODEL_PERSPECTIVE_SUCCESS
}
export const initialState = {
  penaltymetaData: [],
  penaltymodelPerspectiveData: [],
  modelPerspectiveData: []
}

export default handleActions(
  {
    [META_MODEL_SUCCESS]: (state, action) => ({
      ...state,
      penaltymetaData: action.payload
    }),
    [MMODEL_PERSPECTIVE_SUCCESS]: (state, action) => ({
      ...state,
      modelPerspectiveData: action.payload
    }),
    [MODEL_PERSPECTIVE_SUCCESS]: (state, action) => ({
      ...state,
      penaltymodelPerspectiveData: action.payload
    })
  },
  initialState
)
