import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_COMPONENT_TYPE_COMPONENT = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT'
export const FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENT_FAILURE = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT_FAILURE'
export const FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES'
export const FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE'
export const FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS'
export const FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE'
export const FETCH_COMPONENT_TYPE_COMPONENTS = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENTS'
export const FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE'
export const FETCH_COMPONENT_CONSTRAINTS = 'saga/componentTypeComponent/FETCH_COMPONENT_CONSTRAINTS'
export const FETCH_COMPONENT_CONSTRAINTS_SUCCESS = 'saga/componentTypeComponent/FETCH_COMPONENT_CONSTRAINTS_SUCCESS'
export const FETCH_COMPONENT_CONSTRAINTS_FAILURE = 'saga/componentTypeComponent/FETCH_COMPONENT_CONSTRAINTS_FAILURE'
export const UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS = 'saga/componentTypeComponent/UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS'
export const UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS = 'saga/componentTypeComponent/UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS'
export const UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE = 'saga/componentTypeComponent/UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE'
export const UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES = 'saga/componentTypeComponent/UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES'
export const UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS = 'saga/componentTypeComponent/UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS'
export const UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE = 'saga/componentTypeComponent/UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE'
export const UPDATE_COMPONENT_TYPE_COMPONENT = 'saga/componentTypeComponent/UPDATE_COMPONENT_TYPE_COMPONENT'
export const UPDATE_COMPONENT_TYPE_COMPONENT_SUCCESS = 'saga/componentTypeComponent/UPDATE_COMPONENT_TYPE_COMPONENT_SUCCESS'
export const UPDATE_COMPONENT_TYPE_COMPONENT_FAILURE = 'saga/componentTypeComponent/UPDATE_COMPONENT_TYPE_COMPONENT_FAILURE'
export const DELETE_COMPONENT_TYPE_COMPONENT = 'saga/componentTypeComponent/DELETE_COMPONENT_TYPE_COMPONENT'
export const DELETE_COMPONENT_TYPE_COMPONENT_SUCCESS = 'saga/componentTypeComponent/DELETE_COMPONENT_TYPE_COMPONENT_SUCCESS'
export const DELETE_COMPONENT_TYPE_COMPONENT_FAILURE = 'saga/componentTypeComponent/DELETE_COMPONENT_TYPE_COMPONENT_FAILURE'
export const VIEW_RELATIONSHIP_PROPERTY = 'saga/componentTypeComponent/VIEW_RELATIONSHIP_PROPERTY'
export const VIEW_RELATIONSHIP_PROPERTY_SUCCESS = 'saga/componentTypeComponent/VIEW_RELATIONSHIP_PROPERTY_SUCCESS'
export const VIEW_RELATIONSHIP_PROPERTY_FAILURE = 'saga/componentTypeComponent/VIEW_RELATIONSHIP_PROPERTY_FAILURE'
export const UPDATE_RELATIONSHIP_PROPERTY = 'saga/componentTypeComponent/UPDATE_RELATIONSHIP_PROPERTY'
export const UPDATE_RELATIONSHIP_PROPERTY_SUCCESS = 'saga/componentTypeComponent/UPDATE_RELATIONSHIP_PROPERTY_SUCCESS'
export const UPDATE_RELATIONSHIP_PROPERTY_FAILURE = 'saga/componentTypeComponent/UPDATE_RELATIONSHIP_PROPERTY_FAILURE'
export const DELETE_COMPONENT_RELATIONSHIP = 'saga/componentTypeComponent/DELETE_COMPONENT_RELATIONSHIP'
export const DELETE_COMPONENT_RELATIONSHIP_SUCCESS = 'saga/componentTypeComponent/DELETE_COMPONENT_RELATIONSHIP_SUCCESS'
export const DELETE_COMPONENT_RELATIONSHIP_FAILURE = 'saga/componentTypeComponent/DELETE_COMPONENT_RELATIONSHIP_FAILURE'
export const FETCH_COMPONENTS = 'saga/componentTypeComponent/FETCH_COMPONENTS'
export const FETCH_COMPONENTS_SUCCESS = 'saga/componentTypeComponent/FETCH_COMPONENTS_SUCCESS'
export const FETCH_COMPONENTS_FAILURE = 'saga/componentTypeComponent/FETCH_COMPONENTS_FAILURE'

