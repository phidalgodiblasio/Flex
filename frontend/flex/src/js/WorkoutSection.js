import React, { Component } from 'react'
import SectionHeader from './SectionHeader'
import { FaPlus, FaArrowRight, FaCheck } from 'react-icons/fa'
import SecondaryButton from './SecondaryButton'
import styles from '../style/WorkoutSection.module.css'
import Workout from './Workout'
import { withRouter } from './withRouter'
import { WithErrorMessage } from './WithErrorMessage'

class WorkoutSection extends Component {  
  componentDidMount() {    
    this.getTodaysWorkouts();
  }

  constructor(props) {
    super(props)
  
    this.state = {
      editing: false,
      workoutMenuOpen: false,
      workoutMenuHasBeenOpened: false,
      todaysWorkouts: []
    }
  }

  deleteWorkout(id) {
    // Delete workout
    fetch('http://localhost:8080/flex/workout-delete', {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: id // This is just the id for the workout to be deleted
      }
    ).then(response => {
      if (response.status != 200) {
        response.text().then(body => {
          this.props.showErrorMessage(body);
        });
      }

      this.getTodaysWorkouts();
    })
  }

  getTodaysWorkouts() {
    // Get today's workouts
    fetch('http://localhost:8080/flex/workout-today', {
        method: 'GET',
        credentials: 'include'
      }
    ).then(response => {
      if (response.status == 200) {
        response.json().then(workouts => {
          this.setState({
            todaysWorkouts: workouts
          });
        })
      } else {
        response.text().then(body => {
          this.props.showErrorMessage(body);
        });
      }
    })
  }

  toggleEditing() {
    this.setState({
      editing: !this.state.editing
    })
  }

  toggleWorkoutMenu() {
    this.setState({
      workoutMenuOpen: !this.state.workoutMenuOpen,
      workoutMenuHasBeenOpened: true
    })
  }

  checkCloseWorkoutMenu(target) {
    if(this.state.workoutMenuOpen && target.className !="workout-menu-item") {
      this.toggleWorkoutMenu();
    }
  }

  pushTemplatesPage(editing) {
    console.log("TODO: Implement templates page");
  }

  pushExerciseLogPage() {
    this.props.navigate('/workout-log');
  }

  render() {
    // This is for animation stuff.
    // The workout menu won't render until it has the 'clicked' class as well. This is to avoid the animation playing on page load
    let workoutMenuClasses;
    if(this.state.workoutMenuHasBeenOpened) workoutMenuClasses = "hasBeenOpened";

    let todaysWorkoutsRender = this.state.todaysWorkouts.map(workout => {
      return <Workout key={workout.id} workout={workout} editing={this.state.editing} deleteWorkout={(id) => this.deleteWorkout(id)} />
    })

    let editButtonRender = this.state.editing ? (
      <>
        <button className="transparent-button header-icon-button" onClick={() => this.toggleEditing()}>
          <FaCheck style={{fill: "var(--tertiary-color)"}} />
        </button>
      </>
    ) : (
      <button className="secondary-button right-secondary-button" onClick={() => this.toggleEditing()}>
        <span>Edit Workouts</span>
      </button>
    )

    let titleRender = this.state.todaysWorkouts.length == 0 ? (
      <p id={styles.noWorkouts}>No workouts logged today.</p>
    ) : (
      <div className="spaced-apart">
        <h4>Today</h4>
        {editButtonRender}
      </div>
    )

    return (
      <div className="section large-padding" onClick={(e) => this.checkCloseWorkoutMenu(e.target)}>
        <SectionHeader title="Workouts" />
        <div id={styles.workoutButtons}>
          <div>
            <button className="primary-button" onClick={() => this.toggleWorkoutMenu()}><FaPlus /> Add New Workout</button>
            <nav className={workoutMenuClasses} aria-expanded={this.state.workoutMenuOpen}>
              <button onClick={() => this.props.navigate('/create-workout')} className="workout-menu-item">Start From Scratch</button>
              <button className="workout-menu-item">Use A Template</button>
            </nav>
          </div>
          <SecondaryButton onClick={() => this.pushTemplatesPage(true)}>Edit Templates</SecondaryButton>
        </div>
        {titleRender}
        {todaysWorkoutsRender}
        <SecondaryButton className="left-secondary-button" onClick={() => this.pushExerciseLogPage()}>View Workout Log <FaArrowRight /></SecondaryButton>
      </div>
    )
  }
}

export default withRouter(WithErrorMessage(WorkoutSection));
