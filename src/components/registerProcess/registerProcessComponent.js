import React from 'react'
import PropTypes from 'prop-types'
import styles from './registerProcessComponent.scss'
// import { Redirect } from 'react-router-dom'

export default function RegisterProcess (props) {
  let message
  if (!props.isAccountCreated && !props.isAbacusFileProvisioned && !props.isComposerModelConnected) {
    message = 'Creating your Composer Account....'
  // } else if (props.isAccountCreated && !props.isAbacusFileProvisioned && !props.isComposerModelConnected) {
  //   message = 'Provising Sample Abacus Model....'
  // } else if (props.isAccountCreated && props.isAbacusFileProvisioned && !props.isComposerModelConnected) {
  } else if (props.isAccountCreated && !props.isComposerModelConnected) {
    message = 'Connecting Composer to Abacus'
  }
  // window.setTimeout(() => {
  // if (props.isAccountCreated && props.isAbacusFileProvisioned && props.isComposerModelConnected && props.registerProcessStatus === 'Completed') {
  // if (props.registerProcessResponse && props.registerProcessResponse.resources.length > 0) {
  //   if (props.isAccountCreated && props.isComposerModelConnected && props.registerProcessResponse.resources[0]['status'] === 'Completed') {
  //     console.log('final process in redirect to home', props)
  //     return (
  //       <Redirect to='/home' push />
  //     )
  //   }
  // }
  // }, 1000)

  return (
    <div className={styles.spacetop + ' container'}>
      <div className='row'>
        <div className='col-sm-12 text-center pull-right'>
          <div className={(!props.isAccountCreated || !props.isAbacusFileProvisioned || !props.isComposerModelConnected) ? styles.loader : ''} />
        </div>
      </div>
      <div className='row clearfix'>
        <div className='col-sm-6 text-center' >
          <label htmlFor='viewstats'>
            <input type='checkbox' checked={props.isAccountCreated} className='checkboxprop' /><br />
            <span className={styles.labeltext}>Account created</span>
          </label>
        </div>
        {/* <div className='col-sm-4 text-center' >
          <label htmlFor='viewstats'>
            <input type='checkbox' checked={props.isAbacusFileProvisioned} className='checkboxprop' /><br />
            <span className={styles.labeltext}> Abacus File Provisioned</span>
          </label>
        </div> */}
        <div className='col-sm-6 text-center' >
          <label htmlFor='viewstats'>
            <input type='checkbox' checked={props.isComposerModelConnected} className='checkboxprop' /><br />
            <span className={styles.labeltext}>Composer Model Connected</span>
          </label>
        </div>
        <div className='col-sm-12 text-center'>
          <p className={styles.messagetext}>{ message }</p>
        </div>
      </div>
    </div>
  )
}

RegisterProcess.propTypes = {
  isAccountCreated: PropTypes.any,
  isAbacusFileProvisioned: PropTypes.any,
  isComposerModelConnected: PropTypes.any
  // registerProcessResponse: PropTypes.any
  // accountCreation: PropTypes.func,
  // abacusFileProvisioned: PropTypes.func,
  // composerModelConnected: PropTypes.func
}
