import React from 'react'
import styles from './TitleBar.module.scss'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

const TitleBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button id='minimize' class='min_btn'></button>
        <button id='maximize' class='max_btn'></button>
        <button id='exit' class='exit_btn'>
          <NavigateNextRoundedIcon border='none'/>
        </button>
      </div>
    </div>    
  )
}

export default TitleBar