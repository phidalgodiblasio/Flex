import React from 'react';
import { withRouter } from './withRouter';
import styles from '../style/PageHeader.module.css';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function PageHeader({title}) {
  const navigate = useNavigate();

  return (
    <header className={`${styles.header} container`}>
      <button className="transparent-button" onClick={() => navigate('/home')}>
        <FaHome />
      </button>
      <h2>{title}</h2>
    </header>
  )
}
