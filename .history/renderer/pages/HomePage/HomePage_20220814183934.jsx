import React from 'react';
import Header from '../../components/Header/Header';
import TitleBar from '../../components/TitleBar/TitleBar';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.section}>
      <TitleBar />
      <Header />
      <div className={styles.container}>
        <div className={styles.title}>Welcome, NAME.</div>
        <div className={styles.sub_text}>What would you like to do?</div>
      </div>
    </div>
  )
}

export default HomePage