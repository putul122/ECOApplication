import React from 'react'
import PropTypes from 'prop-types'
// import styles from './changePasswordComponent.scss'

export default function ChangePassword (props) {
  // console.log('URL for reset token', window.location.origin + '/change_password')
  console.log('string URL full', window.location.href)
  let EmailBox
  let NewPasswordBox
  let currentPageURL = window.location.href
  let resetToken = currentPageURL.split('?')[1].split('=')[1]
  console.log('query string value', resetToken)

  let handleNewpassword = function (event) {
    console.log('bbbbbb', EmailBox.value)
    let payload = {
      'client_id': props.client_id,
      'client_secret': props.client_secret,
      'email': EmailBox.value,
      'password_reset_token': resetToken + '==',
      'new_password': NewPasswordBox.value
    }
    // props.setLoginProcessStatus(true)
    props.changePassword(payload)
  }

  return (
    <div className='m-login__wrapper-2 m-portlet-full-height'>
      <div className='m-login__contanier'>
        <div className='m-login__head'>
          {/* <h3 className='m-login__title'>Login To Your Account</h3> */}
          <h2 className='m-login__title'>Change Password Capture</h2>
        </div>
        <div className='m-login__form m-form col-md-6'>
          <div className='form-group m-form__group'>
            <input className='form-control' type='text' ref={input => (EmailBox = input)} placeholder='Email' />
          </div>
          <div className='form-group m-form__group'>
            <input className='form-control m-login__form-input--last' type='Password' ref={input => (NewPasswordBox = input)} placeholder='New Password' />
          </div>
          <div className='form-group m-form__group'>
            <input className='form-control m-login__form-input--last' type='Password' placeholder=' Confirm New Password' />
          </div>
          <div className='row m-login__form-sub'>
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
          <div className='m-login__form-action pull-right'>
            <button className='btn btn-outline-info btn-sm m-btn m-btn--custom' onClick={handleNewpassword}>Change Password</button>
          </div>
        </div>
      </div>
    </div>
  )
}

ChangePassword.propTypes = {
  client_id: PropTypes.any,
  client_secret: PropTypes.any,
  // forgotpasswordresponse: PropTypes.any
  changePassword: PropTypes.func
}
