import React, { Component } from 'react';
import styles from '../style/Homepage.module.css';
import { ReactComponent as Logo } from '../assets/flex-logo.svg';
import IntakeSection from './IntakeSection';
import WorkoutSection from './WorkoutSection';
import WeightSection from './WeightSection';
import { FaTimes } from 'react-icons/fa';
import { withRouter } from './withRouter';

class Homepage extends Component {
  componentDidMount() {
    fetch('http://localhost:8080/flex/get-username', {
        method: 'GET',
        credentials: 'include'
      }
    ).then(response => {
      if (response.status == 200) {
        response.text().then(username => {
          this.setState({
            username: username
          });
        })
      } else {
        response.text().then(body => {
          this.props.showErrorMessage(body);
        });
      }
    })
  }

  constructor(props) {
    super(props)
    
    this.state = {
      //username: Cookies.get('USERNAME'),
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
        <h1 className={styles.h1}>Hi, {this.state.username}!</h1>

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
