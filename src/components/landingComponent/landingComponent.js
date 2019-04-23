import React from 'react'
import Login from '../../containers/login/loginContainer'
import SignUp from '../../containers/signUp/signUpContainer'
import ForgotPassword from '../../containers/forgotPassword/forgotPasswordContainer'
import PropTypes from 'prop-types'

export default class Landing extends React.Component {
    componentWillMount () {
      localStorage.setItem('forget', false)
    }
    handelClick = () => {
      if (this.props.flipInX === 'm-login--signin') {
        localStorage.setItem('forget', false)
        this.props.toggleFlipInX('m-login--signup')
      } else {
        localStorage.setItem('forget', false)
        this.props.toggleFlipInX('m-login--signin')
        this.props.toggleFlipInX('m-login--signup')
      }
    }
  render () {
    localStorage.removeItem('isLoggedin')
    localStorage.removeItem('showToasterSuccess')
    localStorage.removeItem('userAccessToken')
    var CheckForget = localStorage.getItem('forget')
    return (
      <div>
        {/* <Header {...this.this.props} /> */}
        <div className='m-grid m-grid--hor m-grid--root m-page'>
          {/* <LeftNavigation /> */}
          <div className={'m-login m-login--5 ' + this.props.flipInX} id='m_login' style={{'backgroundImage': 'url(./assets/app/media/img//bg/bg-3.jpg)'}}>
            <div className='m-login__wrapper-1 m-portlet-full-height'>
              <div className='m-login__wrapper-1-1'>
                <div className='m-login__contanier'>
                  <div className='m-login__content'>
                    <div className='m-login__logo'>
                      <a href=''>
                        <img src='/assets/ECO Conductor.png' width='150px' height='150px' alt='ECO Conductor' />
                      </a>
                    </div>
                    <div className='m-login__title'>
                      <h3>JOIN OUR ECOCONDUCTOR COMMUNITY GET FREE ACCOUNT</h3>
                    </div>
                    {/* <div className='m-login__desc'>
                      Amazing Stuff is Lorem Here.Grownng Team
                    </div> */}
                    <div className='m-login__form-action'>
                      <button onClick={this.handelClick} type='button' id='m_login_signup' className='btn btn-outline-info m-btn--pill'>Get An Account</button>
                    </div>
                    <div style={{'textAlign': 'center'}}><p style={{'color': 'red'}}>Beta Version, data will be public</p></div>
                  </div>
                </div>
                <div className='m-login__border'><div /></div>
              </div>
            </div>
            <div className='m-login__wrapper-2 m-portlet-full-height'>
              <div className='m-login__contanier'>
                {CheckForget === 'true'
                  ? <div className='m-login__signup animated flipInX'>
                    <ForgotPassword {...this.props} />
                  </div>
                  : (<div>
                    <div className='m-login__signin animated flipInX'>
                      <Login {...this.props} />
                    </div>
                    {CheckForget === 'true'
                    ? <div className='m-login__signin animated flipInX'>
                      <ForgotPassword {...this.props} />
                    </div>
                    : <div className='m-login__signup animated flipInX'>
                      <SignUp {...this.props} />
                    </div>
                    }
                  </div>)
                }
              </div>
            </div>
          </div>
        </div>
        {/* <FooterComponent /> */}
      </div>
    )
  }
}
Landing.propTypes = {
  flipInX: PropTypes.any,
  toggleFlipInX: PropTypes.func
}
