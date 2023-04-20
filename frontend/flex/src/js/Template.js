import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp, FaCheck, FaTrash } from 'react-icons/fa';
import styles from '../style/Template.module.css';
import TemplateExercise from './TemplateExercise';
import SecondaryButton from './SecondaryButton';
import { Link } from 'react-router-dom';

export default function Template({
  template, 
  editing, 
  incrementSets, 
  decrementSets, 
  addExerciseTo, 
  handleChangeExerciseName, 
  deleteSet, 
  handleChangeTemplateName,
  deleteTemplate,
  saveTemplate,
}) {
  /*
  Template format:
  { id, name, exercises, edited, new }
  edited tells whether or not the template has been modified since the user started editing templates
  new tells whether or not a template has been added rather than pulled from the DB (to decide which fetch call to use if the user saves it)
  
  Exercise format:
  { id, name, numSets }
  id is added using globalKey, so react can render the exercises properly
  */

  const [expanded, setExpanded] = useState(false);

  let saveButton = template.edited ? (
    <button title="Save template" className="transparent-button medium-icon-button" onClick={() => saveTemplate(template.id)}><FaCheck style={{fill:'var(--tertiary-color)'}} /></button>
  ) : (
    null
  )

  let buttonsRender = editing ? (
    <>
      {saveButton}
      <button className="transparent-button trash-button medium-icon-button" onClick={() => deleteTemplate(template.id)}><FaTrash /></button>
      <button className="transparent-button medium-icon-button" onClick={() => setExpanded(!expanded)}>{expanded ? <FaAngleDown /> : <FaAngleUp />}</button>
    </>
  ) : (
    <>
      <Link to={'/create-workout'} state={{ template: template }}>
        <button className="primary-button">Start Workout</button>
      </Link>
      <button className="transparent-button medium-icon-button" onClick={() => setExpanded(!expanded)}>{expanded ? <FaAngleDown /> : <FaAngleUp />}</button>
    </>
  );

  let addExerciseRender = editing ? (
    <SecondaryButton className={styles.addExerciseButton} onClick={() => addExerciseTo(template.id)}>Add an Exercise</SecondaryButton>
  ) : (
    null
  )

  let exercisesRender = expanded ? (
    <div className={styles.exercises}>
      {
        template.exercises.map(exercise => {
          return (
            <TemplateExercise 
              key={exercise.id} 
              exercise={exercise} 
              editing={editing} 
              incrementSets={(exerciseId) => incrementSets(template.id, exerciseId)} 
              decrementSets={(exerciseId) => decrementSets(template.id, exerciseId)} 
              handleChangeExerciseName={(exerciseId, name) => handleChangeExerciseName(template.id, exerciseId, name)}
              deleteSet={(exerciseId) => deleteSet(template.id, exerciseId)}
            />
          )
        })
      }
      {addExerciseRender}
    </div>
  ) : (
    null
  )

  let titleRender = editing ? (
    <input data-empty={template.name.length == 0} placeholder={"Pick a name..."} className={`${styles.input} ${styles.templateTitleInput}`} value={template.name} onChange={e => handleChangeTemplateName(template.id, e.target.value)} />
  ) : (
    <h3 className={styles.templateTitle}>{template.name}</h3>
  )

  return (
    <div className={`section large-padding ${styles.templateWrapper}`}>
      <header className="spaced-apart">
        {titleRender}
        <div className={styles.headerButtons}>
          {buttonsRender}
        </div>
      </header>
      {exercisesRender}
    </div>
  )
}
