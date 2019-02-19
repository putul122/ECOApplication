import React from 'react'
// import styles from './componentTypeComponent.scss'
import PropTypes from 'prop-types'
import _ from 'lodash'
import debounce from 'lodash/debounce'

export default function ComponentType (props) {
    let searchTextBox
    let componentTypes = props.componentTypes.resources
    let componentTypeBlockList = ''
    let totalNoPages
    let perPage = 10
    let currentPage = props.currentPage
    let nextClass = ''
    let previousClass = ''
    let pageArray = []
    // let ComponentTypeId
    let totalComponentType
    let listPage = []
    let paginationLimit = 6
    console.log('change', props)
    if (typeof componentTypes !== 'undefined') {
      componentTypeBlockList = componentTypes.map(function (componentType, index) {
        console.log(index)
        let iconlink = componentType.links.find(function (link) { return link.rel === 'icon' })
        return (
          <div className='m-widget17__item'>
            <a href={'/component_types/' + componentType.id} >
              <span className='m-widget17__icon text-center' style={{ float: 'none', margin: '0 auto' }}>
                <img src={iconlink ? iconlink.href : ''} alt={componentType.name} />
              </span>
              <span className='m-widget17__subtitle'>
                {componentType.name}
              </span>
            </a>
          </div>
        )
      })
      totalComponentType = props.componentTypes.total_count
      totalNoPages = Math.ceil(totalComponentType / perPage)
    }
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    }

    if (currentPage === totalNoPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }

    let i = 1
    while (i <= totalNoPages) {
      let pageParameter = {}
      pageParameter.number = i
      pageParameter.class = ''
      pageArray.push(pageParameter)
      i++
    }
    pageArray = _.chunk(pageArray, paginationLimit)
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })

    let handleInputChange = debounce((e) => {
      if (searchTextBox) {
        const value = searchTextBox.value
        // const value = e.target.value
        console.log('value', value)
        console.log('searchTextBox', searchTextBox.value)
        props.setComponentTypeLoading(true)
        // componentTypeBlockList = ''
        let payload = {
          'search': value || '',
          'page_size': 10,
          'page': currentPage,
          'recommended': value === ''
        }
        props.setSearchObject(payload)
        props.searchComponent(payload)
        // eslint-disable-next-line
        mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        listPage = _.filter(pageArray, function (group) {
          let found = _.filter(group, {'number': currentPage})
          if (found.length > 0) { return group }
        })
      }
    }, 500)
    let handlePage = function (page) {
      if (page === 1) {
        previousClass = 'm-datatable__pager-link--disabled'
      } else if (page === totalNoPages) {
        nextClass = 'm-datatable__pager-link--disabled'
      }
      props.setComponentTypeLoading(true)
      // componentTypeBlockList = ''
      let payload = {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': 10,
        'page': page,
        'recommended': searchTextBox.value === ''
      }
      props.fetchComponent(payload)
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.setCurrentPage(page)

      listPage = _.filter(pageArray, function (group) {
        let found = _.filter(group, {'number': page})
        if (found.length > 0) { return group }
      })
    }

    let handlePrevious = function (event) {
      event.preventDefault()
      if (currentPage === 1) {
        previousClass = 'm-datatable__pager-link--disabled'
      } else {
        let payload = {
          'search': searchTextBox.value ? searchTextBox.value : '',
          'page_size': 10,
          'page': currentPage - 1,
          'recommended': searchTextBox.value === ''
        }
        props.setComponentTypeLoading(true)
        props.fetchComponent(payload)
        // eslint-disable-next-line
        mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        props.setCurrentPage(currentPage - 1)
      }
      listPage = _.filter(pageArray, function (group) {
        let found = _.filter(group, {'number': currentPage - 1})
        if (found.length > 0) { return group }
      })
    }

    let handleNext = function (event) {
      event.preventDefault()
      if (currentPage === totalNoPages) {
        nextClass = 'm-datatable__pager-link--disabled'
      } else {
        let payload = {
          'search': searchTextBox.value ? searchTextBox.value : '',
          'page_size': 10,
          'page': currentPage + 1,
          'recommended': searchTextBox.value === ''
        }
        props.setComponentTypeLoading(true)
        // componentTypeBlockList = ''
        props.fetchComponent(payload)
        // eslint-disable-next-line
        mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        props.setCurrentPage(currentPage + 1)
      }
      listPage = _.filter(pageArray, function (group) {
        let found = _.filter(group, {'number': currentPage + 1})
        if (found.length > 0) { return group }
      })
    }

  return (
    <div className={''}>
      <div className='row'>
        <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--full-height m-portlet--skin-light  m-portlet--rounded-force' style={{ width: '100%' }}>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title row'>
                <div className={' col-md-12'}>
                  <div className='m-input-icon m-input-icon--left'>
                    <input type='text' className='form-control m-input col-12' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onKeyUp={handleInputChange} />
                    <span className='m-input-icon__icon m-input-icon__icon--left'>
                      <span>
                        <i className='la la-search' />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='m-portlet__body'>
            <div className='m-widget17'>
              <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides m--bg-info'>
                <div className='m-widget17__chart' style={{ height: '320px' }}><div className='chartjs-size-monitor' style={{ position: 'absolute', left: '0px', top: '0px', right: '0px', bottom: '0px', overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: '-1' }}><div className='chartjs-size-monitor-expand' style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div style={{ position: 'absolute', width: '1000000px', height: '1000000px', left: 0, top: 0 }} /></div><div className='chartjs-size-monitor-shrink' style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div style={{ position: 'absolute', width: '200%', height: '200%', left: 0, top: 0 }} /></div></div>
                  {/* <div className={' col-md-6'}>
                    <div className='m-input-icon m-input-icon--left'>
                      <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onKeyUp={handleInputChange} />
                      <span className='m-input-icon__icon m-input-icon__icon--left'>
                        <span>
                          <i className='la la-search' />
                        </span>
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className='m-widget17__stats'>
                <div className='m-widget17__items m-widget17__items-col1 col-md-2 col-sm-4' style={{ width: '20%' }}>
                  {componentTypeBlockList[0]}
                  {componentTypeBlockList[5]}
                </div>
                <div className='m-widget17__items m-widget17__items-col1 col-md-2 col-sm-4' style={{ width: '20%' }}>
                  {componentTypeBlockList[1]}
                  {componentTypeBlockList[6]}
                </div>
                <div className='m-widget17__items m-widget17__items-col1 col-md-2 col-sm-4' style={{ width: '20%' }}>
                  {componentTypeBlockList[2]}
                  {componentTypeBlockList[7]}
                </div>
                <div className='m-widget17__items m-widget17__items-col1 col-md-2 col-sm-4' style={{ width: '20%' }}>
                  {componentTypeBlockList[3]}
                  {componentTypeBlockList[8]}
                </div>
                <div className='m-widget17__items m-widget17__items-col2 col-md-2 col-sm-4' style={{ width: '20%' }}>
                  {componentTypeBlockList[4]}
                  {componentTypeBlockList[9]}
                </div>
              </div>
            </div>
          </div>
          {componentTypeBlockList.length > 0 && (<div className='row col-md-12 text-center' style={{ float: 'none', margin: '0 auto' }} id='scrolling_vertical'>
            <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
              <div className='m-datatable__pager m-datatable--paging-loaded clearfix' style={{ 'text-align': 'center' }}>
                <ul className='m-datatable__pager-nav'>
                  <li><a href='' title='Previous' id='m_blockui_1_5' className={'m-datatable__pager-link m-datatable__pager-link--prev ' + previousClass} onClick={handlePrevious} data-page='4'><i className='la la-angle-left' /></a></li>
                  {listPage[0] && listPage[0].map(function (page, index) {
                          if (page.number === currentPage) {
                                  page.class = 'm-datatable__pager-link--active'
                                } else {
                                  page.class = ''
                                }
                                return (<li key={index} >
                                  <a href='' className={'m-datatable__pager-link m-datatable__pager-link-number ' + page.class} data-page={page.number} title={page.number} onClick={(event) => { event.preventDefault(); handlePage(page.number) }} >{page.number}</a>
                                </li>)
                              })}
                  <li><a href='' title='Next' className={'m-datatable__pager-link m-datatable__pager-link--next ' + nextClass} onClick={handleNext} data-page='4'><i className='la la-angle-right' /></a></li>
                </ul>
              </div>
            </div>
          </div>)}
          <br />
        </div>
      </div>
    </div>
  )
}

ComponentType.propTypes = {
  componentTypes: PropTypes.any,
  // searchObject: PropTypes.any,
  currentPage: PropTypes.any
}
