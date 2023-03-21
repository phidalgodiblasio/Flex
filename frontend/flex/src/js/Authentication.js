import styles from '../style/Authentication.module.css';
import React, { Component } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ReactComponent as Logo } from '../assets/flex-logo.svg';

export default class Authentication extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      onLoginPage: true,
      username: "",
      password: "",
      retypePassword: "",
      showPassword: false,
      usernameError: false,
      passwordError: false,
      passwordMatch: true,
    }
  }

  toggleShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  switchPage() {
    this.setState({
      onLoginPage: !this.state.onLoginPage
    })
  }

  checkInputOk() {
    let ok = true;
    if(this.state.username.length === 0) {
      this.setState({
        usernameError: true
      })
      ok = false;
    }
    if(this.state.password.length < 8) {
      this.setState({
        passwordError: true
      })
      ok = false;
    }
    // Check if password = retyped password on register page only
    if(!this.state.onLoginPage && this.state.password !== this.state.retypePassword) {
      this.setState({
        passwordMatch: false
      })
      ok = false;
    }
    return ok;
  }

  login(e) {
    e.preventDefault();
    if(!this.checkInputOk()) return;

    this.setState({
      usernameError: false,
      passwordError: false,
    })

    let user = {
      username: this.state.username,
      password: this.state.password,
    }
    
    fetch(
      'http://localhost:8080/login',
      { 
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }
    )
    .then(response => {
        if(response.status == 200) {
          // response.text() to get text of response; response.json() if it's in json format
          this.props.authenticated(this.state.username);
        } else if(response.status == 400) {
          // TODO: Figure out what response statuses
        } else {
          
        }
        // TODO: Catch other response errors
      }
    );
  }

  register(e) {
    e.preventDefault();
    if(!this.checkInputOk()) return;

    let user = {
      username: this.state.username,
      password: this.state.password,
    }

    fetch(
      'http://localhost:8080/save',
      { 
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }
    )
    .then(response => {
        if(response.status == 200) {
          // response.text() to get text of response; response.json() if it's in json format
          this.props.authenticated(this.state.username);
        }
        // TODO: Catch other response errors
      }
    );
  }

  handleUsernameChange(username) {
    this.setState({
      username: username
    }, () => {
      if(this.state.usernameError && this.state.username.length > 0) {
        this.setState({
          usernameError: false
        })
      }
    })
  }

  handlePasswordChange(password) {
    this.setState({
      password: password
    }, () => {
      if(this.state.passwordError && this.state.password.length > 7) {
        this.setState({
          passwordError: false
        })
      }
    })
  }

  handleRetypePasswordChange(password) {
    this.setState({
      retypePassword: password
    }, () => {
      if(this.state.password !== this.state.retypePassword) {
        this.setState({
          passwordMatch: false
        })
      } else {
        this.setState({
          passwordMatch: true
        })
      }
    })
  }

  render() {
    let togglePasswordButton = this.state.showPassword ? (
      <button type='button' onClick={() => this.toggleShowPassword()}>
        <FaEyeSlash></FaEyeSlash>
      </button>
    ) : (
      <button type='button' onClick={() => this.toggleShowPassword()}>
        <FaEye></FaEye>
      </button>
    )

    let passwordType = this.state.showPassword ? "text" : "password";

    let usernameInputClasses = `${styles.input}`;
    let passwordInputClasses = `${styles.input}`;
    let retypePasswordInputClasses = `${styles.input}`;
    let usernameErrorMessage, passwordErrorMessage, retypePasswordErrorMessage;
    if(this.state.usernameError) {
      usernameInputClasses += ` ${styles.error}`;
      usernameErrorMessage = (
        <span className={styles.errorMessage}>Please enter a username</span>
      )
    }
    if(this.state.passwordError) {
      passwordInputClasses += ` ${styles.error}`;
      passwordErrorMessage = (
        <span className={styles.errorMessage}>Password must be at least 8 characters long</span>
      )
    }
    if(!this.state.passwordMatch) {
      retypePasswordInputClasses += ` ${styles.error}`;
      retypePasswordErrorMessage = (
        <span className={styles.errorMessage}>Passwords must match</span>
      )
    }

    let authRender = this.state.onLoginPage ? (
      <form id={styles.authForm} onSubmit={(e) => this.login(e)}>
        <h1>Login</h1>
        <p>Don't have an account? <button type="button" id={styles.switchPage} onClick={() => this.switchPage()}>Register</button></p>
        <div>
          <label>Username</label>
          <input className={usernameInputClasses} placeholder="Enter your username..." value={this.state.username} onChange={(e) => this.handleUsernameChange(e.target.value)}></input>
          {usernameErrorMessage}
        </div>
        <label>Password</label>
        <div>
          <div className={passwordInputClasses}>
            <input type={passwordType} placeholder="Enter your password" value={this.state.password} onChange={(e) => this.handlePasswordChange(e.target.value)}></input>
            {togglePasswordButton}
          </div>
          {passwordErrorMessage}
        </div>
        <button className="solid-button" type="submit">Login</button>
      </form>
    ) : (
      <form id={styles.authForm} onSubmit={(e) => this.register(e)}>
        <h1>Register</h1>
        <p>Already have an account? <button type="button" id={styles.switchPage} onClick={() => this.switchPage()}>Login</button></p>
        <div>
          <label>Username</label>
          <input className={usernameInputClasses} placeholder="Enter your username..." value={this.state.username} onChange={(e) => this.handleUsernameChange(e.target.value)}></input>
          {usernameErrorMessage}
        </div>
        <label>Password</label>
        <div>
          <div className={passwordInputClasses}>
            <input type={passwordType} placeholder="Enter your password..." value={this.state.password} onChange={(e) => this.handlePasswordChange(e.target.value)}></input>
            {togglePasswordButton}
          </div>
          {passwordErrorMessage}
        </div>
        <div>
          <label>Confirm Password</label>
          <input type={passwordType} className={retypePasswordInputClasses} placeholder="Confirm your password..." value={this.state.retypePassword} onChange={(e) => this.handleRetypePasswordChange(e.target.value)}></input>
          {retypePasswordErrorMessage}
        </div>
        <button className="solid-button" type="submit">Register</button>
      </form>
    )

    return (
      <div id={styles.authWrapper}>
        <Logo className={styles.absolute} id="logo" />
        {authRender}
      </div>
    )
  }
}
