import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';
import styles from '../style/CreateWorkout.module.css';
import PageHeader from './PageHeader';
import CreateWorkoutExercise from './CreateWorkoutExercise';
import { WithErrorMessage } from './WithErrorMessage';
import { withRouter } from './withRouter';
import SaveAsTemplatePopUp from './SaveAsTemplatePopUp';
import { withLocation } from './withLocation';

class CreateWorkout extends Component {
  // use this to make sure every list item that's getting rendered will have its own unique ID that maintains across re-renders
  universalKey = 0;

  constructor(props) {
    super(props)

    let template = {
      name: "",
      exercises: []
    };
    if(props.location.state) template = props.location.state.template;

    let exercises = this.getExercisesFromTemplate(template);
  
    // TODO: Pull exercises in as a prop (idk why i was struggling with this)
    this.state = {
      workoutName: template.name,
      exercises: exercises,
      popUpState: {
        active: false,
        hasBeenOpened: false,
      }
    }
  }

  getExercisesFromTemplate(template) {
    return template.exercises.map(exercise => {
      let sets = [];
      for(let i = 0; i < exercise.numSets; i++) {
        sets.push({
          id: this.universalKey++,
          weight: 0,
          reps: 0,
        })
      }

      return {
        id: this.universalKey++,
        name: exercise.name,
        sets: sets,
      }
    })
  }

  addExercise() {
    let newExercises = this.state.exercises;
    let newExercise = {
      id: this.universalKey++,
      name: "",
      sets: [
        {
          id: this.universalKey++,
          weight: 0,
          reps: 0,
        }
      ]
    }
    newExercises.push(newExercise);
    this.setState({
      exercises: newExercises
    })
  }

  handleNameChange(id, name) {
    // find the exercise with the given id and update its name to the new name
    let newExercises = this.state.exercises.map(exercise => {
      if(exercise.id === id) return {...exercise, name: name}
      return exercise;
    })

    this.setState({
      exercises: newExercises
    })
  }

  handleWeightChange(exerciseId, setId, weight) {
    // find the exercise with id exerciseId, then find the set within that exercise that has id setId
    // change the weight of that set while maintaining everything else about the objects
    // yeah, i hate this too. no idea how to do it better tho
    let newExercises = this.state.exercises.map(exercise => {
      if(exercise.id === exerciseId) {
        let newSets = exercise.sets.map(set => {
          if(set.id === setId) return {...set, weight: weight}
          return set;
        })
        return {...exercise, sets: newSets}
      }
      return exercise;
    })

    this.setState({
      exercises: newExercises
    })
  }

  handleRepsChange(exerciseId, setId, reps) {
    // find the exercise with id exerciseId, then find the set within that exercise that has id setId
    // change the reps of that set while maintaining everything else about the objects
    // yeah, i hate this too. no idea how to do it better tho
    let newExercises = this.state.exercises.map(exercise => {
      if(exercise.id === exerciseId) {
        let newSets = exercise.sets.map(set => {
          if(set.id === setId) return {...set, reps: reps}
          return set;
        })
        return {...exercise, sets: newSets}
      }
      return exercise;
    })

    this.setState({
      exercises: newExercises
    })
  }

  addSet(id) {
    let newExercises = this.state.exercises.map(exercise => {
      // Add a new set to the end of the exercise with the matching id
      if(exercise.id === id) {
        let newSets = exercise.sets;
        newSets.push({ id: this.universalKey++, weight: 0, reps: 0})
        return {...exercise, sets: newSets}
      }
      return exercise;
    })

    this.setState({
      exercises: newExercises
    })
  }

  removeSet(exerciseId, setId) {
    let newExercises = this.state.exercises.map(exercise => {
      // Add a new set to the end of the exercise with the matching id
      if(exercise.id === exerciseId) {
        // remove the set that has id of setId
        let newSets = exercise.sets.filter(set => set.id != setId)
        return {...exercise, sets: newSets}
      }
      return exercise;
    })

    this.setState({
      exercises: newExercises
    })
  }

  deleteExercise(id) {
    let newExercises = this.state.exercises.filter(exercise => exercise.id != id);

    this.setState({
      exercises: newExercises
    })
  }

  handleWorkoutNameChange(name) {
    this.setState({
      workoutName: name
    })
  }

