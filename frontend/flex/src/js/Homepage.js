import React, { Component } from 'react';
import styles from '../style/Homepage.module.css';
import { ReactComponent as Logo } from '../assets/flex-logo.svg';
import IntakeSection from './IntakeSection';
import WorkoutSection from './WorkoutSection';
import WeightSection from './WeightSection';
import { FaTimes } from 'react-icons/fa';

export default class Homepage extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      showErrorMessage: false,
      errorMessage: ""
    }
  }

  handleLogout() {
    fetch(
      'http://localhost:8080/logout',
      {
        method: 'POST'
      }
    ).then(response => {
      if(response.status == 200) {
        this.props.userLogout();
      } else {
        response.text().then(body => {
          this.setState({
            showErrorMessage: true,
            errorMessage: body
          })
        })
      }
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
        <h1 className={styles.h1}>Hi, {this.props.username}!</h1>

        <div id={styles.innerBody}>
          <IntakeSection />
          <WorkoutSection />
          <WeightSection />
        </div>
      </div>
    )
  }
}
