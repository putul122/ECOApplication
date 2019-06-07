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
    metaModelPerspective: state.perspectiveExclusionReducer.metaModelPerspective,
    modelPerspective: state.perspectiveExclusionReducer.modelPerspective,
    MetaModelData: state.perspectiveExclusionReducer.MetaModelData,
    availableAction: state.perspectiveExclusionReducer.availableAction,
    allDropdownData: state.perspectiveExclusionReducer.allDropdownData,
    actionSettings: state.perspectiveExclusionReducer.actionSettings
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
  setMetaModelData: actionCreators.setMetaModelData
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
      // let filter = {
      //   'values_start_time': '2019-03-01T00:00:00',
      //   'values_end_time': '2019-04-30T00:00:00',
      //   'parts': {
      //     '2': {
      //       'constraint_perspective': {
      //         'parts': {
      //           '3': {
      //             'constraint_perspective': {
      //               'parts': {
      //                 '4': {
      //                   'constraint_perspective': {
      //                     'parts': {
      //                       '4': {
      //                         'constraint_perspective': {
      //                           'parts': {
      //                             '4': {
      //                               'constraint_perspective': {
      //                                 'subject_ids': [58845]
      //                               }
      //                             }
      //                           }
      //                         }
      //                       }
      //                     }
      //                   }
      //                 }
      //               }
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
      let perspectiveId = 72
      // let viewKey = 'AgreementScoring_HistoricalPerformanceDashboard'
      let payload = {}
      payload['meta_model_perspective_id[0]'] = perspectiveId
      payload['view_key[0]'] = 'AgreementScoring_KPIDashboardFilter'
      payload['filter[0]'] = 'eyJwYXJ0cyI6eyIyIjp7ImNvbnN0cmFpbnRfcGVyc3BlY3RpdmUiOnsicGFydHMiOnsiMyI6eyJjb25zdHJhaW50X3BlcnNwZWN0aXZlIjp7InBhcnRzIjp7IjQiOnsiY29uc3RyYWludF9wZXJzcGVjdGl2ZSI6eyJwYXJ0cyI6eyI0Ijp7ImNvbnN0cmFpbnRfcGVyc3BlY3RpdmUiOnsicGFydHMiOnsiNCI6eyJjb25zdHJhaW50X3BlcnNwZWN0aXZlIjp7InN1YmplY3RfaWRzIjpbNTg4NDVdfX19fX19fX19fX19fX19LCJ2YWx1ZXNfc3RhcnRfdGltZSI6IjIwMTktMDMtMDFUMDA6MDA6MDAiLCJ2YWx1ZXNfZW5kX3RpbWUiOiIyMDE5LTA0LTMwVDAwOjAwOjAwIn0%3d'
      this.props.fetchModelPrespectives && this.props.fetchModelPrespectives(payload)
      let metaModelPrespectivePayload = {}
      metaModelPrespectivePayload.id = perspectiveId
      metaModelPrespectivePayload.viewKey = {view_key: 'AgreementScoring_KPIPenaltyDashboard'}
      this.props.fetchMetaModelPrespective && this.props.fetchMetaModelPrespective(metaModelPrespectivePayload)
      let dropdownPayload = {}
      dropdownPayload['meta_model_perspective_id[0]'] = perspectiveId
      dropdownPayload['view_key[0]'] = 'AgreementScoring_KPIPenaltyDashboard'
      this.props.fetchAllDropdownData && this.props.fetchAllDropdownData(dropdownPayload)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      // mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
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
        let headerData = {...this.props.headerData}
        let availableAction = {...nextProps.availableAction}
        let crude = nextProps.crude
        let mask = nextProps.metaModelPerspective.resources[0].crude
        let metaData = []
        metaData.push(nextProps.metaModelPerspective.resources[0])
        headerData.metaModelPerspective = metaData
        headerData.toProcess = true
        nextProps.setHeaderData(headerData)
        availableAction['toProcessMetaModel'] = false
        for (let option in crude) {
          if (crude.hasOwnProperty(option)) {
            if (mask & crude[option]) {
              availableAction[option] = true
            }
          }
        }
        nextProps.setAvailableAction(availableAction)
      }
      if (nextProps.headerData.toBuildConnectionData) {
        if (nextProps.headerData.metaModelPerspective.length > 0) {
          let connectionData = {}
          connectionData.standardProperty = []
          connectionData.customerProperty = []
          connectionData.operation = []
          connectionData.selectedValues = []
          connectionData.data = []
          connectionData.selectOption = []
          connectionData.operation = {
            toCallApi: true,
            isComplete: false,
            processIndex: [],
            parentIndex: 0
          }
          nextProps.headerData.metaModelPerspective.forEach(function (metaModelPerspective, metaIndex) {
            console.log('metaModelPerspective', metaModelPerspective)
            // if (nextProps.metaModelPerspective && nextProps.metaModelPerspective !== '' && nextProps.availableAction.toProcess) {
              // if (nextProps.metaModelPerspective.resources[0].crude) {
                // let addSettings = JSON.parse(JSON.stringify(nextProps.addSettings))
                let availableAction = {...nextProps.availableAction}
                let crude = nextProps.crude
                let mask = metaModelPerspective.crude
                let labelParts = metaModelPerspective.parts
                connectionData.selectedValues[metaIndex] = []
                let cData = []
                connectionData.standardProperty[metaIndex] = []
                connectionData.customerProperty[metaIndex] = []
                connectionData.operation.processIndex[metaIndex] = 0
                for (let option in crude) {
                  if (crude.hasOwnProperty(option)) {
                    if (mask & crude[option]) {
                      availableAction[option] = true
                    }
                  }
                }
                labelParts.forEach(function (data, index) {
                  if (data.standard_property === null && data.type_property === null && data.constraint_perspective === null) {
                    let obj = {}
                    obj.name = data.name
                    if (data.constraint_inverted) {
                      obj.componentId = data.constraint.component_type.id
                    } else {
                      obj.componentId = data.constraint.target_component_type.id
                    }
                    obj.data = null
                    obj.processed = false
                    obj.partIndex = index
                    obj.max = data.constraint.max
                    obj.min = data.constraint.min
                    cData.push(obj)
                    connectionData.selectedValues[metaIndex].push(null)
                  }
                  if (data.standard_property !== null && data.type_property === null) {
                    data.partIndex = index
                    connectionData.standardProperty[metaIndex].push(data)
                  }
                  if (data.standard_property === null && data.type_property !== null) {
                    data.partIndex = index
                    connectionData.customerProperty[metaIndex].push(data)
                  }
                })
                connectionData.data[metaIndex] = cData
                connectionData.selectOption[metaIndex] = []
                nextProps.setConnectionData(connectionData)
                nextProps.setAvailableAction(availableAction)
              // }
            // }
          })
          let headerData = JSON.parse(JSON.stringify(nextProps.headerData))
          headerData.toBuildConnectionData = false
          this.props.setHeaderData(headerData)
        }
        }
        if (nextProps.headerData.toProcess) {
          let headerData = JSON.parse(JSON.stringify(nextProps.headerData))
          let metaModelPerspective = JSON.parse(JSON.stringify(headerData.metaModelPerspective))
          let processedIndex = headerData.processedIndex
          let toProcess = false
          if (nextProps.headerData.metaModelPerspective.length > 0) {
            nextProps.headerData.metaModelPerspective.forEach(function (data, index) {
              if (!processedIndex.includes(index)) {
                if (data.parts.length > 0) {
                  data.parts.forEach(function (partData, idx) {
                    if (partData.constraint_perspective !== null) {
                      if (partData.name === 'Exclusion Metrics') {
                        metaModelPerspective.push(partData.constraint_perspective)
                        processedIndex.push(index)
                        toProcess = true
                      }
                    }
                  })
                }
              }
            })
          }
          headerData.metaModelPerspective = metaModelPerspective
          headerData.processedIndex = processedIndex
          headerData.toProcess = toProcess
          if (!toProcess) {
            let headerColumn = []
            if (metaModelPerspective.length > 0) {
              metaModelPerspective.forEach(function (data, index) {
                if (index === 0) {
                  data.parts.forEach(function (partData, idx) {
                    if (partData.standard_property !== null && partData.type_property === null) { // Standard Property
                      if (partData.standard_property === 'name') {
                        headerColumn.push(partData.name)
                      }
                      // if (partData.standard_property === 'description') {
                      //   headerColumn.push(partData.name)
                      // }
                    } else if (partData.standard_property === null && partData.type_property === null && partData.constraint_perspective === null) { // Connection Property
                      headerColumn.push(partData.name)
                    }
                  })
                }
              })
            }
            headerData.headerColumn = headerColumn
            headerData.toBuildConnectionData = true
          }
          this.props.setHeaderData(headerData)
        }
      if (nextProps.connectionData !== '' && nextProps.connectionData.operation.toCallApi) {
        let connectionData = {...nextProps.connectionData}
        let headerData = {...nextProps.headerData}
        headerData.metaModelPerspective.forEach(function (data, index) {
          if (data.view_key === 'ExclusionsMetric_List') {
            let payload = {}
            payload['meta_model_perspective_id[0]'] = data.id
            payload['view_key[0]'] = data.view_key
            nextProps.fetchAllDropdownData && nextProps.fetchAllDropdownData(payload)
            connectionData.operation.toCallApi = false
            nextProps.setConnectionData(connectionData)
          }
        })
      }
      if (nextProps.dropdownData !== '') {
        if (nextProps.dropdownData.length > 0) {
          let services = []
          let kpi = []
          let timeGranularity = []
          nextProps.dropdownData.forEach(function (data, index) {
            if (data.parts) {
              data.parts.forEach(function (dataParts, partIndex) {
                if (partIndex === 2) {
                  let serviceData = dataParts.value[0].target_component
                  serviceData.subjectId = data.subject_id
                  // serviceData.subjectName = data.subject_name
                  services.push(serviceData)
                }
                if (partIndex === 3) {
                  let kpiData = dataParts.value[0].target_component
                  kpiData.subjectId = data.subject_id
                  // kpiData.subjectName = data.subject_name
                  kpi.push(kpiData)
                }
                if (partIndex === 4) {
                  let timeGranularityData = dataParts.value[0].target_component
                  timeGranularityData.subjectId = data.subject_id
                  // timeGranularityData.subjectName = data.subject_name
                  timeGranularity.push(timeGranularityData)
                }
              })
            }
          })
          let connectionData = {...nextProps.connectionData}
          let selectOption = []
          selectOption[0] = []
          selectOption[1] = []
          selectOption[1].push(services)
          selectOption[1].push(kpi)
          selectOption[1].push(timeGranularity)
          connectionData.selectOption = selectOption
          connectionData.backupSelectOption = selectOption
          connectionData.operation.isComplete = true
          nextProps.setConnectionData(connectionData)
          // eslint-disable-next-line
          mApp && mApp.unblockPage()
        }
        this.props.resetResponse()
      }
    }
  })
)(kpiPerformance)
