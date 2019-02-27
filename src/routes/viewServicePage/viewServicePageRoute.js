import React from 'react'
import ViewService from '../../containers/viewService/viewServiceContainer'
import Header from '../../containers/header/headerContainer'
import Breadcrumb from '../../containers/breadcrumb/breadcrumbContainer'
import FooterComponent from '../../components/footer/footerComponent'
import LeftNavigation from '../../components/leftNavigation/leftNavComponent'

class viewServicePageRoute extends React.Component {
	render () {
    console.log('change Password param', this)
		return (
  <div>
    <Header {...this.props} />
    <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
      <LeftNavigation {...this.props} />
      <div className='m-grid__item m-grid__item--fluid m-wrapper'>
        {/* <!-- BEGIN: Subheader --> */}
        <Breadcrumb />
        {/* <!-- END: Subheader --> */}
        <div className='m-content'>
          <div className='row'>
            <div className='col-sm-12'>
              <ViewService {...this.props} />
            </div>
            {/* <div className='col-sm-2'>
              <ApplicationActions />
              {/* <ApplicationActivity /> }
            </div> */}
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
		)
	}
	props: {}
}
export default viewServicePageRoute
