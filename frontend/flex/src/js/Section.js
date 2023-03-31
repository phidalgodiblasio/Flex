import React from 'react';
import { FaPen } from 'react-icons/fa';
import styles from '../style/Homepage.module.css';

export default function Section({title, editFunction, children}) {
  return (
    <div className="section large-padding">
      <div className="section-header">
        <h2>{title}</h2>
        <div>
          <button className={styles.editButton} onClick={() => editFunction()}>
            <FaPen />
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}
