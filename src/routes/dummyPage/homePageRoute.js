import React from 'react'
// import SmartDisplayStars from '../../containers/displayStars/displayStarsContainer'
import JointComponent from '../../components/joint/jointComponent'
// import Header from '../../components/header/headerComponent'
// import LeftNavigation from '../../components/leftNavigation/leftNavComponent'
// import FooterComponent from '../../components/footer/footerComponent'

class HomePageRoute extends React.Component {
	render () {
    return (
      <div>
        <JointComponent />
        {/* <Header />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation />
          <div className='m-grid__item m-grid__item--fluid m-wrapper'>
            <div className='m-content'>Inner page content goes here</div>
          </div>
        </div>
      <FooterComponent /> */}
      </div>
		)
	}
	props: {}
}
export default HomePageRoute
