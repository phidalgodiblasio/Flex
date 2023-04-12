import React, { Component } from 'react';
import { FaHome, FaPlus } from 'react-icons/fa';
import { withRouter } from './withRouter';
import styles from '../style/CreateWorkout.module.css';
import PageHeader from './PageHeader';
import CreateWorkoutExercise from './CreateWorkoutExercise';

export default class CreateWorkout extends Component {
  universalKey = 0;

  constructor(props) {
    super(props)
  
    // TODO: Pull exercises in as a prop (idk why i was struggling with this)
    this.state = {
      exercises: []
    }
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

  /*addExerciseAfterIndex(index) {
    let newExercise = {
      id: this.universalKey++,
      name: "",
      sets: [
        {
          weight: 0,
          reps: 0,
        }
      ]
    }

    // Create a new exercise array [all items before index, {newExercise}, all items after index]
    let newExercises = this.state.exercises.slice(0, index + 1);
    newExercises.push(newExercise);
    newExercises = newExercises.concat(this.state.exercises.slice(index + 1));

    this.setState({
      exercises: newExercises
    })
  }*/

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

  render() {
    // Yeah i know i hate that im passing in all these functions but idk how else to do this
    // I have to maintain the state in this parent object, otherwise I can't have a dynamic list of exercises with changing state
    // this is because when i add/remove an exercise, the state of this parent will change and cause a rerender, causing all the exercises to lose state
    // if you know a better way of doing this please tell me
    let exercisesRender = this.state.exercises.map((exercise, index) => {
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
      /*if(index != this.state.exercises.length - 1) {
        render = (
          <>
            {render}
            <button onClick={() => this.addExerciseAfterIndex(index)}><FaPlus /></button>
          </>
        )
      }*/
      return render;
    })

    return (
      <>
        <PageHeader title="Create a Workout" />
        <div className="container">
          {exercisesRender}
          <button onClick={() => this.addExercise()}>
            Add an Exercise
          </button>
        </div>
      </>
    )
  }
}