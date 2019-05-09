import React, { Component } from 'react'

export class CreateTags extends Component {
  render() {
    return (
        <span className="badge badge-light font-weight-normal papper-tag">#{this.props.name}</span>
    )
  }
}

export default CreateTags
