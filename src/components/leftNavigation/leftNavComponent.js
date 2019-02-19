import React from 'react'
// import { Link } from 'react-router-dom'
import styles from './leftNavComponent.scss'

class LeftNavigation extends React.Component {
	render () {
		return (
  <div>
    {/* <!-- BEGIN: Left Aside --> */}
    <button className='m-aside-left-close  m-aside-left-close--skin-light' id='m_aside_left_close_btn'><i className='la la-close' /></button>
    <div id='m_aside_left' className='m-grid__item	m-aside-left  m-aside-left--skin-light '>
      {/* <!-- BEGIN: Brand --> */}
      {/* <div className='m-brand  m-brand--skin-light '>
        <a href='/'>
          <img alt='' src='/assets/ECO-Conductor.png' width='100px' style={{marginTop: '13'}} />
        </a>
      </div> */}
      {/* <!-- END: Brand --> */}
      {/* <!-- BEGIN: Aside Menu --> */}
      <div id='m_ver_menu' style={{'marginLeft': '30px'}} className='m-aside-menu  m-aside-menu--skin-light m-aside-menu--submenu-skin-light '>
        {/* <ul className='m-menu__nav  m-menu__nav--dropdown-submenu-arrow '>
          <li className='m-menu__item  m-menu__item--submenu m-menu__item--submenu-fullheight' ><Link to='/home' className='m-menu__link'><i className='m-menu__link-icon flaticon-menu' /></Link></li>
          <li className='m-menu__item  m-menu__item--submenu m-menu__item--submenu-fullheight' ><Link to='/components' className='m-menu__link'><i className='m-menu__link-icon fa fa-th' /></Link></li>
          {/* <li className='m-menu__item  m-menu__item--submenu m-menu__item--submenu-fullheight' ><Link to='/components' className='m-menu__link'><i className='m-menu__link-icon fa fa-th' /></Link></li> */}
        {/* <li className='m-menu__item  m-menu__item--submenu m-menu__item--submenu-fullheight' ><a href='javascript:;' className='m-menu__link'><i className='m-menu__link-icon fa fa-table' /></a></li>
        <li className='m-menu__item  m-menu__item--submenu m-menu__item--submenu-fullheight' ><a href='javascript:;' className='m-menu__link'><i className='m-menu__link-icon fa fa-compress' /></a></li>
        <li className='m-menu__item  m-menu__item--submenu m-menu__item--submenu-fullheight' ><a href='javascript:;' className='m-menu__link'><i className='m-menu__link-icon flaticon-settings' /></a></li>
      </ul> */}
        <nav className={styles.mainmenu}>
          <div className={styles.logotext}>
            <a href='/'>
              <img alt='' src='/assets/ECO-Conductor.png' width='100px' className={styles.logotext} />
            </a>
            {/* <h1 className={styles.logotext}>LM</h1> */}
          </div>
          <ul id='' className={'m-menu__item m-menu__item--submenu'}>
            <li className={'m-menu__item  m-menu__item--submenu m-menu__item--submenu-fullheight '} style={{'paddingTop': '20px'}}>
              <a className='m-menu__link' href='/home'>
                <i className='m-menu__link-icon flaticon-menu' style={{'font-size': '25px'}} />
                <span className={styles.navtext}>
                Home
                </span>
              </a>
            </li>
            <li className={'m-menu__item  m-menu__item--submenu m-menu__item--submenu-fullheight '}>
              <a className='m-menu__link' href='/component_types'>
                <i className='m-menu__link-icon flaticon-squares' style={{'font-size': '25px'}} />
                <span className={styles.navtext}>
                  Data
                </span>
              </a>
            </li>
            <li className={'m-menu__item  m-menu__item--submenu m-menu__item--submenu-fullheight '}>
              <a className='m-menu__link' href='/explorer'>
                <i className='m-menu__link-icon flaticon-list-1' style={{'font-size': '25px'}} />
                <span className={styles.navtext}>
                  Explorer
                </span>
              </a>
            </li>
            <li className={'m-menu__item  m-menu__item--submenu m-menu__item--submenu-fullheight '}>
              <a className='m-menu__link' href='/sheets'>
                <i className='m-menu__link-icon flaticon-interface-9 ' style={{'font-size': '25px'}} />
                <span className={styles.navtext}>
                  Sheets
                </span>
              </a>
            </li>
            <li className={'m-menu__item  m-menu__item--submenu m-menu__item--submenu-fullheight '}>
              <a className='m-menu__link' href='/tasks'>
                <i className='m-menu__link-icon flaticon-arrows ' style={{'font-size': '25px'}} />
                <span className={styles.navtext}>
                  Tasks
                </span>
              </a>
            </li>
            <li className={'m-menu__item  m-menu__item--submenu m-menu__item--submenu-fullheight '}>
              <a className='m-menu__link' href='/users'>
                <i className='m-menu__link-icon flaticon-user ' style={{'font-size': '25px'}} />
                <span className={styles.navtext}>
                  Users
                </span>
              </a>
            </li>
          </ul>
        </nav>
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
