import React from 'react'
import PropTypes from 'prop-types'
// import styles from './changePasswordComponent.scss'

export default function ForgotPassword (props) {
  // console.log('respose data', props.forgotpasswordresponse)
// let FullNameBox
//   let apiCalling = props.loginProcess
//   let loggedInMessageResponse = function (message) {
//     if (message) {
//       return (<div className='m-alert m-alert--outline alert alert-danger alert-dismissible animated fadeIn' role='alert'>
//         {/* <button type='button' className='close' data-dismiss='alert' aria-label='Close' /> */}
//         <span>{message}</span>
//       </div>
//       )
//     } else {
//       return (<div />)
//     }
//   }
     let EmailBox
//   let PasswordBox
//   let loggedInresponse = props.loggedInresponse
//   let messageBlock = loggedInMessageResponse('')
//   // let disabledButton = ''
//   let loadingClass = ''
  let handleSubmitemail = function (event) {
    console.log('bbbbbb', EmailBox.value)
    let payload = {
      'client_id': props.client_id,
      'client_secret': props.client_secret,
      'email': EmailBox.value,
      'reset_token': 'string',
      'password_reset_confirmation_url': window.location.origin + '/change_password'
    }
    // props.setLoginProcessStatus(true)
    props.changePassword(payload)
  }
  let handelClick = function (event) {
    localStorage.setItem('forget', false)
    props.toggleFlipInX('m-login--signin')
  }
//   // let closeMessage = function () {
//   //   messageBlock = ''
//   //   console.log('close message block')
//   // }
//   if (apiCalling) {
//     loadingClass = 'm-loader m-loader--right m-loader--light ' + styles.disabled
//   } else {
//     loadingClass = ''
//   }

//   if (loggedInresponse !== '') {
//     if (loggedInresponse.error_code) {
//       messageBlock = loggedInMessageResponse(loggedInresponse.error_message)
//     } else {
//       messageBlock = loggedInMessageResponse('')
//     }
//   }
  return (
    <div className='m-portlet-full-height='>
      <div className='m-login__contanier'>
        <div className='m-login__head'>
          {/* <h3 className='m-login__title'>Login To Your Account</h3> */}
          <h2 className='m-login__title'>Forgot Password</h2>
        </div>
        <div className='m-login__form m-form col-md-12  extraSpacings'>
          <div className='form-group m-form__group'>
            <input className='form-control' type='text' ref={input => (EmailBox = input)} placeholder='Email' />
          </div>
          {/* <div className='form-group m-form__group'>
            <input className='form-control m-login__form-input--last' type='Password' placeholder='Password' />
          </div> */}
          <div className='row m-login__form-sub extraSpacing'>
            <div className='col m--align-left'>
              {/* <label className='m-checkbox m-checkbox--focus'>
                    <input type='checkbox' name='remember' /> Remember me
                    <span />
              </label> */}
            </div>
            {/* <div className='col m--align-right'>
              <a href='' id='m_login_forget_password' className='m-link'>Forgot Password ?</a>
            </div> */}
          </div>
          {/* <div className='m-login__form-action'>
            <button className='buttonbg___qErwQ ' onClick={handleSubmitemail}>Change Password</button>
          </div> */}
          <div className='m-login__form-action evenlySpacing'>
            <button className='btn m-btn--pill btn-outline-info btn-md' onClick={handleSubmitemail}>Change Password</button>
            <button id='m_login_signup_cancel' onClick={handelClick} className='btn m-btn--pill btn-outline-info btn-md'>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

ForgotPassword.propTypes = {
  toggleFlipInX: PropTypes.func
  // client_id: PropTypes.any,
  // client_secret: PropTypes.any,
  // forgotpasswordresponse: PropTypes.any,
  // changePassword: PropTypes.func
}
