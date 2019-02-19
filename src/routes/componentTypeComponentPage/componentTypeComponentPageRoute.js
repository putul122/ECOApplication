import React from 'react'
import ComponentTypeComponent from '../../containers/componentTypeComponent/componentTypeComponentContainer'
import Header from '../../containers/header/headerContainer'
import FooterComponent from '../../components/footer/footerComponent'
import LeftNavigation from '../../components/leftNavigation/leftNavComponent'
import Breadcrumb from '../../containers/breadcrumb/breadcrumbContainer'

class componentTypeDetailPageRoute extends React.Component {
	render () {
		return (
  <div>
    <Header {...this.props} />
    <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
      <LeftNavigation />
      <div className='m-grid__item m-grid__item--fluid m-wrapper'>
        {/* <!-- BEGIN: Subheader --> */}
        <Breadcrumb />
        {/* <!-- END: Subheader --> */}
        <div className='m-content'>
          <div className='row'>
            <div className='col-xl-12'>
              <ComponentTypeComponent {...this.props} />
            </div>
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
export default componentTypeDetailPageRoute
