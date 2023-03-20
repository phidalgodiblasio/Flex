import '../style/App.css';
import Authentication from './Authentication';
import Homepage from './Homepage';
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)
    
    // TODO: implement sessions and save the user's logged in state within the browser
    this.state = {
      loggedIn: false
    }
  }

  render() {
    return this.state.loggedIn ? <Homepage></Homepage> : <Authentication></Authentication>;
  }
}
