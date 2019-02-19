import React from 'react'
import styles from './componentTypeComponentDetail.scss'

class ComponentTypeDetailComponent extends React.Component {
    render () {
      return (
        <div className={styles.borderline}>
          <div className={'row' + styles.description}>
            <i className={styles.iconcenter + ' fa fa-share'} />
            <div>
              <h2>IVR -Application</h2>
              <p>Interactive Voice Response (IVR) is an automated telephony system that interacts with callers,<br />
               gathers information and routes calls to the appropriate recipients. An IVR system (IVRS) <br />accepts a combination of voice telephone input
               and touch-tone keypad selection and <br />provides the appropriate responses in
               the form of voice, fax, callback,<br /> email and other contact methods.</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-6 col-md-6' >
              <div className={styles.tabsprops}>
                <ul className='nav nav-tabs nav-fill' role='tablist'>
                  <li className='nav-item'>
                    <a className='nav-link active show' data-toggle='tab' href='#m_tabs_3_1'>Properties</a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' data-toggle='tab' href='#m_tabs_3_2'>RelationShips</a>
                  </li>
                </ul>
                <div className={styles.tabcontentborder}>
                  <div className='tab-content'>
                    <div className='tab-pane active' id='m_tabs_3_1' role='tabpanel'>
                      <ul>
                        <li>
                          <div><p className={styles.labelbold}>URL</p></div>
                          <div><p><a href=''>http://ivr.com</a></p></div>
                        </li>
                        <li>
                          <div><p className={styles.labelbold}>Type</p></div>
                          <div><p>Business</p></div>
                        </li>
                        <li>
                          <div><p className={styles.labelbold}>Technical-Fit</p></div>
                          <div><p>0.83</p></div>
                        </li>
                        <li>
                          <div><p className={styles.labelbold}>Support Hours</p></div>
                          <div><p>24 hours</p></div>
                        </li>
                        <li>
                          <div><p className={styles.labelbold}>Criticality</p></div>
                          <div><p>Bussiness</p></div>
                        </li>
                        <li>
                          <div><p className={styles.labelbold}>URL</p></div>
                          <div><p><a href=''>http://ivr.com</a></p></div>
                        </li>
                        <li>
                          <div><p className={styles.labelbold}>URL</p></div>
                          <div><p><a href=''>http://ivr.com</a></p></div>
                        </li>
                      </ul>
                    </div>
                    <div className='tab-pane' id='m_tabs_3_2' role='tabpanel'>
                      <div className='m-accordion m-accordion--bordered' id='m_accordion_2' role='tablist'>
                        <div className='m-accordion__item'>
                          <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href='#m_accordion_2_item_1_body' aria-expanded='false'>
                            <span className='m-accordion__item-title'>IVR parent components</span>
                            <span className='m-accordion__item-mode' />
                          </div>
                          <div className='m-accordion__item-body collapse' id='m_accordion_2_item_1_body' role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2' style={{}}>
                            <div className='m-accordion__item-content'>
                              <a href=''>Windows Platform</a><br />
                              <a href=''>Apache tomcat Web server</a><br />
                              <a href=''>Microsoft Access</a><br />
                            </div>
                          </div>
                        </div>
                        <div className='m-accordion__item'>
                          <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_2_head' data-toggle='collapse' href='#m_accordion_2_item_2_body' aria-expanded='false'>
                            <span className='m-accordion__item-title'>IVR target Application</span>
                            <span className='m-accordion__item-mode' />
                          </div>
                          <div className='m-accordion__item-body collapse' id='m_accordion_2_item_2_body' role='tabpanel' aria-labelledby='m_accordion_2_item_2_head' data-parent='#m_accordion_2' style={{}}>
                            <div className='m-accordion__item-content'>
                              <a href=''>Windows Platform</a><br />
                              <a href=''>Apache tomcat Web server</a><br />
                              <a href=''>Microsoft Access</a><br />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-6 col-md-6'>
              <div className={styles.modelsection}>
                <h2>IVR Usage Model Diagram</h2><br />
                <img alt='model' src='assets/model.png' />
              </div>
            </div>
          </div>
        </div>
      )
    }
}
export default ComponentTypeDetailComponent
