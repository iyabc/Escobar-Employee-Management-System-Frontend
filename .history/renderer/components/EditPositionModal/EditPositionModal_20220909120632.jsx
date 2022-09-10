import React from 'react';
import styles from './EditPositionModal.module.scss';

export default function EditPositionModal() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
      <div className={styles.header}>
                        Confirm Delete
                    </div>
                    <div className={styles.content}>
                      {arrDeleted.map((item) => {
                        return (
                          <div key={shortid.generate()}>
                            {item.employeeName}
                            {item.attendanceTime}
                            {item.attendanceType}
                          </div>
                        )
                      })}
                    </div>
                    <div className={styles.footer}>
                        <MediumButton label="Delete" />
                    </div>
      </div>
    </div>
  )
}
