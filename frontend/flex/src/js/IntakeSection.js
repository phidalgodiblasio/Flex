import React, { Component } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import styles from '../style/Homepage.module.css';
import IntakePopUp from './IntakePopUp';
import IntakeType from './IntakeType';
import SecondaryButton from './SecondaryButton';
import SectionHeader from './SectionHeader';

export default class IntakeSection extends Component {
  constructor(props) {
    super(props)

    // TODO: Get this values from the DB instead (in componentWillMount())
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
      editing: false,
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

  edit() {
    this.setState({
      editing: !this.state.editing
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

    // TODO: Database calls instead of local changes
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
    
    let pushPopUp = (adding, type, current) => this.pushPopUp(adding, type, current);

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
          <SectionHeader title="Intake" edit={() => this.edit()} editing={this.state.editing} />
          <IntakeType 
            type="Calories" 
            current={this.state.intakeValues.calories.current} 
            goal={this.state.intakeValues.calories.goal} 
            pushPopUp={pushPopUp}
          />
          <IntakeType 
            type="Protein" 
            current={this.state.intakeValues.protein.current} 
            goal={this.state.intakeValues.protein.goal} 
            pushPopUp={pushPopUp}
          />
          <IntakeType 
            type="Carbs" 
            current={this.state.intakeValues.carbs.current} 
            goal={this.state.intakeValues.carbs.goal} 
            pushPopUp={pushPopUp}
          />
          <IntakeType 
            type="Fats" 
            current={this.state.intakeValues.fats.current} 
            goal={this.state.intakeValues.fats.goal} 
            pushPopUp={pushPopUp}
          />
          <SecondaryButton className="left-secondary-button" onClick={() => this.pushIntakeGraphsPage()}>View Progress <FaArrowRight /></SecondaryButton>
        </div>
      </>
    )
  }
}