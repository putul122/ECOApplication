import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import SlaDashboard from '../../components/SlaDashboard/SlaDashboardComponent'
import { actions as sagaActions } from '../../redux/sagas/'
// import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    metaData: state.slaReducer.metaData,
    modelPerspectiveData: state.slaReducer.modelPerspectiveData,
    dropDownItemsDepData: state.slaReducer.dropDownItemsDepData,
    dropDownItemsSupData: state.slaReducer.dropDownItemsSupData,
    dropDownItemsSerData: state.slaReducer.dropDownItemsSerData,
    dropDownItemsKpiData: state.slaReducer.dropDownItemsKpiData
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  MetaModel: sagaActions.slaActions.getMDDATA,
  getMDPerspectiveDATA: sagaActions.slaActions.getMDPerspectiveDATA,
  getDropDownItemDep: sagaActions.slaActions.getDropDownItemDep,
  getDropDownItemSup: sagaActions.slaActions.getDropDownItemSup,
  getDropDownItemSer: sagaActions.slaActions.getDropDownItemSer,
  getDropDownItemKpi: sagaActions.slaActions.getDropDownItemKpi
}

// eslint-disable-next-line
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-bottom-full-width',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '4000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut'
}

const SlaDashboardContainer = compose(
  connect(
    mapStateToProps,
    propsMapping
  ),

  lifecycle({
    // shouldComponentUpdate: function (nextProps, nextState) {
    //   if (
    //     nextProps.userActionSettings.isInviteUserModalOpen !==
    //     this.props.userActionSettings.isInviteUserModalOpen
    //   ) {
    //     return true
    //   }
    //   if (nextProps.getUserResponse !== this.props.getUserResponse) {
    //     return true
    //   }
    // },
    componentDidMount: function () {},
    componentWillReceiveProps: function (nextProps) {
      let breadcrumb = {
        title: 'Sla Dashboard',
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
            name: 'Sladashboard',
            href: '/sla-dashboard',
            separator: false
          }
        ]
      }
      console.log('breadcrumb', breadcrumb)
      this.props.setBreadcrumb && this.props.setBreadcrumb(breadcrumb)
    }
  })
)(SlaDashboard)

export default SlaDashboardContainer
