import { createAction, handleActions } from 'redux-actions'
import { FETCH_PERSPECTIVES_LISTING_SUCCESS, FETCH_COMPONENT_TYPES_SUCCESS } from '../../sagas/perspectivesListing/perspectivesListingSaga'
// // Name Spaced Action Types

const SET_PERSPECTIVES_ACTION_SETTINGS = 'perspectivesListingReducer/SET_PERSPECTIVES_ACTION_SETTINGS'
const SET_CURRENT_PAGE = 'perspectivesListingReducer/SET_CURRENT_PAGE'
const SET_PER_PAGE = 'perspectivesListingReducer/SET_PER_PAGE'
const RESET_RESPONSE = 'perspectivesListingReducer/RESET_RESPONSE'

export const actions = {
    SET_PERSPECTIVES_ACTION_SETTINGS,
    FETCH_PERSPECTIVES_LISTING_SUCCESS,
    SET_CURRENT_PAGE,
    SET_PER_PAGE,
    RESET_RESPONSE,
    FETCH_COMPONENT_TYPES_SUCCESS
    // DELETE_ROLE_SUCCESS
 }

export const actionCreators = {
   setPerspectivesActionSettings: createAction(SET_PERSPECTIVES_ACTION_SETTINGS),
   setCurrentPage: createAction(SET_CURRENT_PAGE),
   setPerPage: createAction(SET_PER_PAGE),
   resetResponse: createAction(RESET_RESPONSE)
}

export const initialState = {
  perspectivesListing: '',
  componentTypes: '',
//   createRolesResponse: '',
//   deleteRoleResponse: '',
//   updateRoleResponse: '',
  perspectivesActionSettings: {
    isAddPerspectivesModalOpen: false,
    isDeletePerspectivesModalOpen: false,
    isEditPerspectivesModalOpen: false
    // deleteRoleData: ''
  },
  currentPage: 1,
  perPage: 10
}

export default handleActions(
  {
    [FETCH_PERSPECTIVES_LISTING_SUCCESS]: (state, action) => ({
      ...state,
      perspectivesListing: action.payload
    }),
    [SET_PERSPECTIVES_ACTION_SETTINGS]: (state, action) => ({
      ...state,
      perspectivesActionSettings: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
    }),
    [FETCH_COMPONENT_TYPES_SUCCESS]: (state, action) => ({
      ...state,
      componentTypes: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      resetResponse: action.payload
      // createRolesResponse: '',
      // deleteRoleResponse: ''
    })
    // [DELETE_ROLE_SUCCESS]: (state, action) => ({
    //   ...state,
    //   deleteRoleResponse: action.payload
    // })
  },
  initialState
)
