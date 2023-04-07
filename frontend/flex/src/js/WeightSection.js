import React, { Component } from 'react'
import SecondaryButton from './SecondaryButton'
import SectionHeader from './SectionHeader'
import { FaPen, FaArrowRight } from 'react-icons/fa'
import styles from '../style/WeightSection.module.css'

export default class WeightSection extends Component {
  componentDidMount() {
    // TODO: fetch user's weight goal
    fetch(
      'http://localhost:8080/flex/weight-goal',
      {
        method: 'GET',
        credentials: 'include'
      }
    ).then(response => {
      if(response.status == 200) {
        response.json().then(weights => {
          let weightGoal = weights.weightGoal;
          //decided to use a tilde if there is no current set intake goal
          if(weights.weightGoal == 0) weights.weightGoal = '~';
          this.setState({
            weightGoal: weightGoal
          })
        });
      } else {
        response.text().then(body => {
          this.props.showErrorMessage(body);
        })
      }
    }).catch(error => {
      this.props.showErrorMessage(error.toString());
    })
    // TODO: fetch user's weight for today
  }

  constructor(props) {
    super(props)
  
    this.state = {
      editing: false,
      todaysWeightEntered: false,
      todaysWeight: -1,
      enteredWeight: "",
      weightGoal: 150,
    }
  }

  edit() {
    this.setState({
      editing: !this.state.editing,
    })
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

  pushWeightProgressPage() {
    console.log("TODO: Implement weight progress page");
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
          <button type="submit" className="primary-button">
            Save
          </button>
        </form>
      </>
    );

    return (
      <div className="section large-padding">
        <SectionHeader title="Weight" edit={() => this.edit()} editing={this.state.editing} />
        {todaysWeight}
        <div className="small-padding" id={styles.weightGoal}>
          <label>Your Goal</label>
          <h3>{`${this.state.weightGoal} lbs`}</h3>
        </div>
        <SecondaryButton className="left-secondary-button" onClick={() => this.pushWeightProgressPage()}>View Progress <FaArrowRight /></SecondaryButton>
      </div>
    )
  }
}
