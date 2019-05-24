import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import '../../style/main.scss'
import BalancedScorecard from './balancedScorecardComponent'
storiesOf('BalancedScorecard', module)
  .add('with text', () => (
    <BalancedScorecard>
      Hello World
    </BalancedScorecard>
  ))
