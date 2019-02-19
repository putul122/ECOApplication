import React from 'react'
import RegisterProcess from '../../containers/registerProcess/registerProcessContainer'

class RegisterProcessPageRoute extends React.Component {
	render () {
		return (
  <div className='container'>
    <RegisterProcess {...this.props} />
  </div>
		)
	}
	props: {}
}
export default RegisterProcessPageRoute
