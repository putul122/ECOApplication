import { handleActions } from 'redux-actions'
import {
    MX_GRAPH_SUCCESS
} from '../../sagas/mxGraph/mxGraphSaga'

export const actions = {
    MX_GRAPH_SUCCESS
}
export const initialState = {
    mxGraphData: []
}

export default handleActions(
  {
    [MX_GRAPH_SUCCESS]: (state, action) => ({
      ...state,
      mxGraphData: action.payload
    })
  },
  initialState
)
