import {getKpiPerformance} from './KpiPerformanceSaga'
import { call } from 'redux-saga/effects'
import axios from 'axios'

it('should call the api', () => {
  const iterator = getKpiPerformance()
  expect(iterator.next().value).toEqual(call(axios.get, 'https://api.github.com/repos/ericwooley/react-native-redux-jest-starter-kit'))
})
