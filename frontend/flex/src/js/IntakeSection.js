import React, { Component } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import styles from '../style/Homepage.module.css';
import IntakePopUp from './IntakePopUp';
import IntakeType from './IntakeType';
import SecondaryButton from './SecondaryButton';
import SectionHeader from './SectionHeader';
import Cookies from 'js-cookie';

export default class IntakeSection extends Component {
  componentDidMount() {
    // TODO: fetch user's intake goals
    // fetch user's intake for today
    fetch(
      'http://localhost:8080/flex/intake-one',
      {
        method: 'GET',
        credentials: 'include'
      }
    ).then(response => {
      if(response.status == 200) {
        console.log("Fetch user's daily intake SUCCESS")
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

    let intakesToBackend = {
      calorieSum: intakeValues.calories.current,
      proteinSum: intakeValues.protein.current,
      carbSum: intakeValues.carbs.current,
      fatSum: intakeValues.fats.current,
    }

    // Not working for some reason :(

    // fetch(
    //   'http://localhost:8080/flex/intake',
    //   {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(intakesToBackend)
    //   }
    // ).then(response => {
    //   if(response.status == 200) {
    //     response.text().then(x => console.log(x));
    //     this.setState({
    //       intakeValues: intakeValues
    //     })
    //   } else {
    //     response.text().then(body => {
    //       this.props.showErrorMessage(body);
    //     })
    //   }
    // }).catch(error => {
    //   this.props.showErrorMessage(error.toString());
    // })

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