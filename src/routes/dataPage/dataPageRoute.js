import React from 'react'
import Data from '../../containers/data/dataContainer'
import LeftNavigation from '../../components/leftNavigation/leftNavComponent'
import Header from '../../containers/header/headerContainer'
import FooterComponent from '../../components/footer/footerComponent'

class DataPageRoute extends React.Component {
	render () {
		return (
  <div>
    <Header {...this.props} />
    <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
      <LeftNavigation />
      <div className='m-grid__item m-grid__item--fluid m-wrapper'>
        {/* <!-- END: Subheader --> */}
        <div className='m-content'>
          <Data {...this.props} />
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>

		)
	}
	props: {}
}
export default DataPageRoute
