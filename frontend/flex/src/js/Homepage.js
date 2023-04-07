import React, { Component } from 'react';
import styles from '../style/Homepage.module.css';
import { ReactComponent as Logo } from '../assets/flex-logo.svg';
import IntakeSection from './IntakeSection';
import WorkoutSection from './WorkoutSection';
import WeightSection from './WeightSection';
import { FaTimes } from 'react-icons/fa';
import { withRouter } from './withRouter';

class Homepage extends Component {

  constructor(props) {
    super(props)

    // Add username to session storage
    // This is so that refreshing the page will not result in a blank the username at top of the page
    if (this.props.username !== "") {
      sessionStorage.setItem("username", this.props.username);
    }
  
    this.state = {
      showErrorMessage: false,
      errorMessage: ""
    }
  }

  handleLogout() {
    fetch(
      'http://localhost:8080/logout',
      {
        method: 'POST',
        credentials: 'include'
      }
    ).then(response => {
      if(response.status == 200) {
        this.props.userLogout();
        this.props.navigate('/auth');
      } else {
        response.text().then(body => {
          this.showErrorMessage(body);
        })
      }
    }).catch(error => {
      this.showErrorMessage("Couldn't establish a connection to the database.")
    })
  }

  showErrorMessage(message) {
    this.setState({
      showErrorMessage: true,
      errorMessage: message
    })
  }

  hideErrorMessage() {
    this.setState({
      showErrorMessage: false,
      errorMessage: ""
    })
  }

  render() {
    let errorMessageRender = this.state.showErrorMessage ? (
      <div id={styles.errorContainer}>
        <div className="error" id={styles.error}>
          <p>{this.state.errorMessage}</p>
          <button type="button" onClick={() => this.hideErrorMessage()}>
            <FaTimes></FaTimes>
          </button>
        </div>
      </div>
    ) : (
      null
    )

    return (
      <div className="container">
        {errorMessageRender}
        <header className={styles.header}>
          <Logo id="logo" />
          <button className="primary-button" onClick={() => this.handleLogout()}>Logout</button>
        </header>
        <h1 className={styles.h1}>Hi, {sessionStorage.getItem("username")}!</h1>

        <div id={styles.innerBody}>
          <IntakeSection showErrorMessage={msg => this.showErrorMessage(msg)} />
          <WorkoutSection showErrorMessage={msg => this.showErrorMessage(msg)} />
          <WeightSection showErrorMessage={msg => this.showErrorMessage(msg)} />
        </div>
      </div>
    )
  }
}

export default withRouter(Homepage);
