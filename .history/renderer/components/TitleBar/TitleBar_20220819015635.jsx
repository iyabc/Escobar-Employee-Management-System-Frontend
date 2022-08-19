import React from 'react'
import Head from 'next/head'
import styles from './TitleBar.module.scss'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MinimizeRoundedIcon from '@mui/icons-material/MinimizeRounded';
import titleFunctions from './titleFunctions.js';

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
    <React.Fragment>
      <Head>
        <script src={titleFunctions}></script>
      </Head>
      <div className={styles.container}>
        <div className={styles.buttons}>
          <button id='minBtn' className={`${styles.button} ${styles.min_btn}`}>
            <MinimizeRoundedIcon fontSize='small'/>
          </button>
          <button id='closeBtn' className={`${styles.button} ${styles.exit_btn}`}>
            <CloseRoundedIcon fontSize='small'/>
          </button>
        </div>
      </div>    
    </React.Fragment>
    
  )
}

export default TitleBar