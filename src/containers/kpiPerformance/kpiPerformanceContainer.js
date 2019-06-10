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
    modelPrespectives: state.kpiPerformanceReducer.modelPrespectives,
    metaModelData: state.kpiPerformanceReducer.MetaModelData,
    availableAction: state.kpiPerformanceReducer.availableAction,
    allDropdownData: state.kpiPerformanceReducer.allDropdownData,
    actionSettings: state.kpiPerformanceReducer.actionSettings,
    payloadFilterBlock: state.kpiPerformanceReducer.payloadFilterBlock,
    graphData: state.kpiPerformanceReducer.graphData
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
  setPayloadFilterBlock: actionCreators.setPayloadFilterBlock,
  setGraphData: actionCreators.setGraphData
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
      mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let perspectiveId = 72
      // let payload = {}
      // payload['meta_model_perspective_id[0]'] = perspectiveId
      // payload['view_key[0]'] = 'AgreementScoring_HistoricalPerformanceDashboard'
      // payload['filter[0]'] = 'eyJwYXJ0cyI6eyIyIjp7ImNvbnN0cmFpbnRfcGVyc3BlY3RpdmUiOnsicGFydHMiOnsiMyI6eyJjb25zdHJhaW50X3BlcnNwZWN0aXZlIjp7InBhcnRzIjp7IjQiOnsiY29uc3RyYWludF9wZXJzcGVjdGl2ZSI6eyJwYXJ0cyI6eyI0Ijp7ImNvbnN0cmFpbnRfcGVyc3BlY3RpdmUiOnsicGFydHMiOnsiNCI6eyJjb25zdHJhaW50X3BlcnNwZWN0aXZlIjp7InN1YmplY3RfaWRzIjpbNTg4NDVdfX19fX19fX19fX19fX19LCJ2YWx1ZXNfc3RhcnRfdGltZSI6IjIwMTktMDMtMDFUMDA6MDA6MDAiLCJ2YWx1ZXNfZW5kX3RpbWUiOiIyMDE5LTA0LTMwVDAwOjAwOjAwIn0%3d'
      // this.props.fetchModelPrespectives && this.props.fetchModelPrespectives(payload)
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
      if (nextProps.modelPrespectives && nextProps.modelPrespectives !== '' && nextProps.availableAction.toProcessGraphData) {
        if (nextProps.modelPrespectives.length > 1) {
          let graphData = {}
          let partData = []
          nextProps.modelPrespectives.forEach(function (data, index) {
            if (index < nextProps.modelPrespectives.length - 1) {
              console.log('data', data)
              let selectedKPIGraphData = data.parts['0'].value['items']['0'].parts['0'].value['items']['0'].parts['0'].value['items']['0'].parts['0'].value['items']
              if (selectedKPIGraphData.length > 0) {
                selectedKPIGraphData.forEach(function (kpiData, idx) {
                  let parts = data.parts['0'].value['items']['0'].parts['0'].value['items']['0'].parts['0'].value['items']['0'].parts['0'].value['items'][idx].parts['0'].value['items']['0'].parts
                  partData.push(parts)
                })
              }
            }
          })
          graphData.partData = partData
          nextProps.setGraphData(graphData)
        }
        let availableAction = nextProps.availableAction
        availableAction['toProcessGraphData'] = false
        nextProps.setAvailableAction(availableAction)
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
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
      if (nextProps.allDropdownData !== '' && nextProps.availableAction.toProcessModelPerspectives) {
        if (nextProps.allDropdownData.length > 0) {
          let agreementOption = []
          let kpiOption = []
          let serviceOption = []
          let departmentOption = []
          let supplierOption = []
          let selectedKpi = []
          nextProps.allDropdownData.forEach(function (data, index) {
            if (data.parts) {
              data.parts.forEach(function (partData, partIndex) {
                if (partIndex === 0) {
                  let agreementLength = agreementOption.length
                  let obj = {}
                  obj.id = agreementLength
                  obj.name = partData.value
                  obj.label = partData.value
                  obj.subjectId = data.subject_id
                  agreementOption.push(obj)
                }
                if (partIndex === 1) {
                  let kpiLength = kpiOption.length
                  let obj = {}
                  obj.id = kpiLength
                  obj.subjectId = partData.value.subject_id
                  obj.name = partData.value.subject_part.value
                  obj.label = partData.value.subject_part.value
                  kpiOption.push(obj)
                  selectedKpi.push(false)
                }
                if (partIndex === 2) {
                  let serviceData = partData.value.subject_part.value[0].target_component
                  serviceData.label = serviceData.name
                  serviceData.subjectId = partData.value.subject_id
                  serviceOption.push(serviceData)
                }
                if (partIndex === 3) {
                  let departmentData = partData.value.subject_part.value[0].target_component
                  departmentData.label = departmentData.name
                  departmentData.subjectId = partData.value.subject_id
                  departmentOption.push(departmentData)
                }
                if (partIndex === 4) {
                  let supplierData = partData.value.subject_part.value[0].target_component
                  supplierData.label = supplierData.name
                  supplierData.subjectId = partData.value.subject_id
                  supplierOption.push(supplierData)
                }
              })
            }
          })
          let actionSettings = JSON.parse(JSON.stringify(nextProps.actionSettings))
          let availableAction = JSON.parse(JSON.stringify(nextProps.availableAction))
          actionSettings.agreementOption = agreementOption
          actionSettings.kpiOption = kpiOption
          actionSettings.selectedKpi = selectedKpi
          actionSettings.serviceOption = serviceOption
          actionSettings.departmentOption = departmentOption
          actionSettings.supplierOption = supplierOption
          actionSettings.allFilterDataProcessed = true
          nextProps.setActionSettings(actionSettings)
          availableAction.toProcessModelPerspectives = false
          nextProps.setAvailableAction(availableAction)
          // eslint-disable-next-line
          mApp && mApp.unblockPage()
        }
      }
    }
  })
)(kpiPerformance)
