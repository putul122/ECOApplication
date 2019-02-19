import React from 'react'
// import { Link } from 'react-router-dom'
// import styles from './leftNavComponent.scss'

class LeftNavigation extends React.Component {
	render () {
		return (
  <div>
    {/* <!-- BEGIN: Left Aside --> */}
    <button className='m-aside-left-close  m-aside-left-close--skin-light' id='m_aside_left_close_btn'><i className='la la-close' /></button>
    <div id='m_aside_left' className='m-grid__item	m-aside-left  m-aside-left--skin-light '>
      {/* <!-- BEGIN: Brand --> */}
      <div className='m-brand  m-brand--skin-light '>
        {/* <a href='/' className='m-brand__logo'>
        <img alt='' src='assets/demo/demo7/media/img/logo/logo.png' />
        </a> */}
        {/* <a href='/'>
        <img alt='' src='assets/ECO-Conductor.png' />
        </a> */}
        <a href='/'>
          <img alt='' src='/assets/Telkom.png' width='100px' style={{marginTop: '13'}} />
        </a>
      </div>
      {/* <!-- END: Brand --> */}
      {/* <!-- BEGIN: Aside Menu --> */}
      <div id='m_ver_menu' className='m-aside-menu m-aside-menu--skin-light m-aside-menu--submenu-skin-light m-scroller ps ps--active-y' data-menu-vertical='true' m-menu-scrollable='1' m-menu-dropdown-timeout='500' style={{height: '514px', overflow: 'hidden'}}>
        <ul className='m-menu__nav  m-menu__nav--dropdown-submenu-arrow '>
          <li className='m-menu__item ' aria-haspopup='true' m-menu-link-redirect='1'>
            <a href='?page=inner&amp;demo=demo6' className='m-menu__link '>
              <i className='m-menu__link-icon flaticon-suitcase' />
              <span className='m-menu__link-text'>Finance</span>
            </a>
          </li>
          <li className='m-menu__item ' aria-haspopup='true' m-menu-link-redirect='1'>
            <a href='?page=inner&amp;demo=demo6' className='m-menu__link '>
              <i className='m-menu__link-icon flaticon-suitcase' />
              <span className='m-menu__link-text'>Finance</span>
            </a>
          </li>
        </ul>
        <div className='ps__rail-x' style={{left: '0px', bottom: '0px'}}>
          <div className='ps__thumb-x' style={{left: '0px', width: '0px'}} />
        </div>
        <div className='ps__rail-y' style={{top: '0px', height: '514px', right: '4px'}}>
          <div className='ps__thumb-y' style={{top: '0px', height: '360px'}} />
        </div>
      </div>
      {/* <!-- END: Aside Menu --> */}
    </div>
  </div>
		)
	}

	props: {
    children: any
  }
}

export default LeftNavigation
