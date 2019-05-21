import React from 'react'
import styles from './slamSupplierComponent.scss'
import Barchart from '../barchart/barchartComponent'

function SlamSupplier () {
      return (
        <div className={styles.MainContainer}>
          <div className={styles.HeaderContainer}>
            {/* dropDown */}
            <div className={styles.mainDropdown}>
              <div className={styles.LeftText}>
                <p>Supplier</p>
              </div>
              <div className={`dropdown dropup-showing ${styles.dropDown}`}>
                <button className={`btn btn-default dropdown-toggle dropup-btn ${styles.dropDownBtn} ${styles.largeBtn}`} type='button' data-toggle='dropdown'>
                  Huawei
                  <span className='caret' />
                </button>
                <ul className={`dropdown-menu menu ${styles.dropList}`}>
                  <li>
                    <a href='javascript:void(0)'>Huawei</a>
                  </li>
                  <li>
                    <a href='javascript:void(0)'>Samsung</a>
                  </li>
                  <li>
                    <a href='javascript:void(0)'>Iphone</a>
                  </li>
                </ul>
              </div>
            </div>
            {/* dropDown */}
            <div className={styles.mainDropdown}>
              <div className={styles.LeftText}>
                <p>Service</p>
              </div>
              <div className={`dropdown dropup-showing ${styles.dropDown}`}>
                <button className={`btn btn-default dropdown-toggle dropup-btn ${styles.dropDownBtn} ${styles.largeBtn}`} type='button' data-toggle='dropdown'>
                  Front office services
                  <span className='caret' />
                </button>
                <ul className={`dropdown-menu menu ${styles.dropList}`}>
                  <li>
                    <a href='javascript:void(0)'>Front office service</a>
                  </li>
                  <li>
                    <a href='javascript:void(0)'>Back office service</a>
                  </li>
                </ul>
              </div>
            </div>
            {/* dropDown */}
            <div className={styles.mainDropdown}>
              <div className={styles.LeftText}>
                <p>KPI</p>
              </div>
              <div className={`dropdown dropup-showing ${styles.dropDown}`}>
                <button className={`btn btn-default dropdown-toggle dropup-btn ${styles.dropDownBtn} ${styles.smallBtn}`} type='button' data-toggle='dropdown'>
                  Reporting Efficiency
                  <span className='caret' />
                </button>
                <ul className={`dropdown-menu menu ${styles.dropList}`}>
                  <li>
                    <a href='javascript:void(0)'>Reporting Efficiency</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.ContentContainer}>
            <div className={styles.leftContainer}>
              <div className={styles.chartContainer}>
                <div className={styles.barContainer}>
                  <div className={styles.pieChart}>
                    <div className={styles.Barchart}>
                      <Barchart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}

export default SlamSupplier
