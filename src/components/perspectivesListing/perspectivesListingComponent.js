import React from 'react'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import Select from 'react-select'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import styles from './perspectivesListingComponent.scss'
// ReactModal.setAppElement('#root')

export default function PerspectivesList (props) {
  console.log('props', props.crude, props.perspectivesListing, props.selectedComponentType, props.setPerspectivesActionSettings, props.isCrudSelected)
  console.log(props.crudeSettings)
  // console.log(props.createRolesResponse, props.createRoles)
  // console.log(props.deleteRoleResponse, props.deleteRole)
  let searchTextBox
  let perspectivesList = ''
  let totalNoPages
  let perPage = props.perPage
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let componentTypesOptions = []
  let connectionTypesOptions = []
  let totalPerspectives
  let createCrud
  let newPerspectiveName
  let newPerspectiveDescription
  // let selectedCrud = []
  console.log(createCrud)
  console.log(nextClass, previousClass)

//   let createRole = function (event) {
//     event.preventDefault()
//     let payload = {
//       'name': newRoleName.value
//       }
//     props.createRoles(payload)
//     let rolesActionSettings = {...props.rolesActionSettings, 'isAddModalOpen': false}
//     props.setRolesActionSettings(rolesActionSettings)
//   }
if (props.componentTypes && props.componentTypes !== '') {
  componentTypesOptions = props.componentTypes.resources.map(function (data, index) {
   data.label = data.name
   data.type = 'NEW'
   return data
  })
}
if (props.connectionTypes && props.connectionTypes !== '') {
  connectionTypesOptions = props.connectionTypes.resources.map(function (data, index) {
   data.label = data.name
   data.type = 'NEW'
   return data
  })
}
let onRadioChange = function (value) {
  let isTypesSelected = value
  console.log(value)
  props.setTypesFlag(isTypesSelected)
}

let handleCrudCheck = function (event, type) {
  console.log('event cancel', event.target)
  let isCrudSelected = {...props.isCrudSelected}
  let crude = {...props.crude}
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
  props.setCrudeValues(crude)
  console.log(crude)
  console.log(isCrudSelected)
}

let addPerspective = function () {
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
    'name': newPerspectiveName.value,
    'description': newPerspectiveDescription.value,
    'component_type': {
      'id': props.selectedComponentType.id
    },
    'connection_type': {
      'id': props.selectedConnectionType.id
    },
    'crude': sum
  }
  props.createPerspective(payload)
  closeAddPerspectivesModal()
 }
  // console.log('props', props.setModalOpenStatus)
  let handleBlurdropdownChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handledropdownChange = function (event) {
    console.log('handle change', event.target.value, typeof event.target.value)
    props.setPerPage(parseInt(event.target.value))
  }

  if (props.perspectivesListing && props.perspectivesListing !== '') {
    perspectivesList = props.perspectivesListing.resources.map(function (data, index) {
      return (
        <tr key={index}>
          <td>{data.name}</td>
          <td>{data.description}</td>
          <td>{data.component_type.name}</td>
          <td>
            <div className='m-btn-group m-btn-group--pill btn-group' role='group' aria-label='First group'>
              <button type='button' className='m-btn btn btn-info' onClick={(event) => { event.preventDefault(); openEditPerspectivesModal() }}><i className='fa flaticon-edit-1' /></button>
              <button type='button' className='m-btn btn btn-danger' onClick={(event) => { event.preventDefault(); openDeletePerspectivesModal() }}><i className='fa flaticon-delete-1' /></button>
            </div>
          </td>
        </tr>
      )
    })

    totalPerspectives = props.perspectivesListing.total_count
    totalNoPages = Math.ceil(totalPerspectives / perPage)

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
      props.fetchPerspectivesListing(payload)
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
      props.fetchPerspectivesListing(payload)
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
      props.fetchPerspectivesListing(payload)
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
    props.fetchPerspectivesListing(payload)
    // eslint-disable-next-line
    mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.setCurrentPage(page)

    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }
