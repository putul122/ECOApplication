import React from 'react'
import PropTypes from 'prop-types'
import './editRolesComponent.scss'

export default function EditRoles (props) {
  console.log('props', props)
  // let roleName
  // let rolesData = props.rolesData
  console.log('roles data', props.rolesData, props.setUpdateRoleValue, props.updateRoleValue)
  // if (props.rolesData && props.rolesData !== '') {
  //   roleName = props.rolesData.resources[0].name
  // }
  let handleNameChange = function (event) {
    let updateRoleValue = {...props.updateRoleValue, 'name': event.target.value}
    props.setUpdateRoleValue(updateRoleValue)
    console.log('*&*&*&', updateRoleValue)
  }
  let updateRoleData = function (event) {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    event.preventDefault()
    let dataPayload = []
    let obj = {}
    obj.op = 'replace'
    obj.path = '/name'
    obj.value = props.updateRoleValue.name
    // let payload = { 'op': 'replace', 'path': '/name', 'value': props.updateRoleValue.name }
    dataPayload.push(obj)
    let roleId = props.match.params.id
    let payload = {}
    payload.role_id = roleId
    payload.data = dataPayload
    console.log('payload', payload)
    props.updateRole(payload)
    console.log('*(*', payload)
  }
    return (
      <div className=''>
        <div className='col-md-9'>
          <h2>Edit Role</h2>
        </div>
        <div className='m-login__form m-form'>
          <div className='col-md-12'>
            <div className='col-md-10 pull-left'>
              <div className='form-group m-form__group row'>
                <label htmlFor='example-input' className='col-2 col-form-label'>Name</label>
                <div className='col-8'>
                  <input type='text' className='form-control m-input' placeholder='Enter Name' value={props.updateRoleValue.name} onChange={handleNameChange} id='example-email-input' autoComplete='off' />
                </div>
              </div>
              <div className='form-group m-form__group row'>
                <label htmlFor='example-input' className='col-2 col-form-label'>Description</label>
                <div className='col-8'>
                  <textarea className='form-control m-input' placeholder='Enter Description' value={''} />
                </div>
              </div>
            </div>
            <div className='col-md-2 pull-right'>
              <a href='/roles' className='btn btn-outline-info btn-sm'>Cancel</a>&nbsp;
              {/* <button type='button' className='btn btn-outline-info btn-sm'>Cancel</button>&nbsp; */}
              <button type='button' className='btn btn-outline-info btn-sm' onClick={updateRoleData}>Update Role</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  EditRoles.propTypes = {
    rolesData: PropTypes.any,
    updateRoleValue: PropTypes.any,
    setUpdateRoleValue: PropTypes.func,
    updateRole: PropTypes.func,
    match: PropTypes.any
}
