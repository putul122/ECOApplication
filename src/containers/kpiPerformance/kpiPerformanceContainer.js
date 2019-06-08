import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
// import _ from 'lodash'
import kpiPerformance from '../../components/kpiPerformance/kpiPerformanceComponent'
import { actions as sagaActions } from '../../redux/sagas'
import { actionCreators } from '../../redux/reducers/kpiPerformance/kpiPerformanceReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    metaModelPerspective: state.kpiPerformanceReducer.metaModelPerspective,
    modelPerspective: state.kpiPerformanceReducer.modelPerspective,
    metaModelData: state.kpiPerformanceReducer.MetaModelData,
    availableAction: state.kpiPerformanceReducer.availableAction,
    allDropdownData: state.kpiPerformanceReducer.allDropdownData,
    actionSettings: state.kpiPerformanceReducer.actionSettings,
    payloadFilterBlock: state.kpiPerformanceReducer.payloadFilterBlock
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchModelPrespectives: sagaActions.modelActions.fetchModelPrespectives,
  fetchMetaModelPrespective: sagaActions.modelActions.fetchMetaModelPrespective,
  fetchAllDropdownData: sagaActions.serviceActions.fetchAllDropdownData,
  setActionSettings: actionCreators.setActionSettings,
  setAvailableAction: actionCreators.setAvailableAction,
  resetResponse: actionCreators.resetResponse,
  setMetaModelData: actionCreators.setMetaModelData,
  setPayloadFilterBlock: actionCreators.setPayloadFilterBlock
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
// eslint-disable-next-line
export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
      // eslint-disable-next-line
      // mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let perspectiveId = 72
      let payload = {}
      payload['meta_model_perspective_id[0]'] = perspectiveId
      payload['view_key[0]'] = 'AgreementScoring_HistoricalPerformanceDashboard'
      payload['filter[0]'] = 'eyJwYXJ0cyI6eyIyIjp7ImNvbnN0cmFpbnRfcGVyc3BlY3RpdmUiOnsicGFydHMiOnsiMyI6eyJjb25zdHJhaW50X3BlcnNwZWN0aXZlIjp7InBhcnRzIjp7IjQiOnsiY29uc3RyYWludF9wZXJzcGVjdGl2ZSI6eyJwYXJ0cyI6eyI0Ijp7ImNvbnN0cmFpbnRfcGVyc3BlY3RpdmUiOnsicGFydHMiOnsiNCI6eyJjb25zdHJhaW50X3BlcnNwZWN0aXZlIjp7InN1YmplY3RfaWRzIjpbNTg4NDVdfX19fX19fX19fX19fX19LCJ2YWx1ZXNfc3RhcnRfdGltZSI6IjIwMTktMDMtMDFUMDA6MDA6MDAiLCJ2YWx1ZXNfZW5kX3RpbWUiOiIyMDE5LTA0LTMwVDAwOjAwOjAwIn0%3d'
      this.props.fetchModelPrespectives && this.props.fetchModelPrespectives(payload)
      let metaModelPrespectivePayload = {}
      metaModelPrespectivePayload.id = perspectiveId
      metaModelPrespectivePayload.viewKey = {view_key: 'AgreementScoring_KPIDashboardFilter'}
      this.props.fetchMetaModelPrespective && this.props.fetchMetaModelPrespective(metaModelPrespectivePayload)
      let dropdownPayload = {}
      dropdownPayload['meta_model_perspective_id[0]'] = perspectiveId
      dropdownPayload['view_key[0]'] = 'AgreementScoring_KPIDashboardFilter'
      this.props.fetchAllDropdownData && this.props.fetchAllDropdownData(dropdownPayload)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      // mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('nextProps', nextProps)
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.modelPrespectiveData && nextProps.modelPrespectiveData !== '') {
        // eslint-disable-next-line
        // mApp && mApp.unblockPage()
        this.props.resetResponse()
        let payload = {}
        payload.data = nextProps.modelPrespectiveData
        payload.copyData = nextProps.modelPrespectiveData
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        // eslint-disable-next-line
        mApp && mApp.unblock('#ModelPerspectiveList')
        nextProps.setModalPerspectivesData(payload)
      }
      if (nextProps.metaModelPerspectiveData && nextProps.metaModelPerspectiveData !== '') {
        this.props.resetResponse()
        if (nextProps.metaModelPerspectiveData.error_code === null) {
          if (nextProps.metaModelPerspectiveData.resources[0].view_key === 'Exclusions_Add') {
            let payload = {}
            payload.metaModelPerspective = nextProps.metaModelPerspectiveData
            payload.metaModelPerspectiveList = this.props.metaModelPerspectiveList
            payload.toProcessMetaModel = true
            nextProps.setMetaModelPerspectiveData(payload)
            let metaModelPrespectivePayload = {}
            metaModelPrespectivePayload.id = parseInt(this.props.match.params.id)
            metaModelPrespectivePayload.viewKey = {view_key: this.props.match.params.viewKey}
            this.props.fetchMetaModelPrespective && this.props.fetchMetaModelPrespective(metaModelPrespectivePayload)
          } else if (nextProps.metaModelPerspectiveData.resources[0].view_key === 'Exclusions_List') {
            let payload = {}
            payload.metaModelPerspective = this.props.metaModelPerspective
            payload.metaModelPerspectiveList = nextProps.metaModelPerspectiveData
            payload.toProcessMetaModel = false
            nextProps.setMetaModelPerspectiveData(payload)
          }
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.metaModelPerspectiveData.error_message, nextProps.metaModelPerspectiveData.error_code)
        }
      }
      if (nextProps.modelPrespectives && nextProps.modelPrespectives !== '') {
        let availableAction = nextProps.availableAction
        availableAction['toProcessModelPerspectives'] = false
        nextProps.setAvailableAction(availableAction)
      }
      if (nextProps.metaModelPerspective && nextProps.metaModelPerspective !== '' && nextProps.availableAction.toProcessMetaModel) {
        if (nextProps.metaModelPerspective.error_code === null) {
          let availableAction = {...nextProps.availableAction}
          availableAction.toProcessMetaModel = false
          nextProps.setAvailableAction(availableAction)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.metaModelPerspective.error_message, nextProps.metaModelPerspective.error_code)
        }
      }
      // if (nextProps.dropdownData !== '') {
      //   if (nextProps.dropdownData.length > 0) {
      //     let services = []
      //     let kpi = []
      //     let timeGranularity = []
      //     nextProps.dropdownData.forEach(function (data, index) {
      //       if (data.parts) {
      //         data.parts.forEach(function (dataParts, partIndex) {
      //           if (partIndex === 2) {
      //             let serviceData = dataParts.value[0].target_component
      //             serviceData.subjectId = data.subject_id
      //             // serviceData.subjectName = data.subject_name
      //             services.push(serviceData)
      //           }
      //           if (partIndex === 3) {
      //             let kpiData = dataParts.value[0].target_component
      //             kpiData.subjectId = data.subject_id
      //             // kpiData.subjectName = data.subject_name
      //             kpi.push(kpiData)
      //           }
      //           if (partIndex === 4) {
      //             let timeGranularityData = dataParts.value[0].target_component
      //             timeGranularityData.subjectId = data.subject_id
      //             // timeGranularityData.subjectName = data.subject_name
      //             timeGranularity.push(timeGranularityData)
      //           }
      //         })
      //       }
      //     })
      //     let connectionData = {...nextProps.connectionData}
      //     let selectOption = []
      //     selectOption[0] = []
      //     selectOption[1] = []
      //     selectOption[1].push(services)
      //     selectOption[1].push(kpi)
      //     selectOption[1].push(timeGranularity)
      //     connectionData.selectOption = selectOption
      //     connectionData.backupSelectOption = selectOption
      //     connectionData.operation.isComplete = true
      //     nextProps.setConnectionData(connectionData)
      //     // eslint-disable-next-line
      //     mApp && mApp.unblockPage()
      //   }
      //   this.props.resetResponse()
      // }
    }
  })
)(kpiPerformance)
