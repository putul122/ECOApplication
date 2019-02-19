import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_TEMPLATES = 'saga/tasks/FETCH_TEMPLATES'
export const FETCH_TEMPLATES_SUCCESS = 'saga/tasks/FETCH_TEMPLATES_SUCCESS'
export const FETCH_TEMPLATES_FAILURE = 'saga/tasks/FETCH_TEMPLATES_FAILURE'
export const FETCH_TEMPLATES_SUMMARY = 'saga/tasks/FETCH_TEMPLATES_SUMMARY'
export const FETCH_TEMPLATES_SUMMARY_SUCCESS = 'saga/tasks/FETCH_TEMPLATES_SUMMARY_SUCCESS'
export const FETCH_TEMPLATES_SUMMARY_FAILURE = 'saga/tasks/FETCH_TEMPLATES_SUMMARY_FAILURE'
export const FETCH_TEMPLATE_BY_ID = 'saga/tasks/FETCH_TEMPLATE_BY_ID'
export const FETCH_TEMPLATE_BY_ID_SUCCESS = 'saga/tasks/FETCH_TEMPLATE_BY_ID_SUCCESS'
export const FETCH_TEMPLATE_BY_ID_FAILURE = 'saga/tasks/FETCH_TEMPLATE_BY_ID_FAILURE'
export const CREATE_TEMPLATES = 'saga/tasks/CREATE_TEMPLATES'
export const CREATE_TEMPLATES_SUCCESS = 'saga/tasks/CREATE_TEMPLATES_SUCCESS'
export const CREATE_TEMPLATES_FAILURE = 'saga/tasks/CREATE_TEMPLATES_FAILURE'
export const UPDATE_TEMPLATES = 'saga/tasks/UPDATE_TEMPLATES'
export const UPDATE_TEMPLATES_SUCCESS = 'saga/tasks/UPDATE_TEMPLATES_SUCCESS'
export const UPDATE_TEMPLATES_FAILURE = 'saga/tasks/UPDATE_TEMPLATES_FAILURE'

export const actionCreators = {
  fetchTemplates: createAction(FETCH_TEMPLATES),
  fetchTemplatesSuccess: createAction(FETCH_TEMPLATES_SUCCESS),
  fetchTemplatesFailure: createAction(FETCH_TEMPLATES_FAILURE),
  fetchTemplatesSummary: createAction(FETCH_TEMPLATES_SUMMARY),
  fetchTemplatesSummarySuccess: createAction(FETCH_TEMPLATES_SUMMARY_SUCCESS),
  fetchTemplatesSummaryFailure: createAction(FETCH_TEMPLATES_SUMMARY_FAILURE),
  fetchTemplateById: createAction(FETCH_TEMPLATE_BY_ID),
  fetchTemplateByIdSuccess: createAction(FETCH_TEMPLATE_BY_ID_SUCCESS),
  fetchTemplateByIdFailure: createAction(FETCH_TEMPLATE_BY_ID_FAILURE),
  createTemplates: createAction(CREATE_TEMPLATES),
  createTemplatesSuccess: createAction(CREATE_TEMPLATES_SUCCESS),
  createTemplatesFailure: createAction(CREATE_TEMPLATES_FAILURE),
  updateTemplates: createAction(UPDATE_TEMPLATES),
  updateTemplatesSuccess: createAction(UPDATE_TEMPLATES_SUCCESS),
  updateTemplatesFailure: createAction(UPDATE_TEMPLATES_FAILURE)
}

export default function * watchTemplates () {
  yield [
      takeLatest(FETCH_TEMPLATES, getTemplates),
      takeLatest(FETCH_TEMPLATES_SUMMARY, getTemplatesSummary),
      takeLatest(FETCH_TEMPLATE_BY_ID, getTemplateById),
      takeLatest(CREATE_TEMPLATES, createTemplates),
      takeLatest(UPDATE_TEMPLATES, updateTemplate)
    ]
}

export function * getTemplates (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const templates = yield call(
      axios.get,
      api.getReviewTemplates,
      {params: action.payload}
    )
    yield put(actionCreators.fetchTemplatesSuccess(templates.data))
  } catch (error) {
    yield put(actionCreators.fetchTemplatesFailure(error))
  }
}

export function * getTemplatesSummary (action) {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
      const templatesSummary = yield call(
        axios.get,
        api.getTemplatesSummary,
        {params: action.payload}
      )
      yield put(actionCreators.fetchTemplatesSummarySuccess(templatesSummary.data))
    } catch (error) {
      yield put(actionCreators.fetchTemplatesSummaryFailure(error))
    }
  }

export function * getTemplateById (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const template = yield call(
      axios.get,
      api.getReviewTemplate,
      {params: action.payload}
    )
    yield put(actionCreators.fetchTemplateByIdSuccess(template.data))
  } catch (error) {
    yield put(actionCreators.fetchTemplateByIdFailure(error))
  }
}
export function * createTemplates (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const template = yield call(
      axios.post,
      api.createReviewTemplate,
      action.payload
    )
    yield put(actionCreators.createTemplatesSuccess(template.data))
  } catch (error) {
    yield put(actionCreators.createTemplatesFailure(error))
  }
}
export function * updateTemplate (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const template = yield call(
      axios.patch,
      api.updateReviewTemplate,
      action.payload
    )
    yield put(actionCreators.updateTemplatesSuccess(template.data))
  } catch (error) {
    yield put(actionCreators.updateTemplatesFailure(error))
  }
}
