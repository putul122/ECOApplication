import React from 'react'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import ReactModal from 'react-modal'
import Select from 'react-select'
import PropTypes from 'prop-types'
import styles from './perspectivesComponent.scss'
ReactModal.setAppElement('#root')

export default function Perspectives (props) {
  console.log('perspectives props', props)
  let connectionSelectBoxList = ''
  let searchTextBox
  let perPage = props.perPage
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let modelPrespectivesList = ''
  let totalPages
  let tableHeader = []
  let labels = []
  let messageList = ''
  let style = {}
  let serviceName = props.addSettings.deleteObject ? props.addSettings.deleteObject.subject_name : ''
  let handleBlurdropdownChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handledropdownChange = function (event) {
    console.log('handle change', event.target.value, typeof event.target.value)
    props.setPerPage(parseInt(event.target.value))
  }
  let openModal = function (event) {
    event.preventDefault()
    let addSettings = {...props.addSettings}
    addSettings.isModalOpen = true
    addSettings.name = ''
    addSettings.description = ''
    addSettings.selectedCategory = null
    addSettings.selectedOwner = null
    props.setAddSettings(addSettings)
  }
  let openDeleteModal = function (data) {
    console.log('delete', data)
    let addSettings = {...props.addSettings}
    addSettings.isDeleteModalOpen = true
    addSettings.deleteObject = data
    props.setAddSettings(addSettings)
  }
  let closeModal = function () {
    let addSettings = {...props.addSettings}
    addSettings.isModalOpen = false
    addSettings.isDeleteModalOpen = false
    addSettings.deleteObject = null
    addSettings.createResponse = null
    props.setAddSettings(addSettings)
  }
  let editName = function (event) {
    let addSettings = JSON.parse(JSON.stringify(props.addSettings))
    addSettings.name = event.target.value
    props.setAddSettings(addSettings)
  }
  let editDescription = function (event) {
    let addSettings = JSON.parse(JSON.stringify(props.addSettings))
    addSettings.description = event.target.value
    props.setAddSettings(addSettings)
  }
  let createComponent = function (event) {
    event.preventDefault()
    // eslint-disable-next-line
    mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let addSettings = JSON.parse(JSON.stringify(props.addSettings))
    let patchPayload = []
    let obj = {}
    obj.op = 'add'
    obj.path = '/-'
    obj.value = {}
    obj.value.parts = []
    obj.value.parts[0] = {'value': addSettings.name}
    obj.value.parts[1] = {'value': addSettings.description}
    let connectionData = {...props.connectionData}
    connectionData.selectedValues.forEach(function (data, index) {
      if (data) {
        let connections = []
        connections.push(data.id)
        obj.value.parts[connectionData.data[index].partIndex] = {'value': connections}
      } else {
        obj.value.parts[connectionData.data[index].partIndex] = {}
      }
    })
    // let payload = {
    //   'component_type': {
    //     'id': props.metaModelPerspective.resources[0].component_type.id
    //   },
    //   'name': addSettings.name,
    //   'description': addSettings.description
    // }
    // props.addComponentComponent(payload)
    
    // payload.data = patchPayload
    patchPayload.push(obj)
    let payload = {}
    payload.queryString = {}
    payload.queryString.meta_model_perspective_id = props.metaModelPerspective.resources[0].id
    payload.queryString.apply_changes = true
    payload.data = {}
    payload.data[props.metaModelPerspective.resources[0].id] = patchPayload
    console.log('payload', payload)
    props.updateModelPrespectives(payload)
  }
  let removeComponent = function (event) {
    event.preventDefault()
    let addSettings = {...props.addSettings}
    if (addSettings.deleteObject) {
      let payload = {
        'id': addSettings.deleteObject.subject_id
      }
      props.deleteComponentModelPerspectives(payload)
    }
    closeModal()
  }
  let listModelPrespectives = function () {
    console.log('list modal pers', props)
    if (props.modelPrespectives !== '') {
      let labelParts = props.metaModelPerspective.resources[0].parts
      // let crude = props.crude
      // let mask = props.metaModelPerspective.resources[0].crude
      // let crud = []
      // for (let option in crude) {
      //   if (crude.hasOwnProperty(option)) {
      //     if (mask & crude[option]) {
      //       crud.push(option)
      //     }
      //   }
      // }
      console.log('list props', props)
      if (props.modelPrespectives.length > 1) {
        let modelPrespectives = _.filter(props.modelPrespectives, {'error_code': null})
        if (modelPrespectives.length > 1) {
          modelPrespectivesList = modelPrespectives.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
            if (data.error_code === null) {
              let childList = []
              if (data.parts) {
                data.parts.forEach(function (partData, ix) {
                  let value
                  if (labelParts[ix].standard_property !== null && labelParts[ix].type_property === null) { // Standard Property
                    value = partData ? partData.value : ''
                  } else if (labelParts[ix].standard_property === null && labelParts[ix].type_property === null) { // Connection Property
                    if (partData.value) {
                      let targetComponents = []
                      partData.value.forEach(function (data, index) {
                        targetComponents.push(data.target_component.name)
                      })
                      value = targetComponents.toString()
                    } else {
                      value = partData.value || ''
                    }
                  } else if (labelParts[ix].type_property.property_type.key === 'Integer') { // below are Customer Property
                    value = partData.value !== null ? partData.value.int_value : ''
                  } else if (labelParts[ix].type_property.property_type.key === 'Decimal') {
                    value = partData.value !== null ? partData.value.float_value : ''
                  } else if (labelParts[ix].type_property.property_type.key === 'Text') {
                    value = partData.value !== null ? partData.value.text_value : ''
                  } else if (labelParts[ix].type_property.property_type.key === 'DateTime') {
                    value = partData.value !== null ? partData.value.date_time_value : ''
                  } else if (labelParts[ix].type_property.property_type.key === 'Boolean') {
                    value = partData.value !== null ? partData.value.boolean_value : ''
                  } else if (labelParts[ix].type_property.property_type.key === 'List') {
                    value = partData.value !== null ? partData.value.value_set_value : ''
                  } else {
                    value = partData.value !== null ? partData.value.other_value : ''
                  }
                  childList.push(<td className='' key={'ch_' + index + '_' + ix}>{value}</td>)
                })
                let availableAction = {...props.availableAction}
                let list = []
                if (availableAction.Update) {
                  list.push(<a href='javascript:void(0);'>{'Edit'}</a>)
                }
                if (availableAction.Delete) {
                  list.push(<a onClick={(event) => { event.preventDefault(); openDeleteModal(data) }} href='javascript:void(0);'>{'Delete'}</a>)
                }
                childList.push(<td className='' key={'last' + index}>{list}</td>)
              }
              // if (childList.length > 0) {
              //   let list = []
              //   crud.forEach(function (action, index) {
              //     list.push(<a href='javascript:void(0);'>{action}</a>)
              //   })
              //   childList.push(<td className='' key={'last' + index}>{list}</td>)
              // }
              return (<tr key={index}>{childList}</tr>)
            }
          })
          // props.setConnectionData(connectionData)
        } else {
          modelPrespectivesList = []
          modelPrespectivesList.push((
            <tr key={0}>
              <td colSpan={labelParts.length}>{'No data to display'}</td>
            </tr>
          ))
        }
        
      } else {
        modelPrespectivesList = []
        modelPrespectivesList.push((
          <tr key={0}>
            <td colSpan={labelParts.length}>{'No data to display'}</td>
          </tr>
        ))
      }
    }
  }
  if (props.modelPrespectives && props.modelPrespectives !== '') {
    totalPages = Math.ceil(props.modelPrespectives.length / perPage)
    let i = 1
    while (i <= totalPages) {
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
    listModelPrespectives()
  }
  if (currentPage === 1) {
    previousClass = 'm-datatable__pager-link--disabled'
  }
  if (currentPage === totalPages) {
    nextClass = 'm-datatable__pager-link--disabled'
  }
  let handleListAndPagination = function (page) {
    listModelPrespectives()
    props.setCurrentPage(page)
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }
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
    if (currentPage === totalPages) {
      nextClass = styles.disabled
    } else {
      props.setCurrentPage(currentPage + 1)
      handleListAndPagination(currentPage + 1)
    }
  }
  let handlePage = function (page) {
    if (page === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else if (page === totalPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    handleListAndPagination(page)
  }
  if (props.metaModelPerspective && props.metaModelPerspective !== '' && props.metaModelPerspective.error_code === null) {
    if (props.metaModelPerspective.resources[0].parts.length > 0) {
      tableHeader = props.metaModelPerspective.resources[0].parts.map(function (data, index) {
        labels.push(data.name)
        return (<th key={index} className=''><h5>{data.name}</h5></th>)
      })
    }
    tableHeader.push(<th key={'last'} className=''><h5>Action</h5></th>)
  }
  let handleSelectChange = function (index) {
    return function (newValue: any, actionMeta: any) {
      console.log('newValue', newValue)
      console.log('actionMeta', actionMeta)
      console.log('index', index)
      let connectionData = {...props.connectionData}
      let selectedValues = connectionData.selectedValues
      if (actionMeta.action === 'select-option') {
        selectedValues[index] = newValue
        connectionData.selectedValues = selectedValues
        props.setConnectionData(connectionData)
      }
      if (actionMeta.action === 'clear') {
        selectedValues[index] = null
        connectionData.selectedValues = selectedValues
        props.setConnectionData(connectionData)
      }
    }
  }
  if (props.connectionData !== '' && props.connectionData.operation.isComplete) {
    // eslint-disable-next-line
    mApp && mApp.unblockPage()
    let connectionData = {...props.connectionData}
    connectionSelectBoxList = connectionData.data.map(function (data, index) {
      let selectOptions = connectionData.selectOption[index].map(function (component, id) {
        component.value = component.id
        component.label = component.name
        return component
      })
      return (<div className='form-group row'>
      <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
      <div className='col-8'>
        <Select
          className='input-sm m-input'
          placeholder={'Select ' + data.name}
          isClearable
          value={connectionData.selectedValues[index]}
          onChange={handleSelectChange(index)}
          options={selectOptions}
          />
      </div>
    </div>)
    })
  }
  if (props.addSettings.createResponse !== null) {
    if (props.addSettings.createResponse.length > 0) {
      messageList = props.addSettings.createResponse.map(function (data, index) {
        if (data.error_code === null) {
          if (data.message != null) {
            return (<li key={index}>{data.message}</li>)
          } else {
            if (props.addSettings.createResponse.length === 1) {
              return (<li key={99}>{'No data has been added.'}</li>)
            }
          }
        } else {
          return (<li key={index}>{'Error Code: ' + data.error_code + 'Message: ' + data.error_message}</li>)
        }
      })
    } else {
      messageList = []
      messageList.push((
        <li key={0}>{'No data has been added.'}</li>
      ))
    }
  }
  if (props.addSettings.createResponse !== null) {
    style = {'height': 'calc(60vh - 55px)', 'overflow': 'auto'}
  } else {
    style = {}
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
                      {props.availableAction.Create && (<div className='col-md-2 float-right'>
                        <button type='button' onClick={openModal} className='btn btn-outline-info btn-sm' style={{'float': 'right'}}>Add </button>&nbsp;
                      </div>)}
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
                                <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onKeyUp={''} />
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
                            {tableHeader}
                          </tr>
                        </thead>
                        <tbody>
                          {modelPrespectivesList}
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
      <ReactModal isOpen={props.addSettings.isModalOpen}
        onRequestClose={closeModal}
        className='modal-dialog modal-lg'
        style={{'content': {'top': '20%'}}}
        >
        {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
        <div className={''}>
          <div className=''>
            <div className='modal-content' style={{'height': '400px'}}>
              <div className='modal-header'>
              {props.addSettings.createResponse === null && (<h4 className='modal-title' id='exampleModalLabel'>Add Perspective</h4>)}
              {props.addSettings.createResponse !== null && (<h4 className='modal-title' id='exampleModalLabel'>Create Report</h4>)}
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body' style={{'height': 'calc(60vh - 55px)', 'overflow': 'auto'}}>
                {props.addSettings.createResponse === null && (<div className='col-md-12'>
                  {/* {messageBlock} */}
                  <div className='form-group m-form__group row'>
                    <div className='col-8'>
                      {/* <input className='form-control m-input' type='email' placeholder='Enter User Name' ref={input => (userName = input)} id='example-userName-input' /> */}
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-input' className='col-2 col-form-label'>Name</label>
                    <div className='col-8'>
                      <input className='form-control m-input' value={props.addSettings.name} onChange={editName} placeholder='Enter Name' id='example-email-input' autoComplete='off' />
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-input' className='col-2 col-form-label'>Description</label>
                    <div className='col-8'>
                      <textarea className='form-control m-input' value={props.addSettings.description} onChange={editDescription} placeholder='Enter Description' />
                    </div>
                  </div>
                  {connectionSelectBoxList}
                </div>)}
                {props.addSettings.createResponse !== null && (<ul className=''>
                    {messageList}
                  </ul>)}
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={closeModal} className='btn btn-outline-danger btn-sm'>Close</button>
                {props.addSettings.createResponse === null && (<button className='btn btn-outline-info btn-sm' onClick={createComponent} >Add</button>)}
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
      <ReactModal isOpen={props.addSettings.isDeleteModalOpen}
        onRequestClose={closeModal}
        className='modal-dialog '
        style={{'content': {'top': '20%'}}} >
        <div className={styles.modalwidth}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Delete Service</h4>
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <div>
                  <h6>Confirm deletion of Service {serviceName}</h6>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={closeModal} id='m_login_signup' className='btn btn-outline-info btn-sm'>Close</button>
                <button type='button' id='m_login_signup' className='btn btn-outline-info btn-sm' onClick={removeComponent}>Confirm</button>
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
  Perspectives.propTypes = {
    addSettings: PropTypes.any,
    setModalOpenStatus: PropTypes.func,
    modelPrespectives: PropTypes.any,
    metaModelPerspective: PropTypes.any,
    currentPage: PropTypes.any,
    perPage: PropTypes.any,
    crude: PropTypes.any,
    availableAction: PropTypes.any,
    connectionData: PropTypes.any
  }
