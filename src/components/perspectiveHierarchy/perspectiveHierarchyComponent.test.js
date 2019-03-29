import React from 'react'
import PerspectiveHierarchy from './perspectiveHierarchyComponent'
import {shallow} from 'enzyme'

it('should call onClick', () => {
  const onClickMock = jest.fn()
  const perspectiveHierarchy = shallow(<PerspectiveHierarchy onClick={onClickMock} />)
  perspectiveHierarchy.find('button').simulate('click')
  expect(onClickMock.mock.calls.length).toBe(1)
})
