import React, { Component } from 'react'
import SectionHeader from './SectionHeader'
import { FaPlus, FaArrowRight } from 'react-icons/fa'
import SecondaryButton from './SecondaryButton'
import styles from '../style/WorkoutSection.module.css'
import Workout from './Workout'

export default class WorkoutSection extends Component {
  componentDidMount() {
    // TODO: fetch user's workouts from today
  }

  constructor(props) {
    super(props)

    // TODO: get todaysWorkouts from DB instead (in componentDidMount())
    let todaysWorkouts = [
      {
        id: 0,
        name: "Bench Press",
        sets: [
          { weight: 145, reps: 10 },
          { weight: 145, reps: 10 },
          { weight: 150, reps: 10 },
          { weight: 150, reps: 8 }
        ]
      },
      {
        id: 1,
        name: "Fly Machine",
        sets: [
          { weight: 115, reps: 10 },
          { weight: 115, reps: 10 },
          { weight: 115, reps: 10 },
          { weight: 115, reps: 8 }
        ]
      }
    ]
  
    this.state = {
      editing: false,
      workoutMenuOpen: false,
      workoutMenuHasBeenOpened: false,
      todaysWorkouts: todaysWorkouts
    }
  }

  edit() {
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
    console.log("TODO: Implement exercise log page");
  }

  render() {
    // This is for animation stuff.
    // The workout menu won't render until it has the 'clicked' class as well. This is to avoid the animation playing on page load
    let workoutMenuClasses;
    if(this.state.workoutMenuHasBeenOpened) workoutMenuClasses = "hasBeenOpened";

    let todaysWorkoutsRender = this.state.todaysWorkouts.map(workout => {
      return <Workout workout={workout} />
    })

    return (
      <div className="section large-padding" onClick={(e) => this.checkCloseWorkoutMenu(e.target)}>
        <SectionHeader title="Workouts" edit={() => this.edit()} editing={this.state.editing} />
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
        <h4 id={styles.today}>Today</h4>
        {todaysWorkoutsRender}
        <SecondaryButton className="left-secondary-button" onClick={() => this.pushExerciseLogPage()}>View Exercise Log <FaArrowRight /></SecondaryButton>
      </div>
    )
  }
}

