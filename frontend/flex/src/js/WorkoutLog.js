import React, { Component } from 'react'
import PageHeader from './PageHeader'
import { FaCheck } from 'react-icons/fa'
import Workout from './Workout'
import { WithErrorMessage } from './WithErrorMessage';

class WorkoutLog extends Component {
  componentDidMount() {
    this.getAllWorkouts();
  }

  constructor(props) {
    super(props)
  
    this.state = {
      editing: false,
      workouts: []
    }
  }

  toggleEditing() {
    this.setState({
      editing: !this.state.editing
    })
  }

  // COPIED FROM WORKOUTSECTION.JS; SHOULD BE DONE WITH A HIGHER ORDER COMPONENT INSTEAD BUT WHATEVER MAN
  deleteWorkout(id) {
    // Delete workout
    fetch('http://localhost:8080/flex/workout-delete', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: id // This is just the id for the workout to be deleted
    }).then(response => {
      if (response.status != 200) {
        response.text().then(body => {
          this.props.showErrorMessage(body);
        });
      }

      this.getAllWorkouts();
    })
  }

  getAllWorkouts() {
    fetch('http://localhost:8080/flex/workout-all', {
      method: 'GET',
      credentials: 'include',
    }).then(response => {
      if (response.status != 200) {
        response.text().then(body => {
          this.props.showErrorMessage(body);
        });
      }

      response.json().then(workouts => {
        this.setState({
          workouts: workouts
        })
      })
    })
  }

  render() {
    let rightButton = this.state.editing ? (
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

    let workoutsRender = this.state.workouts.map(workout => {
      return <Workout key={workout.id} onLogPage={true} workout={workout} editing={this.state.editing} deleteWorkout={(id) => this.deleteWorkout(id)} />
    })

    return (
      <>
        <PageHeader title="Workout Log" rightButton={rightButton} />
        <div className="container">
          {workoutsRender}
        </div>
      </>
    )
  }
}

export default WithErrorMessage(WorkoutLog);
