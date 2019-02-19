import React from 'react'
import Header from '../../containers/header/headerContainer'
import LeftNavigation from '../../components/leftNavigation/leftNavComponent'
import Sheets from '../../containers/sheets/sheetsContainer.js'
import FooterComponent from '../../components/footer/footerComponent'
import Breadcrumb from '../../containers/breadcrumb/breadcrumbContainer'

class SoftwarePageRoute extends React.Component {
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
                  <Sheets {...this.props} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    )
  }
  // props: {}
}
export default SoftwarePageRoute
