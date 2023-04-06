import React from 'react'
import styles from '../style/Workout.module.css';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Exercise from './Exercise';
import intDateToString from './intDateToString';

export default function Workout({workout}) {

  let { exercises, name, date } = workout;

  let exercisesRender = exercises.map(exercise => {
    return <Exercise exercise={exercise} />
  })

  return (
    <div className={`${styles.workoutWrapper} small-padding`}>
      <header>
        <h3>{name}</h3>
        <span>{intDateToString(date)}</span>
      </header>
      <div>
        {exercisesRender}
      </div>
    </div>
  )
}
