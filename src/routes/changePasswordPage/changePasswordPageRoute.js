import React from 'react'
import ChangePassword from '../../containers/changePassword/changePasswordContainer'
// import ApplicationActions from '../../components/applicationActions/applicationActionsComponent'
// import ApplicationActivity from '../../components/applicationActivity/applicationActivityComponent'
import Header from '../../containers/header/headerContainer'
// import FooterComponent from '../../components/footer/footerComponent'
// import LeftNavigation from '../../components/leftNavigation/leftNavComponent'

class changePasswordPageRoute extends React.Component {
	render () {
    console.log('change Password param', this)
		return (
  <div>
    <Header {...this.props} />
    <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
      <div className='m-grid__item m-grid__item--fluid m-wrapper'>
        <div className='m-content'>
          <div className='row'>
            <div className='col-sm-12'>
              <ChangePassword {...this.props} />
            </div>
            {/* <div className='col-sm-2'>
              <ApplicationActions />
              {/* <ApplicationActivity /> }
            </div> */}
          </div>
        </div>
      </div>
    </div>
    {/* <FooterComponent /> */}
  </div>
		)
	}
	props: {}
}
export default changePasswordPageRoute
