import React from 'react'
import Header from '../../containers/header/headerContainer'
import LeftNavigation from '../../components/leftNavigation/leftNavComponent'
import PenaltyScoreCard from '../../containers/penaltyScoreCard/penaltyScoreCardContainer'
import FooterComponent from '../../components/footer/footerComponent'

class PenaltyScoreCardRoute extends React.Component {
  render () {
    return (
      <div>
        <Header {...this.props} />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation {...this.props} />
          <div className='m-grid__item m-grid__item--fluid m-wrapper'>
            <div className='m-content'>
              <div className='row'>
                <div className='col-xl-12'>
                  <PenaltyScoreCard {...this.props} />
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
export default PenaltyScoreCardRoute
