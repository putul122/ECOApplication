import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ComponentType from '../../components/componentType/componentTypeComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as componentTypeActioncreators } from '../../redux/reducers/componentTypeReducer/componentTypeReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    // client_id: state.basicReducer.client_id,
    // client_secret: state.basicReducer.client_secret,
    authenticateUser: state.basicReducer.authenticateUser,
    componentTypes: state.componentTypeReducer.componentTypes,
    // searchComponentType: state.componentTypeReducer.searchComponentType,
    isComponentTypeLoading: state.componentTypeReducer.isComponentTypeLoading,
    currentPage: state.componentTypeReducer.currentPage,
    searchObject: state.componentTypeReducer.searchObject
  }
}

// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchComponent: sagaActions.componentTypeActions.fetchComponent,
  searchComponent: sagaActions.componentTypeActions.searchComponent,
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  // setSearchComponentType: actionCreators.setSearchComponentType,
  setComponentTypeLoading: componentTypeActioncreators.setComponentTypeLoading,
  setCurrentPage: componentTypeActioncreators.setCurrentPage,
  setSearchObject: componentTypeActioncreators.setSearchObject,
  setBreadcrumb: basicActionCreators.setBreadcrumb
}

// If you want to use the function mapping
// export const propsMapping = (dispatch, ownProps) => {
//   return {
//     onClick: () => dispatch(actions.starsActions.FETCH_STARS)
//   }
// }

export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
      let userAccessToken = localStorage.getItem('userAccessToken')
      if (!userAccessToken) {
        window.location.href = window.location.origin
      }
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      this.props.setComponentTypeLoading && this.props.setComponentTypeLoading(true)
      this.props.setCurrentPage(1)
      let payload = {
        'search': '',
        'page_size': 10,
        'page': 1,
        'recommended': true
      }
      this.props.fetchComponent && this.props.fetchComponent(payload)
      // eslint-disable-next-line
      mApp &&  mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let breadcrumb = {
        title: 'Component Type',
        items: [
          {
            name: 'Home',
            href: '/home',
            separator: false
          },
          {
            separator: true
          },
          {
            name: 'Component Type',
            href: '/components',
            separator: false
          }
        ]
      }
      this.props.setBreadcrumb && this.props.setBreadcrumb(breadcrumb)
    },
    componentDidMount: function () {
    // Block
      this.props.setComponentTypeLoading && this.props.setComponentTypeLoading(false)
    },
    componentDidUpdate: function () {
    // Block
    this.props.setComponentTypeLoading && this.props.setComponentTypeLoading(false)
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.componentTypes && nextProps.componentTypes !== this.props.componentTypes) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
      }
    }
  })
)(ComponentType)
