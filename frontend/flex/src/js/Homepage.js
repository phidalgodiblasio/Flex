import React, { Component } from 'react'

export default class Homepage extends Component {

  // TODO: Implement homepage

  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  }


  render() {
    return (
      <div>Hi, {this.props.username}</div>
    )
  }
}
