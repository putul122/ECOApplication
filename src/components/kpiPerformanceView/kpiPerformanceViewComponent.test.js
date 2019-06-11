import React from 'react'
import KpiPerformanceView from './kpiPerformanceViewComponent'
import {shallow} from 'enzyme'

it('should call onClick', () => {
  const onClickMock = jest.fn()
  const kpiPerformanceView = shallow(<KpiPerformanceView onClick={onClickMock} />)
  kpiPerformanceView.find('button').simulate('click')
  expect(onClickMock.mock.calls.length).toBe(1)
})
