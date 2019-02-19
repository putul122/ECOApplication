import React from 'react'
import PropTypes from 'prop-types'
import styles from './userRegistrationComponent.scss'

// class UserRegistration extends React.Component {
//   render () {
    export default function UserRegistration (props) {
     // let FullNameBox
  let EmailBox
  let PasswordBox
  let handleInput = function (event) {
    console.log('HIII')
    if (typeof (EmailBox) !== 'undefined' && typeof (PasswordBox) !== 'undefined') {
      // let name = FullNameBox.value
      // name.split(' ', 2)[0] + Math.random()
      // To set unique user id in your system when it is available
      window.fcWidget.setExternalId(EmailBox.value)
      // To set user name
      // window.fcWidget.user.setFirstName(name)
      // To set user email
      window.fcWidget.user.setEmail(EmailBox.value)
      // To set user properties
      window.fcWidget.user.setProperties({
        plan: 'Estate',                 // meta property 1
        status: 'Active'                // meta property 2
      })
      let payload = {
        'email': EmailBox.value,
        'password': PasswordBox.value
      }

      props.registerUser(payload)
    }
  }
  console.log('is logged in ', props.isLoggedin)
    return (
      <div className='m-login__wrapper-1 m-portlet-full-height'>
        <div className='m-login__wrapper-1-1'>
          <div className='m-login__contanier'>
            <div className='m-login__content'>
              <div className='m-login__logo'>
                <a href=''>
                  <img alt='' src='/assets/ECO Conductor.png' width='150px' height='150px' />
                </a>
              </div>
              <div className={styles.logintitle}>
                <h3>JOIN OUR ECOCONDUCTOR COMMUNITY GET FREE ACCOUNT</h3>
              </div>
              <div className='m-login__form m-form'>
                <div className=''>
                  <input className={styles.customformcontrol} type='text' placeholder='Fullname' name='fullname' />
                </div>
                <div className=''>
                  <input className={styles.customformcontrol} type='text' ref={input => (EmailBox = input)} placeholder='Email' name='email' autoComplete='off' />
                </div>
                <div className=''>
                  <input className={styles.customformcontrol} type='password' ref={input => (PasswordBox = input)} placeholder='Password' name='password' />
                </div>
              </div>
              <div className='m-login__form-action'>
                <button type='button' onClick={handleInput} id='m_login_signup' className={styles.buttonbg}>Get An Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  UserRegistration.propTypes = {
    isLoggedin: PropTypes.any,
    registerUser: PropTypes.func
  }
//   props: {
//     children: any
//   }
// }

// export default UserRegistration
