import React from 'react';
import { withRouter } from './withRouter';
import styles from '../style/PageHeader.module.css';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function PageHeader({title, rightButton}) {
  const navigate = useNavigate();

  return (
    <header className={styles.headerWrapper}>
      <div className={`${styles.header} container`}>
        <button className="transparent-button header-icon-button" onClick={() => navigate('/home')}>
          <FaHome />
        </button>
        <h3>{title}</h3>
        {rightButton}
      </div>
    </header>
  )
}
