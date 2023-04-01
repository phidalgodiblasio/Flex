import React, { Component } from 'react';
import styles from '../style/Homepage.module.css';
import { ReactComponent as Logo } from '../assets/flex-logo.svg';
import IntakeSection from './IntakeSection';
import { FaPen, FaXMark } from 'react-icons/fa';
import Section from './Section';
import SecondaryButton from './SecondaryButton';
import IntakePopUp from './IntakePopUp';

export default class Homepage extends Component {

  // TODO: Implement homepage

  constructor(props) {
    super(props)

    let popUpState = {
      active: false,
      adding: false,
      type: "",
      currentIntakeValue: -1
    }

    let intakeValues = {
      calories: {
        current: 1600,
        goal: 2200
      },
      protein: {
        current: 45,
        goal: 50
      },
      carbs: {
        current: 280,
        goal: 275
      },
      fats: {
        current: 75,
        goal: 60
      }
    }
  
    this.state = {
      todaysWeightEntered: true,
      todaysWeight: 156,
      enteredWeight: "",
      weightGoal: 150,
      popUpState: popUpState,
      intakeValues: intakeValues
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

  // adding: true if adding to the value, false if subtracting
  // type: Calories, Protein, Carbs, or Fats
  pushPopUp(adding, type, currentIntakeValue) {
    this.setState({
      popUpState: {
        active: true,
        adding: adding,
        type: type,
        currentIntakeValue: currentIntakeValue
      }
    })
  }

  closePopUp() {
    this.setState({
      popUpState: {
        active: false,
        adding: false,
        type: "",
        currentIntakeValue: -1
      }
    })
  }

  // Called when user clicks "Save" inside the intake add/subtract popup
  updateIntake(adding, type, amount) {
    // TODO: Database calls instead of local changes
    console.log(`${adding} ${type} ${amount}`)

    // Should always be a positive number
    // TODO: show the user an error instead
    if(adding < 0) return;

    amount = parseInt(amount);

    // subtract the amount if subtracting
    if(!adding) amount = -amount;

    let intakeValues = this.state.intakeValues;

    switch(type) {
      case "Calories":
        intakeValues.calories.current += amount;
        break;
      case "Protein":
        intakeValues.protein.current += amount;
        break;
      case "Carbs":
        intakeValues.carbs.current += amount;
        break;
      case "Fats":
        intakeValues.fats.current += amount;
        break;
      default:
        console.log("SOMETHING WENT VERY WRONG (Intake value update attempted with unknown type (not Calories, Protein, Carbs, or Fats?))");
    }

    this.setState({
      intakeValues: intakeValues
    })

    this.closePopUp();
  }

  render() {
    let popUpRender = this.state.popUpState.active ? (
      <IntakePopUp 
        currentIntakeValue={this.state.popUpState.currentIntakeValue} 
        adding={this.state.popUpState.adding} type={this.state.popUpState.type} 
        closePopUp={() => this.closePopUp()} 
        updateIntake={(adding, type, amount) => this.updateIntake(adding, type, amount)} 
      />
    ) : (
      null
    );

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

    let pushPopUp = (adding, type, current) => this.pushPopUp(adding, type, current);

    return (
      <>
        {popUpRender}
        <div className="container">
          <header className={styles.header}>
            <Logo id="logo" />
            <button className="primary-button" onClick={() => this.handleLogout()}>Logout</button>
          </header>
          <h1 className={styles.h1}>Hi, {this.props.username}!</h1>

          <div id={styles.innerBody}>
            <Section title="Intake" editFunction={this.handleEditIntake}>
              <IntakeSection 
                type="Calories" 
                current={this.state.intakeValues.calories.current} 
                goal={this.state.intakeValues.calories.goal} 
                pushPopUp={pushPopUp}
              />
              <IntakeSection 
                type="Protein" 
                current={this.state.intakeValues.protein.current} 
                goal={this.state.intakeValues.protein.goal} 
                pushPopUp={pushPopUp}
              />
              <IntakeSection 
                type="Carbs" 
                current={this.state.intakeValues.carbs.current} 
                goal={this.state.intakeValues.carbs.goal} 
                pushPopUp={pushPopUp}
              />
              <IntakeSection 
                type="Fats" 
                current={this.state.intakeValues.fats.current} 
                goal={this.state.intakeValues.fats.goal} 
                pushPopUp={pushPopUp}
              />
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
      </>
    )
  }
}
