import React from 'react'
import PropTypes from 'prop-types'
// import _ from 'lodash'
// import styles from './userComponent.scss'
// import moment from 'moment'
import debounce from 'lodash/debounce'

export default function Tasks (props) {
  let searchTextBox = ''
  let userName = ''
  let email = ''
  let listPage = ''
  let currentPage = 1
  let perPage = props.perPage || 10
  let totalPages = 1
  let nextClass = ''
  let previousClass = ''
  console.log(searchTextBox, userName, email)
  let handleInputChange = debounce((e) => {
    console.log(e)
    // const value = searchTextBox.value
    // agreementsList = ''
    // let payload = {
    //   'search': value || '',
    //   'page_size': props.perPage,
    //   'page': currentPage
    // }
    // // if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
    //   props.fetchAgreements(payload)
    //   // eslint-disable-next-line
    //   mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    //   // eslint-disable-next-line
    //   // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    //   // props.setComponentTypeLoading(true)
    // // }
    // listPage = _.filter(pageArray, function (group) {
    //   let found = _.filter(group, {'number': currentPage})
    //   if (found.length > 0) { return group }
    // })
  }, 500)
  // let handleBlurdropdownChange = function (event) {
  //   console.log('handle Blur change', event.target.value)
  // }
  let handledropdownChange = function (event) {
    // console.log('handle change', event.target.value, typeof event.target.value)
    // props.setPerPage(parseInt(event.target.value))
  }
  let handlePrevious = function (event) {
    // event.preventDefault()
    // if (currentPage === 1) {
    //   previousClass = styles.disabled
    // } else {
    //   let payload = {
    //     'search': searchTextBox.value ? searchTextBox.value : '',
    //     'page_size': props.perPage,
    //     'page': currentPage - 1
    //   }
    //   props.fetchAgreements(payload)
    //   // eslint-disable-next-line
    //   mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    //   // eslint-disable-next-line
    //   // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    //   props.setCurrentPage(currentPage - 1)
    // }
    // listPage = _.filter(pageArray, function (group) {
    //   let found = _.filter(group, {'number': currentPage - 1})
    //   if (found.length > 0) { return group }
    // })
  }

  let handleNext = function (event) {
    event.preventDefault()
    // if (currentPage === totalNoPages) {
    //   nextClass = styles.disabled
    // } else {
    //   let payload = {
    //     'search': searchTextBox.value ? searchTextBox.value : '',
    //     'page_size': props.perPage,
    //     'page': currentPage + 1
    //   }
    //   agreementsList = ''
    //   props.fetchAgreements(payload)
    //   // eslint-disable-next-line
    //   mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    //   // eslint-disable-next-line
    //   // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    //   props.setCurrentPage(currentPage + 1)
    // }
    // listPage = _.filter(pageArray, function (group) {
    //   let found = _.filter(group, {'number': currentPage + 1})
    //   if (found.length > 0) { return group }
    // })
  }
  let handlePage = function (page) {
    // if (page === 1) {
    //   previousClass = 'm-datatable__pager-link--disabled'
    // } else if (page === totalNoPages) {
    //   nextClass = 'm-datatable__pager-link--disabled'
    // }
    // // agreementsList = ''
    // let payload = {
    //   'search': searchTextBox.value ? searchTextBox.value : '',
    //   'page_size': props.perPage,
    //   'page': page
    // }
    // props.fetchAgreements(payload)
    // // eslint-disable-next-line
    // mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // // eslint-disable-next-line
    // // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // props.setCurrentPage(page)

    // listPage = _.filter(pageArray, function (group) {
    //   let found = _.filter(group, {'number': page})
    //   if (found.length > 0) { return group }
    // })
  }
  const startValueOfRange = (currentPage - 1) * perPage + 1
  const totalItems = totalPages * perPage
  const endValueOfRange = (currentPage * perPage) <= totalItems ? (currentPage * perPage) : totalItems

    var activeClass = ''
    return (
      <div id='tasksList'>
        {/* The table structure begins */}
        <div className='row'>
          <div className='col-md-12'>
            <div className='m_datatable' id='scrolling_vertical'>
              <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
                <div className=''>
                  <div className='m-portlet'>
                    <div className='m-portlet__body'>
                      <div id='m_table_1_wrapper' className='dataTables_wrapper dt-bootstrap4'>
                        <div className='row' style={{'marginBottom': '20px'}}>
                          <div className='col-sm-12 col-md-6'>
                            <div className='dataTables_length pull-left' id='m_table_1_length' style={{'display': 'flex'}}>
                              <div style={{'display': 'flex', 'width': '350px'}}>
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
                          {/* <div className='col-sm-12 col-md-6'>
                            <div className='dataTables_length' id='m_table_1_length' style={{'display': 'flex'}}>
                              <h5 style={{'margin': '8px'}}>Show</h5>
                              <select value={props.perPage} onBlur={handleBlurdropdownChange} onChange={handledropdownChange} name='m_table_1_length' aria-controls='m_table_1' className='custom-select custom-select-sm form-control form-control-sm' style={{'height': '40px'}}>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                              </select>
                              <h5 style={{'margin': '8px'}}>Entries</h5>
                            </div>
                          </div> */}
                        </div>
                      </div>
                      <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '80vh'}}>
                        <table className='table-pres m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                          <thead className='table-head pres-th'>
                            <tr role='row' className='table-head-row'>
                              <th className='table-th pres-th'><p>Task Id</p></th>
                              <th className='table-th pres-th'><p>Task Name</p></th>
                              <th className='table-th pres-th'><p>Component Name</p></th>
                              <th className='table-th pres-th'><p>Workflow Name</p></th>
                              <th className='table-th pres-th'><p>Assigned To</p></th>
                              <th className='table-th pres-th'><p>Created</p></th>
                            </tr>
                          </thead>
                          <tbody className='table-body pres-th'>
                            <tr role='row' className='table-tr'>
                              <td className='table-td pres-th'><a href='/tasks/1'>1</a></td>
                              <td className='table-td pres-th'>Approve Review</td>
                              <td className='table-td pres-th'>Architecture Review: C12345 Review</td>
                              <td className='table-td pres-th'>HLD Review</td>
                              <td className='table-td pres-th'>Naas Routenbach</td>
                              <td className='table-td pres-th'>2018-11-06</td>
                            </tr>
                            <tr role='row' className='table-tr'>
                              <td className='table-td pres-th'><a href='/tasks/1'>2</a></td>
                              <td className='table-td pres-th'>Approve Ownership</td>
                              <td className='table-td pres-th'>Application: IVR</td>
                              <td className='table-td pres-th'>HLD Review</td>
                              <td className='table-td pres-th'>Koos Coetzee</td>
                              <td className='table-td pres-th'>2018-11-06</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className='row'>
                        <div className='col-sm-12 col-md-6' id='scrolling_vertical'>
                          <div
                            className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll'
                            id='scrolling_vertical'
                          >
                            <div className='m-datatable__pager m-datatable--paging-loaded clearfix'>
                              <ul className='m-datatable__pager-nav  pag'>
                                {/* Showing this for dummy data */}
                                <li className={'page-item actives' + activeClass}>
                                  <a href='' className={'m-datatable__pager-link m-datatable__pager-link-number actives  page-link list activ'}>1</a>
                                </li>
                                {currentPage !== 1 && totalPages > 1 ? <li className='page-item'><a href='' title='Previous' id='m_blockui_1_5' className={'m-datatable__pager-link m-datatable__pager-link--prev  page-link list links anchors' + previousClass} onClick={handlePrevious} data-page='4'><span aria-hidden='true'>&laquo;</span><span className={'sr-only'}>Previous</span></a></li> : ''}
                                {currentPage !== 1 && totalPages > 1 ? <li className='page-item anchors'><a href='' title='Previous' id='m_blockui_1_5' className={'m-datatable__pager-link m-datatable__pager-link--prev  page-link list links anchors' + previousClass} onClick={handlePrevious} data-page='4'><span aria-hidden='true'>&lt;</span><span className={'sr-only'}>Previous</span></a></li> : ''}
                                {listPage[0] && listPage[0].map(function (page, index) {
                                        if (page.number === currentPage) {
                                                page.class = 'm-datatable__pager-link--active activ'
                                                activeClass = 'actives'
                                              } else {
                                                page.class = ''
                                                activeClass = ''
                                              }
                                              return (<li key={index} className={'page-item' + activeClass}>
                                                <a href='' className={'m-datatable__pager-link m-datatable__pager-link-number actives  page-link list ' + page.class} data-page={page.number} title={page.number} onClick={(event) => { event.preventDefault(); handlePage(page.number) }} >{page.number}</a>
                                              </li>)
                                            })}
                                {currentPage !== totalPages &&
                                  totalPages > 1 && (
                                  <li className='page-item'><a href='' title='Next' className={'m-datatable__pager-link m-datatable__pager-link--next   page-link list links anchors' + nextClass} onClick={handleNext} data-page='4'><span aria-hidden='true'>&gt;</span><span className={'sr-only'}>Next</span></a></li>
                                )}
                                {currentPage !== totalPages &&
                                  totalPages > 1 && (
                                  <li className='page-item'><a href='' title='Next' className={'m-datatable__pager-link m-datatable__pager-link--next   page-link list links anchors' + nextClass} onClick={handleNext} data-page='4'><span aria-hidden='true'>&raquo;</span><span className={'sr-only'}>Next</span></a></li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className={`col-sm-12 col-md-6 text-right`}>
                          {/* showing dropdown */}
                          <div className='showing-div showspace spaceMargin '>
                            <div className='dropdown dropup-showing'>
                              <button className='btn btn-default dropdown-toggle dropup-btn' type='button' data-toggle='dropdown'>{props.perPage}<span className='caret' /></button>
                              <ul className='dropdown-menu menu'>
                                <li><a href='javascript:void(0)' onClick={() => handledropdownChange(10)}>10</a></li>
                                <li><a href='javascript:void(0)' onClick={() => handledropdownChange(25)}>25</a></li>
                                <li><a href='javascript:void(0)' onClick={() => handledropdownChange(50)}>50</a></li>
                                <li><a href='javascri pt:void(0)' onClick={() => handledropdownChange(100)}>100</a></li>
                              </ul>
                            </div>
                            <span className='showing-text text-right showingText'> Showing {startValueOfRange} - {endValueOfRange} of {totalItems} </span>
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
      )
    }
    Tasks.propTypes = {
    // agreements: PropTypes.any,
    // agreementsSummary: PropTypes.any,
    // currentPage: PropTypes.any,
    // addAgreementSettings: PropTypes.any,
    perPage: PropTypes.any
}