export const actionCreators = {
  fetchComponentTypeComponent: createAction(FETCH_COMPONENT_TYPE_COMPONENT),
  fetchComponentTypeComponentSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS),
  fetchComponentTypeComponentFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENT_FAILURE),
  fetchcomponentTypeComponentProperties: createAction(FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES),
  fetchcomponentTypeComponentPropertiesSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS),
  fetchcomponentTypeComponentPropertiesFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE),
  fetchcomponentTypeComponentRelationships: createAction(FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS),
  fetchcomponentTypeComponentRelationshipsSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS),
  fetchcomponentTypeComponentRelationshipsFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE),
  fetchComponentTypeComponents: createAction(FETCH_COMPONENT_TYPE_COMPONENTS),
  fetchComponentTypeComponentsSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS),
  fetchComponentTypeComponentsFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE),
  fetchComponentConstraints: createAction(FETCH_COMPONENT_CONSTRAINTS),
  fetchComponentConstraintsSuccess: createAction(FETCH_COMPONENT_CONSTRAINTS_SUCCESS),
  fetchComponentConstraintsFailure: createAction(FETCH_COMPONENT_CONSTRAINTS_FAILURE),
  updateComponentTypeComponentRelationships: createAction(UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS),
  updateComponentTypeComponentRelationshipsSuccess: createAction(UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS),
  updateComponentTypeComponentRelationshipsFailure: createAction(UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE),
  updateComponentTypeComponentProperties: createAction(UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES),
  updateComponentTypeComponentPropertiesSuccess: createAction(UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS),
  updateComponentTypeComponentPropertiesFailure: createAction(UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE),
  updateComponentTypeComponent: createAction(UPDATE_COMPONENT_TYPE_COMPONENT),
  updateComponentTypeComponentSuccess: createAction(UPDATE_COMPONENT_TYPE_COMPONENT_SUCCESS),
  updateComponentTypeComponentFailure: createAction(UPDATE_COMPONENT_TYPE_COMPONENT_FAILURE),
  deletecomponentTypeComponent: createAction(DELETE_COMPONENT_TYPE_COMPONENT),
  deletecomponentTypeComponentSuccess: createAction(DELETE_COMPONENT_TYPE_COMPONENT_SUCCESS),
  deletecomponentTypeComponentFailure: createAction(DELETE_COMPONENT_TYPE_COMPONENT_FAILURE),
  viewRelationshipProperty: createAction(VIEW_RELATIONSHIP_PROPERTY),
  viewRelationshipPropertySuccess: createAction(VIEW_RELATIONSHIP_PROPERTY_SUCCESS),
  viewRelationshipPropertyFailure: createAction(VIEW_RELATIONSHIP_PROPERTY_FAILURE),
  updateRelationshipProperty: createAction(UPDATE_RELATIONSHIP_PROPERTY),
  updateRelationshipPropertySuccess: createAction(UPDATE_RELATIONSHIP_PROPERTY_SUCCESS),
  updateRelationshipPropertyFailure: createAction(UPDATE_RELATIONSHIP_PROPERTY_FAILURE),
  deleteComponentRelationship: createAction(DELETE_COMPONENT_RELATIONSHIP),
  deleteComponentRelationshipSuccess: createAction(DELETE_COMPONENT_RELATIONSHIP_SUCCESS),
  deleteComponentRelationshipFailure: createAction(DELETE_COMPONENT_RELATIONSHIP_FAILURE),
  fetchComponents: createAction(FETCH_COMPONENTS),
  fetchComponentsSuccess: createAction(FETCH_COMPONENTS_SUCCESS),
  fetchComponentsFailure: createAction(FETCH_COMPONENTS_FAILURE)
}

export default function * watchComponentTypeComponent () {
  yield [
    takeLatest(FETCH_COMPONENT_TYPE_COMPONENT, getComponentTypeComponent),
    takeLatest(FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES, getComponentTypeComponentProperties),
    takeLatest(FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS, getComponentTypeComponentRelationships),
    takeLatest(FETCH_COMPONENT_CONSTRAINTS, getComponentConstraints),
    takeLatest(FETCH_COMPONENT_TYPE_COMPONENTS, getComponentTypeComponents),
    takeLatest(UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS, updateComponentTypeComponentRelationships),
    takeLatest(UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES, updateComponentTypeComponentProperties),
    takeLatest(UPDATE_COMPONENT_TYPE_COMPONENT, updateComponentTypeComponentData),
    takeLatest(DELETE_COMPONENT_TYPE_COMPONENT, deleteComponentTypeComponent),
    takeLatest(VIEW_RELATIONSHIP_PROPERTY, getRelationshipProperty),
    takeLatest(UPDATE_RELATIONSHIP_PROPERTY, updateRelationshipProperty),
    takeLatest(DELETE_COMPONENT_RELATIONSHIP, deleteComponentRelationship),
    takeLatest(FETCH_COMPONENTS, getComponents)
  ]
}

