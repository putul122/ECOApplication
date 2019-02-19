import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import _ from 'lodash'
import Explorer from '../../components/explorer/explorerComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/explorerReducer/explorerReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    components: state.explorerReducer.components,
    componentRelationships: state.explorerReducer.componentRelationships,
    callback: state.explorerReducer.callback,
    filterSettings: state.explorerReducer.filterSettings,
    modalSettings: state.explorerReducer.modalSettings
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  setBreadcrumb: basicActionCreators.setBreadcrumb,
  fetchComponents: sagaActions.componentTypeComponentActions.fetchComponents,
  fetchcomponentTypeComponentRelationships: sagaActions.componentTypeComponentActions.fetchcomponentTypeComponentRelationships,
  setFilterSettings: actionCreators.setFilterSettings,
  setCallback: actionCreators.setCallback,
  resetResponse: actionCreators.resetResponse,
  setModalSetting: actionCreators.setModalSetting
}

// If you want to use the function mapping
// export const propsMapping = (dispatch, ownProps) => {
//   return {
//     onClick: () => dispatch(actions.starsActions.FETCH_STARS)
//   }
// }
// eslint-disable-next-line
toastr.options = {
  'closeButton': false,
  'debug': false,
  'newestOnTop': false,
  'progressBar': false,
  'positionClass': 'toast-bottom-full-width',
  'preventDuplicates': false,
  'onclick': null,
  'showDuration': '300',
  'hideDuration': '1000',
  'timeOut': '4000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
}

export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      // eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // let payload = {
      //   'componentTypeComponentId': 31269
      // }
      let payload = {
        'search': '',
        'page_size': 10,
        'page': 1,
        'recommended': true
      }
      this.props.fetchComponents && this.props.fetchComponents(payload)
      // this.props.fetchcomponentTypeComponentRelationships && this.props.fetchcomponentTypeComponentRelationships(payload)
      let breadcrumb = {
        title: 'Explorer',
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
            name: 'Explorer',
            href: '/explorer',
            separator: false
          }
        ]
      }
      this.props.setBreadcrumb && this.props.setBreadcrumb(breadcrumb)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      // mApp && mApp.block('#agreementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // // eslint-disable-next-line
      // mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.componentRelationships && nextProps.componentRelationships !== '') {
        this.props.resetResponse()
        // eslint-disable-next-line
        mApp.unblockPage()
        if (nextProps.componentRelationships.error_code === null) {
          let parent = _.filter(nextProps.componentRelationships.resources, {'relationship_type': 'Parent'})
          let outgoing = _.filter(nextProps.componentRelationships.resources, {'relationship_type': 'ConnectFrom'})
          outgoing = _.orderBy(outgoing, ['connection.name', 'target_component.name'], ['asc', 'asc'])
          let incoming = _.filter(nextProps.componentRelationships.resources, {'relationship_type': 'ConnectTo'})
          incoming = _.orderBy(incoming, ['connection.name', 'target_component.name'], ['asc', 'asc'])
          let child = _.filter(nextProps.componentRelationships.resources, {'relationship_type': 'Child'})
          let filterSettings = {...this.props.filterSettings}
          let filters = []
          let filterObject = {}
          if (parent.length > 0) {
            filterObject = {}
            filterObject.displayText = parent[0].component.name + ' ' + parent[0].relationship_type + ' Components'
            filterObject.data = parent
            filterObject.isChecked = true
            filters.push(filterObject)
          }
          if (child.length > 0) {
            filterObject = {}
            filterObject.displayText = child[0].component.name + ' ' + child[0].relationship_type + ' Components'
            filterObject.data = child
            filterObject.isChecked = true
            filters.push(filterObject)
          }
          if (outgoing.length > 0) {
            var outgoingGroup = _.chain(outgoing)
            .groupBy('connection.name')
            .mapValues(connectionTypeGroup => _.groupBy(connectionTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component.component_type.name))
            .value()

            for (let connectionKey in outgoingGroup) {
              if (outgoingGroup.hasOwnProperty(connectionKey)) {
                for (let targetComponentTypeKey in outgoingGroup[connectionKey]) {
                  if (outgoingGroup[connectionKey].hasOwnProperty(targetComponentTypeKey)) {
                    filterObject = {}
                    filterObject.displayText = outgoingGroup[connectionKey][targetComponentTypeKey][0].component.name + ' ' + connectionKey + ' ' + targetComponentTypeKey
                    filterObject.data = outgoingGroup[connectionKey][targetComponentTypeKey]
                    filterObject.isChecked = true
                    filters.push(filterObject)
                  }
                }
              }
            }
            console.log('outgoingGroup', outgoingGroup)
          }
          if (incoming.length > 0) {
            var incomingGroup = _.chain(incoming)
            .groupBy('connection.name')
            .mapValues(connectionTypeGroup => _.groupBy(connectionTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component.component_type.name))
            .value()
            for (let connectionKey in incomingGroup) {
              if (incomingGroup.hasOwnProperty(connectionKey)) {
                for (let targetComponentTypeKey in incomingGroup[connectionKey]) {
                  if (incomingGroup[connectionKey].hasOwnProperty(targetComponentTypeKey)) {
                    let filterObject = {}
                    filterObject.displayText = targetComponentTypeKey + ' ' + connectionKey + ' ' + incomingGroup[connectionKey][targetComponentTypeKey][0].component.name
                    filterObject.data = incomingGroup[connectionKey][targetComponentTypeKey]
                    filterObject.isChecked = true
                    filters.push(filterObject)
                  }
                }
              }
            }
          }
          filterSettings.filters = filters
          filterSettings.setRelationshipData = true
          nextProps.setFilterSettings(filterSettings)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.componentRelationships.error_message, nextProps.componentRelationships.error_code)
        }
      }
      if (nextProps.filterSettings && nextProps.filterSettings.setRelationshipData) {
        if (nextProps.filterSettings.filters.length > 0) {
          let showRelationships = []
          nextProps.filterSettings.filters.forEach(function (data, index) {
            if (data.isChecked) {
              showRelationships = showRelationships.concat(data.data)
            }
          })
          let filterSettings = {...nextProps.filterSettings}
          filterSettings.modelRelationshipData = showRelationships
          filterSettings.setRelationshipData = false
          nextProps.setFilterSettings(filterSettings)
        }
      }
    }
  })
)(Explorer)
