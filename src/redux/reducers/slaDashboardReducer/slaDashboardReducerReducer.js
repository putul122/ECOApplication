import { handleActions } from 'redux-actions'
import {
  META_MODEL_SUCCESS,
  MODEL_PERSPECTIVE_SUCCESS,
  DROPDOWN_ITEMSDEP_SUCCESS,
  DROPDOWN_ITEMSSUP_SUCCESS,
  DROPDOWN_ITEMSSER_SUCCESS,
  DROPDOWN_ITEMSKPI_SUCCESS
} from '../../sagas/slaDashboard/slaDashboardSaga'

export const actions = {
  META_MODEL_SUCCESS,
  MODEL_PERSPECTIVE_SUCCESS,
  DROPDOWN_ITEMSDEP_SUCCESS,
  DROPDOWN_ITEMSSUP_SUCCESS,
  DROPDOWN_ITEMSSER_SUCCESS,
  DROPDOWN_ITEMSKPI_SUCCESS
}
export const initialState = {
  metaData: [],
  modelPerspectiveData: [],
  dropDownItemsDepData: [],
  dropDownItemsSupData: [],
  dropDownItemsSerData: [],
  dropDownItemsKpiData: []
}

export default handleActions(
  {
    [META_MODEL_SUCCESS]: (state, action) => ({
      ...state,
      metaData: action.payload
    }),
    [MODEL_PERSPECTIVE_SUCCESS]: (state, action) => ({
      ...state,
      modelPerspectiveData: action.payload
    }),
    [DROPDOWN_ITEMSDEP_SUCCESS]: (state, action) => ({
      ...state,
      dropDownItemsDepData: action.payload
    }),
    [DROPDOWN_ITEMSSUP_SUCCESS]: (state, action) => ({
      ...state,
      dropDownItemsSupData: action.payload
    }),
    [DROPDOWN_ITEMSSER_SUCCESS]: (state, action) => ({
      ...state,
      dropDownItemsSerData: action.payload
    }),
    [DROPDOWN_ITEMSKPI_SUCCESS]: (state, action) => ({
      ...state,
      dropDownItemsKpiData: action.payload
    })
  },
  initialState
)
