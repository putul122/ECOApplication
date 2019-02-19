import { createAction, handleActions } from 'redux-actions'
import { FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS,
  FETCH_COMPONENT_CONSTRAINTS_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
  UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS,
  DELETE_COMPONENT_TYPE_COMPONENT_SUCCESS,
  VIEW_RELATIONSHIP_PROPERTY_SUCCESS,
  UPDATE_RELATIONSHIP_PROPERTY_SUCCESS,
  DELETE_COMPONENT_RELATIONSHIP_SUCCESS,
  UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS
 } from '../../sagas/componentTypeComponent/componentTypeComponentSaga'
// Name Spaced Action Types
const SET_DATA_LOADING = 'ComponentTypeComponentReducer/SET_DATA_LOADING'
const SET_CURRENT_PAGE = 'ComponentTypeComponentReducer/SET_CURRENT_PAGE'
const SET_CURRENT_TAB = 'ComponentTypeComponentReducer/SET_CURRENT_TAB'
const SET_ADD_CONNECTION_SETTINGS = 'ComponentTypeComponentReducer/SET_ADD_CONNECTION_SETTINGS'
const SET_RELATIONSHIPS_VALUE = 'ComponentTypeComponentReducer/SET_RELATIONSHIPS_VALUE'
const SET_EDIT_COMPONENT_FLAG = 'ComponentTypeComponentReducer/SET_EDIT_COMPONENT_FLAG'
const COPY_COMPONENT_PROPERTIES = 'ComponentTypeComponentReducer/COPY_COMPONENT_PROPERTIES'
const COPY_COMPONENT_DATA = 'ComponentTypeComponentReducer/COPY_COMPONENT_DATA'
const RESTORE_COMPONENT_PROPERTIES = 'ComponentTypeComponentReducer/RESTORE_COMPONENT_PROPERTIES'
const EDIT_COMPONENT_PROPERTIES = 'ComponentTypeComponentReducer/EDIT_COMPONENT_PROPERTIES'
const PUSH_COMPONENT_PROPERTY_PAYLOAD = 'ComponentTypeComponentReducer/PUSH_COMPONENT_PROPERTY_PAYLOAD'
const RESET_UPDATE_RELATIONSHIP_RESPONSE = 'ComponentTypeComponentReducer/RESET_UPDATE_RELATIONSHIP_RESPONSE'
const SET_DISCUSSION_MODAL_OPEN_STATUS = 'ComponentTypeComponentReducer/SET_DISCUSSION_MODAL_OPEN_STATUS'
const EDIT_COMPONENT_RELATIONSHIP_PROPERTY = 'ComponentTypeComponentReducer/EDIT_COMPONENT_RELATIONSHIP_PROPERTY'
const RESET_COMPONENT_RELATIONSHIP_PROPERTY = 'ComponentTypeComponentReducer/RESET_COMPONENT_RELATIONSHIP_PROPERTY'
const SET_RELATIONSHIP_ACTION_SETTINGS = 'ComponentTypeComponentReducer/SET_RELATIONSHIP_ACTION_SETTINGS'
const EDIT_COMPONENT_RELATIONSHIP_PROPERTY_PAYLOAD = 'ComponentTypeComponentReducer/EDIT_COMPONENT_RELATIONSHIP_PROPERTY_PAYLOAD'
const RESET_RESPONSE = 'EntitlementDetailReducer/RESET_RESPONSE'

