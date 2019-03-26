import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

class InviteUsers extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fullName: '',
      password: '',
      confirmPassword: ''
    }
  }

  activateUserSubmitHandler = e => {
    e.preventDefault()

    const { fullName, password, confirmPassword } = this.state
    const { client_id, client_secret } = this.props

    if (password !== confirmPassword) {
      alert('Password and confirm Password do not match .. Please try again')
      return false
    }

    const qs = queryString.parse(window.location.href)
    const token = qs['http://localhost:3006/invite_user?token']
    const email = qs.email

    const firstName = fullName.split(' ')[0]

    const lastName = fullName.split(' ')[1] || ''

    this.props.client_access_token && this.props.client_access_token.map(async clientAccToken => {
      const clientToken = clientAccToken.access_token

      localStorage.setItem('clientAccessToken', clientToken)

      this.props.createUser({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        client_id,
        client_secret,
        invitation_token: token
      })
    })

    let payload = {
      'email': email,
      'password': password,
      'client_id': client_id,
      'client_secret': client_secret
    }
    this.props.setLoginProcessStatus(true)
    this.props.loginUser(payload)
  }

    render () {
      const { fullName, password, confirmPassword } = this.state

      const qs = queryString.parse(window.location.href)
      const email = qs.email

        return (
          <div>
            <h1 className='text-center'>Activate User</h1>
            <form onSubmit={this.activateUserSubmitHandler}>
              <div className='form-group row'>
                <label
                  className='col-sm-2 col-form-label'
                  htmlFor='inviteUserEmail'
                    >
                      Email
                    </label>
                <div className='col-sm-7'>
                  <input
                    type='text'
                    className='form-control'
                    value={email}
                    onChange={e =>
                          this.setState({ email: e.target.value })
                        }
                    id='inviteUserEmail'
                    readOnly
                      />
                </div>
              </div>
              <div className='form-group row'>
                <label
                  className='col-sm-2 col-form-label'
                  htmlFor='inviteUserFullName'
                    >
                      Full Name
                    </label>
                <div className='col-sm-7'>
                  <input
                    type='text'
                    className='form-control'
                    value={fullName}
                    onChange={e =>
                          this.setState({ fullName: e.target.value })
                        }
                    id='inviteUserFullName'
                      />
                </div>
              </div>
              <div className='form-group row'>
                <label
                  className='col-sm-2 col-sm-offset-3 col-form-label'
                  htmlFor='inviteUserPassword'
                    >
                      Password
                    </label>
                <div className='col-sm-5'>
                  <input
                    type='password'
                    className='form-control'
                    value={password}
                    onChange={e =>
                          this.setState({ password: e.target.value })
                        }
                    id='inviteUserPassword'
                      />
                </div>
              </div>
              <div className='form-group row'>
                <label
                  className='col-sm-2 col-sm-offset-3 col-form-label'
                  htmlFor='inviteUserConfirmPassword'
                    >
                      Confirm Password
                    </label>
                <div className='col-sm-5'>
                  <input
                    type='password'
                    className='form-control'
                    value={confirmPassword}
                    onChange={e =>
                          this.setState({ confirmPassword: e.target.value })
                        }
                    id='inviteUserConfirmPassword'
                      />
                </div>
              </div>
              <div className='form-group row' style={{display: 'flex', justifyContent: 'center'}}>
                <button
                  type='submit'
                  className='btn btn-outline-info btn-md text-right'
                    >
                      Activate Me
                    </button>
              </div>
            </form>
          </div>
        )
    }
}

InviteUsers.propTypes = {
  createUser: PropTypes.func,
  client_id: PropTypes.any,
  client_secret: PropTypes.any,
  client_access_token: PropTypes.any,
  setLoginProcessStatus: PropTypes.func,
  loginUser: PropTypes.func
}

export default InviteUsers
