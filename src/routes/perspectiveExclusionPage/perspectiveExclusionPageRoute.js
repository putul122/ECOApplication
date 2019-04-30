import React from 'react'
import PerspectiveExclusion from '../../containers/perspectiveExclusion/perspectiveExclusionContainer'
import Header from '../../containers/header/headerContainer'
// import Breadcrumb from '../../containers/breadcrumb/breadcrumbContainer'
import FooterComponent from '../../components/footer/footerComponent'
import LeftNavigation from '../../components/leftNavigation/leftNavComponent'

class PerspectiveExclusionPageRoute extends React.Component {
	render () {
		return (
  <div>
    <Header {...this.props} />
    <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
      <LeftNavigation {...this.props} />
      <div className='m-grid__item m-grid__item--fluid m-wrapper'>
        {/* <!-- BEGIN: Subheader --> */}
        {/* <Breadcrumb /> */}
        {/* <!-- END: Subheader --> */}
        <div className='m-content'>
          <div className='row'>
            <div className='col-sm-12'>
              <PerspectiveExclusion {...this.props} />
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
export default PerspectiveExclusionPageRoute
