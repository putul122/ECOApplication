import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppWrapper from '../../components/appWrapper/appWrapperComponent'

if (module.hot) {
	module.hot.accept()
}

export default class Root extends Component {
	constructor () {
		super()

		this.views = {}
	}

	loadView (fileName, props) {
		if (this.views[fileName]) {
			return this.views[fileName]
		}

		new Promise(resolve =>
      require.ensure([], require => {
	switch (fileName) {
	case 'dummy':
		if (module.hot) {
			module.hot.accept('../dummyPage/homePageRoute', () => {
                require('../dummyPage/homePageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../dummyPage/homePageRoute').default)
		break
	case 'home':
		if (module.hot) {
			module.hot.accept('../homePage/homePageRoute', () => {
                require('../homePage/homePageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../homePage/homePageRoute').default)
		break
	case 'landing':
		if (module.hot) {
			module.hot.accept('../landingPage/landingPageRoute', () => {
                require('../landingPage/landingPageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../landingPage/landingPageRoute').default)
		break
	case 'registerProcess':
		if (module.hot) {
			module.hot.accept('../registerProcessPage/registerProcessPageRoute', () => {
                require('../registerProcessPage/registerProcessPageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../registerProcessPage/registerProcessPageRoute').default)
		break
	case 'components':
		if (module.hot) {
			module.hot.accept('../componentsPage/componentsPageRoute', () => {
                require('../componentsPage/componentsPageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../componentsPage/componentsPageRoute').default)
		break
	case 'forgotPassword':
		if (module.hot) {
			module.hot.accept('../forgotPasswordPage/forgotPasswordPageRoute', () => {
                require('../forgotPasswordPage/forgotPasswordPageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../forgotPasswordPage/forgotPasswordPageRoute').default)
		break
	case 'changePassword':
		if (module.hot) {
			module.hot.accept('../changePasswordPage/changePasswordPageRoute', () => {
                require('../changePasswordPage/changePasswordPageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../changePasswordPage/changePasswordPageRoute').default)
		break
	case 'tasks':
		if (module.hot) {
			module.hot.accept('../tasksPage/tasksPageRoute', () => {
                require('../tasksPage/tasksPageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../tasksPage/tasksPageRoute').default)
		break
	case 'serviceDashboard':
		if (module.hot) {
			module.hot.accept('../serviceDashboardPage/serviceDashboardPageRoute', () => {
                require('../serviceDashboardPage/serviceDashboardPageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../serviceDashboardPage/serviceDashboardPageRoute').default)
		break
	case 'taskDetail':
		if (module.hot) {
			module.hot.accept('../taskDetailPage/taskDetailPageRoute', () => {
                require('../taskDetailPage/taskDetailPageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../taskDetailPage/taskDetailPageRoute').default)
		break
	case 'applicationDetail':
		if (module.hot) {
			module.hot.accept('../applicationDetailPage/applicationDetailPageRoute', () => {
                require('../applicationDetailPage/applicationDetailPageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../applicationDetailPage/applicationDetailPageRoute').default)
		break
	case 'componentTypeComponent':
		if (module.hot) {
			module.hot.accept('../componentTypeComponentPage/componentTypeComponentPageRoute', () => {
                require('../componentTypeComponentPage/componentTypeComponentPageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../componentTypeComponentPage/componentTypeComponentPageRoute').default)
		break
	case 'explorer':
		if (module.hot) {
			module.hot.accept('../explorerPage/explorerPageRoute', () => {
                require('../explorerPage/explorerPageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../explorerPage/explorerPageRoute').default)
		break
	case 'sheets':
		if (module.hot) {
            module.hot.accept('../sheetsPage/sheetsPageRoute', () => {
				require('../sheetsPage/sheetsPageRoute').default // eslint-disable-line
                this.forceUpdate()
            })
		}
		resolve(require('../sheetsPage/sheetsPageRoute').default)
		break
	case 'users':
		if (module.hot) {
			module.hot.accept('../usersPage/usersPageRoute', () => {
				require('../usersPage/usersPageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../usersPage/usersPageRoute').default)
		break
	default:
		break
	}
})
    )
      .then(View => {
	this.views[fileName] = <View {...props} />
})
      .then(() => this.forceUpdate())
      .catch(err => {
	console.error(err)
	throw new Error(err)
})

		return <div />
	}
	render () {
		return (
  <AppWrapper>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={(props) => this.loadView('landing', props)} />
        <Route path='/users' exact component={(props) => this.loadView('users', props)} />
        <Route exact path='/sheets' component={(props) => this.loadView('sheets', props)} />
        <Route exact path='/sample_joinjs' component={(props) => this.loadView('dummy', props)} />
        <Route exact path='/landing' component={(props) => this.loadView('landing', props)} />
        <Route exact path='/registering' component={(props) => this.loadView('registerProcess', props)} />
        <Route exact path='/home' component={(props) => this.loadView('home', props)} />
        <Route exact path='/explorer' component={(props) => this.loadView('explorer', props)} />
        <Route exact path='/service_dashboard' component={(props) => this.loadView('serviceDashboard', props)} />
        <Route exact path='/tasks' component={(props) => this.loadView('tasks', props)} />
        <Route exact path='/tasks/:id' component={(props) => this.loadView('taskDetail', props)} />
        <Route exact path='/component_types' component={(props) => this.loadView('components', props)} />
        <Route exact path='/component_types/:id' component={(props) => this.loadView('applicationDetail', props)} />
        <Route exact path='/components/:id' component={(props) => this.loadView('componentTypeComponent', props)} />
        <Route exact path='/forgot_password' component={(props) => this.loadView('forgotPassword', props)} />
        <Route exact path='/change_password' component={(props) => this.loadView('changePassword', props)} />
      </Switch>
    </BrowserRouter>
  </AppWrapper>
		)
	}
	props: {
    store: Object
  }
}