export const actions = {
  FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
  FETCH_COMPONENT_CONSTRAINTS_SUCCESS,
  UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS,
  SET_DATA_LOADING,
  SET_CURRENT_PAGE,
  SET_CURRENT_TAB,
  SET_ADD_CONNECTION_SETTINGS,
  SET_RELATIONSHIPS_VALUE,
  SET_EDIT_COMPONENT_FLAG,
  COPY_COMPONENT_PROPERTIES,
  COPY_COMPONENT_DATA,
  RESTORE_COMPONENT_PROPERTIES,
  EDIT_COMPONENT_PROPERTIES,
  PUSH_COMPONENT_PROPERTY_PAYLOAD,
  RESET_UPDATE_RELATIONSHIP_RESPONSE,
  DELETE_COMPONENT_TYPE_COMPONENT_SUCCESS,
  SET_RELATIONSHIP_ACTION_SETTINGS,
  VIEW_RELATIONSHIP_PROPERTY_SUCCESS,
  EDIT_COMPONENT_RELATIONSHIP_PROPERTY,
  RESET_COMPONENT_RELATIONSHIP_PROPERTY,
  EDIT_COMPONENT_RELATIONSHIP_PROPERTY_PAYLOAD,
  UPDATE_RELATIONSHIP_PROPERTY_SUCCESS,
  DELETE_COMPONENT_RELATIONSHIP_SUCCESS,
  UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS,
  RESET_RESPONSE,
  SET_DISCUSSION_MODAL_OPEN_STATUS
}

export const actionCreators = {
    setDataLoading: createAction(SET_DATA_LOADING),
    setCurrentPage: createAction(SET_CURRENT_PAGE),
    setCurrentTab: createAction(SET_CURRENT_TAB),
    setAddConnectionSettings: createAction(SET_ADD_CONNECTION_SETTINGS),
    setRelationshipsValue: createAction(SET_RELATIONSHIPS_VALUE),
    setEditComponentFlag: createAction(SET_EDIT_COMPONENT_FLAG),
    copyComponentProperties: createAction(COPY_COMPONENT_PROPERTIES),
    copyComponentData: createAction(COPY_COMPONENT_DATA),
    restoreComponentProperties: createAction(RESTORE_COMPONENT_PROPERTIES),
    editComponentProperties: createAction(EDIT_COMPONENT_PROPERTIES),
    pushComponentPropertyPayload: createAction(PUSH_COMPONENT_PROPERTY_PAYLOAD),
    resetUpdateRelationshipResponse: createAction(RESET_UPDATE_RELATIONSHIP_RESPONSE),
    setDiscussionModalOpenStatus: createAction(SET_DISCUSSION_MODAL_OPEN_STATUS),
    setRedirectFlag: createAction(DELETE_COMPONENT_TYPE_COMPONENT_SUCCESS),
    setRelationshipActionSettings: createAction(SET_RELATIONSHIP_ACTION_SETTINGS),
    editComponentRelationshipProperties: createAction(EDIT_COMPONENT_RELATIONSHIP_PROPERTY),
    resetComponentRelationshipProperties: createAction(RESET_COMPONENT_RELATIONSHIP_PROPERTY),
    editComponentRelationshipPropertyPayload: createAction(EDIT_COMPONENT_RELATIONSHIP_PROPERTY_PAYLOAD),
    resetResponse: createAction(RESET_RESPONSE)
}

export const initialState = {
  componentTypeComponentData: '',
  componentTypeComponentProperties: '',
  // copiedComponentProperties: {property: '', component: ''},
  copiedComponentProperties: '',
  copiedComponentData: '',
  componentPropertiesPayload: {property: [], component: [], relationship: []},
  componentTypeComponentRelationships: '',
  componentTypeComponentConstraints: '',
  componentTypeComponents: '',
  updateComponentPropertyResponse: '',
  updateRelationshipResponse: '',
  isComponentTypeLoading: false,
  currentPage: 1,
  showTabs: {'showProperty': ' active show', 'showRelationship': ''},
  addNewConnectionSettings: {
    firstSelectboxSelected: false,
    firstSelectboxIndex: null,
    targetComponentTypeId: '',
    isWaitingForApiResponse: false,
    secondSelectboxSelected: false,
    secondSelectboxIndex: '',
    isParentSelected: false,
    isNewComponent: false,
    newComponentName: '',
    isEditComponent: false,
    showAddRelationshipButton: false,
    showCreateConnectionButton: false,
    slectedConstraintObject: {},
    selectedComponentObject: {},
    relationshipText: '',
    componentText: '',
    newConnectionArray: []
  },
  relationshipActionSettings: {
    isModalOpen: false,
    actionType: '',
    relationshipId: '',
    relationshipText: '',
    componentName: '',
    selectedObject: ''
  },
  deleteComponent: false,
  relationshipProperty: '',
  relationshipPropertyPayload: [],
  updateRelationshipPropertyResponse: '',
  deleteRelationshipResponse: '',
  isDiscussionModalOpen: false
}

