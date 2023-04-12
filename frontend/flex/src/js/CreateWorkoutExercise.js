import React, { Component } from 'react'
import styles from '../style/CreateWorkout.module.css'
import { FaPlus, FaTrash } from 'react-icons/fa'

export default function CreateWorkoutExercise({id, name, sets, handleNameChange, addSet, removeSet, handleWeightChange, handleRepsChange, deleteExercise}) {
  let setRender = sets.map((set, index) => {
    let deleteButtonRender = sets.length === 1 ? null : <button onClick={() => removeSet(id, set.id)}><FaTrash /></button>
    return (
      <tr key={set.id}>
        <td>{index + 1}</td>
        <td><input type="number" value={set.weight} onChange={(e) => handleWeightChange(id, set.id, e.target.value)} /></td>
        <td><input type="number" value={set.reps} onChange={(e) => handleRepsChange(id, set.id, e.target.value)} /></td>
        <td>
          {deleteButtonRender}
        </td>
      </tr>
    )
  })

  return (
    <div className="large-padding">
      <div>
        <h3><input placeholder="Give this exercise a name..." value={name} onChange={(e) => handleNameChange(id, e.target.value)} /></h3>
        <button onClick={() => deleteExercise(id)}><FaTrash /></button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Set</th>
            <th>Weight</th>
            <th>Reps</th>
          </tr>
          {setRender}
          <tr>
            <td><button onClick={() => addSet(id)}><FaPlus /> Add A Set</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
