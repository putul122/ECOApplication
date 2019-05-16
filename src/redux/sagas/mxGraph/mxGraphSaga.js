import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'

import api from '../../../constants'

// Saga action strings
export const MX_GRAPH_SUCCESS = 'saga/mxGraph/MX_GRAPH_SUCCESS'
export const GET_MX_DATA = 'saga/mxGraph/GET_MX_DATA'
export const MX_GRAPH_FAILURE = 'saga/mxGraph/MX_GRAPH_FAILURE'

export const actionCreators = {
    mxGraphSuccess: createAction(MX_GRAPH_SUCCESS),
    mxGraphFailure: createAction(MX_GRAPH_FAILURE),
    getMxGraphData: createAction(GET_MX_DATA)
}

export default function * watchSlaActions () {
  yield [
    takeLatest(GET_MX_DATA, getMxGraphData)
  ]
}

export function * getMxGraphData (action) {
  try {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('userAccessToken')
    const mxGraph = yield call(
      axios.get,
      api.getMxGraphData,
      action.payload
    )
    yield put(actionCreators.mxGraphSuccess(mxGraph.data))
  } catch (error) {
    yield put(actionCreators.mxGraphFailure(error))
  }
}
