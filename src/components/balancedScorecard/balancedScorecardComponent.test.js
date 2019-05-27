import React from 'react'
import BalancedScorecard from './balancedScorecardComponent'
import {shallow} from 'enzyme'

it('should call onClick', () => {
  const onClickMock = jest.fn()
  const balancedScorecard = shallow(<BalancedScorecard onClick={onClickMock} />)
  balancedScorecard.find('button').simulate('click')
  expect(onClickMock.mock.calls.length).toBe(1)
})
