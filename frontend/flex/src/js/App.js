import '../style/App.css';
import Authentication from './Authentication';
import Homepage from './Homepage';
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)
    
    // TODO: reset values after testing homepage
    this.state = {
      loggedIn: true, 
      username: "Pierce"
    }
  }

  authenticated(username) {
    this.setState({
      loggedIn: true,
      username: username,
    })
  }

  render() {
    return this.state.loggedIn ? <Homepage username={this.state.username}></Homepage> : <Authentication authenticated={(username) => this.authenticated(username)}></Authentication>;
  }
}
