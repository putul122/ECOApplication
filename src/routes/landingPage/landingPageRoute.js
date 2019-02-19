import React from 'react'
import Landing from '../../containers/landing/landingContainer'

class LandingPageRoute extends React.Component {
	render () {
		return (
  <div>
    {/* <Header {...this.props} /> */}
    <div className='m-grid m-grid--hor m-grid--root m-page'>
      <Landing {...this.props} />
    </div>
  </div>
		)
	}
	props: {}
}
export default LandingPageRoute
