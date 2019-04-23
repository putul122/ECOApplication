import { createAction, handleActions } from 'redux-actions'
import { FETCH_PERSPECTIVES_LISTING_SUCCESS, FETCH_COMPONENT_TYPES_SUCCESS, FETCH_CONNECTION_TYPES_SUCCESS, CREATE_PERSPECTIVE_SUCCESS } from '../../sagas/perspectivesListing/perspectivesListingSaga'
// // Name Spaced Action Types

const SET_PERSPECTIVES_ACTION_SETTINGS = 'perspectivesListingReducer/SET_PERSPECTIVES_ACTION_SETTINGS'
const SET_CURRENT_PAGE = 'perspectivesListingReducer/SET_CURRENT_PAGE'
const SET_PER_PAGE = 'perspectivesListingReducer/SET_PER_PAGE'
const RESET_RESPONSE = 'perspectivesListingReducer/RESET_RESPONSE'
const SET_TYPES_FLAG = 'perspectivesListingReducer/SET_TYPES_FLAG'
const SET_CRUDE_VALUES = 'perspectivesListingReducer/SET_CRUDE_VALUES'
const SET_CRUDE_VALUES_FLAG = 'perspectivesListingReducer/SET_CRUDE_VALUES_FLAG'
const SET_SELECTED_COMPONENT_TYPE = 'perspectivesListingReducer/SET_SELECTED_COMPONENT_TYPE'
const SET_SELECTED_CONNECTION_TYPE = 'perspectivesListingReducer/SET_SELECTED_CONNECTION_TYPE'
const SET_CRUDE_SETTINGS = 'perspectivesListingReducer/SET_CRUDE_SETTINGS'

export const actions = {
    SET_PERSPECTIVES_ACTION_SETTINGS,
    FETCH_PERSPECTIVES_LISTING_SUCCESS,
    SET_CURRENT_PAGE,
    SET_PER_PAGE,
    SET_TYPES_FLAG,
    RESET_RESPONSE,
    FETCH_COMPONENT_TYPES_SUCCESS,
    FETCH_CONNECTION_TYPES_SUCCESS,
    CREATE_PERSPECTIVE_SUCCESS,
    SET_CRUDE_VALUES,
    SET_CRUDE_VALUES_FLAG,
    SET_SELECTED_COMPONENT_TYPE,
    SET_SELECTED_CONNECTION_TYPE,
    SET_CRUDE_SETTINGS
    // DELETE_ROLE_SUCCESS
 }

export const actionCreators = {
   setPerspectivesActionSettings: createAction(SET_PERSPECTIVES_ACTION_SETTINGS),
   setCurrentPage: createAction(SET_CURRENT_PAGE),
   setPerPage: createAction(SET_PER_PAGE),
   resetResponse: createAction(RESET_RESPONSE),
   setTypesFlag: createAction(SET_TYPES_FLAG),
   setCrudeValues: createAction(SET_CRUDE_VALUES),
   setCrudeValuesflag: createAction(SET_CRUDE_VALUES_FLAG),
   setSelectedComponentTypes: createAction(SET_SELECTED_COMPONENT_TYPE),
   setSelectedConnectionTypes: createAction(SET_SELECTED_CONNECTION_TYPE),
   setCrudeSettings: createAction(SET_CRUDE_SETTINGS)
}

export const initialState = {
  perspectivesListing: '',
  componentTypes: '',
  connectionTypes: '',
  selectedComponentType: null,
  selectedConnectionType: null,
  perspective: '',
  isTypesSelected: null,
  isCrudSelected: {
    None: false,
    Create: false,
    Update: false,
    Delete: false,
    Read: false
  },
  perspectivesActionSettings: {
    isAddPerspectivesModalOpen: false,
    isDeletePerspectivesModalOpen: false,
    isEditPerspectivesModalOpen: false
    // deleteRoleData: ''
  },
  currentPage: 1,
  perPage: 10,
  crude: {
    None: 0,
    Create: 1,
    Update: 4,
    Delete: 8,
    Read: 2
  },
  crudeSettings: {
    crudItems: []
  }
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
    [SET_TYPES_FLAG]: (state, action) => ({
      ...state,
      isTypesSelected: action.payload
    }),
    [SET_CRUDE_VALUES]: (state, action) => ({
      ...state,
      crude: action.payload
    }),
    [SET_CRUDE_VALUES_FLAG]: (state, action) => ({
      ...state,
      isCrudSelected: action.payload
    }),
    [SET_CRUDE_SETTINGS]: (state, action) => ({
      ...state,
      crudeSettings: action.payload
    }),
    [FETCH_COMPONENT_TYPES_SUCCESS]: (state, action) => ({
      ...state,
      componentTypes: action.payload
    }),
    [FETCH_CONNECTION_TYPES_SUCCESS]: (state, action) => ({
      ...state,
      connectionTypes: action.payload
    }),
    [CREATE_PERSPECTIVE_SUCCESS]: (state, action) => ({
      ...state,
      perspective: action.payload
    }),
    [SET_SELECTED_COMPONENT_TYPE]: (state, action) => ({
      ...state,
      selectedComponentType: action.payload
    }),
    [SET_SELECTED_CONNECTION_TYPE]: (state, action) => ({
      ...state,
      selectedConnectionType: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      resetResponse: action.payload,
      perspective: ''
      // deleteRoleResponse: ''
    })
    // [DELETE_ROLE_SUCCESS]: (state, action) => ({
    //   ...state,
    //   deleteRoleResponse: action.payload
    // })
  },
  initialState
)
