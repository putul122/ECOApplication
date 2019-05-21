import React from 'react'
import PerspectiveHierarchyScene from './perspectiveHierarchyScene'
import {shallow} from 'enzyme'

it('should render', () => {
  const perspectiveHierarchyScene = shallow(<PerspectiveHierarchyScene />)
  expect(perspectiveHierarchyScene.length).toBe(1)
})


// You could use something like this to test onClick handlers
// it('should call trigger stars naviation', () => {
//   const starsButtonMock = jest.fn()
//   const appScene = shallow(<PerspectiveHierarchy navigation={{navigate: starsButtonMock}} />)
//   const starsButton = appScene.find('.stars-button')
//   starsButton.simulate('press')
//   expect(starsButtonMock.mock.calls.length).toBe(1)
// })

// it('should call trigger dev-panel naviation', () => {
//   const starsButtonMock = jest.fn()
//   const appScene = shallow(<PerspectiveHierarchy navigation={{navigate: starsButtonMock}} />)
//   const starsButton = appScene.find('.dev-panel-button')
//   starsButton.simulate('press')
//   expect(starsButtonMock.mock.calls.length).toBe(1)
// })
