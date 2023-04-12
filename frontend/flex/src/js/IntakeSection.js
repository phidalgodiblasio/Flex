import React, { Component } from 'react';
import { FaArrowRight, FaPen } from 'react-icons/fa';
import styles from '../style/Homepage.module.css';
import IntakePopUp from './IntakePopUp';
import IntakeType from './IntakeType';
import SecondaryButton from './SecondaryButton';
import SectionHeader from './SectionHeader';
import Cookies from 'js-cookie';

export default class IntakeSection extends Component {
  // Since the intake goals are edited directly in the state object, I have to back them up before editing,
  // so I can restore them if the user chooses to cancel
  backupIntakes;

  componentDidMount() {
    // fetch user's intake for today
    this.getIntakeValues();
    //get goals
    this.getIntakeGoals();
  }

  constructor(props) {
    super(props)

    // TODO: Get intakeValues from the DB instead (in componentDidMount())
    // TODO: Split intakeValues into intakeDailyValues and intakeGoals since that's how they'll be sent and received from the DB
    let intakeValues = {
      calories: {
        current: 0,
        goal: 0
      },
      protein: {
        current: 0,
        goal: 0
      },
      carbs: {
        current: 0,
        goal: 0
      },
      fats: {
        current: 0,
        goal: 0
      }
    }
  
    this.state = {
      editingGoals: false,
      popUpState: {
        active: false,
        adding: false,
        type: "",
        currentIntakeValue: "",
        hasBeenOpened: false
      },
      intakeValues: intakeValues,
    }
  }

  toggleEditingGoals() {
    // backup the intakes when starting to edit and restore them if no longer editing
    // Explanation is above backupIntakes declaration
    if(this.state.editingGoals) {
      this.setState({
        intakeValues: this.backupIntakes,
      })
    } else {
      this.backupIntakes = JSON.parse(JSON.stringify(this.state.intakeValues)) // use spread operator to create a deep copy
    }

    this.setState({
      editingGoals: !this.state.editingGoals
    })
  }

