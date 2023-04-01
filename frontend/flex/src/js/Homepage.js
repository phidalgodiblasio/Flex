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
      todaysWeightEntered: true,
      todaysWeight: 156,
      enteredWeight: "",
      weightGoal: 150,
    }
  }

  handleLogout() {
    console.log("TODO: Implement logout");
  }

  handleEditIntake() {
    console.log("TODO: Implement handleEditIntake()");
  }

  handleWeightChange(weight) {
    this.setState({
      enteredWeight: weight
    });
  }

  editWeight() {
    this.setState({
      todaysWeightEntered: false
    });
  }

  handleWeightSubmit(e) {
    e.preventDefault();
    if(this.state.enteredWeight <= 0 || this.state.enteredWeight > 999) {
      // TODO: Display an error to the user
      return;
    }

    // TODO: Make a call to the DB and save the weight, then set the state once that returns successfully

    this.setState({
      todaysWeight: this.state.enteredWeight,
      todaysWeightEntered: true
    })
  }

  render() {
    // Render the form for the user to enter their weight if they haven't already;
    // Otherwise, show their weight today
    let todaysWeight = this.state.todaysWeightEntered ? (
      <div className="small-padding" id={styles.todaysWeight}>
        <div>
          <label>Today</label>
          <h2>{`${this.state.todaysWeight} lbs`}</h2>
        </div>
        <button onClick={() => {this.editWeight()}}>
          <FaPen />
        </button>
      </div>
    ) : (
      <>
        <form id={styles.weightForm} onSubmit={(e) => this.handleWeightSubmit(e)}>
          <input type="number" className="form-input" placeholder={"Enter your weight today..."} value={this.state.enteredWeight} onChange={e => this.handleWeightChange(e.target.value)}></input>
          <button type="submit" class="primary-button">
            Save
          </button>
        </form>
      </>
    );

    return (
      <div className="container">
        <header className={styles.header}>
          <Logo id="logo" />
          <button className="primary-button" onClick={() => this.handleLogout()}>Logout</button>
        </header>
        <h1 className={styles.h1}>Hi, {this.props.username}!</h1>

        <div id={styles.innerBody}>
          <Section title="Intake" editFunction={this.handleEditIntake}>
            <IntakeSection type="Calories" current={1600} goal={2200} />
            <IntakeSection type="Protein" current={45} goal={50} />
            <IntakeSection type="Carbs" current={280} goal={275} />
            <IntakeSection type="Fats" current={75} goal={60} />
          </Section>
          <Section title="Workouts">
        
          </Section>
          <Section title="Weight">
            {todaysWeight}
            <div className="small-padding" id={styles.weightGoal}>
              <label>Your Goal</label>
              <h3>{`${this.state.weightGoal} lbs`}</h3>
            </div>
          </Section>
        </div>
      </div>
    )
  }
}
