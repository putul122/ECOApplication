import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Root from './routes/root/rootRoute'
import registerServiceWorker from './registerServiceWorker'
// import 'react-select-2/dist/css/react-select-2.css'
// import './style/main.scss'
import createReduxStore from './redux/store'
import { AppContainer } from 'react-hot-loader'
// import '../node_modules/bootstrap/dist/css/bootstrap.css'
// import './assets/vendors/base/vendors.bundle.css'
// import './assets/demo/demo7/base/style.bundle.css'
// import './assets/vendors/base/vendors.bundle.js'
// eslint-disable-next-line
// import './assets/demo/demo7/base/scripts.bundle.js'
// import createHistory from 'history/createBrowserHistory'

const store = createReduxStore()
// const history = syncHistoryWithStore(browserHistory, store)
// const history = createHistory()
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Root)

if (module.hot) {
  module.hot.accept('./routes/root/rootRoute', () => {
    // render(Root)
    render(require('./routes/root/rootRoute').default)
  })
}

registerServiceWorker()
