import { handleActions } from 'redux-actions'
import {
  META_MODEL_SUCCESS,
  MODEL_PERSPECTIVE_SUCCESS,
  MMODEL_PERSPECTIVE_SUCCESS,
  MMODEL_PERSPECTIVE_START
} from '../../sagas/penaltyDashboard/penaltyDashboardSaga'

export const actions = {
  META_MODEL_SUCCESS,
  MODEL_PERSPECTIVE_SUCCESS,
  MMODEL_PERSPECTIVE_SUCCESS,
  MMODEL_PERSPECTIVE_START
}
export const initialState = {
  penaltymetaData: [],
  penaltymodelPerspectiveData: [],
  modelPerspectiveData: [],
  isLoading: false
}

export default handleActions(
  {
    [META_MODEL_SUCCESS]: (state, action) => ({
      ...state,
      penaltymetaData: action.payload
    }),
    [MMODEL_PERSPECTIVE_SUCCESS]: (state, action) => ({
      ...state,
      isLoading: false,
      modelPerspectiveData: action.payload
    }),
    [MMODEL_PERSPECTIVE_START]: (state, action) => ({
      ...state,
      isLoading: true
    }),
    [MODEL_PERSPECTIVE_SUCCESS]: (state, action) => ({
      ...state,
      penaltymodelPerspectiveData: action.payload
    })
  },
  initialState
)