export function * getComponentTypeComponent (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponent(action.payload)
      // {params: action.payload}
    )
    yield put(actionCreators.fetchComponentTypeComponentSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentTypeComponentFailure(error))
  }
}

export function * getComponents (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const components = yield call(
      axios.get,
      api.getComponents,
      {params: action.payload}
    )
    yield put(actionCreators.fetchComponentsSuccess(components.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentsFailure(error))
  }
}

export function * getComponentTypeComponentProperties (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentProperty(action.payload)
      // {params: action.payload}
    )
    yield put(actionCreators.fetchcomponentTypeComponentPropertiesSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchcomponentTypeComponentPropertiesFailure(error))
  }
}

export function * getComponentTypeComponentRelationships (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentRelationships(action.payload)
      // {params: action.payload}
    )
    yield put(actionCreators.fetchcomponentTypeComponentRelationshipsSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchcomponentTypeComponentRelationshipsFailure(error))
  }
}

export function * getComponentConstraints (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentConstraints(action.payload)
      // {params: action.payload}
    )
    yield put(actionCreators.fetchComponentConstraintsSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentConstraintsFailure(error))
  }
}

export function * getComponentTypeComponents (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentTypeComponents(action.payload.componentTypeId)
      // {params: action.payload}
    )
    yield put(actionCreators.fetchComponentTypeComponentsSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentTypeComponentsFailure(error))
  }
}

export function * updateComponentTypeComponentRelationships (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.patch,
      api.updateComponentRelationships(action.payload),
      action.payload.relationship
      // {params: action.payload}
    )
    yield put(actionCreators.updateComponentTypeComponentRelationshipsSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.updateComponentTypeComponentRelationshipsFailure(error))
  }
}

export function * updateComponentTypeComponentProperties (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.patch,
      api.updateComponentProperties(action.payload),
      action.payload.property
      // {params: action.payload}
    )
    yield put(actionCreators.updateComponentTypeComponentPropertiesSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.updateComponentTypeComponentPropertiesFailure(error))
  }
}

export function * updateComponentTypeComponentData (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.patch,
      api.updateComponent(action.payload),
      action.payload.component
      // {params: action.payload}
    )
    yield put(actionCreators.updateComponentTypeComponentSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.updateComponentTypeComponentFailure(error))
  }
}

export function * deleteComponentTypeComponent (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const deleteComponent = yield call(
      axios.delete,
      api.deleteComponent(action.payload.id)
      // action.payload
     )
    yield put(actionCreators.deletecomponentTypeComponentSuccess(deleteComponent.data))
  } catch (error) {
    yield put(actionCreators.deletecomponentTypeComponentFailure(error))
  }
  console.log(action.payload)
}

export function * getRelationshipProperty (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const viewRelationship = yield call(
      axios.get,
      api.viewComponentRelationship(action.payload)
      // action.payload
     )
    yield put(actionCreators.viewRelationshipPropertySuccess(viewRelationship.data))
  } catch (error) {
    yield put(actionCreators.viewRelationshipPropertyFailure(error))
  }
}

export function * updateRelationshipProperty (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const updateRelationship = yield call(
      axios.patch,
      api.viewComponentRelationship(action.payload),
      action.payload.payloadData
     )
    yield put(actionCreators.updateRelationshipPropertySuccess(updateRelationship.data))
  } catch (error) {
    yield put(actionCreators.updateRelationshipPropertyFailure(error))
  }
}

export function * deleteComponentRelationship (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const deleteRelationship = yield call(
      axios.delete,
      api.deleteRelationship(action.payload),
      {params: action.payload.deletePayload}
      )
    yield put(actionCreators.deleteComponentRelationshipSuccess(deleteRelationship.data))
  } catch (error) {
    yield put(actionCreators.deleteComponentRelationshipFailure(error))
  }
}
