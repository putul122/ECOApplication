import React from 'react'
import PropTypes from 'prop-types'
// import styles from './loginComponent.scss'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: 'none',
    background: 'none',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}

export default function viewService (props) {
  let openModal = function (event) {
    event.preventDefault()
    props.setModalOpenStatus(true)
   }
  let closeModal = function () {
    props.setModalOpenStatus(false)
  }
  return (
    <div>
      <div className='m-portlet m-portlet--mobile m-portlet--body-progress-'>
      <br />
      <div className='m-portlet__head' style={{'height': '50%'}}>
        <div className='m-portlet__head-caption' style={{width: '100%'}}>
          <div className='m-portlet__head-title' style={{width: '100%'}}>
            <div className='row' style={{width: '100%'}}>
              <div className='col-8'>
                <div className=''>
                  <p>Front Office</p>
                </div>
              </div>
              <div className='col-4 float-right m--margin-top-10'>
                <div className='pull-right'>
                  <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                    <button type='button' onClick={openModal} className='m-btn btn btn-secondary'>Delete Service</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='m-portlet__body'>
        <div className='row'>
          <div className='col-xl-12' />
        </div>
      </div>
    </div>
    <div>
      <ReactModal isOpen={props.modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles} >
        {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
        <div className={''}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Delete Service</h4>
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <p>Front Office</p>
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={''} className='btn btn-outline-info btn-sm'>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  </div>
  )
}

viewService.propTypes = {
  isModalOpen: PropTypes.any
}
