import React from 'react'
// import PropTypes from 'prop-types'
const style = {
  background: '#ffffff',
  padding: '25px'
}
export default function Home (props) {
  return (
    <div className=''>
      <div className='m-content col-xl-12'>
        <div style={style}>
          <img alt='' src='/assets/ECO_Application.png' style={{'width': '100%'}} />
        </div>
      </div>
    </div>
  )
}
