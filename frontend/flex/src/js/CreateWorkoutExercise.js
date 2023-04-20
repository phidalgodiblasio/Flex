import React, { Component } from 'react'
import styles from '../style/CreateWorkout.module.css'
import { FaPlus, FaTrash } from 'react-icons/fa'

export default function CreateWorkoutExercise({id, name, sets, handleNameChange, addSet, removeSet, handleWeightChange, handleRepsChange, deleteExercise}) {
  let setRender = sets.map((set, index) => {
    let deleteButtonRender = sets.length === 1 ? (
      null 
    ) : (
      <td className={styles.deleteSetButton}>
        <button className="transparent-button trash-button" onClick={() => removeSet(id, set.id)}><FaTrash /></button>
      </td>
    ) 
    return (
      <tr key={set.id}>
        <td>{index + 1}</td>
        <td><input className={styles.exerciseDataInput} type="number" value={set.weight} onChange={(e) => handleWeightChange(id, set.id, e.target.value)} /></td>
        <td><input className={styles.exerciseDataInput} type="number" value={set.reps} onChange={(e) => handleRepsChange(id, set.id, e.target.value)} /></td>
        {deleteButtonRender}
      </tr>
    )
  })

  return (
    <div className={`large-padding ${styles.exerciseWrapper}`}>
      <header className="spaced-apart">
        <input className={`${styles.nameInput} ${styles.noBackgroundInput}`} placeholder="Give this exercise a name..." value={name} onChange={(e) => handleNameChange(id, e.target.value)} />
        <button className="transparent-button trash-button" onClick={() => deleteExercise(id)}><FaTrash /></button>
      </header>
      <table className={styles.exerciseTable}>
        <thead>
          <tr>
            <th>Set</th>
            <th>Weight <span>(lbs)</span></th>
            <th>Reps</th>
            { sets.length === 1 ? null : <th style={{width: "50px"}}></th> }
          </tr>
        </thead>
        <tbody>
          {setRender}
          <tr>
            <td colSpan={sets.length === 1 ? 3 : 4 /* Match number of columns in table */}><button className={`secondary-button ${styles.addSetButton}`} onClick={() => addSet(id)}><span>Add A Set <FaPlus /></span></button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
