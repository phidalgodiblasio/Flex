import '../style/App.css';
import Authentication from './Authentication';
import Homepage from './Homepage';
import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { withRouter } from './withRouter';
import CreateWorkout from './CreateWorkout';
import WorkoutLog from './WorkoutLog';
import IntakeGraphs from './IntakeGraphs';
import WeightHistory from './WeightHistory';

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      loggedIn: false, 
      username: ""
    }
  }

  userLogin(username) {
    this.setState({
      loggedIn: true,
      username: username
    })

    this.props.navigate('/home');
  }

  userLogout() {
    this.setState({
      loggedIn: false,
      username: ""
    })
  }

  render() {
    /*
    Router info:
    '*' covers all paths that aren't known. 
    */
    return (
      <>
        <Routes>
          { /* TODO: Fix this with authentication from cookies */}
          <Route path="*" element={
            this.state.loggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/auth" />
            )
          } />
          <Route path="/auth" element={<Authentication userLogin={(username) => this.userLogin(username)} />} />
          <Route path="/home" element={<Homepage userLogout={() => this.userLogout()} username={this.state.username} />} />
          <Route path="/create-workout" element={<CreateWorkout />} exercises={[]} />
          <Route path="/workout-log" element={<WorkoutLog />} />
          <Route path="/intake-progress" element={<IntakeGraphs />} />
          <Route path="/display-weights" element={<WeightHistory/>}/>
        </Routes>
      </>
    )
    // this.state.loggedIn ? <Homepage userLogout={() => this.userLogout()} username={this.state.username}></Homepage> : <Authentication userLogin={(username) => this.userLogin(username)}></Authentication>;
  }
}

export default withRouter(App);
