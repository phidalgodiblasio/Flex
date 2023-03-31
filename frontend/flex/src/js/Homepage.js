import React, { Component } from 'react';
import styles from '../style/Homepage.module.css';
import { ReactComponent as Logo } from '../assets/flex-logo.svg';
import IntakeSection from './IntakeSection';
import { FaPen } from 'react-icons/fa';
import Section from './Section';

export default class Homepage extends Component {

  // TODO: Implement homepage

  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  }

  handleLogout() {
    console.log("TODO: Implement logout");
  }

  handleEditIntake() {
    console.log("TODO: Implement handleEditIntake()");
  }

  render() {
    let intakeSection = (
      <Section title="Intake" editFunction={this.handleEditIntake}>
        <IntakeSection type="Calories" current={1600} goal={2200} />
        <IntakeSection type="Protein" current={45} goal={50} />
        <IntakeSection type="Carbs" current={280} goal={275} />
        <IntakeSection type="Fats" current={75} goal={60} />
      </Section>
    );
    let workoutSection = (
      <Section title="Workouts">
        
      </Section>
    );
    let weightSection = (
      <Section title="Weight">
        
      </Section>
    );

    return (
      <div className="container">
        <header>
          <Logo id="logo" />
          <button className="primary-button" onClick={() => this.handleLogout()}>Logout</button>
        </header>
        <h1>Hi, {this.props.username}!</h1>

        <div id={styles.innerBody}>
          {intakeSection}
          {workoutSection}
          {weightSection}
        </div>
      </div>
    )
  }
}
