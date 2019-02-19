import React from 'react'

class AppWrapper extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

  props: {
    children: any
  }
}

export default AppWrapper