  // Check if the user has entered valid info for the workout
  workoutStateOk() {
    if(this.state.workoutName == "") {
      this.props.showErrorMessage("Please give your workout a name.");
      return false;
    }
    if(this.state.exercises.length == 0) {
      this.props.showErrorMessage("Please add at least one exercise to your workout.");
      return false;
    }
    let missingExerciseName = false;
    this.state.exercises.forEach(exercise => { if(exercise.name == "") missingExerciseName = true; })
    if(missingExerciseName) {
      this.props.showErrorMessage("At least one exercise is missing a name");
      return false;
    } 

    return true;
  }

  saveWorkout() {
    // Remove all ids from exercises and sets to have correct format for backend
    let exercisesToBackend = this.state.exercises.map(exercise => {
      // Remove ids from sets
      let setsToBackend = exercise.sets.map(set => {
        return (
          {
            weight: set.weight,
            reps: set.reps,
          }
        )
      })
      return (
        {
          name: exercise.name,
          sets: setsToBackend
        }
      )
    })

    let workout = {
      name: this.state.workoutName,
      exercises: exercisesToBackend,
    }

    fetch(
      'http://localhost:8080/flex/workout', 
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(workout) // Add JSON here
      }
    ).then(response => {
      if (response.status != 200) {
        response.text().then(body => {
          this.props.showErrorMessage(body);
        });
        return;
      }

      this.props.navigate('/home');
    })
  }

  saveAsTemplate() {
    let templateToBackend = { name: this.state.workoutName, exercises: []};
    
    /*
    Format: {name, Array of [exercise name, #sets]}
    */

    for(let exercise of this.state.exercises) {
      templateToBackend.exercises.push([exercise.name, exercise.sets.length.toString()])
    }
    
    fetch(
      'http://localhost:8080/flex/template-add', 
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(templateToBackend)
      }
    ).then(response => {
      if (response.status != 200) {
        response.text().then(body => {
          this.props.showErrorMessage(body);
        });
        return;
      }

      response.text().then(body => {
        console.log(body);
      })
    })
  }

  popUpSelection(save) {
    this.closePopUp();

    // Save the workout as a template if the user selected that they wanted to
    if(save) {
      this.saveAsTemplate();
      this.saveWorkout();
    } else {
      this.saveWorkout();
    }
  }

  showPopUp() {
    if(!this.workoutStateOk()) return;
    this.setState({
      popUpState: {
        active: true,
        hasBeenOpened: true
      }
    })
  }

  closePopUp() {
    this.setState({
      popUpState: {
        active: false,
        hasBeenOpened: true
      }
    })
  }

  render() {
    // Yeah i know i hate that im passing in all these functions but idk how else to do this
    // I have to maintain the state in this parent object, otherwise I can't have a dynamic list of exercises with changing state
    // this is because when i add/remove an exercise, the state of this parent will change and cause a rerender, causing all the exercises to lose state
    // if you know a better way of doing this please tell me
    let exercisesRender = this.state.exercises.map(exercise => {
      let render = <CreateWorkoutExercise 
        key={exercise.id} 
        id={exercise.id} 
        name={exercise.name} 
        sets={exercise.sets} 
        handleNameChange={(id, name) => this.handleNameChange(id, name)} 
        handleWeightChange={(exerciseId, setId, weight) => this.handleWeightChange(exerciseId, setId, weight)}
        handleRepsChange={(exerciseId, setId, reps) => this.handleRepsChange(exerciseId, setId, reps)}
        addSet={(id) => this.addSet(id)}
        removeSet={(exerciseId, setId) => this.removeSet(exerciseId, setId)}
        deleteExercise={(id) => this.deleteExercise(id)}
      />;
      return render;
    })

    return (
      <>
        <SaveAsTemplatePopUp 
          hasBeenOpened={this.state.popUpState.hasBeenOpened}
          active={this.state.popUpState.active} 
          popUpSelection={(selection) => this.popUpSelection(selection)} />
        <PageHeader title="Create a Workout" />
        <div className="container" id={styles.workoutContainer}>
          <input className={styles.noBackgroundInput} placeholder="Give your workout a name..." value={this.state.workoutName} onChange={(e) => this.handleWorkoutNameChange(e.target.value)} />
          {exercisesRender}
          <div id={styles.buttonsContainer}>
            <button className="secondary-button left-secondary-button" onClick={() => this.addExercise()}><span>Add an Exercise <FaPlus /></span></button>
            <button className="primary-button" onClick={() => this.showPopUp()}>Save</button>
          </div>
        </div>
      </>
    )
  }
}

export default withLocation(withRouter(WithErrorMessage(CreateWorkout)));