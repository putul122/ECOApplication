import React from 'react'
import PropTypes from 'prop-types'
import ApplicationActivity from '../../containers/applicationActivity/applicationActivityContainer'
import * as signalR from '@aspnet/signalr'
const notificationAlert = {
  background: '#ff006c',
  border: '1px solid #ff006c'
}
const mHeaderStyle = {
  display: 'table',
  height: '100%',
  float: 'left'
}
let userToken = localStorage.getItem('userAccessToken')
var connection = new signalR.HubConnectionBuilder()
          .withUrl('https://notification-eco-dev.ecoconductor.com/notification', {
            accessTokenFactory: () => {
              return userToken
            }
          })
          .configureLogging(signalR.LogLevel.Information)
          .build()
connection.start().then(function () {
  console.log('Connection Started---- >', connection)
  connection.invoke('GetNotificationStatus').catch(err => console.error('Call GetNotificationStatus method---', err))
}).catch(err => console.error('connection error --------------', err))

export default function HeaderComponent (props) {
  let isQuickSlideOpen = props.isQuickSlideOpen
  let quickSlideClass = 'm-quick-sidebar--off'
  let isLoginSlideOpen = props.isLoginSlideOpen
  let loginSlideClass = 'm-dropdown--close'
  let notificationStyle = {}
  if (props.notificationFlag) {
    notificationStyle = notificationAlert
  } else {
    notificationStyle = {}
  }

  connection.on('ReceiveMessage', (payload) => {
    console.log('1111111111111111111111111111111111111110000000000000000000000000000000000')
    payload = JSON.parse(payload)
    console.log('ReceiveMessage -----------------------', payload)
    if (payload.notify) {
      props.setNotificationFlag(true)
    } else {
      props.setNotificationFlag(false)
    }
  })

  if (isQuickSlideOpen) {
    quickSlideClass = 'm-quick-sidebar--on'
    if (props.notificationFlag) {
      props.updateNotificationViewStatus && props.updateNotificationViewStatus()
    }
  } else {
    quickSlideClass = 'm-quick-sidebar--off'
  }
  let openQuickSlide = function (event) {
    event.preventDefault()
    quickSlideClass = 'm-quick-sidebar--on'
    props.setQuickslideFlag(true)
    // Default clickFrom settings when slide is open
    let obj = {}
    obj.component = 'Activity Feed'
    obj.discussionId = null
    localStorage.setItem('clickFrom', JSON.stringify(obj))
    // End Default clickFrom settings
  }

  let closeQuickSlide = function (event) {
    event.preventDefault()
    quickSlideClass = 'm-quick-sidebar--off'
    props.setQuickslideFlag(false)
    localStorage.removeItem('clickFrom')
  }

  if (isLoginSlideOpen) {
    loginSlideClass = 'm-dropdown--open'
  } else {
    loginSlideClass = ''
  }
  let openLoginSlide = function (event) {
    event.preventDefault()
    loginSlideClass = 'm-dropdown--open'
    props.setLoginslideFlag(true)
  }
  let logOut = function (event) {
    event.preventDefault()
    localStorage.removeItem('isLoggedin')
    localStorage.removeItem('showToasterSuccess')
    localStorage.removeItem('userAccessToken')
    props.setLoginslideFlag(false)
    props.history.push('/')
  }

  let closeLoginSlide = function (event) {
    event.preventDefault()
    loginSlideClass = 'm-dropdown--close'
    props.setLoginslideFlag(false)
  }
  return (
    <div>
      <header id='m_header' className='m-grid__item    m-header ' m-minimize-offset='200' m-minimize-mobile-offset='200' >
        <div className='m-container m-container--fluid m-container--full-height' >
          <div className='m-stack m-stack--ver m-stack--desktop'>
            {/* <!-- BEGIN: Brand --> */}
            <div className='m-stack__item m-brand m-brand--skin-light'>
              <div className='m-stack m-stack--ver m-stack--general'>
                <div className='m-stack__item m-stack__item--middle m-brand__logo'>
                  <a href='javascript:void(0);' className=''>
                    <img alt='' src='/assets/ECO-Conductor.png' width='60px' />
                  </a>
                </div>
                <div className='m-stack__item m-stack__item--middle m-brand__tools'>

                  {/* <!-- BEGIN: Responsive Aside Left Menu Toggler --> */}
                  <a href='javascript:;' id='m_aside_left_offcanvas_toggle' className='m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-tablet-and-mobile-inline-block'>
                    <span />
                  </a>
                  {/* <!-- END --> */}

                  {/* <!-- BEGIN: Responsive Header Menu Toggler --> */}
                  <a id='m_aside_header_menu_mobile_toggle' href='javascript:;' className='m-brand__icon m-brand__toggler m--visible-tablet-and-mobile-inline-block'>
                    <span />
                  </a>
                  {/* <!-- END --> */}

                  {/* <!-- BEGIN: Topbar Toggler --> */}
                  <a id='m_aside_header_topbar_mobile_toggle' href='javascript:;' className='m-brand__icon m--visible-tablet-and-mobile-inline-block'>
                    <i className='flaticon-more' />
                  </a>
                  {/* <!-- BEGIN: Topbar Toggler --> */}
                </div>
              </div>
            </div>
            {/* <!-- END: Brand --> */}
            <div className='m-stack__item m-stack__item--fluid m-header-head' id='m_header_nav'>
              <div className='m-header__title' style={mHeaderStyle}>
                <h3 className='m-header__title-text' style={{'padding': '0 10px 0 30px', 'marginTop': '25px'}}>Select Module</h3>
              </div>
              <div className='m-header-menu m-aside-header-menu-mobile m-aside-header-menu-mobile--offcanvas  m-header-menu--skin-light m-header-menu--submenu-skin-light m-aside-header-menu-mobile--skin-light m-aside-header-menu-mobile--submenu-skin-light '>
                <ul className='m-menu__nav  m-menu__nav--submenu-arrow '>
                  <li className='m-menu__item m-menu__item--active m-menu__item--submenu m-menu__item--rel ' style={{'padding': '0 0px'}} m-menu-submenu-toggle='click' aria-haspopup='true'>
                    <a href='/service_dashboard' className='m-menu__link m-menu__toggle ' title='Non functional dummy link'>
                      <span className='m-menu__item-here' /><span className='m-menu__link-text btn btn-secondary'>S-ECO</span>
                    </a>
                  </li>
                  <li className='m-menu__item m-menu__item--active m-menu__item--submenu m-menu__item--rel ' style={{'padding': '0 0px'}} m-menu-submenu-toggle='click' aria-haspopup='true'>
                    <a href='javascript:;' className='m-menu__link m-menu__toggle ' title='Non functional dummy link'>
                      <span className='m-menu__item-here' /><span className='m-menu__link-text btn btn-secondary'>P-ECO</span>
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- BEGIN: Topbar --> */}
              { props.isLoggedin && (<div id='m_header_topbar' className='m-topbar  m-stack m-stack--ver m-stack--general'>
                {/* <div className='m-stack__item m-stack__item--middle m-dropdown m-dropdown--arrow m-dropdown--large m-dropdown--mobile-full-width m-dropdown--align-left m-dropdown--skin-light m-header-search m-header-search--expandable m-header-search--skin-light'>
                  <span>test</span>
                </div> */}
                <div className='m-stack__item m-topbar__nav-wrapper'>
                  <ul className='m-topbar__nav m-nav m-nav--inline'>
                    <li className='m-nav__item m-topbar__notifications m-dropdown m-dropdown--large m-dropdown--arrow m-dropdown--align-center m-dropdown--mobile-full-width m-dropdown--open' id='search-container' >
                      <a href='' className='m-nav__link m-dropdown__toggle' onClick={openQuickSlide} id='m_topbar_notification_icon'>
                        {/* {props.notificationFlag && (<span className='m-nav__link-badge m-badge m-badge--danger'><i className='flaticon-exclamation-2' /></span>)} */}
                        <span className='m-nav__link-icon m-topbar__usericon '>
                          <span className={'m-nav__link-icon-wrapper '} style={notificationStyle}><i className='flaticon-music-2' /></span>
                        </span>
                      </a>
                    </li>
                    <li className={'m-nav__item m-topbar__user-profile  m-dropdown  m-dropdown--medium m-dropdown--arrow  m-dropdown--align-right  m-dropdown--mobile-full-width m-dropdown--skin-light ' + loginSlideClass}>
                      <a href='' className='m-nav__link' onClick={openLoginSlide}>
                        <span className='m-topbar__userpic m--hide'>
                          <img src='assets/app/media/img/users/user4.jpg' className='m--img-rounded m--marginless m--img-centered' alt='' />
                        </span>
                        <span className='m-nav__link-icon m-topbar__usericon'>
                          <span className='m-nav__link-icon-wrapper'><i className='flaticon-user-ok' /></span>
                        </span>
                        <span className='m-topbar__username m--hide'>Nick</span>
                      </a>
                      <div className='m-dropdown__wrapper'>
                        <span className='m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust' />
                        <div className='m-dropdown__inner'>
                          <div className='m--align-right'>
                            <div className='m-card-user--skin-light'>
                              {/* <div className='m-card-user__pic'>
                                <img src='assets/app/media/img/users/user4.jpg' className='m--img-rounded m--marginless' alt='' />
                              </div> */}
                              <div className=' '>
                                {/* <span className='m-card-user__name m--font-weight-500'>Mark Andre</span> */}
                                <a href='' onClick={closeLoginSlide} ><i className='la la-close' /></a>
                              </div>
                            </div>
                          </div>
                          <div className='m-dropdown__body'>
                            <div className='m-dropdown__content'>
                              <ul className='m-nav m-nav--skin-light'>
                                <li className='m-nav__item'>
                                  <a href='javascript:void(0);' onClick={logOut} className='btn m-btn--pill    btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder'>Logout</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>) }
              {/* <!-- END: Topbar --> */}
            </div>
          </div>
        </div>
      </header>
      {/*  <!-- begin::Quick Sidebar --> */}
      <div id='m_quick_sidebar' className={'m-quick-sidebar m-quick-sidebar--tabbed m-quick-sidebar--skin-light ' + quickSlideClass}>
        <div className='m-quick-sidebar__content'>
          <span id='m_quick_sidebar_close' className='m-quick-sidebar__close'><a href='' onClick={closeQuickSlide} ><i className='la la-close' /></a></span>
          <ul id='m_quick_sidebar_tabs' className='nav nav-tabs m-tabs m-tabs-line m-tabs-line--brand' role='tablist'>
            <li className='nav-item m-tabs__item'>
              <a className='nav-link m-tabs__link active' data-toggle='tab' href='#m_quick_sidebar_tabs_messenger_notification' role='tab'>Activity Feeds</a>
            </li>
            {/* <li className='nav-item m-tabs__item'>
              <a className='nav-link m-tabs__link' 		data-toggle='tab' href='#m_quick_sidebar_tabs_settings' role='tab'>Settings</a>
            </li> */}
          </ul>
          <div className='tab-content'>
            <div className='tab-pane active show' id='m_quick_sidebar_tabs_messenger_notification' role='tabpanel'>
              <div className='m-accordion m-accordion--default m-accordion--solid m-accordion--section  m-accordion--toggle-arrow' id='m_accordion_7' role='tablist'>
                <ApplicationActivity isMessageSlideOpen={isQuickSlideOpen} notificationReceived={props.notificationFlag} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end::Quick Sidebar -->		  */}
    </div>
  )
}

HeaderComponent.propTypes = {
  isLoggedin: PropTypes.any,
  // setNotificationFlag: PropTypes.func,
  updateNotificationViewStatus: PropTypes.func,
  isQuickSlideOpen: PropTypes.any,
  isLoginSlideOpen: PropTypes.any,
  notificationFlag: PropTypes.any,
  setLoginslideFlag: PropTypes.func
}
