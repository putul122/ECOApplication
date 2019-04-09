import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './breadcrumbcomponent.scss'

export default function Breadcrumb (props) {
  let breadcrumb = props.breadcrumb
  let pageName
  let breadcrumbItems = ''
  if (typeof breadcrumb !== 'undefined') {
    pageName = breadcrumb.title
    if (typeof breadcrumb.items !== 'undefined') {
      breadcrumbItems = breadcrumb.items.map(function (object, index) {
        if (object.separator) {
          return (<li key={index} className='m-nav__separator'>-</li>)
        } else {
          return (
            <li key={index} className='m-nav__item'>
              <a href={object.href} className='m-nav__link'>
                <span className='m-nav__link-text'>{object.name}</span>
              </a>
            </li>
          )
        }
      })
    }
  }

  return (
    <div className={`m-subheader ${styles.customPadding}`}>
      <div className='d-flex align-items-center'>
        <div style={{ marginLeft: '25px' }}>
          <h3 className='m-subheader__title m-subheader__title--separator'>{pageName}</h3>
          <ul className='m-subheader__breadcrumbs m-nav m-nav--inline' style={{marginTop: '10px'}}>
            <li className='m-nav__item m-nav__item--home'>
              <Link to='/home' className='m-nav__link m-nav__link--icon'>
                <i className='m-nav__link-icon la la-home' />
              </Link>
            </li>
            <li className='m-nav__separator'>-</li>
            {breadcrumbItems}
          </ul>
        </div>
      </div>
    </div>
  )
}

Breadcrumb.propTypes = {
  breadcrumb: PropTypes.any
}
