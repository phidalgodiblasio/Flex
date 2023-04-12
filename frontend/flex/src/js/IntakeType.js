import React from 'react';
import styles from '../style/IntakeSection.module.css';
import { FaPlus, FaMinus, FaCheck, FaExclamation } from 'react-icons/fa';

export default function IntakeType(
  {
    type, // What type of intake section this is (Calories, Protein, Fats, Carbs)
    current, // Current intake value
    goal, // Goal intake value
    editingGoal, // Whether or not the user is editing the goal
    handleEditGoal, // function to call when editing the goal
    pushPopUp // function to call when adding/subtracting to an intake
  }
  ) {
  let innerClasses = `small-padding`;
  let colorRGB; // color to associate with this intake
  let innerProgressColor; // matches the background color (light version of colorRGB)
  let progressIcon = <FaCheck />;
  switch(type) {
    case "Calories":
      innerClasses += ` ${styles.calories}`;
      colorRGB = "var(--primary-rgb)";
      innerProgressColor = "var(--primary-light)";
      break;
    case "Protein":
      innerClasses += ` ${styles.protein}`;
      colorRGB = "var(--secondary-rgb)";
      innerProgressColor = "var(--secondary-light";
      break;
    case "Carbs":
      innerClasses += ` ${styles.carbs}`;
      colorRGB = "var(--tertiary-rgb)";
      innerProgressColor = "var(--tertiary-light";
      break;
    case "Fats":
      innerClasses += ` ${styles.fats}`;
      colorRGB = "var(--fourth-rgb)";
      innerProgressColor = "var(--fourth-light";
      break;
    default:
      console.log("ERROR: Unknown type inside IntakeType");
  }

  // Only execute relevant calculations depending on whether or not the user is editing the goal
  let currentText, goalText, progressDegrees;
  let editingTitle, editingInputGrams;
  if(editingGoal) {
    innerClasses += ` ${styles.editingWrapper}`

    if(type != "Calories") editingInputGrams = <span>grams</span>;
    switch(type) {
      case "Calories":
        editingTitle = "Calorie Goal";
        break;
      case "Protein":
        editingTitle = "Protein Goal";
        break;
      case "Carbs":
        editingTitle = "Carbs Goal";
        break;
      case "Fats":
        editingTitle = "Fats Goal";
        break;
      default:
        console.log("ERROR: Unknown type inside IntakeType");
    }
  } else {
    innerClasses += ` ${styles.innerWrap}`;

    // Since protein, carbs, and fats are in grams, add a g to the end of those for the display
    currentText = current;
    goalText = `/${goal}`;
    if(type != "Calories") {
      currentText += "g";
      goalText += "g";
    }

    // Hide the thing that makes the progress circle look like a border (so it'll look filled)
    if(current >= goal) {
      innerClasses += ` ${styles.goalReached}`;
    }

    // Warn the user if the current intake is >= 1.25 times their goal value
    // Ignore when goal == 0
    if(current >= 1.25 * goal && goal != 0) {
      progressIcon = <FaExclamation />
    }

    // Calculate the arc of the progress circle
    // Make sure to catch goal == 0 to avoid divide by 0 errors
    progressDegrees = goal > 0 ? `${current / goal * 360}deg` : "360deg";
  }

  return editingGoal ? (
    <div className={innerClasses} style={{"--editing-color-rgb": `${colorRGB}`}}>
      <label>{editingTitle}</label>
      <div className={styles.editingInputWrapper}>
        <input className={styles.editGoalInput} type="number" value={goal} onChange={(e) => handleEditGoal(type, e.target.value)}></input>
        {editingInputGrams}
      </div>
    </div>
  ) : (
    <div className={styles.outerWrap}>
      <div className={styles.buttonsWrap}>
        <button onClick={() => pushPopUp(true, type, current)}>
          <FaPlus />
        </button>
        <button onClick={() => pushPopUp(false, type, current)}>
          <FaMinus />
        </button>
      </div>      
      <div className={innerClasses}>
        <div>
          <label>{type}</label>
          <div>
            <span className={styles.current}>{currentText}</span>
            <span className={styles.goal}>{goalText}</span>
          </div>
        </div>
        <div
        className={styles.progress} 
        style={{background:`conic-gradient(rgb(${colorRGB}) ${progressDegrees}, rgba(${colorRGB}, 0.2) 0deg)`}}>
          {progressIcon}
          <div className={styles.progressInner} style={{backgroundColor:`${innerProgressColor}`}}/>
        </div>
      </div>
    </div>
  )
}

