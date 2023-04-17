import React, { Component } from 'react'
import SecondaryButton from './SecondaryButton'
import SectionHeader from './SectionHeader'
import { FaPen, FaArrowRight, FaTimes, FaCheck } from 'react-icons/fa'
import styles from '../style/WeightSection.module.css'
import { WithErrorMessage } from './WithErrorMessage'

class WeightSection extends Component {
  componentDidMount() {
    // fetch user's weight goal
    this.getWeightGoal();
    this.getTodaysWeight();
    // TODO: fetch user's weight for today

  }

  constructor(props) {
    super(props)
  
    this.state = {
      editingWeightGoal: false,
      editingGoalValue: 0,
      todaysWeightEntered: false,
      todaysWeight: 0,
      enteredWeight: "",
      weightGoal: 150,
    }
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
    let weightToBackend={weight:this.state.enteredWeight}
    fetch(
      'http://localhost:8080/flex/weight',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(weightToBackend)
      }
    ).then(response => {
      if(response.status == 200) {
        response.text().then(x => console.log(x));
        this.setState({
          todaysWeight: this.state.enteredWeight,
          todaysWeightEntered: true

        })
      } else{
        response.text().then(body => {
          this.props.showErrorMessage(body);
        })
      }
    }).catch(error => {
      this.props.showErrorMessage(error.toString());
    })
  }


  //Getting todays weight, will just return null if no weight for the day is logged in DB, prompting user to enter weight for day
  // ^^ I think it's actually returning 0 but I'm just handling that on the frontend so it's no big deal
  getTodaysWeight(){
    fetch(
      'http://localhost:8080/flex/weight-one',
      {
        method: 'GET',
        credentials: 'include'
      }
    ).then(response => {
      if(response.status == 200) {
        response.json().then(weights => {
          let weight = weights.weight;
          this.setState({
            todaysWeight: weight,
            todaysWeightEntered: weight == 0 ? false : true,
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


  pushWeightProgressPage() {
    console.log("TODO: Implement weight progress page");
  }

  getWeightGoal() {
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
          this.setState({
            weightGoal: weightGoal,
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

  setWeightGoal(value) {
  
    let goalToBackend = { weightGoal: value }

    fetch(
      'http://localhost:8080/flex/weight-goal',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goalToBackend)
      }
    ).then(response => {
      if(response.status == 200) {
        this.setState({
          weightGoal: this.state.editingGoalValue,
          editingWeightGoal: false,
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

  saveWeightGoal() {
    if(this.state.editingGoalValue < 1 || this.state.editingGoalValue > 999) {
      this.props.showErrorMessage("Weight goal must be between 1 and 999 lbs");
      return;
    } 
    this.setWeightGoal(this.state.editingGoalValue);
  }

  toggleEditWeightGoal() {
    // set the input field's value to the current weight goal for consistency
    if(!this.state.editingWeightGoal) {
      this.setState({
        editingGoalValue: this.state.weightGoal
      })
    }

    this.setState({
      editingWeightGoal: !this.state.editingWeightGoal
    })
  }

  handleEditGoal(value) {
    this.setState({
      editingGoalValue: value
    })
  }


  render() {
    // Render the form for the user to enter their weight if they haven't already;
    // Otherwise, show their weight today
    let todaysWeight = this.state.todaysWeightEntered ? (
      <div className="small-padding" id={styles.todaysWeight}>
        <div>
          <label>Today</label>
          <h2>{this.state.todaysWeight} lbs</h2>
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

    let editGoalButton = this.state.editingWeightGoal ? (
      null
    ) : (
      <button title="Edit Goal" onClick={() => this.toggleEditWeightGoal()}>
        <FaPen />
      </button>
    )

    let weightGoalRender = this.state.editingWeightGoal ? (
      <div className={styles.editingWrapper}>
        <div className={styles.editingInputWrapper}>
          <input className={styles.editGoalInput} type="number" value={this.state.editingGoalValue} onChange={(e) => this.handleEditGoal(e.target.value)}></input>
          <span>lbs</span>
        </div>
        <div>
        <button title="Cancel" className={styles.cancel} onClick={() => this.toggleEditWeightGoal()}>
          <FaTimes />
        </button>
        <button title="Save" className={styles.save} onClick={() => this.saveWeightGoal()}>
          <FaCheck />
        </button>
        </div>
      </div>
    ) : (
      <h3>{this.state.weightGoal} lbs</h3>
    )

    return (
      <div className="section large-padding">
        <SectionHeader title="Weight" edit={() => this.edit()} editing={this.state.editing} />
        {todaysWeight}
        <div className="small-padding spaced-apart" id={styles.weightGoal}>
          <div>
            <label>Your Goal</label>
            {weightGoalRender}
          </div>
          {editGoalButton}
        </div>
        <SecondaryButton className="left-secondary-button" onClick={() => this.pushWeightProgressPage()}>View Progress <FaArrowRight /></SecondaryButton>
      </div>
    )
  }
}

export default WithErrorMessage(WeightSection);
