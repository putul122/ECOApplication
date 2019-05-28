import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppWrapper from '../../components/appWrapper/appWrapperComponent'
// import MxGraphComponent from '../../components/MxGraphTestComponent'

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
              const homePageRoute = '../dummyPage/homePageRoute'
              module.hot.accept(homePageRoute, () => {
                require(homePageRoute).default; // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../dummyPage/homePageRoute').default)
            break
          case 'home':
            if (module.hot) {
              module.hot.accept('../homePage/homePageRoute', () => {
                require("../homePage/homePageRoute").default; // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../homePage/homePageRoute').default)
            break
          case 'landing':
            if (module.hot) {
              module.hot.accept('../landingPage/landingPageRoute', () => {
                require("../landingPage/landingPageRoute").default; // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../landingPage/landingPageRoute').default)
            break
          case 'registerProcess':
            if (module.hot) {
              const rppr = '../registerProcessPage/registerProcessPageRoute'
              module.hot.accept(
                rppr,
                () => {
                  require(rppr).default; // eslint-disable-line
                  this.forceUpdate()
                }
              )
            }
            resolve(
              require('../registerProcessPage/registerProcessPageRoute').default
            )
            break
          case 'components':
            if (module.hot) {
              module.hot.accept('../componentsPage/componentsPageRoute', () => {
                require("../componentsPage/componentsPageRoute").default; // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../componentsPage/componentsPageRoute').default)
            break
          case 'forgotPassword':
            if (module.hot) {
              const fppr = '../forgotPasswordPage/forgotPasswordPageRoute'
              module.hot.accept(
                fppr,
                () => {
                  require(fppr).default; // eslint-disable-line
                  this.forceUpdate()
                }
              )
            }
            resolve(
              require('../forgotPasswordPage/forgotPasswordPageRoute').default
            )
            break
          case 'changePassword':
            if (module.hot) {
              const cppr = '../changePasswordPage/changePasswordPageRoute'
              module.hot.accept(
                cppr,
                () => {
                  require(cppr).default; // eslint-disable-line
                  this.forceUpdate()
                }
              )
            }
            resolve(
              require('../changePasswordPage/changePasswordPageRoute').default
            )
            break
          case 'tasks':
            if (module.hot) {
              module.hot.accept('../tasksPage/tasksPageRoute', () => {
                require("../tasksPage/tasksPageRoute").default; // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../tasksPage/tasksPageRoute').default)
            break
          case 'serviceDashboard':
            if (module.hot) {
              const sdpr = '../serviceDashboardPage/serviceDashboardPageRoute'
              module.hot.accept(
                sdpr,
                () => {
                  require(sdpr).default; // eslint-disable-line
                  this.forceUpdate()
                }
              )
            }
            resolve(
              require('../serviceDashboardPage/serviceDashboardPageRoute')
                .default
            )
            break
          case 'data':
            if (module.hot) {
              const sdpr = '../dataPage/dataPageRoute'
              module.hot.accept(
                sdpr,
                () => {
                  require(sdpr).default; // eslint-disable-line
                  this.forceUpdate()
                }
              )
            }
            resolve(
              require('../dataPage/dataPageRoute')
                .default
            )
            break
          case 'roles':
            if (module.hot) {
              module.hot.accept('../rolesPage/rolesPageRoute', () => {
                        require('../rolesPage/rolesPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../rolesPage/rolesPageRoute').default)
            break
          case 'editRoles':
            if (module.hot) {
              module.hot.accept('../editRolesPage/editRolesPageRoute', () => {
                        require('../editRolesPage/editRolesPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../editRolesPage/editRolesPageRoute').default)
            break
          case 'taskDetail':
            if (module.hot) {
              module.hot.accept('../taskDetailPage/taskDetailPageRoute', () => {
                require("../taskDetailPage/taskDetailPageRoute").default; // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../taskDetailPage/taskDetailPageRoute').default)
            break
          case 'applicationDetail':
            if (module.hot) {
              const adpr = '../applicationDetailPage/applicationDetailPageRoute'
              module.hot.accept(
                adpr,
                () => {
                  require(adpr).default; // eslint-disable-line
                  this.forceUpdate()
                }
              )
            }
            resolve(
              require('../applicationDetailPage/applicationDetailPageRoute')
                .default
            )
            break
          case 'componentTypeComponent':
            if (module.hot) {
              const tcpr = '../componentTypeComponentPage/componentTypeComponentPageRoute'
              module.hot.accept(tcpr, () => {
                  require(tcpr).default; // eslint-disable-line
                  this.forceUpdate()
                }
              )
            }
            resolve(
              require('../componentTypeComponentPage/componentTypeComponentPageRoute')
                .default
            )
            break
          case 'explorer':
            if (module.hot) {
              module.hot.accept('../explorerPage/explorerPageRoute', () => {
                require("../explorerPage/explorerPageRoute").default; // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../explorerPage/explorerPageRoute').default)
            break
          case 'sheets':
            if (module.hot) {
              module.hot.accept('../sheetsPage/sheetsPageRoute', () => {
                require("../sheetsPage/sheetsPageRoute").default; // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../sheetsPage/sheetsPageRoute').default)
            break
          case 'perspectives':
            if (module.hot) {
              module.hot.accept(
                '../perspectivesPage/perspectivesPageRoute',
                () => {
                  require("../perspectivesPage/perspectivesPageRoute").default; // eslint-disable-line
                  this.forceUpdate()
                }
              )
            }
            resolve(
              require('../perspectivesPage/perspectivesPageRoute').default
            )
            break
          case 'perspectiveHierarchy':
            if (module.hot) {
                    module.hot.accept('../perspectiveHierarchyPage/perspectiveHierarchyPageRoute', () => {
                require('../perspectiveHierarchyPage/perspectiveHierarchyPageRoute').default // eslint-disable-line
                        this.forceUpdate()
                    })
            }
            resolve(require('../perspectiveHierarchyPage/perspectiveHierarchyPageRoute').default)
          break
          case 'billing':
            if (module.hot) {
                    module.hot.accept('../balancedScorecard/balancedScorecardRoute', () => {
                require('../balancedScorecard/balancedScorecardRoute').default // eslint-disable-line
                        this.forceUpdate()
                    })
            }
            resolve(require('../balancedScorecard/balancedScorecardRoute').default)
          break
          case 'perspectiveExclusion':
            if (module.hot) {
                    module.hot.accept('../perspectiveExclusionPage/perspectiveExclusionPageRoute', () => {
                require('../perspectiveExclusionPage/perspectiveExclusionPageRoute').default // eslint-disable-line
                        this.forceUpdate()
                    })
            }
            resolve(require('../perspectiveExclusionPage/perspectiveExclusionPageRoute').default)
          break
          case 'invite_user':
            if (module.hot) {
              module.hot.accept(
                '../inviteUsersPage/inviteUsersPageRoute',
                () => {
                  require("../inviteUsersPage/inviteUsersPageRoute").default; // eslint-disable-line
                  this.forceUpdate()
                }
              )
            }
            resolve(require('../inviteUsersPage/inviteUsersPageRoute').default)
            break
          case 'users':
            if (module.hot) {
              module.hot.accept('../usersPage/usersPageRoute', () => {
                require("../usersPage/usersPageRoute").default; // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../usersPage/usersPageRoute').default)
            break
          case 'slaDashboard':
            if (module.hot) {
              module.hot.accept('../SlaDashboardPage/SlaDashboardRoute', () => {
                require("../SlaDashboardPage/SlaDashboardRoute").default; // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../SlaDashboardPage/SlaDashboardRoute').default)
            break

          case 'slaComparison':
            if (module.hot) {
              module.hot.accept('../SlaComparisonPage/SlaComparisonRoute', () => {
                require("../SlaComparisonPage/SlaComparisonRoute").default; // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../SlaComparisonPage/SlaComparisonRoute').default)
            break

          case 'penaltyDashboard':
          if (module.hot) {
            module.hot.accept('../penaltyDashboardPage/PenaltyDashboardRoute', () => {
              require("../penaltyDashboardPage/PenaltyDashboardRoute").default; // eslint-disable-line
              this.forceUpdate()
            })
          }
          resolve(require('../penaltyDashboardPage/PenaltyDashboardRoute').default)
            break
          case 'mxgraphTest':
          if (module.hot) {
            module.hot.accept('../mxGraphPage/mxGraphPageRoute', () => {
              require("../mxGraphPage/mxGraphPageRoute").default; // eslint-disable-line
              this.forceUpdate()
            })
          }
          resolve(require('../mxGraphPage/mxGraphPageRoute').default)
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
            <Route
              path='/mxgraph-test'
              exact
              component={props => this.loadView('mxgraphTest', props)}
            />
            <Route
              path='/sla-dashboard'
              exact
              component={props => this.loadView('slaDashboard', props)}
            />
            <Route
              path='/sla-comparison'
              exact
              component={props => this.loadView('slaComparison', props)}
            />
            <Route
              path='/penalty-dashboard'
              exact
              component={props => this.loadView('penaltyDashboard', props)}
            />
            <Route
              path='/users'
              exact
              component={props => this.loadView('users', props)}
            />
            <Route
              path='/invite_user'
              exact
              component={props => this.loadView('invite_user', props)}
            />
            <Route
              exact
              path='/sheets'
              component={props => this.loadView('sheets', props)}
            />
            <Route
              exact
              path='/sample_joinjs'
              component={props => this.loadView('dummy', props)}
            />
            <Route
              exact
              path='/landing'
              component={props => this.loadView('landing', props)}
            />
            <Route
              exact
              path='/registering'
              component={props => this.loadView('registerProcess', props)}
            />
            <Route
              exact
              path='/home'
              component={props => this.loadView('home', props)}
            />
            <Route
              exact
              path='/explorer'
              component={props => this.loadView('explorer', props)}
            />
            <Route
              exact
              path='/select-module/:dashboardKey'
              component={(props) => this.loadView('serviceDashboard', props)}
            />
            <Route
              exact
              path='/data'
              component={(props) => this.loadView('data', props)}
            />
            <Route
              exact
              path='/tasks'
              component={props => this.loadView('tasks', props)}
            />
            <Route
              exact
              path='/tasks/:id'
              component={props => this.loadView('taskDetail', props)}
            />
            <Route
              exact
              path='/component_types'
              component={props => this.loadView('components', props)}
            />
            <Route
              exact
              path='/component_types/:id'
              component={props => this.loadView('applicationDetail', props)}
            />
            <Route
              exact
              path='/components/:id'
              component={props =>
                this.loadView('componentTypeComponent', props)
              }
            />
            <Route
              exact
              path='/forgot_password'
              component={props => this.loadView('forgotPassword', props)}
            />
            <Route
              exact
              path='/change_password'
              component={props => this.loadView('changePassword', props)}
            />
            <Route
              exact
              path='/billing'
              component={props => this.loadView('billing', props)}
            />
            <Route
              exact
              path='/perspectives/:id/:viewKey'
              component={props => this.loadView('perspectives', props)}
            />
            <Route
              exact
              path='/perspective_hierarchy/:id/:viewKey'
              component={(props) => this.loadView('perspectiveHierarchy', props)}
            />
            <Route
              exact
              path='/perspective_exclusion/:id/:viewKey'
              component={(props) => this.loadView('perspectiveExclusion', props)}
            />
            <Route
              exact
              path='/'
              component={props => this.loadView('landing', props)}
            />
            <Route exact path='/roles' component={(props) => this.loadView('roles', props)} />
            <Route exact path='/edit-roles/:id' component={(props) => this.loadView('editRoles', props)} />
          </Switch>
        </BrowserRouter>
      </AppWrapper>
    )
  }
}
