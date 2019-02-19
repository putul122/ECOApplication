import React from 'react'
import styles from './applicationDetailComponent.scss'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Discussion from '../../containers/discussion/discussionContainer'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import debounce from 'lodash/debounce'
import Modal from 'react-modal'
// import ApplicationModelComponent for graph Model Visualization
import ApplicationModelComponent from '../applicationModel/applicationModelComponent'
import { Link } from 'react-router-dom'
var divStyle = {
  width: '95%',
  height: '30%',
  'overflow-y': 'scroll',
  'overflow-x': 'scroll',
  'border': '1px solid #000000'
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: 'none',
    background: 'none',
    transform: 'translate(-50%, -50%)'
  }
}

export default function ApplicationDetail (props) {
  let ComponentName = ''
  let ComponentDescription = ''
  let ComponentTypeIcon = ''
  let searchTextBox
  let componentComponents = props.componentComponents.resources
  let componentComponentsList
  let totalNoPages
  let perPage = props.perPage
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let totalComponentTypeComponent
  let pageArray = []
  // let ComponentTypeId
  let listPage = []
  let paginationLimit = 5
  let NameInputBox
  let DescriptionBox
  let handleBlurChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handleChange = function (event) {
    console.log('handle change', event.target.value, typeof event.target.value)
    props.setPerPage(parseInt(event.target.value))
  }
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  if (props.componentDetail !== '') {
    ComponentName = props.componentDetail.resources[0].name
    ComponentDescription = props.componentDetail.resources[0].description
    // ComponentTypeId = props.componentDetail.resources[0].id
    ComponentTypeIcon = props.componentDetail.resources[0].links.find(function (link) { return link.rel === 'icon' })
  }
  if (props.componentComponents !== '') {
    console.log(props.componentComponents)
    if (componentComponents.length > 0) {
      componentComponentsList = componentComponents.map(function (componentComponent, index) {
        console.log('index', index)
        let componentDescription = ''
        if (componentComponent.description) {
          componentDescription = componentComponent.description.length > 75 ? componentComponent.description.substring(0, 75) + ' ...' : componentComponent.description
        }
        return (
          <tr className='m-datatable__row m-datatable__row--even' key={index} style={{ 'left': '0px' }} >
            <td className='m-datatable__cell--sorted m-datatable__cell' style={{ 'width': '142px' }} data-toggle='tooltip' data-placement='top' title={componentComponent.name} data-original-title={componentComponent.name} >
              <span className='m-card-user m-card-user__details'><Link to={'/components/' + componentComponent.id}>{ componentComponent.name.length > 75 ? componentComponent.name.substring(0, 75) + ' ...' : componentComponent.name }</Link></span>
            </td>
            <td className='m-datatable__cell--sorted m-datatable__cell'><span style={{pointer: 'cursor'}} data-toggle='tooltip' data-placement='top' title={componentComponent.description} data-original-title={componentComponent.description} >{ componentDescription }</span></td>
          </tr>
        )
      })
    } else {
      console.log('else', props)
      componentComponentsList = []
      componentComponentsList.push((
        <tr key={0}>
          <td colSpan='2'>{'No data to display'}</td>
        </tr>
      ))
    }
    totalComponentTypeComponent = props.componentComponents.total_count
    totalNoPages = Math.ceil(totalComponentTypeComponent / perPage)

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
  }

  let handlePrevious = function (event) {
    event.preventDefault()
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else {
      let payload = {
        'id': props.componentDetail.resources[0].id,
        'ComponentTypeComponent': {
          'search': searchTextBox.value ? searchTextBox.value : '',
          'page_size': props.perPage,
          'page': currentPage - 1,
          'recommended': searchTextBox.value === ''
        }
      }
      props.fetchComponentComponent(payload)
      // eslint-disable-next-line
      mApp.block('#style-1', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
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
      'id': props.componentDetail.resources[0].id,
      'ComponentTypeComponent': {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': props.perPage,
        'page': currentPage + 1,
        'recommended': searchTextBox.value === ''
      }
    }
    props.fetchComponentComponent(payload)
    // eslint-disable-next-line
    mApp.block('#style-1', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.setCurrentPage(currentPage + 1)
    }
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage + 1})
      if (found.length > 0) { return group }
    })
  }

  let handlePage = function (page) {
    if (page === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else if (page === totalNoPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    let payload = {
      'id': props.componentDetail.resources[0].id,
      'ComponentTypeComponent': {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': props.perPage,
        'page': page,
        'recommended': searchTextBox.value === ''
      }
    }
    props.fetchComponentComponent(payload)
    // eslint-disable-next-line
    mApp.block('#style-1', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.setCurrentPage(page)

    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }

  let handleInputChange = debounce((e) => {
    console.log(e)
    console.log(searchTextBox)
    if (searchTextBox) {
      let payload = {
        'id': props.componentDetail.resources[0].id,
        'ComponentTypeComponent': {
          'search': searchTextBox.value || '',
          'page_size': props.perPage,
          'page': currentPage,
          'recommended': searchTextBox.value === ''
        }
      }
      props.searchComponentComponent(payload)
      // eslint-disable-next-line
      mApp.block('#style-1', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      listPage = _.filter(pageArray, function (group) {
        let found = _.filter(group, {'number': currentPage})
        if (found.length > 0) { return group }
      })
    }
  }, 500)
  let openModal = function (event) {
    event.preventDefault()
    props.setModalOpenStatus(true)
   }
  let closeModal = function () {
    props.setModalOpenStatus(false)
  }
  let closeConfirmationModal = function (event) {
    event.preventDefault()
    props.setConfirmationModalOpenStatus(false)
  }
  let createComponent = function (event) {
    event.preventDefault()
    // messageBlock = addComponentMessageResponse('')
    let payload = {
      'component_type': {
        'id': props.componentDetail.resources[0].id
      },
      'name': NameInputBox.value,
      'description': DescriptionBox.value
    }
    props.addComponentComponent(payload)
    props.setAddRedirectFlag(false)
    props.setConfirmationModalOpenStatus(false)
    props.setModalOpenStatus(false)
  }
  return (
    <div>
      <div className='m-alert m-alert--icon m-alert--air m-alert--square alert alert-dismissible m--margin-bottom-30' role='alert'>
        <div className='m-alert__icon'>
          <img className={styles.iconcenter} src={ComponentTypeIcon.href} alt={ComponentName} />
        </div>
        <div className='m-alert__text'>
          { ComponentDescription }
        </div>
        <div className='pull-right' style={{'margin': '13px'}}>
          <button type='button' onClick={openDiscussionModal} className='btn btn-outline-info btn-sm m-btn m-btn--custom'> Add Discussion </button>
        </div>
      </div>
      <div className={styles.borderline}>
        <div className={'row'}>
          <div>
            {/* <img className={styles.iconcenter} src={ComponentTypeIcon.href} alt={ComponentName} /> */}
            <span className='row col-sm-12 col-md-12'>
              {/* <p>{ ComponentDescription }</p> */}
              <div>
                <Modal isOpen={props.modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles} >
                  {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
                  <div className={styles.modalwidth}>
                    <div className='modal-dialog'>
                      <div className='modal-content'>
                        <div className='modal-header'>
                          <h4 className='modal-title' id='exampleModalLabel'>New { ComponentName }</h4>
                          <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>×</span>
                          </button>
                        </div>
                        <div className='modal-body'>
                          <form>
                            {/* {messageBlock} */}
                            <div className='form-group'>
                              <label htmlFor='component-name' className='form-control-label'>Name:</label>
                              <input type='text' className='form-control' ref={input => (NameInputBox = input)} id='component-name' autoComplete='off' required />
                            </div>
                            <div className='form-group'>
                              <label htmlFor='description-text' className='form-control-label'>Description:</label>
                              <textarea className='form-control'ref={textarea => (DescriptionBox = textarea)} defaultValue={''} autoComplete='off' required />
                            </div>
                          </form>
                        </div>
                        <div className='modal-footer'>
                          {/* <button type='button' className='btn btn-primary'>Save changes</button> */}
                          <button type='button' onClick={createComponent} id='m_login_signup' className={styles.buttonbg}>Add { ComponentName }</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
                <Modal isOpen={props.successmodalIsOpen}
                  style={customStyles} >
                  {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
                  <div className={styles.modalwidth}>
                    <div className='modal-dialog'>
                      <div className='modal-content'>
                        <div className='modal-header'>
                          <h4 className='modal-title' id='exampleModalLabel'>Confirmation</h4>
                          {/* <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>×</span>
                          </button> */}
                        </div>
                        <div className='modal-body'>
                          <h5 className={styles.confirmsg}>New Application created successfully</h5>
                        </div>
                        <div className='modal-footer'>
                          {/* <button type='button' className='btn btn-primary'>Save changes</button> */}
                          <button type='button' onClick={closeConfirmationModal} id='m_login_signup' className={styles.buttonbg}>Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            </span>
          </div>
        </div>
        <div className='row clearfix'>
          <div className='col-sm-12 col-md-4'>
            <div className='row'>
              <div className='col-sm-12 col-md-9 m--align-left'>
                <div className='m-input-icon m-input-icon--left'>
                  <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onKeyUp={handleInputChange} />
                  <span className='m-input-icon__icon m-input-icon__icon--left'>
                    <span>
                      <i className='la la-search' />
                    </span>
                  </span>
                </div>
              </div>
              <div className='col-sm-12 col-md-2 m--align-right'>
                <a href='javascript:void(0);' onClick={openModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                  <i className='fa flaticon-add-circular-button' />
                </a>
                {/* <button onClick={openModal} className={'flaticon-add-circular-button'} /> */}
              </div>
            </div><br />
            {/* <div className={styles.containersearch}>
              <span className={styles.icon}><i className='fa fa-search' /></span>
              <input type='search' id='search' placeholder='Search...' className={styles.round} ref={input => (searchTextBox = input)} onChange={handleInputChange} />
            </div> */}
            <div className='col-sm-12 col-md-12'>
              <div className='m_datatable' id='scrolling_vertical'>
                <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{ 'display': 'block', 'min-height': '500px', 'max-height': '550px' }}>
                  <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '80vh'}}>
                    <table className='table table-striped- table-bordered table-hover table-checkable dataTable no-footer' >
                      <thead className='m-datatable__head'>
                        <tr className='m-datatable__row' style={{ 'left': '0px;' }}>
                          {/* <th data-field='RecordID' className='m-datatable__cell m-datatable__cell--check'>
                            <span style={{width: 40}}><label htmlFor='m-checkbox m-checkbox--single m-checkbox--all m-checkbox--solid m-checkbox--brand'>
                              <input type='checkbox' /><span /></label></span></th> */}
                          <th className='m-datatable__cell m-datatable__cell--sort'>Name</th>
                          <th className='m-datatable__cell m-datatable__cell--sort'>Description</th>
                        </tr>
                      </thead>
                      <tbody className='m-datatable__body ps ps--active-y ps--scrolling-y' id='style-1'>
                        { componentComponentsList }
                        {/* <div className='ps__rail-x' >
                          <div className='ps__thumb-x' style={{ 'left': '0px', 'width': '0px' }} />
                        </div>
                        <div className='ps__rail-y' style={{'top': '0px', 'height': '495px', 'right': '0'}}><div className='ps__thumb-y' style={{ 'top': '0px', 'height': '216px' }} /></div> */}
                      </tbody>
                    </table>
                  </div>
                  <br />
                  <div className='row' style={{ 'textAlign': 'center' }}>
                    <div className='col-sm-12 col-md-6'>
                      <div className='dataTables_length' id='m_table_1_length'>
                        <label className='col-5' htmlFor='page_no' >Show </label>
                        <select value={props.perPage} onBlur={handleBlurChange} onChange={handleChange} name='m_table_1_length' aria-controls='m_table_1' className='col-4 custom-select custom-select-sm form-control form-control-sm'>
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select><label className='col-3' htmlFor='page_no' >entries</label>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-12 col-md-6' />
                  <div className='m-datatable__pager m-datatable--paging-loaded pull-left' style={{ 'textAlign': 'center' }}>
                    <ul className='m-datatable__pager-nav'>
                      {/* <li><a href='' title='First' className='m-datatable__pager-link m-datatable__pager-link--first' data-page={1}><i className='la la-angle-double-left' /></a></li> */}
                      <li><a href='' title='Previous' className={'m-datatable__pager-link m-datatable__pager-link--prev ' + previousClass} onClick={handlePrevious} data-page='4'><i className='la la-angle-left' /></a></li>
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
                      {/* <li><a href='' title='Last' className='m-datatable__pager-link m-datatable__pager-link--last' data-page={18}><i className='la la-angle-double-right' /></a></li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='row col-sm-12 col-md-12 m--align-center'>
              <div className=''>
                <div className={styles.pagination}>
                  <a href='' className={previousClass} onClick={handlePrevious}>Previous</a> Page {currentPage} of {totalNoPages} <a href='' className={nextClass} onClick={handleNext}>Next</a>
                </div>
              </div>
            </div> */}
          </div>
          <div className='col-sm-8 col-md-8'>
            <h4>{ ComponentName } Model Usage Summary</h4>
            {/* <div id='m_table_1_filter' className='dataTables_filter'><label>Search:<input type='search' className='form-control form-control-sm' placeholder='' aria-controls='m_table_1'></label></div> */}
            <div className='row'>
              <div id='divPaperWrapper' style={divStyle}>
                <ApplicationModelComponent {...props} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Discussion name={ComponentName} type='ComponentType' {...props} />
      <NewDiscussion contextId={props.match.params.id} name={ComponentName} type='ComponentType' {...props} />
      {/* <Route exact path={`/components/:componentTypeId/:componentTypeComponentId`} component={componentTypeComponentPageRoute} /> */}
    </div>
  )
}

ApplicationDetail.propTypes = {
  match: PropTypes.any,
  componentDetail: PropTypes.any,
  componentComponents: PropTypes.any,
  modalIsOpen: PropTypes.any,
  successmodalIsOpen: PropTypes.any,
  currentPage: PropTypes.any,
  perPage: PropTypes.any
}
