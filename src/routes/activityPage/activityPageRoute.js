import React from 'react'
import ActivityFeed from '../../components/activityFeed/activityfeedComponent'
import RecentPlaces from '../../components/recentPlaces/recentPlacesComponent'
import FooterComponent from '../../components/footer/footerComponent'

class ActivityPageRoute extends React.Component {
  render () {
    return (

      <div className='container'>
        <div className='row'>
          <RecentPlaces />
          <ActivityFeed />
          <FooterComponent />
        </div>
      </div>

    )
  }
  props: {}
}
export default ActivityPageRoute