  saveGoals() {
    let intakeGoalsToBackend = {
      calGoal: this.state.intakeValues.calories.goal,
      proteinGoal: this.state.intakeValues.protein.goal,
      carbGoal: this.state.intakeValues.carbs.goal,
      fatGoal: this.state.intakeValues.fats.goal,
    }

    fetch(
      'http://localhost:8080/flex/intake-goal',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(intakeGoalsToBackend)
      }
    ).then(response => {
      if(response.status == 200) {
        response.text().then(x => console.log(x));
        this.setState({
          editingGoals: !this.state.editingGoals
        })
      } else {
        response.text().then(body => {
          this.props.showErrorMessage(body);
        })
      }
    }).catch(error => {
      this.props.showErrorMessage(error.toString());
    })
    
  }

  handleEditGoal(type, goal) {
    let intakeValues = this.state.intakeValues;

    switch(type) {
      case "Calories":
        intakeValues.calories.goal = goal;
        break;
      case "Protein":
        intakeValues.protein.goal = goal;
        break;
      case "Carbs":
        intakeValues.carbs.goal = goal;
        break;
      case "Fats":
        intakeValues.fats.goal = goal;
        break;
      default:
        console.log("SOMETHING WENT VERY WRONG (Intake goal update attempted with unknown type (not Calories, Protein, Carbs, or Fats?))");
    }

    this.setState({
      intakeValues: intakeValues
    })
  }

  pushIntakeGraphsPage() {
    console.log("TODO: Implement intake graphs page");
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

    this.setIntakeValues(intakeValues);

    this.closePopUp();
  }

  setIntakeValues(intakeValues) {
    let intakesToBackend = {
      calorieSum: intakeValues.calories.current,
      proteinSum: intakeValues.protein.current,
      carbSum: intakeValues.carbs.current,
      fatSum: intakeValues.fats.current,
    }
    
    fetch(
      'http://localhost:8080/flex/intake',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(intakesToBackend)
      }
    ).then(response => {
      if(response.status == 200) {
        response.text().then(x => console.log(x));
        this.setState({
          intakeValues: intakeValues
        })
      } else {
        response.text().then(body => {
          this.props.showErrorMessage(body);
        })
      }
    }).catch(error => {
      this.props.showErrorMessage(error.toString());
    })
  }

  getIntakeValues() {
    fetch(
      'http://localhost:8080/flex/intake-one',
      {
        method: 'GET',
        credentials: 'include'
      }
    ).then(response => {
      if(response.status == 200) {
        response.json().then(intakes => {
          let intakeValues = this.state.intakeValues;
          intakeValues.calories.current = intakes.calorieSum;
          intakeValues.protein.current = intakes.proteinSum;
          intakeValues.carbs.current = intakes.carbSum;
          intakeValues.fats.current = intakes.fatSum;
          this.setState({
            intakeValues: intakeValues
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
  }

  getIntakeGoals()
  {
    fetch(
      'http://localhost:8080/flex/intake-goal',
      {
        method: 'GET',
        credentials: 'include'
      }
    ).then(response => {
      if(response.status == 200) {
        response.json().then(intakes => {
          let intakeValues = this.state.intakeValues;
          intakeValues.calories.goal = intakes.calGoal;
          intakeValues.protein.goal = intakes.proteinGoal;
          intakeValues.carbs.goal = intakes.carbGoal;
          intakeValues.fats.goal = intakes.fatGoal;
          this.setState({
            intakeValues: intakeValues
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
  }

  render() {
    // Using a key so that react doesn't think the cancel and the editing goals buttons are the same (b/c it causes a css transition)
    // I could avoid this by just changing the css transition but whatever lol
    let headerButtons = this.state.editingGoals ? (
      <>
        <button key={"cancel"} className="secondary-button" onClick={() => this.toggleEditingGoals()}><span>Cancel</span></button>
        <button className="primary-button" onClick={() => this.saveGoals()}>Save</button>
      </>
    ) : (
      <button key={"editGoals"} className="secondary-button right-secondary-button" onClick={() => this.toggleEditingGoals()}><span>Edit Goals</span></button>
    )
    
    let pushPopUp = (adding, type, current) => this.pushPopUp(adding, type, current);
    let handleEditGoal = (type, goal) => this.handleEditGoal(type, goal);

    return (
      <>
        <IntakePopUp
          hasBeenOpened={this.state.popUpState.hasBeenOpened}
          visible={this.state.popUpState.active}
          currentIntakeValue={this.state.popUpState.currentIntakeValue} 
          adding={this.state.popUpState.adding} type={this.state.popUpState.type} 
          closePopUp={() => this.closePopUp()} 
          updateIntake={(adding, type, amount) => this.updateIntake(adding, type, amount)} 
        />
        <div className="section large-padding">
          <SectionHeader title="Intake">
            {headerButtons}
          </SectionHeader>
          <IntakeType 
            type="Calories" 
            current={this.state.intakeValues.calories.current} 
            goal={this.state.intakeValues.calories.goal}
            editingGoal={this.state.editingGoals}
            handleEditGoal={handleEditGoal}
            pushPopUp={pushPopUp}
          />
          <IntakeType 
            type="Protein" 
            current={this.state.intakeValues.protein.current} 
            goal={this.state.intakeValues.protein.goal} 
            editingGoal={this.state.editingGoals}
            handleEditGoal={handleEditGoal}
            pushPopUp={pushPopUp}
          />
          <IntakeType 
            type="Carbs" 
            current={this.state.intakeValues.carbs.current} 
            goal={this.state.intakeValues.carbs.goal} 
            editingGoal={this.state.editingGoals}
            handleEditGoal={handleEditGoal}
            pushPopUp={pushPopUp}
          />
          <IntakeType 
            type="Fats" 
            current={this.state.intakeValues.fats.current} 
            goal={this.state.intakeValues.fats.goal} 
            editingGoal={this.state.editingGoals}
            handleEditGoal={handleEditGoal}
            pushPopUp={pushPopUp}
          />
          <SecondaryButton className="left-secondary-button" onClick={() => this.pushIntakeGraphsPage()}>View Progress <FaArrowRight /></SecondaryButton>
        </div>
      </>
    )
  }
}