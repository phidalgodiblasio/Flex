import React, { Component } from 'react'
import styles from '../style/Workout.module.css'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

export default class Workout extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      expanded: false,
      hasBeenExpanded: false
    }
  }

  toggleExpand() {
    this.setState({
      expanded: !this.state.expanded,
      hasBeenExpanded: true
    })
  }

  render() {
    let { workout } = this.props;

    let workoutDataRender = workout.sets.map((set, index) => {
      return (
        <tr>
          <td>{index}</td>
          <td>{set.weight}</td>
          <td>{set.reps}</td>
        </tr>
      )
    })

    let workoutDataTableRender = this.state.hasBeenExpanded ? (
      <div className={styles.dataTableWrapper}>
        <table className={styles.dataTable}>
          <tbody>
            <tr>
              <th>Set</th>
              <th>Weight</th>
              <th>Reps</th>
            </tr>
            {workoutDataRender}
          </tbody>
        </table>
      </div>
    ) : null

    return (
      <div aria-expanded={this.state.expanded} className={styles.workoutWrapper}>
        <button className={`small-padding ${styles.workoutButtonWrapper}`} onClick={() => this.toggleExpand()}>
          <header>
            <h3>{workout.name}</h3>
            <div>
              <span>{workout.sets.length} Sets</span>
              { this.state.expanded ? <FaAngleDown /> : <FaAngleUp /> }
            </div>
          </header>
        </button>
        <div>
          {workoutDataTableRender}
        </div>
      </div>
    )
  }
}
