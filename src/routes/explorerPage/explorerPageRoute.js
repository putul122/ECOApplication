import React from 'react'
import Header from '../../containers/header/headerContainer'
import Explorer from '../../containers/explorer/explorerContainer'
import LeftNavigation from '../../components/leftNavigation/leftNavComponent'
import FooterComponent from '../../components/footer/footerComponent'
import Breadcrumb from '../../containers/breadcrumb/breadcrumbContainer'

class TasksPageRoute extends React.Component {
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
              <Explorer {...this.props} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
		)
	}
	props: {
    // match: {
    //   path: '',
    // }
  }
}
export default TasksPageRoute
