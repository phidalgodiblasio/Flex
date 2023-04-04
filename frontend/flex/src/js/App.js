import '../style/App.css';
import Authentication from './Authentication';
import Homepage from './Homepage';
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      loggedIn: true, 
      username: ""
    }
  }

  userLogin(username) {
    this.setState({
      loggedIn: true,
      username: username
    })
  }

  userLogout() {
    this.setState({
      loggedIn: false,
      username: ""
    })
  }

  render() {
    return this.state.loggedIn ? <Homepage userLogout={() => this.userLogout()} username={this.state.username}></Homepage> : <Authentication userLogin={(username) => this.userLogin(username)}></Authentication>;
  }
}
