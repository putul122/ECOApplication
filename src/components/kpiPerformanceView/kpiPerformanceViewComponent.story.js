import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import '../../style/main.scss'
import KpiPerformanceView from './kpiPerformanceViewComponent'
storiesOf('KpiPerformanceView', module)
  .add('with text', () => (
    <KpiPerformanceView>
      Hello World
    </KpiPerformanceView>
  ))
