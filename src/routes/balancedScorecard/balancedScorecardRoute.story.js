import React from 'react'
import { storiesOf } from '@storybook/react'
import { Provider } from 'react-redux'
import createReduxStore from '../../redux/store'
import BalancedScorecard from './balancedScorecardScene'

const reduxStore = createReduxStore()

const provider = (storyFn) => (
  <Provider store={reduxStore}>
    { storyFn() }
  </Provider>
)

storiesOf('BalancedScorecard Scene', module)
  .addDecorator(provider)
  .add('should Render', () => (
    <BalancedScorecard />
  ))
