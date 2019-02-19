import React from 'react'
// import PropTypes from 'prop-types'
// import _ from 'lodash'
// import styles from './addTemplateComponent.scss'
// import moment from 'moment'
// import debounce from 'lodash/debounce'

export default function TaskDetail (props) {
    let onRadioChange = function (value) {
        // let isApproved = value
        console.log(value)
        // props.setApproval(isApproved)
    }
    let handleRejectedReason = function (event) {
        // let rejectedReason = event.target.value
        // props.setRejectedReason(rejectedReason)
    }
    return (
      <div>
        <div className='m-portlet m-portlet--mobile m-portlet--body-progress-'>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption' style={{width: '100%'}}>
              <div className='m-portlet__head-title' style={{width: '100%'}}>
                <div className='row' style={{width: '100%'}}>
                  <br />
                  <div className='col-12'><span><h4>Approve Review</h4></span></div>
                  <div className='col-12'><span>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with</span></div>
                </div>
                {/* <h3 className='m-portlet__head-text'>
                  Basic Portlet <small>portlet sub title</small>
                </h3> */}
              </div>
            </div>
          </div>
          <div className='m-portlet__body'>
            <div className='row' style={{width: '100%'}}>
              <div className='col-md-4'>
                <div className='m-section m-section--last'>
                  <div className='m-section__content'>
                    <div className='m-demo'>
                      <div className='m-demo__preview'>
                        <div className='m-list-search'>
                          <div className='m-list-search__results'>
                            <span className='m-list-search__result-category m-list-search__result-category--first'>
                                        Properties
                                    </span>
                            <span className='m-list-search__result-item'>
                              <div className='form-group m-form__group row'>
                                <label htmlFor='example-email-input' className='col-4 col-form-label'>Review Category</label>
                                <div className='col-8'>Application Architecture Compliance Review</div>
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='m-section m-section--last'>
                  <div className='m-section__content'>
                    <div className='m-demo'>
                      <div className='m-demo__preview'>
                        <div className='m-list-search'>
                          <div className='m-list-search__results'>
                            <span className='m-list-search__result-category m-list-search__result-category--first'>
                                        Relationships
                                    </span>
                            <span className='m-list-search__result-item'>
                              <div className='form-group m-form__group row'>
                                <label htmlFor='example-email-input' className='col-4 col-form-label'>Review Category</label>
                                <div className='col-8'>Application Architecture Compliance Review</div>
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='m-section m-section--last'>
                  <div className='m-section__content'>
                    <div className='m-demo'>
                      <div className='m-demo__preview'>
                        <div className='m-list-search'>
                          <div className='m-list-search__results'>
                            <span className='m-list-search__result-category m-list-search__result-category--first'>
                                        Relationships Properties
                                    </span>
                            <span className='m-list-search__result-item'>
                              <div className='form-group m-form__group row'>
                                <label htmlFor='example-email-input' className='col-4 col-form-label'>Review Category</label>
                                <div className='col-8'>Application Architecture Compliance Review</div>
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row' style={{width: '100%'}}>
              <div className='col-12 m-form__content'>
                <div className='form-group m-form__group row'>
                  <label htmlFor='example-email-input' className='col-3 col-form-label'>Approve<span className='text-danger' >*</span></label>
                  <div className='col-9 float-right'>
                    <div className='m-radio-inline'>
                      <label htmlFor='example-email-input' className=''>
                        <input type='radio' name='example_8' value='Approved' checked={'props.isApproved' === 'Approved'} onChange={(e) => onRadioChange('Approved')} /> Yes
                        <span />
                      </label>&nbsp;
                      <label htmlFor='example-email-input' className=''>
                        <input type='radio' name='example_8' value='Rejected' checked={'props.isApproved' === 'Rejected'} onChange={(e) => onRadioChange('Rejected')} /> No
                        <span />
                      </label>
                    </div>
                  </div>
                </div>
                {'props.isApproved' === 'Rejected' && (<div className='form-group m-form__group row'>
                  <label htmlFor='example-email-input' className='col-2 col-form-label'>Reason<span className='text-danger'>*</span></label>
                  <div className='col-8'>
                    {/* <input lassName='form-control m-input' type='email' placeholder='Enter Email' value={''} id='example-email-input' /> */}
                    <textarea className='form-control m-input m-input--air' value={'props.rejectedReason'} onChange={handleRejectedReason} id='exampleTextarea' rows='3' style={{zIndex: 'auto', position: 'relative', lineHeight: '16.25px', fontSize: '13px', transition: 'none 0s ease 0s', background: 'transparent !important'}} />
                  </div>
                </div>)}
              </div>
            </div>
            <div className='row' style={{width: '100%'}}>
              <div className='col-6' />
              <div className='col-6 float-right'>
                <div className='pull-right'>
                  <button onClick={() => { window.location.href = window.location.origin + '/reviews' }} className='btn btn-outline-info btn-sm'>Close</button>&nbsp;&nbsp;
                  <button onClick={''} className='btn btn-outline-info btn-sm'>Save</button>&nbsp;&nbsp;
                  <button onClick={''} className='btn btn-outline-info btn-sm'>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    }
    TaskDetail.propTypes = {
    // agreementsSummary: PropTypes.any,
    // currentPage: PropTypes.any,
    // addAgreementSettings: PropTypes.any,
    // perPage: PropTypes.any
 }
