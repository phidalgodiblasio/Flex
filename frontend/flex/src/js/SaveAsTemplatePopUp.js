import React from 'react';
import styles from '../style/SaveAsTemplatePopUp.module.css'

export default function SaveAsTemplatePopUp({popUpSelection, active, hasBeenOpened}) {

  let classes = hasBeenOpened ? "hasBeenOpened" : "";

  return (
    <div className={classes} aria-hidden={!active} id="popup-background">
      <div id="popup-container" className="large-padding">
        <h3 style={{marginBottom: '25px'}}>Save this workout as a template?</h3>
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
