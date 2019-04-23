import React from 'react'
import _ from 'lodash'
import debounce from 'lodash/debounce'
// import Select from 'react-select'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import styles from './packagesComponent.scss'
// ReactModal.setAppElement('#root')

export default function PackageList (props) {
  console.log(props.crude, props.isCrudSelected)
  console.log(props.setPackagesActionSettings)
  // console.log(props.createRolesResponse, props.createRoles)
  // console.log(props.deleteRoleResponse, props.deleteRole)
  let searchTextBox
  let packageList = ''
  let totalNoPages
  let perPage = props.perPage
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let totalPackages
  let createCrud
  let newPackageName
  let newPackageDescription
  let newPackageKey
  console.log(createCrud)
  console.log(nextClass, previousClass)

let handleCrudCheck = function (event, type) {
  console.log('event cancel', event.target)
  let isCrudSelected = {...props.isCrudSelected}
  console.log('before check', isCrudSelected)
  if (type === 'Create') {
    isCrudSelected.Create = event.target.checked
  } else if (type === 'Update') {
    isCrudSelected.Update = event.target.checked
  } else if (type === 'Delete') {
    isCrudSelected.Delete = event.target.checked
  } else if (type === 'Read') {
    isCrudSelected.Read = event.target.checked
  }
  props.setCrudeValuesflag(isCrudSelected)
  console.log(isCrudSelected)
}

// let deletePackage = function () {
// }

let addPackage = function () {
  let isCrudSelected = {...props.isCrudSelected}
  console.log(isCrudSelected)
  let crudelist = []
  for (let x in isCrudSelected) {
    if (isCrudSelected.hasOwnProperty(x)) {
      if (isCrudSelected[x]) {
        crudelist.push(x)
      }
    }
  }
  let sum = 0
  console.log('****', crudelist)
  if (crudelist.length > 0) {
    console.log(crudelist)
    crudelist.forEach(function (value) {
      console.log(value)
      sum = sum + props.crude[value]
      console.log(sum)
    })
  }
  let payload = {
    'name': newPackageName.value,
    'description': newPackageDescription.value,
    'key': newPackageKey.value,
    'crude': sum
  }
  props.createPackage(payload)
  closeAddPackagesModal()
 }
  // console.log('props', props.setModalOpenStatus)
  let handleBlurdropdownChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handledropdownChange = function (event) {
    console.log('handle change', event.target.value, typeof event.target.value)
    props.setPerPage(parseInt(event.target.value))
  }

  if (props.packagesListing && props.packagesListing !== '') {
    packageList = props.packagesListing.resources.map(function (data, index) {
      return (
        <tr key={index}>
          <td>{data.name}</td>
          <td>{data.description}</td>
          <td>
            <div className='m-btn-group m-btn-group--pill btn-group' role='group' aria-label='First group'>
              <button type='button' className='m-btn btn btn-info' onClick={(event) => { event.preventDefault(); openEditPackagesModal() }}><i className='fa flaticon-edit-1' /></button>
              <button type='button' className='m-btn btn btn-danger' onClick={(event) => { event.preventDefault(); openDeletePackagesModal() }}><i className='fa flaticon-delete-1' /></button>
            </div>
          </td>
        </tr>
      )
    })

    totalPackages = props.packagesListing.count
    totalNoPages = Math.ceil(totalPackages / perPage)

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
    console.log(listPage)
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
      props.fetchPackagesListing(payload)
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
      props.fetchPackagesListing(payload)
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
      props.fetchPackagesListing(payload)
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
    props.fetchPackagesListing(payload)
    // eslint-disable-next-line
    mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.setCurrentPage(page)

    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }
let openAddPackagesModal = function () {
  let packagesActionSettings = {...props.packagesActionSettings, 'isAddPackagesModalOpen': true}
  props.setPackagesActionSettings(packagesActionSettings)
}
let openDeletePackagesModal = function () {
  let packagesActionSettings = {...props.packagesActionSettings, 'isDeletePackagesModalOpen': true}
  props.setPackagesActionSettings(packagesActionSettings)
}
let openEditPackagesModal = function () {
  let packagesActionSettings = {...props.packagesActionSettings, 'isEditPackagesModalOpen': true}
  props.setPackagesActionSettings(packagesActionSettings)
}
let closeAddPackagesModal = function () {
  let packagesActionSettings = {...props.packagesActionSettings, 'isAddPackagesModalOpen': false}
  props.setPackagesActionSettings(packagesActionSettings)
}
let closeDeletePackagesModal = function () {
  let packagesActionSettings = {...props.packagesActionSettings, 'isDeletePackagesModalOpen': false}
  props.setPackagesActionSettings(packagesActionSettings)
}
let closeEditPackagesModal = function () {
  let packagesActionSettings = {...props.packagesActionSettings, 'isEditPackagesModalOpen': false}
  props.setPackagesActionSettings(packagesActionSettings)
}

// let deleteRoleModal = function (data) {
//   console.log('abc', data)
//   let rolesActionSettings = {...props.rolesActionSettings, 'isDeleteModalOpen': true, 'deleteRoleData': data}
//   props.setRolesActionSettings(rolesActionSettings)
// }
// let deleteTheRole = function () {
//    // eslint-disable-next-line
//    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
//   let payload = {}
//   payload.role_id = props.rolesActionSettings.deleteRoleData.id
//   console.log(payload)
//   props.deleteRole(payload)
//   closeDeleteModal()
// }
// let closeDeleteModal = function () {
//   let rolesActionSettings = {...props.rolesActionSettings, 'isDeleteModalOpen': false}
//   props.setRolesActionSettings(rolesActionSettings)
// }
// let closeModal = function () {
//   let rolesActionSettings = {...props.rolesActionSettings, 'isAddModalOpen': false}
//   props.setRolesActionSettings(rolesActionSettings)
// }
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
                        <span className='pull-right'>
                          <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Add Package' onClick={(e) => { e.preventDefault(); openAddPackagesModal() }} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                            <i className='fa flaticon-plus fa-2x' />
                          </a>&nbsp;&nbsp;
                        </span>
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
                            <th className='' style={{width: '180.25px'}}><h5>Name</h5></th>
                            <th className='' style={{width: '180.25px'}}><h5>Description</h5></th>
                            <th className='' style={{width: '21.25px'}}><h5>Action</h5></th>
                          </tr>
                        </thead>
                        <tbody>
                          {packageList}
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
      <ReactModal isOpen={props.packagesActionSettings.isAddPackagesModalOpen}
        onRequestClose={closeAddPackagesModal}
        className='modal-dialog modal-lg'
        style={{'content': {'top': '20%'}}}
        >
        <div className={''}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Add Package</h4>
                <button type='button' onClick={closeAddPackagesModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='col-md-12'>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-input' className='col-3 col-form-label'>Name</label>
                    <div className='col-8'>
                      <input className='form-control m-input' placeholder='Enter Name' ref={input => (newPackageName = input)} id='example-email-input' autoComplete='off' />
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-input' ref={input => (newPackageDescription = input)} className='col-3 col-form-label'>Description</label>
                    <div className='col-8'>
                      <textarea className='form-control m-input' placeholder='Enter Description' />
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-input' ref={input => (newPackageKey = input)} className='col-3 col-form-label'>Key</label>
                    <div className='col-8'>
                      <input className='form-control m-input' placeholder='Enter Name' id='example-email-input' autoComplete='off' />
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-3 col-form-label'>CRUDE</label>
                    <div className='col-9 float-right col-form-label'>
                      <div className='m-radio-inline'>
                        <label htmlFor='example-email-input' className=''>
                          <input type='checkbox' onChange={(event) => handleCrudCheck(event, 'Create')} /><span style={{'marginLeft': '10px'}}>Create</span>
                          <span />
                        </label>&nbsp;
                        <label htmlFor='example-email-input' className=''>
                          <input type='checkbox' onChange={(event) => handleCrudCheck(event, 'Update')} /><span style={{'marginLeft': '10px'}}>Update</span>
                          <span />
                        </label>
                        <label htmlFor='example-email-input' className=''>
                          <input type='checkbox' onChange={(event) => handleCrudCheck(event, 'Delete')} /><span style={{'marginLeft': '10px'}}>Delete</span>
                          <span />
                        </label>
                        <label htmlFor='example-email-input' className=''>
                          <input type='checkbox' onChange={(event) => handleCrudCheck(event, 'Read')} /><span style={{'marginLeft': '10px'}}>Read</span>
                          <span />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={closeAddPackagesModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                <button className='btn btn-outline-info btn-sm' onClick={addPackage} >Add Packages</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
      <ReactModal isOpen={props.packagesActionSettings.isDeletePackagesModalOpen}
        onRequestClose={closeDeletePackagesModal}
        className='modal-dialog'
        style={{'content': {'top': '20%'}}}
        >
        <div className={''}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Delete Package</h4>
                <button type='button' onClick={closeDeletePackagesModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <p>Are you sure?</p>
                {/* <p>{props.rolesActionSettings.deleteRoleData.name} </p> */}
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={closeDeletePackagesModal} id='m_login_signup' className={'btn btn-sm btn-outline-info'}>Cancel</button>
                <button type='button' className={'btn btn-sm btn-outline-info'} onClick={''}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
      <ReactModal isOpen={props.packagesActionSettings.isEditPackagesModalOpen}
        onRequestClose={closeEditPackagesModal}
        className='modal-dialog modal-lg'
        style={{'content': {'top': '20%'}}}
        >
        <div className={''}>
          <div className=''>
            <div className='modal-content' style={{'height': '400px'}}>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Edit Package</h4>
                <button type='button' onClick={closeEditPackagesModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body' style={{'height': 'calc(60vh - 55px)', 'overflow': 'auto'}}>
                <div className='col-md-12'>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-input' className='col-2 col-form-label'>Name</label>
                    <div className='col-8'>
                      <input className='form-control m-input' placeholder='Enter Name' id='example-email-input' autoComplete='off' />
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
                <button type='button' onClick={closeEditPackagesModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                <button className='btn btn-outline-info btn-sm' onClick={''} >Add Package</button>
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
  PackageList.propTypes = {
    setPackagesActionSettings: PropTypes.func,
    packagesActionSettings: PropTypes.any,
    packagesListing: PropTypes.any,
    currentPage: PropTypes.any,
    perPage: PropTypes.any,
    crude: PropTypes.any,
    isCrudSelected: PropTypes.any
  }
