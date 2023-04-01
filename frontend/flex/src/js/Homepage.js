import React, { Component } from 'react';
import styles from '../style/Homepage.module.css';
import { ReactComponent as Logo } from '../assets/flex-logo.svg';
import IntakeSection from './IntakeSection';
import { FaPen, FaArrowRight, FaPlus } from 'react-icons/fa';
import Section from './Section';
import SecondaryButton from './SecondaryButton';
import IntakePopUp from './IntakePopUp';

export default class Homepage extends Component {

  constructor(props) {
    super(props)

    let popUpState = {
      active: false,
      adding: false,
      type: "",
      currentIntakeValue: -1,
      hasBeenOpened: false
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
      intakeValues: intakeValues,
      workoutMenuOpen: false,
      workoutMenuHasBeenOpened: false,
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
        currentIntakeValue: currentIntakeValue,
        hasBeenOpened: true
      }
    })
  }

  closePopUp() {
    let newPopUpState = this.state.popUpState;
    newPopUpState.active = false;
    this.setState({
      popUpState: newPopUpState
    })
  }

  // Called when user clicks "Save" inside the intake add/subtract popup
  updateIntake(adding, type, amount) {
    // TODO: Database calls instead of local changes
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

  pushIntakeGraphsPage() {
    console.log("TODO: Implement intake graphs page");
  }

  pushExerciseLogPage() {
    console.log("TODO: Implement exercise log page");
  }

  pushWeightProgressPage() {
    console.log("TODO: Implement weight progress page");
  }

  pushTemplatesPage(editing) {
    console.log("TODO: Implement templates page");
  }

  toggleWorkoutMenu() {
    this.setState({
      workoutMenuOpen: !this.state.workoutMenuOpen,
      workoutMenuHasBeenOpened: true
    })
  }

  // All mouse clicks are intercepted and sent to this function
  // If the workout menu is open and the user isn't clicking on the menu, close the menu
  // If the intake popup is open and the user is clicking on the background, close the popup
  checkIfToggling(target) {
    if(target.className != "workout-menu-item" && this.state.workoutMenuOpen) {
      this.setState({
        workoutMenuOpen: false
      })
      return;
    }

    // Only possible when the popup is open, so I'm not gonna check that
    if(target.id == "popup-background") {
      let newPopUpState = this.state.popUpState;
      newPopUpState.active = false;
      this.setState({
        popUpState: newPopUpState
      })
    }
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

    let pushPopUp = (adding, type, current) => this.pushPopUp(adding, type, current);

    // This is for animation stuff.
    // The workout menu won't render until it has the 'clicked' class as well. This is to avoid the animation playing on page load
    let workoutMenuClasses;
    if(this.state.workoutMenuHasBeenOpened) workoutMenuClasses = "hasBeenOpened";

    return (
      <div onClick={(e) => this.checkIfToggling(e.target)}>
        <IntakePopUp
          hasBeenOpened={this.state.popUpState.hasBeenOpened}
          visible={this.state.popUpState.active}
          currentIntakeValue={this.state.popUpState.currentIntakeValue} 
          adding={this.state.popUpState.adding} type={this.state.popUpState.type} 
          closePopUp={() => this.closePopUp()} 
          updateIntake={(adding, type, amount) => this.updateIntake(adding, type, amount)} 
        />
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
              <SecondaryButton className="left-secondary-button" onClick={() => this.pushIntakeGraphsPage()}>View Progress <FaArrowRight /></SecondaryButton>
            </Section>

            <Section title="Workouts">
              <div id={styles.workoutButtons}>
                <div>
                  <button className="primary-button" onClick={() => this.toggleWorkoutMenu()}><FaPlus /> Add New Workout</button>
                  <nav className={workoutMenuClasses} aria-expanded={this.state.workoutMenuOpen}>
                    <button className="workout-menu-item">Start From Scratch</button>
                    <button className="workout-menu-item">Use A Template</button>
                  </nav>
                </div>
                <SecondaryButton onClick={() => this.pushTemplatesPage(true)}>Edit Templates</SecondaryButton>
              </div>
              <SecondaryButton className="left-secondary-button" onClick={() => this.pushExerciseLogPage()}>View Exercise Log <FaArrowRight /></SecondaryButton>
            </Section>

            <Section title="Weight">
              {todaysWeight}
              <div className="small-padding" id={styles.weightGoal}>
                <label>Your Goal</label>
                <h3>{`${this.state.weightGoal} lbs`}</h3>
              </div>
              <SecondaryButton className="left-secondary-button" onClick={() => this.pushWeightProgressPage()}>View Progress <FaArrowRight /></SecondaryButton>
            </Section>
          </div>
        </div>
      </div>
    )
  }
}
