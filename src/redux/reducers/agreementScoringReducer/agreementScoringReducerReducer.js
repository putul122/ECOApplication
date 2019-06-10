import { handleActions } from 'redux-actions'
import {
  META_MODEL_SUCCESS,
  MODEL_PERSPECTIVE_SUCCESS,
  MODEL_PERSPECTIVE_START
} from '../../sagas/agreementScoring/agreementScoringSaga'

export const actions = {
  META_MODEL_SUCCESS,
  MODEL_PERSPECTIVE_START,
  MODEL_PERSPECTIVE_SUCCESS
}
export const initialState = {
  metaData: [],
  modelPerspectiveData: [],
  isLoading: false
}

export default handleActions(
  {
    [META_MODEL_SUCCESS]: (state, action) => ({
      ...state,
      metaData: action.payload
    }),
    [MODEL_PERSPECTIVE_SUCCESS]: (state, action) => ({
      ...state,
      isLoading: false,
      modelPerspectiveData: action.payload
    }),
    [MODEL_PERSPECTIVE_START]: (state, action) => ({
      isLoading: true
    })
  },
  initialState
)
