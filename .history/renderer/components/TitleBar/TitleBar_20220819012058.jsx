import React from 'react'
import styles from './TitleBar.module.scss'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MinimizeRoundedIcon from '@mui/icons-material/MinimizeRounded';

const TitleBar = () => {

  const scaleButton = {
    initial: {
      opacity: 0,
      y: "20px"
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2
      }
    },
  }

  return (
    <div className={styles.container}>
      <script src='main/titleFunctions.js'></script>
      <div className={styles.buttons}>
        <button id='minBtn' className={`${styles.button} ${styles.min_btn}`}>
          <MinimizeRoundedIcon fontSize='small'/>
        </button>
        <button id='closeBtn' className={`${styles.button} ${styles.exit_btn}`}>
          <CloseRoundedIcon fontSize='small'/>
        </button>
      </div>
    </div>    
  )
}

export default TitleBar