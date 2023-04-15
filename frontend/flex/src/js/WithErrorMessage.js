import React, { useState, Component } from 'react';
import styles from '../style/WithErrorMessage.module.css';
import { FaTimes } from 'react-icons/fa';

export function WithErrorMessage(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        errorMessage: "",
        errorMessageActive: false
      }
    }

    showErrorMessage(message) {
      this.setState({
        errorMessage: message,
        errorMessageActive: true
      })
    }

    hideErrorMessage() {
      this.setState({
        errorMessage: "",
        errorMessageActive: false
      })
    }

    render() {
      let errorMessageRender = this.state.errorMessageActive ? (
        <div id={styles.errorContainer}>
          <div className="error" id={styles.error}>
            <p>{this.state.errorMessage}</p>
            <button type="button" onClick={() => this.hideErrorMessage()}>
              <FaTimes />
            </button>
          </div>
        </div>
      ) : (
        null
      )
      return (
        <>
          {errorMessageRender}
          <WrappedComponent showErrorMessage={message => this.showErrorMessage(message)} {...this.props} />
        </>
      )
    }
  }
}
