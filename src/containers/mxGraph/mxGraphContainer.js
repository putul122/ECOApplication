import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import mxGraph from '../../components/mxGraph/mxGraphComponent'
import { actions as sagaActions } from '../../redux/sagas/'

// Global State
export function mapStateToProps (state, props) {
  return {
    mxGraphData: state.mxGraphReducer.mxGraphData
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  getMxGraphData: sagaActions.mxGraphActions.getMxGraphData
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

const mxGraphContainer = compose(
  connect(
    mapStateToProps,
    propsMapping
  ),

  lifecycle({
    componentDidMount: function () {
      console.log('componentDidMount')
        this.props.getMxGraphData()
    }
  })
)(mxGraph)

export default mxGraphContainer
