import React from 'react';
import styles from '../style/SaveAsTemplatePopUp.module.css'

/* 
Code copied from SaveAsTemplatePopUp and barely modified. I should make a reusable component instead,
but I'm lazy and I don't have much time lol
*/
export default function SaveAllTemplatesPopUp({popUpSelection, active, hasBeenOpened}) {

  let classes = hasBeenOpened ? "hasBeenOpened" : "";

  return (
    <div className={classes} aria-hidden={!active} id="popup-background">
      <div id="popup-container" className="large-padding">
        <h3 style={{marginBottom: '25px'}}>Do you want to save all changes?</h3>
        <div id={styles.selectors}>
          <button className="secondary-button" onClick={() => popUpSelection(false)}>
            <span>No</span>
          </button>
          <button className="primary-button" onClick={() => popUpSelection(true)}>
            Yes
          </button>
        </div> 
      </div>
    </div>
  )
}