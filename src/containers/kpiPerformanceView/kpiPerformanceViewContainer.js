import {connect} from 'react-redux'
// For Lifecycle composing
import {compose, lifecycle} from 'recompose'
import kpiPerformanceView from '../../components/kpiPerformanceView/kpiPerformanceViewComponent'
import {actions as sagaActions} from '../../redux/sagas/'
import {actionCreators} from '../../redux/reducers/kpiPerformanceView/kpiPerformanceViewReducer'
let isEmpty = function (obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

// Global State
export function mapStateToProps (state, props) {
  return {
    modelPrespectives: state.kpiPerformanceViewReducer.modelPrespectives,
    metaModelPrespective: state.kpiPerformanceViewReducer.metaModelPrespective,
    showTabs: state.kpiPerformanceViewReducer.showTabs,
    payloadFilterBlock: state.kpiPerformanceViewReducer.payloadFilterBlock,
    pageSettings: state.kpiPerformanceViewReducer.pageSettings,
    graphData: state.kpiPerformanceViewReducer.graphData,
    availableAction: state.kpiPerformanceViewReducer.availableAction
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchModelPrespectives: sagaActions.kpiPerformanceActions.fetchModelPrespectives,
  fetchMetaModelPrespective: sagaActions.modelActions.fetchMetaModelPrespective,
  setCurrentTab: actionCreators.setCurrentTab,
  setPageSettings: actionCreators.setPageSettings,
  setAvailableAction: actionCreators.setAvailableAction,
  setGraphData: actionCreators.setGraphData
}

// If you want to use the function mapping
// export const propsMapping = (dispatch, ownProps) => {
//   return {
//     onClick: () => dispatch(actions.starsActions.FETCH_STARS)
//   }
// }

// export default connect(mapStateToProps, propsMapping)(kpiPerformanceView)
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
      console.log('will mount', this.props)
      if (this.props.location.state && !isEmpty(this.props.location.state.pageSettings) && !isEmpty(this.props.location.state.selectedKpi)) {
        if (!isEmpty(this.props.location.state.pageSettings.selectedDepartment) && !isEmpty(this.props.location.state.pageSettings.selectedService) && !isEmpty(this.props.location.state.pageSettings.selectedSupplier)) {
          console.log('this.props')
          let pageSettings = JSON.parse(JSON.stringify(this.props.location.state.pageSettings))
          pageSettings.selectedKpi = this.props.location.state.selectedKpi
          let payloadFilter = {}
          let payloadFilterBlock = this.props.payloadFilterBlock
          payloadFilter.values_start_time = pageSettings.startDate
          payloadFilter.values_end_time = pageSettings.endDate
          // Agreement Filter
          if (!isEmpty(pageSettings.selectedAgreement)) {
            let agreementData = []
            agreementData.push(pageSettings.selectedAgreement.subjectId)
            payloadFilter.subject_id = agreementData
          }
          payloadFilter.parts = {}
          payloadFilter.parts['2'] = payloadFilterBlock.kpiFilter
          payloadFilter.parts['3'] = payloadFilterBlock.departmentAndSupplierFilter
          let kpiData = []
          kpiData.push(this.props.location.state.selectedKpi.subjectId)
          payloadFilter.parts['2'].constraint_perspective.parts['3'].constraint_perspective.parts['4'].constraint_perspective.parts['4'].constraint_perspective.parts['4'].constraint_perspective['subject_ids'] = kpiData
          // Department Filter
          let departmentData = []
          departmentData.push(pageSettings.selectedDepartment.id)
          payloadFilter.parts['3'].constraint_perspective.parts['2'].target_component_ids = departmentData
          // Supplier Filter
          let supplierData = []
          supplierData.push(pageSettings.selectedSupplier.id)
          payloadFilter.parts['3'].constraint_perspective.parts['3'].target_component_ids = supplierData
          const base64ecodedPayloadFilter = btoa(JSON.stringify(payloadFilter))
          let payload = {}
          payload['meta_model_perspective_id[0]'] = 72
          payload['view_key[0]'] = 'AgreementScoring_KPIScoreDashboard'
          payload['filter[0]'] = base64ecodedPayloadFilter
          this.props.fetchModelPrespectives && this.props.fetchModelPrespectives(payload)
          console.log('payloadFilter', payloadFilter)
          console.log('pageSettings', pageSettings)
          pageSettings.filters = base64ecodedPayloadFilter
          this.props.setPageSettings(pageSettings)
          let metaModelPrespectivePayload = {}
          metaModelPrespectivePayload.id = 72
          metaModelPrespectivePayload.viewKey = {view_key: 'AgreementScoring_KPIScoreDashboard'}
          this.props.fetchMetaModelPrespective && this.props.fetchMetaModelPrespective(metaModelPrespectivePayload)
        } else {
          if (isEmpty(this.props.location.state.pageSettings.selectedDepartment)) {
            // eslint-disable-next-line
            toastr.error('Department not selected in kpi-performance', 'Error')
          }
          if (isEmpty(this.props.location.state.pageSettings.selectedService)) {
            // eslint-disable-next-line
            toastr.error('Service not selected in kpi-performance', 'Error')
          }
          if (isEmpty(this.props.location.state.pageSettings.selectedSupplier)) {
            // eslint-disable-next-line
            toastr.error('Supplier not selected in kpi-performance', 'Error')
          }
          // eslint-disable-next-line
          window.location.href = window.location.origin + '/kpi-performances'
        }
      } else {
        // eslint-disable-next-line
        toastr.error('Missing page settings from kpi-performance', 'Error')
      }
      // eslint-disable-next-line
      mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
    },
    componentDidMount: function () {},
    componentWillReceiveProps: function (nextProps) {
      console.log('nextProps', nextProps)
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.availableAction.toCallScorePenaltyAPI) {
        let payload = {}
        payload['meta_model_perspective_id[0]'] = 72
        if (nextProps.showTabs.showScore !== '') {
          payload['view_key[0]'] = 'AgreementScoring_KPIScoreDashboard'
        } else if (nextProps.showTabs.showPenalty !== '') {
          payload['view_key[0]'] = 'AgreementScoring_KPIPenaltyDashboard'
        }
        payload['filter[0]'] = nextProps.pageSettings.filters
        this.props.fetchModelPrespectives && this.props.fetchModelPrespectives(payload)
        // eslint-disable-next-line
        mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      }
      if (nextProps.modelPrespectives && nextProps.modelPrespectives !== '' && nextProps.availableAction.toProcessGraphData) {
        if (nextProps.modelPrespectives.length > 1) {
          let graphData = {}
          let labels = []
          let scores = []
          let targets = []
          let penalty = []
          let blockData = []
          nextProps.modelPrespectives.forEach(function (data, index) {
            if (index < nextProps.modelPrespectives.length - 1) {
              let kpiData = data.parts['0'].value['items']['0'].parts['0'].value['items']['0'].parts['0'].value['items']['0'].parts['0'].value['items']['0'].parts['1'].value['items']['0'].parts
              console.log('kpiData', kpiData)
              // if (ScorecardPart.length > 0) {
              //   ScorecardPart.forEach(function (scorecardData, idx) {
              //     // let selectedKPIGraphData = data.parts['0'].value['items']['0'].parts['0'].value['items']['0'].parts['0'].value['items']['0'].parts['0'].value['items'][idx].parts['0'].value['items']
              //     // selectedKPIGraphData.forEach(function (kpiData, kpiIdx) {
              //       console.log('scorecardData', scorecardData, idx)
              //     //   console.log('kpiData', kpiData, kpiIdx)
              //     // })
              //   })
              // }
              let kpiValueArray = kpiData[1].value
              if (kpiValueArray && kpiValueArray.length > 0) {
                kpiValueArray.forEach(function (valueData, index) {
                  if (!valueData.is_summarized) {
                    labels.push(valueData.date_time)
                    if (valueData.values && valueData.values.Score) {
                      scores.push(valueData.values.Score)
                    }
                    if (valueData.values && valueData.values.Target) {
                      targets.push(valueData.values.Target)
                    }
                    if (valueData.values && valueData.values.Penalty) {
                      penalty.push(valueData.values.Penalty)
                    }
                  } else {
                    if (!isEmpty(valueData.values)) {
                      for (let x in valueData.values) {
                        if (valueData.values.hasOwnProperty(x)) {
                          blockData.push(valueData.values[x])
                        }
                      }
                    }
                  }
                })
              }
            }
          })
          graphData.labels = labels
          graphData.scores = scores
          graphData.targets = targets
          graphData.penalty = penalty
          graphData.blockData = blockData
          nextProps.setGraphData(graphData)
        }
        let availableAction = nextProps.availableAction
        availableAction['toProcessGraphData'] = false
        availableAction['toCallScorePenaltyAPI'] = false
        nextProps.setAvailableAction(availableAction)
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
      }
    }
  })
)(kpiPerformanceView)
