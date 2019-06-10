import React from 'react'
import styles from './penaltyScoreCardComponent.scss'
import PropTypes from 'prop-types'
// import axios from 'axios'
import 'antd/dist/antd.css'
// import { DatePicker } from 'antd'
// import {
//   mxUtils
// } from 'mxgraph-js'

// const { RangePicker } = DatePicker
import MxGraph from './penaltyScorecardMxgraph.component'

class PenaltyScoreCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      scoreCardArr: [],
      scoreCard: 'Select',
      showSVG: false
    }
  }
  componentDidMount () {
    this.props.getPenaltyScoreCardData()
  }

  componentWillReceiveProps (nextProps) {
    const { penaltyScoreCardData } = nextProps
    let { scoreCardArr } = this.state
    if (penaltyScoreCardData && penaltyScoreCardData.length) {
      for (let i = 0; i < penaltyScoreCardData.length; i++) {
        let obj = {
          subject_name: penaltyScoreCardData[i].subject_name,
          subject_id: penaltyScoreCardData[i].subject_id
        }
        scoreCardArr.push(obj)
      }
    }
  }

  scoreCardDropDown = (value) => {
    this.setState({
      scoreCard: value.subject_name
    })
  }

  showSVGDiagram = () => {
    this.setState({
      showSVG: true
    })
  }

  PenaltydropDown = (scoreCardArr) => {
    return (
      <div className={styles.HeaderContainer}>
        {/* dropDown */}
        <div className={styles.mainDropdown}>
          <div className={styles.LeftText}>
            <p>Scorecard</p>
          </div>
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <button className={`btn btn-default dropdown-toggle dropup-btn ${styles.dropDownBtn}`} type='button' data-toggle='dropdown'>
              {this.state.scoreCard}
              <span className='caret' />
            </button>
            <ul className={`dropdown-menu menu ${styles.dropList}`}>
              {
                scoreCardArr.map((val, key) => {
                  return (
                    <li key={key}>
                      <a href='javascript:void(0)'
                        onClick={() => this.scoreCardDropDown(val)}
                      >{val.subject_name}</a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        {/* calendar */}
        {/* <div className={styles.mainDropdown}>
          <div className={styles.LeftText}>
            <p>Period</p>
          </div>
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <RangePicker
              className='RangePicker'
              // onChange={(val) => this.calendarValue(val)}
              dateRender={(current) => {
                const style = {}
                if (current.date() === 1) {
                  style.border = '1px solid #1890ff'
                  style.borderRadius = '50%'
                }
                return (
                  <div className='ant-calendar-date' style={style}>
                    {current.date()}
                  </div>
                )
              }}
            />
          </div>
        </div> */}
        <div className={styles.mainDropdown}>
          <div className={styles.LeftText}>
            <p className={styles.emptyPara} />
          </div>
          <div className={`dropdown dropup-showing ${styles.dropDown}`}>
            <button className={`btn btn-default dropup-btn ${styles.dropDownBtn} ${styles.clearFilter}`} type='button' onClick={this.showSVGDiagram}>
              Go
            </button>
          </div>
        </div>
      </div>
    )
  }
  render () {
    let { scoreCardArr } = this.state
    return (
      <div className={styles.MainContainer}>
        <div className={styles.LeftHeaderText}>
          <p>Penalty Scorecard</p>
        </div>
        {this.PenaltydropDown(scoreCardArr)}
        <MxGraph />
        {/* <div className='graph-container' ref='divPenaltyGraph' id='divPenaltyScorecardGraph' />
        { scoreCard !== 'Select' && showSVG && (
          <div style={{ marginTop: '15px' }}>
            <img
              src='/assets/penaltyScorecard/penalty-scorecard.svg'
              alt='penalty-scorecard'
              height='100%'
              width='100%' />
          </div>
        )} */}
      </div>
    )
  }
}

PenaltyScoreCard.propTypes = {
  getPenaltyScoreCardData: PropTypes.func,
  penaltyScoreCardData: PropTypes.any
}
export default PenaltyScoreCard
