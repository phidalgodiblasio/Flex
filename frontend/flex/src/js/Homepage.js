import React, { Component } from 'react';
import styles from '../style/Homepage.module.css';
import { ReactComponent as Logo } from '../assets/flex-logo.svg';
import IntakeSection from './IntakeSection';
import WorkoutSection from './WorkoutSection';
import WeightSection from './WeightSection';

export default class Homepage extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  }

  handleLogout() {
    console.log("TODO: Implement logout");
  }

  render() {
    return (
      <div className="container">
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
