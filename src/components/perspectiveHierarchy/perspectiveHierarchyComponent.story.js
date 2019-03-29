import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import '../../style/main.scss'
import PerspectiveHierarchy from './perspectiveHierarchyComponent'
storiesOf('PerspectiveHierarchy', module)
  .add('with text', () => (
    <PerspectiveHierarchy>
      Hello World
    </PerspectiveHierarchy>
  ))
