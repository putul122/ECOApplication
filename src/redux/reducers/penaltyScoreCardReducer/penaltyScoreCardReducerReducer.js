import { handleActions } from 'redux-actions'
import {
  PENALTY_SCORECARD_SUCCESS
} from '../../sagas/penaltyScoreCard/penaltyScoreCardSaga'

export const actions = {
  PENALTY_SCORECARD_SUCCESS
}
export const initialState = {
  penaltyScoreCardData: []
}

export default handleActions(
  {
    [PENALTY_SCORECARD_SUCCESS]: (state, action) => ({
      ...state,
      penaltyScoreCardData: action.payload
    })
  },
  initialState
)
