import React from 'react'
import { storiesOf } from '@storybook/react'
import { Provider } from 'react-redux'
import { createReduxStore } from '../../redux/store'
import KpiPerformanceView from './kpiPerformanceViewContainer'

storiesOf('KpiPerformanceViewContainer', module)
  .add('with 7 stars', () => {
    const reduxStore = createReduxStore('KpiPerformanceView story store', {counter: {count: 7}})
    return (
      <Provider store={reduxStore}>
        <KpiPerformanceView />
      </Provider>
    )
  })
