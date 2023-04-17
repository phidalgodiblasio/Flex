import React from 'react'
import styles from '../style/Workout.module.css';
import { FaAngleDown, FaAngleUp, FaTrash } from 'react-icons/fa';
import Exercise from './Exercise';
import intDateToString from './intDateToString';

export default function Workout({workout, editing, deleteWorkout, onLogPage}) {
  let { exercises, name, date, id } = workout;

  let exercisesRender = exercises.map(exercise => {
    return <Exercise key={exercise.id} exercise={exercise} />
  })

  let deleteButtonRender = editing ? (
    <button className="transparent-button trash-button" onClick={() => deleteWorkout(id)}>
      <FaTrash />
    </button>
  ) : (
    null
  )

  let logPageId;
  if(onLogPage) logPageId = styles.onLogPage;

  return (
    <div id={logPageId} className={`${styles.workoutWrapper} small-padding`}>
      <header>
        <h3>{name}</h3>
        <div>
          <span>{date}</span>
          {deleteButtonRender}
        </div>
      </header>
      <div>
        {exercisesRender}
      </div>
    </div>
  )
}
