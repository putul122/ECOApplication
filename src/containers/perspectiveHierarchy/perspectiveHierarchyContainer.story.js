import React from 'react'
import { storiesOf } from '@storybook/react'
import { Provider } from 'react-redux'
import { createReduxStore } from '../../redux/store'
import PerspectiveHierarchy from './perspectiveHierarchyContainer'

storiesOf('PerspectiveHierarchyContainer', module)
  .add('with 7 stars', () => {
    const reduxStore = createReduxStore('PerspectiveHierarchy story store', {counter: {count: 7}})
    return (
      <Provider store={reduxStore}>
        <PerspectiveHierarchy />
      </Provider>
    )
  })
