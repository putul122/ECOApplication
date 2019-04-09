import React from 'react'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import styles from './rolesComponent.scss'
ReactModal.setAppElement('#root')

export default function Roles (props) {
  // console.log('roles props', props.roles)
  // console.log(props.setRolesActionSettings)
  // console.log(props.createRolesResponse, props.createRoles)
  // console.log(props.deleteRoleResponse, props.deleteRole)
  let searchTextBox
  let rolesList = ''
  let totalNoPages
  let perPage = props.perPage
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let totalRoles
  let newRoleName

  let createRole = function (event) {
    event.preventDefault()
    let payload = {
      'name': newRoleName.value
      }
    props.createRoles(payload)
    let rolesActionSettings = {...props.rolesActionSettings, 'isAddModalOpen': false}
    props.setRolesActionSettings(rolesActionSettings)
  }

  // console.log('props', props.setModalOpenStatus)
  let handleBlurdropdownChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handledropdownChange = function (event) {
    console.log('handle change', event.target.value, typeof event.target.value)
    props.setPerPage(parseInt(event.target.value))
  }

  if (props.roles && props.roles !== '') {
    rolesList = props.roles.resources.map(function (data, index) {
      return (
        <tr key={index}>
          <td>{data.name}</td>
          <td>
            <a href={'/edit-roles/' + data.id}><button className='btn btn-outline-info btn-sm'>Edit</button>&nbsp;</a>
            <button type='button' className='btn btn-outline-danger btn-sm' onClick={(event) => { event.preventDefault(); deleteRoleModal(data) }}>Delete</button>
          </td>
        </tr>
      )
    })

    totalRoles = props.roles.total_count
    totalNoPages = Math.ceil(totalRoles / perPage)

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

  let handleInputChange = debounce((e) => {
    console.log(e)
    const value = searchTextBox.value
    // entitlementsList = ''
    let payload = {
      'search': value || '',
      'page_size': props.perPage,
      'page': currentPage
    }
    // if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
      props.fetchRoles(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // props.setComponentTypeLoading(true)
    // }
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
  }, 500)
  let handlePrevious = function (event) {
    event.preventDefault()
    if (currentPage === 1) {
      previousClass = styles.disabled
    } else {
      let payload = {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': props.perPage,
        'page': currentPage - 1
      }
      props.fetchRoles(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
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
      nextClass = styles.disabled
    } else {
      let payload = {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': props.perPage,
        'page': currentPage + 1
      }
      // entitlementsList = ''
      props.fetchRoles(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
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
    // entitlementsList = ''
    let payload = {
      'search': searchTextBox.value ? searchTextBox.value : '',
      'page_size': props.perPage,
      'page': page
    }
    props.fetchRoles(payload)
    // eslint-disable-next-line
    mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.setCurrentPage(page)

    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }
let addRole = function () {
  let rolesActionSettings = {...props.rolesActionSettings, 'isAddModalOpen': true}
  props.setRolesActionSettings(rolesActionSettings)
}
let deleteRoleModal = function (data) {
  console.log('abc', data)
  let rolesActionSettings = {...props.rolesActionSettings, 'isDeleteModalOpen': true, 'deleteRoleData': data}
  props.setRolesActionSettings(rolesActionSettings)
}
let deleteTheRole = function () {
   // eslint-disable-next-line
   mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  let payload = {}
  payload.role_id = props.rolesActionSettings.deleteRoleData.id
  console.log(payload)
  props.deleteRole(payload)
  closeDeleteModal()
}
let closeDeleteModal = function () {
  let rolesActionSettings = {...props.rolesActionSettings, 'isDeleteModalOpen': false}
  props.setRolesActionSettings(rolesActionSettings)
}
let closeModal = function () {
  let rolesActionSettings = {...props.rolesActionSettings, 'isAddModalOpen': false}
  props.setRolesActionSettings(rolesActionSettings)
}
return (
  <div>
    <div id='entitlementList'>
      {/* The table structure begins */}
      <div className='row'>
        <div className='col-md-12'>
          <div className='m_datatable' id='scrolling_vertical'>
            <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
              <div>
                <div className='m-portlet'>
                  <div className='m-portlet__body'>
                    <div className='row'>
                      <div className='col-md-10' />
                      <div className='col-md-2 float-right'>
                        <button type='button' onClick={addRole} className='btn btn-outline-info btn-sm' style={{'float': 'right'}}>Add role</button>&nbsp;
                      </div>
                    </div>
                    <br />
                    <div id='m_table_1_wrapper' className='dataTables_wrapper dt-bootstrap4'>
                      <div className='row' style={{'marginBottom': '20px'}}>
                        <div className='col-sm-12 col-md-6'>
                          <div className='dataTables_length' id='m_table_1_length' style={{'display': 'flex'}}>
                            <h5 style={{'margin': '8px'}}>Show</h5>
                            <select value={props.perPage} name='m_table_1_length' onBlur={handleBlurdropdownChange} onChange={handledropdownChange} aria-controls='m_table_1' className='custom-select custom-select-sm form-control form-control-sm' style={{'height': '40px'}}>
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                            </select>
                            <h5 style={{'margin': '8px'}}>Entries</h5>
                            {/* </label> */}
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div className='dataTables_length pull-right' id='m_table_1_length' style={{'display': 'flex'}}>
                            <div style={{'display': 'flex'}}>
                              <h5 style={{'margin': '10px'}}>Search</h5>
                              <div className='m-input-icon m-input-icon--left'>
                                <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onKeyUp={handleInputChange} />
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
                    </div>
                    <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '100vh'}}>
                      <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                        <thead>
                          <tr role='row'>
                            <th className='' style={{width: '180.25px'}}><h5>Role Name</h5></th>
                            <th className='' style={{width: '21.25px'}}><h5>Action</h5></th>
                          </tr>
                        </thead>
                        <tbody>
                          {rolesList}
                        </tbody>
                      </table>
                    </div>
                    <div className='row'>
                      <div className='col-md-12' id='scrolling_vertical'>
                        <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll pull-right' id='scrolling_vertical' style={{}}>
                          <div className='m-datatable__pager m-datatable--paging-loaded clearfix'>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <ReactModal isOpen={props.rolesActionSettings.isAddModalOpen}
        onRequestClose={closeModal}
        className='modal-dialog modal-lg'
        style={{'content': {'top': '20%'}}}
        >
        {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
        <div className={''}>
          <div className=''>
            <div className='modal-content' style={{'height': '400px'}}>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Add Role</h4>
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body' style={{'height': 'calc(60vh - 55px)', 'overflow': 'auto'}}>
                <div className='col-md-12'>
                  {/* {messageBlock} */}
                  <div className='form-group m-form__group row'>
                    <div className='col-8'>
                      {/* <input className='form-control m-input' type='email' placeholder='Enter User Name' ref={input => (userName = input)} id='example-userName-input' /> */}
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-input' className='col-2 col-form-label'>Name</label>
                    <div className='col-8'>
                      <input className='form-control m-input' ref={input => (newRoleName = input)} placeholder='Enter Name' id='example-email-input' autoComplete='off' />
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-input' className='col-2 col-form-label'>Description</label>
                    <div className='col-8'>
                      <textarea className='form-control m-input' placeholder='Enter Description' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={closeModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                <button className='btn btn-outline-info btn-sm' onClick={createRole} >Add Role</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
      <ReactModal isOpen={props.rolesActionSettings.isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        className='modal-dialog'
        style={{'content': {'top': '20%'}}}
        >
        <div className={''}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                <h6 className='modal-title' id='exampleModalLabel'>Delete Role</h6>
                <button type='button' onClick={closeDeleteModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <p>Are you sure?</p>
                <p>{props.rolesActionSettings.deleteRoleData.name} </p>
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={closeDeleteModal} id='m_login_signup' className={'btn btn-sm btn-outline-info'}>Cancel</button>
                <button type='button' className={'btn btn-sm btn-outline-info'} onClick={deleteTheRole}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
    {/* <Discussion name={'Entitlements'} TypeKey='Entitlement' type='ComponentType' {...props} />
    <NewDiscussion contextId={contextId} name={'Entitlements'} type='ComponentType' {...props} /> */}
  </div>
      )
  }
  Roles.propTypes = {
    rolesActionSettings: PropTypes.any,
    roles: PropTypes.any,
    currentPage: PropTypes.any,
    perPage: PropTypes.any
  }