export default handleActions(
  {
    [FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeComponentData: action.payload
    }),
    [FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeComponentProperties: action.payload,
      currentPage: 1
    }),
    [FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeComponentRelationships: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [SET_CURRENT_TAB]: (state, action) => ({
      ...state,
      showTabs: action.payload
    }),
    [SET_ADD_CONNECTION_SETTINGS]: (state, action) => ({
      ...state,
      addNewConnectionSettings: action.payload
    }),
    [FETCH_COMPONENT_CONSTRAINTS_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeComponentConstraints: action.payload
    }),
    [FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeComponents: action.payload
    }),
    [SET_RELATIONSHIPS_VALUE]: (state, action) => ({
      ...state,
      componentTypeComponentRelationships: action.payload
    }),
    [UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS]: (state, action) => ({
      ...state,
      updateRelationshipResponse: action.payload
    }),
    [SET_EDIT_COMPONENT_FLAG]: (state, action) => ({
      ...state,
      isEditComponent: action.payload
    }),
    [COPY_COMPONENT_PROPERTIES]: (state, action) => ({
      ...state,
      copiedComponentProperties: action.payload
    }),
    [COPY_COMPONENT_DATA]: (state, action) => ({
      ...state,
      copiedComponentData: action.payload
    }),
    [RESTORE_COMPONENT_PROPERTIES]: (state, action) => ({
      ...state,
      componentTypeComponentProperties: action.payload.property,
      componentTypeComponentData: action.payload.component
    }),
    [EDIT_COMPONENT_PROPERTIES]: (state, action) => ({
      ...state,
      componentTypeComponentProperties: action.payload.property,
      componentTypeComponentData: action.payload.component
    }),
    [PUSH_COMPONENT_PROPERTY_PAYLOAD]: (state, action) => ({
      ...state,
      componentPropertiesPayload: action.payload
    }),
    [RESET_UPDATE_RELATIONSHIP_RESPONSE]: (state, action) => ({
      ...state,
      updateRelationshipResponse: '',
      updateRelationshipPropertyResponse: '',
      deleteRelationshipResponse: '',
      relationshipPropertyPayload: []
    }),
    [DELETE_COMPONENT_TYPE_COMPONENT_SUCCESS]: (state, action) => ({
      ...state,
      deleteComponent: action.payload
    }),
    [SET_RELATIONSHIP_ACTION_SETTINGS]: (state, action) => ({
      ...state,
      relationshipActionSettings: action.payload
    }),
    [VIEW_RELATIONSHIP_PROPERTY_SUCCESS]: (state, action) => ({
      ...state,
      relationshipProperty: action.payload
    }),
    [EDIT_COMPONENT_RELATIONSHIP_PROPERTY]: (state, action) => ({
      ...state,
      relationshipProperty: action.payload
    }),
    [RESET_COMPONENT_RELATIONSHIP_PROPERTY]: (state, action) => ({
      ...state,
      relationshipProperty: ''
    }),
    [EDIT_COMPONENT_RELATIONSHIP_PROPERTY_PAYLOAD]: (state, action) => ({
      ...state,
      relationshipPropertyPayload: action.payload
    }),
    [UPDATE_RELATIONSHIP_PROPERTY_SUCCESS]: (state, action) => ({
      ...state,
      updateRelationshipPropertyResponse: action.payload
    }),
    [DELETE_COMPONENT_RELATIONSHIP_SUCCESS]: (state, action) => ({
      ...state,
      deleteRelationshipResponse: action.payload
    }),
    [UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      updateComponentPropertyResponse: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      updateComponentPropertyResponse: '',
      deleteComponent: ''
    }),
    [SET_DISCUSSION_MODAL_OPEN_STATUS]: (state, action) => ({
      ...state,
      isDiscussionModalOpen: action.payload
    })
  },
  initialState
)
