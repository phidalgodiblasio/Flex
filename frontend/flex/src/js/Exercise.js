import React, { Component } from 'react'
import styles from '../style/Exercise.module.css'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

export default class Exercise extends Component {
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
    let { exercise } = this.props;

    let exerciseDataRender = exercise.sets.map((set, index) => {
      return (
        <tr key={set.id}>
          <td>{index + 1}</td>
          <td>{set.weight} lbs</td>
          <td>{set.reps}</td>
        </tr>
      )
    })

    let exerciseDataTableRender = this.state.hasBeenExpanded ? (
      <div className={styles.dataTableWrapper}>
        <table className={styles.dataTable}>
          <tbody>
            <tr>
              <th>Set</th>
              <th>Weight</th>
              <th>Reps</th>
            </tr>
            {exerciseDataRender}
          </tbody>
        </table>
      </div>
    ) : null

    return (
      <div aria-expanded={this.state.expanded} className={styles.exerciseWrapper}>
        <button className={`small-padding ${styles.exerciseButtonWrapper}`} onClick={() => this.toggleExpand()}>
          <header>
            <h3>{exercise.name}</h3>
            <div>
              <span>{exercise.sets.length} {exercise.sets.length > 1 ? "Sets" : "Set"}</span>
              { this.state.expanded ? <FaAngleDown /> : <FaAngleUp /> }
            </div>
          </header>
        </button>
        <div>
          {exerciseDataTableRender}
        </div>
      </div>
    )
  }
}
