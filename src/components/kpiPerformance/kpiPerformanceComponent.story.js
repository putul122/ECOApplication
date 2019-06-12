import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import '../../style/main.scss'
import KpiPerformance from './kpiPerformanceComponent'
storiesOf('KpiPerformance', module)
  .add('with text', () => (
    <KpiPerformance>
      Hello World
    </KpiPerformance>
  ))