let openAddPerspectivesModal = function () {
  let perspectivesActionSettings = {...props.perspectivesActionSettings, 'isAddPerspectivesModalOpen': true}
  props.setPerspectivesActionSettings(perspectivesActionSettings)
}
let openDeletePerspectivesModal = function () {
  let perspectivesActionSettings = {...props.perspectivesActionSettings, 'isDeletePerspectivesModalOpen': true}
  props.setPerspectivesActionSettings(perspectivesActionSettings)
}
let openEditPerspectivesModal = function () {
  let perspectivesActionSettings = {...props.perspectivesActionSettings, 'isEditPerspectivesModalOpen': true}
  props.setPerspectivesActionSettings(perspectivesActionSettings)
}
let closeAddPerspectivesModal = function () {
  let perspectivesActionSettings = {...props.perspectivesActionSettings, 'isAddPerspectivesModalOpen': false}
  props.setPerspectivesActionSettings(perspectivesActionSettings)
}
let closeDeletePerspectivesModal = function () {
  let perspectivesActionSettings = {...props.perspectivesActionSettings, 'isDeletePerspectivesModalOpen': false}
  props.setPerspectivesActionSettings(perspectivesActionSettings)
}
let closeEditPerspectivesModal = function () {
  let perspectivesActionSettings = {...props.perspectivesActionSettings, 'isEditPerspectivesModalOpen': false}
  props.setPerspectivesActionSettings(perspectivesActionSettings)
}
let handleComponentTypeSelect = function (newValue: any, actionMeta: any) {
  console.log('cat select', newValue)
  if (actionMeta.action === 'select-option') {
    let selectedComponentType = newValue
    props.setSelectedComponentTypes(selectedComponentType)
  }
  if (actionMeta.action === 'clear') {
    let selectedComponentType = null
    props.setSelectedComponentTypes(selectedComponentType)
  }
}
let handleConnectionTypeSelect = function (newValue: any, actionMeta: any) {
  console.log('cat select', newValue)
  if (actionMeta.action === 'select-option') {
    let selectedConnectionType = newValue
    props.setSelectedConnectionTypes(selectedConnectionType)
  }
  if (actionMeta.action === 'clear') {
    let selectedConnectionType = null
    props.setSelectedConnectionTypes(selectedConnectionType)
  }
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
                          <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Add Project' onClick={(e) => { e.preventDefault(); openAddPerspectivesModal() }} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
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
                            <th className='' style={{width: '180.25px'}}><h5>Element Type</h5></th>
                            <th className='' style={{width: '21.25px'}}><h5>Action</h5></th>
                          </tr>
                        </thead>
                        <tbody>
                          {perspectivesList}
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
      <ReactModal isOpen={props.perspectivesActionSettings.isAddPerspectivesModalOpen}
        onRequestClose={closeAddPerspectivesModal}
        className='modal-dialog modal-lg'
        style={{'content': {'top': '20%'}}}
        >
        <div className={''}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Add Perspective</h4>
                <button type='button' onClick={closeAddPerspectivesModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='col-md-12'>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-input' className='col-3 col-form-label'>Name</label>
                    <div className='col-8'>
                      <input className='form-control m-input' placeholder='Enter Name' ref={input => (newPerspectiveName = input)} id='example-email-input' autoComplete='off' />
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-input' className='col-3 col-form-label'>Description</label>
                    <div className='col-8'>
                      <textarea className='form-control m-input' ref={input => (newPerspectiveDescription = input)} placeholder='Enter Description' />
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-3 col-form-label'>Select</label>
                    <div className='col-9 float-right col-form-label'>
                      <div className='m-radio-inline'>
                        <label htmlFor='example-email-input' className=''>
                          <input type='radio' name='example_8' value='ComponentType' checked={props.isTypesSelected === 'ComponentType'} onChange={(e) => onRadioChange('ComponentType')} /><span style={{'marginLeft': '10px'}}>Component Type</span>
                          <span />
                        </label>&nbsp;
                        <label htmlFor='example-email-input' className=''>
                          <input type='radio' name='example_8' value='ConnectionType' checked={props.isTypesSelected === 'ConnectionType'} onChange={(e) => onRadioChange('ConnectionType')} /><span style={{'marginLeft': '10px'}}>Connection Type</span>
                          <span />
                        </label>
                      </div>
                    </div>
                  </div>
                  {props.isTypesSelected === 'ComponentType' && (<div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-3 col-form-label'>Component Type</label>
                    <div className='col-8'>
                      <Select
                        // className='col-7 input-sm m-input'
                        placeholder='Select Type'
                        isClearable
                        defaultValue={props.selectedComponentType}
                        onChange={handleComponentTypeSelect}
                        isSearchable={false}
                        name={''}
                        options={componentTypesOptions}
                      />
                    </div>
                  </div>)}
                  {props.isTypesSelected === 'ConnectionType' && (<div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-3 col-form-label'>Connection Type</label>
                    <div className='col-8'>
                      <Select
                        // className='col-7 input-sm m-input'
                        placeholder='Select Type'
                        isClearable
                        defaultValue={props.selectedConnectionType}
                        onChange={handleConnectionTypeSelect}
                        isSearchable={false}
                        name={''}
                        options={connectionTypesOptions}
                      />
                    </div>
                  </div>)}
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
                <button type='button' onClick={closeAddPerspectivesModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                <button className='btn btn-outline-info btn-sm' onClick={addPerspective} >Add Perspectives</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
      <ReactModal isOpen={props.perspectivesActionSettings.isDeletePerspectivesModalOpen}
        onRequestClose={closeDeletePerspectivesModal}
        className='modal-dialog'
        style={{'content': {'top': '20%'}}}
        >
        <div className={''}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Delete Perspectives</h4>
                <button type='button' onClick={closeDeletePerspectivesModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <p>Are you sure?</p>
                {/* <p>{props.rolesActionSettings.deleteRoleData.name} </p> */}
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={closeDeletePerspectivesModal} id='m_login_signup' className={'btn btn-sm btn-outline-info'}>Cancel</button>
                <button type='button' className={'btn btn-sm btn-outline-info'} onClick={''}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
      <ReactModal isOpen={props.perspectivesActionSettings.isEditPerspectivesModalOpen}
        onRequestClose={closeEditPerspectivesModal}
        className='modal-dialog modal-lg'
        style={{'content': {'top': '20%'}}}
        >
        <div className={''}>
          <div className=''>
            <div className='modal-content' style={{'height': '400px'}}>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Edit Perspective</h4>
                <button type='button' onClick={closeEditPerspectivesModal} className='close' data-dismiss='modal' aria-label='Close'>
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
                <button type='button' onClick={closeEditPerspectivesModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                <button className='btn btn-outline-info btn-sm' onClick={''} >Add Perspectives</button>
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
  PerspectivesList.propTypes = {
    setPerspectivesActionSettings: PropTypes.func,
    perspectivesActionSettings: PropTypes.any,
    perspectivesListing: PropTypes.any,
    currentPage: PropTypes.any,
    perPage: PropTypes.any,
    componentTypes: PropTypes.any,
    connectionTypes: PropTypes.any,
    isTypesSelected: PropTypes.any,
    selectedComponentType: PropTypes.any,
    selectedConnectionType: PropTypes.any,
    crudeSettings: PropTypes.any,
    crude: PropTypes.any,
    isCrudSelected: PropTypes.any
    // roles: PropTypes.any,

  }
