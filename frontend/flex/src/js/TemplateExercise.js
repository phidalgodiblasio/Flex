import React from 'react';
import styles from '../style/Template.module.css';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

export default function TemplateExercise({exercise, editing, incrementSets, decrementSets, handleChangeExerciseName, deleteSet}) {
  let rightSideRender = editing ? (
    <div className={styles.rightSideWrapper}>
      <div className={styles.editingSetsWrapper}>
        <p className={styles.sets}>{exercise.numSets} {exercise.numSets > 1 ? "Sets" : "Set"}</p>
        <div className={styles.setButtons}>
          <button disabled={exercise.numSets == 1} onClick={() => decrementSets(exercise.id)}><FaMinus /></button>
          <button onClick={() => incrementSets(exercise.id)}><FaPlus /></button>
        </div>
      </div>
      <button className="transparent-button trash-button" onClick={() => deleteSet(exercise.id)}><FaTrash /></button>
    </div>
    
  ) : (
    <p className={styles.sets}>{exercise.numSets} {exercise.numSets > 1 ? "Sets" : "Set"}</p>
  )

  let titleRender = editing ? (
    <div className={styles.inputWrapper}>
      <input className={styles.input} data-empty={exercise.name.length == 0} placeholder={"Pick a name..."} value={exercise.name} onChange={e => handleChangeExerciseName(exercise.id, e.target.value)} />
    </div>
  ) : (
    <p className={styles.exerciseName}>{exercise.name}</p>
  )

  return (
    <div className={`${styles.exercise} small-padding spaced-apart`}>
      {titleRender}
      {rightSideRender}
    </div>
  )
}
