import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_COMPONENT_BY_ID = 'saga/componentType/FETCH_COMPONENT_BY_ID'
export const FETCH_COMPONENT_BY_ID_SUCCESS = 'saga/componentType/FETCH_COMPONENT_BY_ID_SUCCESS'
export const FETCH_COMPONENT_BY_ID_FAILURE = 'saga/componentType/FETCH_COMPONENT_BY_ID_FAILURE'
export const FETCH_COMPONENT_CONSTRAINT = 'saga/componentType/FETCH_COMPONENT_CONSTRAINT'
export const FETCH_COMPONENT_CONSTRAINT_SUCCESS = 'saga/componentType/FETCH_COMPONENT_CONSTRAINT_SUCCESS'
export const FETCH_COMPONENT_CONSTRAINT_FAILURE = 'saga/componentType/FETCH_COMPONENT_CONSTRAINT_FAILURE'
export const FETCH_COMPONENT_COMPONENT = 'saga/componentType/FETCH_COMPONENT_COMPONENT'
export const FETCH_COMPONENT_COMPONENT_SUCCESS = 'saga/componentType/FETCH_COMPONENT_COMPONENT_SUCCESS'
export const FETCH_COMPONENT_COMPONENT_FAILURE = 'saga/componentType/FETCH_COMPONENT_COMPONENT_FAILURE'
export const SEARCH_COMPONENT_COMPONENT = 'saga/componentType/SEARCH_COMPONENT_COMPONENT'
export const SEARCH_COMPONENT_COMPONENT_SUCCESS = 'saga/componentType/SEARCH_COMPONENT_COMPONENT_SUCCESS'
export const SEARCH_COMPONENT_COMPONENT_FAILURE = 'saga/componentType/SEARCH_COMPONENT_COMPONENT_FAILURE'
export const ADD_COMPONENT_COMPONENT = 'saga/componentType/ADD_COMPONENT_COMPONENT'
export const ADD_COMPONENT_COMPONENT_SUCCESS = 'saga/componentType/ADD_COMPONENT_COMPONENT_SUCCESS'
export const ADD_COMPONENT_COMPONENT_FAILURE = 'saga/componentType/ADD_COMPONENT_COMPONENT_FAILURE'

export const actionCreators = {
  fetchComponentById: createAction(FETCH_COMPONENT_BY_ID),
  fetchComponentByIdSuccess: createAction(FETCH_COMPONENT_BY_ID_SUCCESS),
  fetchComponentByIdFailure: createAction(FETCH_COMPONENT_BY_ID_FAILURE),
  searchComponentComponent: createAction(SEARCH_COMPONENT_COMPONENT),
  searchComponentComponentSuccess: createAction(SEARCH_COMPONENT_COMPONENT_SUCCESS),
  searchComponentComponentFailure: createAction(SEARCH_COMPONENT_COMPONENT_FAILURE),
  fetchComponentConstraint: createAction(FETCH_COMPONENT_CONSTRAINT),
  fetchComponentConstraintSuccess: createAction(FETCH_COMPONENT_CONSTRAINT_SUCCESS),
  fetchComponentConstraintFailure: createAction(FETCH_COMPONENT_CONSTRAINT_FAILURE),
  fetchComponentComponent: createAction(FETCH_COMPONENT_COMPONENT),
  fetchComponentComponentSuccess: createAction(FETCH_COMPONENT_COMPONENT_SUCCESS),
  fetchComponentComponentFailure: createAction(FETCH_COMPONENT_COMPONENT_FAILURE),
  addComponentComponent: createAction(ADD_COMPONENT_COMPONENT),
  addComponentComponentSuccess: createAction(ADD_COMPONENT_COMPONENT_SUCCESS),
  addComponentComponentFailure: createAction(ADD_COMPONENT_COMPONENT_FAILURE)
}

export default function * watchApplicationDetail () {
  yield [
    takeLatest(FETCH_COMPONENT_BY_ID, getComponentById),
    takeLatest(FETCH_COMPONENT_CONSTRAINT, getComponentConstraint),
    takeLatest(FETCH_COMPONENT_COMPONENT, getComponentComponent),
    takeLatest(SEARCH_COMPONENT_COMPONENT, searchComponentComponent),
    takeLatest(ADD_COMPONENT_COMPONENT, addComponentComponent)
  ]
}

export function * getComponentById (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentDetails = yield call(
      axios.get,
      api.getComponentById(action.payload.id)
    )
    const messages = yield call(
      axios.get,
      'https://ecoconductor-dev-api-notification.azurewebsites.net/messages'
    )
    console.log('Messages GGGGGGGGGGGGGGGGg', messages)
    yield put(actionCreators.fetchComponentByIdSuccess(componentDetails.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentByIdFailure(error))
  }
}

export function * getComponentConstraint (action) {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
      const componentConstraints = yield call(
        axios.get,
        api.getComponentTypeConstraints(action.payload.id)
      )
      yield put(actionCreators.fetchComponentConstraintSuccess(componentConstraints.data))
    } catch (error) {
      yield put(actionCreators.fetchComponentConstraintFailure(error))
    }
}

export function * getComponentComponent (action) {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
      const componentComponents = yield call(
        axios.get,
        api.getComponentTypeComponents(action.payload.id),
        {params: action.payload.ComponentTypeComponent}
      )
      yield put(actionCreators.fetchComponentComponentSuccess(componentComponents.data))
    } catch (error) {
      yield put(actionCreators.fetchComponentComponentFailure(error))
    }
}

export function * searchComponentComponent (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentComponents = yield call(
      axios.get,
      api.getComponentTypeComponents(action.payload.id),
      {params: action.payload.ComponentTypeComponent}
    )
    yield put(actionCreators.searchComponentComponentSuccess(componentComponents.data))
  } catch (error) {
    yield put(actionCreators.searchComponentComponentFailure(error))
  }
}

export function * addComponentComponent (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const addComponent = yield call(
      axios.post,
      // api.addComponent,
      api.addComponent(action.payload),
      // {params: action.payload.component_type}
      action.payload
    )
    yield put(actionCreators.addComponentComponentSuccess(addComponent.data))
  } catch (error) {
    yield put(actionCreators.addComponentComponentFailure(error))
  }
}
