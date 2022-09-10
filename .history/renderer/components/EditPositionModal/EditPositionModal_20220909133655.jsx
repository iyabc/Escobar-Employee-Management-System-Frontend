import TextField from '@mui/material/TextField';
import React from 'react';
import MediumButton from '../MediumButton/MediumButton';
import styles from './EditPositionModal.module.scss';

export default function EditPositionModal({ employeePositionId, employeePositionName }) {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>
            Editing employee position: <span style={{ fontWeight: 700, textTransform: "uppercase"}}>{employeePositionName}</span>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
              ID: {employeePositionId}
            </div>
            <div className={styles.textfield}>
              <TextField label="Employee Position Name" variant="standard" fullWidth />
          </div>
        </div>
        <div className={styles.footer}>
            <MediumButton label="SUBMIT" />
        </div>
      </div>
    </div>
  )
}
