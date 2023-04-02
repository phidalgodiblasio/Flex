import React, { Component } from 'react';
import SecondaryButton from './SecondaryButton';

export default class IntakePopUp extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      value: ""
    }
  }

  handlePopUpInputChange(value) {
    this.setState({
      value: value
    })
  }

  updateIntakeIfValid(e) {
    e.preventDefault();
    const {updateIntake, adding, type, currentIntakeValue} = this.props;

    if(!adding && this.state.value > currentIntakeValue) {
      // TODO: Show the user an error for this
      console.log(`Cannot remove more ${type.toLowerCase()} than you have.`);
      return;
    }

    if(this.state.value < 0 || this.state.value == "") {
      console.log("Please enter a valid number.");
      return;
    }

    this.setState({
      value: ""
    })

    updateIntake(adding, type, this.state.value)
  }

  // Close the popup if clicking on the background
  checkClosePopUp(target) {
    if(target.id == "popup-background") this.props.closePopUp();
  }

  render() {
    const {hasBeenOpened, visible, closePopUp, adding, type, currentIntakeValue} = this.props;

    let addOrSubText = adding ? "Add" : "Remove";
    let currentIntakeText = currentIntakeValue;
    if(type != "Calories") currentIntakeText += "g";

    let classes = hasBeenOpened ? "hasBeenOpened" : "";

    return (
      <div className={classes} aria-hidden={!visible} id="popup-background" onClick={(e) => this.checkClosePopUp(e.target)}>
        <form id="popup-container" className="large-padding" onSubmit={(e) => this.updateIntakeIfValid(e)}>
          <h2 style={{margin: 0}}>{addOrSubText} {type}</h2>
          <span style={{marginBottom: "12px", display: "block"}}>Currently: {currentIntakeText}</span>
          <input type="number" className="form-input" placeholder={`Enter the amount of ${type.toLowerCase()}...`} value={this.state.value} onChange={e => this.handlePopUpInputChange(e.target.value)}></input>
          <nav id="popup-nav">
            <SecondaryButton className="left-secondary-button" onClick={() => closePopUp()}>Cancel</SecondaryButton>
            <button type="submit" className="primary-button">Save</button>
          </nav>
        </form>
      </div>
    )
  }
}
