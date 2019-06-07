import React from 'react'
import KpiPerformance from './kpiPerformanceComponent'
import {shallow} from 'enzyme'

it('should call onClick', () => {
  const onClickMock = jest.fn()
  const kpiPerformance = shallow(<KpiPerformance onClick={onClickMock} />)
  kpiPerformance.find('button').simulate('click')
  expect(onClickMock.mock.calls.length).toBe(1)
})
