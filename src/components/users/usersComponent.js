import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './usersComponent.scss'
// import moment from 'moment'
import Select from 'react-select'
import ReactModal from 'react-modal'
import debounce from 'lodash/debounce'
ReactModal.setAppElement('#root')

export default function Users (props) {
  let searchTextBox = ''
  let roleList = ''
  let listPage = []
  let currentPage = props.currentPage
  let totalUserPages = ''
  let perPage = props.perPage
  let paginationLimit = 6
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let userOptions = ''
  let userList = ''
  let activateClass = props.userActionSettings.activateButton ? '' : 'disabled ' + styles.pointerDisabled
  // let userCount = ''
  let roleOptions = []
  console.log('props', props.updatePayload, props)
  if (props.roles && props.roles !== '') {
    roleOptions = props.roles.resources.map(function (data, index) {
      console.log(data)
      data.label = data.name
      return data
    })
  }
  let handleBlurdropdownChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handledropdownChange = function (event) {
    console.log('handle change', event.target.value, typeof event.target.value)
    props.setPerPage(parseInt(event.target.value))
  }
  let editEmail = function (event) {
    let userActionSettings = JSON.parse(JSON.stringify(props.userActionSettings))
    userActionSettings.updateUserData.email = event.target.value
    props.setUserActionSettings(userActionSettings)
  }
  let editUsername = function (event) {
    let userActionSettings = JSON.parse(JSON.stringify(props.userActionSettings))
    let fullName = event.target.value
    let names = fullName.toString().split(' ')
    userActionSettings.updateUserData.first_name = names[0] || ''
    userActionSettings.updateUserData.last_name = names[1] || ''
    props.setUserActionSettings(userActionSettings)
  }
  let editPassword = function (event) {
    let userActionSettings = JSON.parse(JSON.stringify(props.userActionSettings))
    console.log('userActionSettings', userActionSettings)
    let password = event.target.value
    userActionSettings.activateButton = false
    userActionSettings.updateUserData.password = password
    if (password.length === 0) {
      userActionSettings.validPassword = true
      userActionSettings.updateUserData.confirm_password = ''
    }
    props.setUserActionSettings(userActionSettings)
  }
  let editConfPassword = function (event) {
    let userActionSettings = JSON.parse(JSON.stringify(props.userActionSettings))
    let confirmPassword = event.target.value
    let password = userActionSettings.updateUserData.password
    if (password === confirmPassword) {
      userActionSettings.validPassword = true
      if (password.trim().length > 0) {
        userActionSettings.activateButton = true
      }
    } else {
      userActionSettings.validPassword = false
      userActionSettings.activateButton = false
    }
    userActionSettings.updateUserData.confirm_password = confirmPassword
    props.setUserActionSettings(userActionSettings)
  }
  let openUpdateModal = function (data) {
    let userRoles = JSON.parse(JSON.stringify(data.roles))
    props.setRoleData(userRoles)
    let userActionSettings = {...props.userActionSettings, 'isUpdateModalOpen': true, 'updateUserData': data}
    props.setUserActionSettings(userActionSettings)
  }
  let closeUpdateModal = function () {
    props.setUpdatePayload([])
    let userActionSettings = {...props.userActionSettings, 'isUpdateModalOpen': false, 'updateUserData': ''}
    props.setUserActionSettings(userActionSettings)
  }
  let updateUser = function () {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let payload = {}
    payload.data = []
    payload.userId = props.userActionSettings.updateUserData.id
    payload.data = props.updatePayload
    console.log('update payload', props.updatePayload)
    props.updateUser(payload)
  }
  let activateUser = function () {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let payload = {}
    payload.client_id = props.client_id
    payload.client_secret = props.client_secret
    payload.email = props.userActionSettings.userData.email
    payload.password = props.userActionSettings.updateUserData.password
    props.addUser(payload)
  }
  let openActivateModal = function (data) {
    let userActionSettings = {...props.userActionSettings, 'isActivateModalOpen': true, 'userData': data}
    props.setUserActionSettings(userActionSettings)
  }
  let closeActivateModal = function () {
    let userActionSettings = {...props.userActionSettings, 'isActivateModalOpen': false, 'userData': '', 'updateUserData': {}, 'validPassword': true, 'activateButton': false}
    props.setUserActionSettings(userActionSettings)
  }
  let openDeActivateModal = function (data) {
    let userActionSettings = {...props.userActionSettings, 'isDeActivateModalOpen': true, 'userData': data}
    props.setUserActionSettings(userActionSettings)
  }
  let closeDeActivateModal = function () {
    let userActionSettings = {...props.userActionSettings, 'isDeActivateModalOpen': false, 'userData': ''}
    props.setUserActionSettings(userActionSettings)
  }
  let deActivateUser = function () {
    let payload = {}
    payload.user_id = props.userActionSettings.userData.id
    console.log(payload)
    props.deleteUser(payload)
  }
  let openAddUserModal = function () {
    props.setRoleData([])
    let userActionSettings = {...props.userActionSettings, isAddModalOpen: true}
    props.setUserActionSettings(userActionSettings)
  }
  let closeModal = function () {
    let userActionSettings = {...props.userActionSettings, isAddModalOpen: false}
    props.setUserActionSettings(userActionSettings)
  }
  let handleUserSelect = function (newValue: any, actionMeta: any) {
    console.group('Value Changed first select')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
    if (actionMeta.action === 'select-option') {
      // email = newValue.email
      let userActionSettings = {...props.userActionSettings, 'selectedUser': newValue, 'selectedEmail': newValue.email}
      props.setUserActionSettings(userActionSettings)
    }
    if (actionMeta.action === 'clear') {
      let userActionSettings = {...props.userActionSettings, 'selectedUser': null, 'selectedEmail': ''}
      props.setUserActionSettings(userActionSettings)
    }
  }
  let handleRoleSelect = function (newValue: any, actionMeta: any) {
    console.group('Value Changed first select')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
    if (actionMeta.action === 'select-option') {
      // email = newValue.email
      let userActionSettings = {...props.userActionSettings, 'selectedRole': newValue}
      props.setUserActionSettings(userActionSettings)
    }
    if (actionMeta.action === 'clear') {
      let userActionSettings = {...props.userActionSettings, 'selectedRole': null}
      props.setUserActionSettings(userActionSettings)
    }
  }
  let addUser = function () {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let payload = {}
    payload.client_id = props.client_id
    payload.client_secret = props.client_secret
    let externalUser = props.userActionSettings.selectedUser
    delete externalUser.value
    delete externalUser.label
    payload.external_user = externalUser
    payload.roles = props.userRoles
    console.log('add payload', payload)
    props.addUser(payload)
  }

  let addRole = function () {
    let userActionSettings = {...props.userActionSettings, 'selectedRole': null}
    props.setUserActionSettings(userActionSettings)
    let userRoles = props.userRoles
    console.log(props)
    if (props.userActionSettings.selectedRole !== null) {
      userRoles.push(props.userActionSettings.selectedRole.label)
      props.setRoleData(userRoles)
    }
    if (props.userActionSettings.isUpdateModalOpen) {
      let obj = {}
      obj.op = 'add'
      obj.path = '/roles/-'
      obj.value = props.userActionSettings.selectedRole.label
      let updatePayload = JSON.parse(JSON.stringify(props.updatePayload))
      updatePayload.push(obj)
      props.setUpdatePayload(updatePayload)
    }
  }
  let removeRole = function (index) {
    if (props.userActionSettings.isUpdateModalOpen) {
      let obj = {}
      obj.op = 'remove'
      obj.path = '/roles/' + index
      let updatePayload = JSON.parse(JSON.stringify(props.updatePayload))
      updatePayload.push(obj)
      props.setUpdatePayload(updatePayload)
    }
    let userRoles = props.userRoles
    userRoles.splice(index, 1)
    props.setRoleData(userRoles)
    let userActionSettings = {...props.userActionSettings, 'selectedRole': null}
    props.setUserActionSettings(userActionSettings)
  }
  let listUsers = function () {
    if (props.users !== '') {
      if (props.users.length > 0) {
        userList = props.users.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
          return (
            <tr key={index}>
              <td>{data.first_name + ' ' + data.last_name}</td>
              <td>{data.email}</td>
              <td>{data.roles.toString()}</td>
              <td>
                <a href='' onClick={(event) => { event.preventDefault(); openUpdateModal(data) }} className=''>Edit</a>&nbsp;|&nbsp;
                {data.is_active && (<a href='' onClick={(event) => { event.preventDefault(); openDeActivateModal(data) }} className=''>De-Activate</a>)}
                {!data.is_active && (<a href='' onClick={(event) => { event.preventDefault(); openActivateModal(data) }} className=''>Activate</a>)}
              </td>
            </tr>
          )
        })
      } else {
        userList = []
        userList.push((
          <tr key={0}>
            <td colSpan='4'>{'No data to display'}</td>
          </tr>
        ))
      }
    }
  }
  if (props.users && props.users !== '') {
    totalUserPages = Math.ceil(props.users.length / perPage)
    // userCount = props.users.total_count
    console.log('totalUserPages', totalUserPages)
    let i = 1
    while (i <= totalUserPages) {
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
    // List initial data for supplier Applications
    listUsers()
  }
  if (currentPage === 1) {
    previousClass = 'm-datatable__pager-link--disabled'
  }
  if (currentPage === totalUserPages) {
    nextClass = 'm-datatable__pager-link--disabled'
  }
  let handleListAndPagination = function (page) {
    listUsers()
    props.setCurrentPage(page)
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }

  if (props.userRoles.length > 0) {
    roleList = props.userRoles.map(function (data, index) {
      return (<span className='m-list-search__result-item'>
        <span className='m-list-search__result-item-text'>{data}</span>
        <button type='button' onClick={() => { removeRole(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
      </span>)
    })
    console.log('role', roleList)
  } else {
    roleList = ''
    console.log('else role', roleList)
  }
  if (props.externalUsers && props.externalUsers !== '') {
    if (props.externalUsers.error_code === null) {
      userOptions = props.externalUsers.resources.filter(function (user) {
        if (user.email !== null && user.given_name !== null) {
        return user
        }
      }).map(function (user, index) {
        if (user.email !== null && user.given_name !== null) {
          user.value = user.email
          user.label = user.given_name + ' ' + user.last_name
          return user
        } else {
          return false
        }
      })
    } else {}
    console.log('userOptions', userOptions)
  }

  let handleInputChange = debounce((e) => {
    console.log(e)
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let searchText = searchTextBox ? searchTextBox.value : ''
    let originalData = props.copyUsers
    if (searchText.trim() !== '') {
      if (originalData !== '') {
        let list = _.filter(originalData, function (data, index) {
          if ((data.first_name && (data.first_name.toLowerCase()).match(searchText.toLowerCase())) || (data.last_name && (data.last_name.toLowerCase()).match(searchText.toLowerCase()))) {
            return data
          }
        })
        let payload = {}
        payload.users = list
        payload.copyUsers = props.copyUsers
        props.setUsersData(payload)
      }
      // eslint-disable-next-line
      mApp && mApp.unblockPage()
    } else {
      let payload = {}
      payload.users = props.copyUsers
      payload.copyUsers = props.copyUsers
      props.setUsersData(payload)
      // eslint-disable-next-line
      mApp && mApp.unblockPage()
    }
    props.setCurrentPage(1)
  }, 500)

  let handlePrevious = function (event) {
    event.preventDefault()
    if (currentPage === 1) {
      previousClass = styles.disabled
    } else {
      props.setCurrentPage(currentPage - 1)
      handleListAndPagination(currentPage - 1)
    }
  }

  let handleNext = function (event) {
    event.preventDefault()
    if (currentPage === totalUserPages) {
      nextClass = styles.disabled
    } else {
      props.setCurrentPage(currentPage + 1)
      handleListAndPagination(currentPage + 1)
    }
  }
  let handlePage = function (page) {
    if (page === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else if (page === totalUserPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    handleListAndPagination(page)
  }
    return (
      <div>
        <div id='userList'>
          {/* The table structure begins */}
          <div className='row'>
            <div className='col-md-12'>
              <div className='m_datatable' id='scrolling_vertical'>
                <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
                  <div className=''>
                    <div className='m-portlet'>
                      <div className='m-portlet__body'>
                        <div id='m_table_1_wrapper' className='dataTables_wrapper dt-bootstrap4'>
                          <div className='row'>
                            <div className='col-md-10' />
                            <div className='col-md-2 float-right'>
                              <button onClick={openAddUserModal} className='btn btn-outline-info btn-sm pull-right'>Invite User</button>&nbsp;
                            </div>
                          </div>
                          <br />
                          <div className='row' style={{'marginBottom': '20px'}}>
                            <div className='col-sm-12 col-md-6'>
                              <div className='dataTables_length' id='m_table_1_length' style={{'display': 'flex'}}>
                                <h5 style={{'margin': '8px'}}>Show</h5>
                                <select value={props.perPage} onBlur={handleBlurdropdownChange} onChange={handledropdownChange} name='m_table_1_length' aria-controls='m_table_1' className='custom-select custom-select-sm form-control form-control-sm' style={{'height': '40px'}}>
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
                        <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '80vh'}}>
                          <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                            <thead>
                              <tr role='row'>
                                <th className=''><h5>Name</h5></th>
                                <th className=''><h5>Email</h5></th>
                                <th className=''><h5>Roles</h5></th>
                                <th className=''><h5>Action</h5></th>
                              </tr>
                            </thead>
                            <tbody>
                              {userList}
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
          <ReactModal isOpen={props.userActionSettings.isAddModalOpen}
            onRequestClose={closeModal}
            className='modal-dialog modal-lg'
            style={{'content': {'top': '20%'}}}
            >
            {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
            <div className={''}>
              <div className=''>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>Invite User</h4>
                    <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body' style={{'height': 'calc(60vh - 55px)', 'overflow': 'auto'}}>
                    <div className='col-md-12'>
                      {/* {messageBlock} */}
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-2 col-form-label'>Full Name</label>
                        <div className='col-8'>
                          <Select
                            // className='col-7 input-sm m-input'
                            placeholder='Enter User Name'
                            isClearable
                            // defaultValue={dvalue}
                            value={props.userActionSettings.selectedUser}
                            onChange={handleUserSelect}
                            isSearchable
                            name={'userName'}
                            options={userOptions}
                          />
                          {/* <input className='form-control m-input' type='email' placeholder='Enter User Name' ref={input => (userName = input)} id='example-userName-input' /> */}
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-2 col-form-label'>Email</label>
                        <div className='col-8'>
                          <input className='form-control m-input' type='email' placeholder='Enter Email' value={props.userActionSettings.selectedEmail} id='example-email-input' />
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-2 col-form-label'>Select Role</label>
                        <div className='col-8'>
                          <Select
                            // className='col-7 input-sm m-input'
                            placeholder='Select Roles'
                            isClearable
                            // defaultValue={dvalue}
                            value={props.userActionSettings.selectedRole}
                            onChange={handleRoleSelect}
                            isSearchable={false}
                            name={'roleSelected'}
                            options={roleOptions}
                          />
                        </div>
                        <div className='col-2'>
                          <button type='button' onClick={addRole} className='btn btn-outline-info btn-sm'>Add</button>
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-2 col-form-label' />
                        <div className='col-10'>
                          <div className='m-section m-section--last'>
                            <div className='m-section__content'>
                              <div className='m-demo'>
                                <div className='m-demo__preview'>
                                  <div className='m-list-search'>
                                    <div className='m-list-search__results'>
                                      <span className='m-list-search__result-category m-list-search__result-category--first'>
                                                  Roles Selected
                                              </span>
                                      {roleList}
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
                  <div className='modal-footer'>
                    <button type='button' onClick={closeModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                    <button onClick={addUser} className='btn btn-outline-info btn-sm' >Invite User</button>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
          <ReactModal isOpen={props.userActionSettings.isUpdateModalOpen}
            onRequestClose={closeModal}
            className='modal-dialog modal-lg'
            style={{'content': {'top': '20%'}}}
            >
            {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
            <div className={''}>
              <div className=''>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>Edit User</h4>
                    <button type='button' onClick={closeUpdateModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body' style={{'height': 'calc(60vh - 55px)', 'overflow': 'auto'}}>
                    <div className='col-md-12'>
                      {/* {messageBlock} */}
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-2 col-form-label'>Full Name</label>
                        <div className='col-8'>
                          <input className='form-control m-input' type='email' disabled placeholder='Enter User Name' value={props.userActionSettings.updateUserData.first_name + ' ' + props.userActionSettings.updateUserData.last_name} onChange={editUsername} />
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-2 col-form-label'>Email</label>
                        <div className='col-8'>
                          <input className='form-control m-input' type='email' disabled placeholder='Enter Email' value={props.userActionSettings.updateUserData.email} onChange={editEmail} />
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-2 col-form-label'>Select Role</label>
                        <div className='col-8'>
                          <Select
                            // className='col-7 input-sm m-input'
                            placeholder='Select Roles'
                            isClearable
                            // defaultValue={dvalue}
                            value={props.userActionSettings.selectedRole}
                            onChange={handleRoleSelect}
                            isSearchable={false}
                            name={'roleSelected'}
                            options={roleOptions}
                          />
                        </div>
                        <div className='col-2'>
                          <button type='button' onClick={addRole} className='btn btn-outline-info btn-sm'>Add</button>
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-2 col-form-label' />
                        <div className='col-10'>
                          <div className='m-section m-section--last'>
                            <div className='m-section__content'>
                              <div className='m-demo'>
                                <div className='m-demo__preview'>
                                  <div className='m-list-search'>
                                    <div className='m-list-search__results'>
                                      <span className='m-list-search__result-category m-list-search__result-category--first'>
                                                  Roles Selected
                                              </span>
                                      {roleList}
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
                  <div className='modal-footer'>
                    <button type='button' onClick={closeUpdateModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                    <button onClick={updateUser} className='btn btn-outline-info btn-sm' >Update User</button>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
          <ReactModal isOpen={props.userActionSettings.isDeActivateModalOpen}
            onRequestClose={closeDeActivateModal}
            className='modal-dialog'
            style={{'content': {'top': '20%'}}}
            >
            <div className={''}>
              <div className=''>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h6 className='modal-title' id='exampleModalLabel'>De-Activate User</h6>
                    <button type='button' onClick={closeDeActivateModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <h3>{props.userActionSettings.userData.first_name} {props.userActionSettings.userData.last_name}</h3><br />
                    <p>Are you sure to De-Activate User</p>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' onClick={closeDeActivateModal} id='m_login_signup' className={'btn btn-sm btn-outline-info'}>Cancel</button>
                    <button type='button' className={'btn btn-sm btn-outline-info'} onClick={deActivateUser}>De-Activate User</button>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
          <ReactModal isOpen={props.userActionSettings.isActivateModalOpen}
            onRequestClose={closeActivateModal}
            className='modal-dialog modal-lg'
            style={{'content': {'top': '20%'}}}
            >
            {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
            <div className={''}>
              <div className=''>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>Activate User</h4>
                    <button type='button' onClick={closeActivateModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body' style={{'height': 'calc(60vh - 55px)', 'overflow': 'auto'}}>
                    <div className='col-md-12 m-form m-form--state m-form--fit'>
                      {/* {messageBlock} */}
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-4 col-form-label'>Email</label>
                        <div className='col-8'>
                          <input className='form-control m-input' type='email' disabled placeholder='Enter Email' value={props.userActionSettings.userData.email} onChange={editEmail} />
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-text-input' className='col-4 col-form-label'>Full Name</label>
                        <div className='col-8'>
                          <input className='form-control m-input' type='text' disabled placeholder='Enter User Name' value={props.userActionSettings.userData.first_name + ' ' + props.userActionSettings.userData.last_name} onChange={editUsername} />
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-4 col-form-label'>Password</label>
                        <div className='col-8'>
                          <input className='form-control m-input' type='password' placeholder='Enter Password' value={props.userActionSettings.updateUserData.password} onChange={editPassword} />
                        </div>
                      </div>
                      <div className={props.userActionSettings.validPassword ? 'form-group m-form__group row' : 'form-group m-form__group row has-danger'} >
                        <label htmlFor='example-email-input' className='col-4 col-form-label'>Confirm Password</label>
                        <div className='col-8'>
                          <input className='form-control m-input' type='password' placeholder='Enter Password' value={props.userActionSettings.updateUserData.confirm_password} onChange={editConfPassword} />
                          {!props.userActionSettings.validPassword && (<div className='form-control-feedback'>should matched password</div>)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' onClick={closeActivateModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                    <button onClick={activateUser} className={'btn btn-outline-info btn-sm ' + activateClass} >Activate Me</button>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
      )
    }
    Users.propTypes = {
    userActionSettings: PropTypes.any,
    updatePayload: PropTypes.any,
    externalUsers: PropTypes.any,
    roles: PropTypes.any,
    userRoles: PropTypes.any,
    currentPage: PropTypes.any,
    users: PropTypes.any,
    // eslint-disable-next-line
    copyUsers: PropTypes.any,
    perPage: PropTypes.any
 }
