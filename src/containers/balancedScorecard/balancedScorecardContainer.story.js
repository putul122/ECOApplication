import React from 'react'
import { storiesOf } from '@storybook/react'
import { Provider } from 'react-redux'
import { createReduxStore } from '../../redux/store'
import BalancedScorecard from './balancedScorecardContainer'

storiesOf('BalancedScorecardContainer', module)
  .add('with 7 stars', () => {
    const reduxStore = createReduxStore('BalancedScorecard story store', {counter: {count: 7}})
    return (
      <Provider store={reduxStore}>
        <BalancedScorecard />
      </Provider>
    )
  })
