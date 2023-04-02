import React, { Component } from 'react'
import SectionHeader from './SectionHeader'
import { FaPlus, FaArrowRight } from 'react-icons/fa'
import SecondaryButton from './SecondaryButton'
import styles from '../style/WorkoutSection.module.css'

export default class WorkoutSection extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      editing: false,
      workoutMenuOpen: false,
      workoutMenuHasBeenOpened: false,
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
        <SecondaryButton className="left-secondary-button" onClick={() => this.pushExerciseLogPage()}>View Exercise Log <FaArrowRight /></SecondaryButton>
      </div>
    )
  }
}

