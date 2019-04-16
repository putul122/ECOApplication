import React from 'react'
import PerspectivesListing from '../../containers/perspectivesListing/perspectivesListingContainer'
import Header from '../../containers/header/headerContainer'
import Breadcrumb from '../../containers/breadcrumb/breadcrumbContainer'
import FooterComponent from '../../components/footer/footerComponent'
import LeftNavigation from '../../components/leftNavigation/leftNavComponent'

class perspectivesListingPageRoute extends React.Component {
	render () {
    console.log('change Password param', this)
		return (
  <div>
    <Header {...this.props} />
    <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
      <LeftNavigation {...this.props} />
      <div className='m-grid__item m-grid__item--fluid m-wrapper'>
        <Breadcrumb />
        <div className='m-content'>
          <div className='row'>
            <div className='col-sm-12'>
              <PerspectivesListing {...this.props} />
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
export default perspectivesListingPageRoute
