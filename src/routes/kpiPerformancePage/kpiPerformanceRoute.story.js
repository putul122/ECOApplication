import React from 'react'
import { storiesOf } from '@storybook/react'
import { Provider } from 'react-redux'
import createReduxStore from '../../redux/store'
import KpiPerformance from './kpiPerformanceScene'


const reduxStore = createReduxStore()

const provider = (storyFn) => (
  <Provider store={reduxStore}>
    { storyFn() }
  </Provider>
)

storiesOf('KpiPerformance Scene', module)
  .addDecorator(provider)
  .add('should Render', () => (
    <KpiPerformance />
  ))
