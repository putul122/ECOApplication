import React from 'react'
import Header from '../../containers/header/headerContainer'
import LeftNavigation from '../../components/leftNavigation/leftNavComponent'
import SlaComparison from '../../containers/slaComparison/slaComparisonContainer'
// import Breadcrumb from '../../containers/breadcrumb/breadcrumbContainer'
import FooterComponent from '../../components/footer/footerComponent'

class SlaComparisonRoute extends React.Component {
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
                <div className='col-xl-12'>
                  <SlaComparison {...this.props} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    )
  }
}
export default SlaComparisonRoute
