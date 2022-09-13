import React, { useState } from 'react';
import styles from './EditEmployeeModal.module.scss';

import Employee from '../../../model/Employee.tsx';
import Rest from '../../../rest/Rest.tsx';
import { TextField } from '@mui/material';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';

export default function EditEmployeeModal({ editSuccessAction, employeeData }) {
  const rest = new Rest();

  const [selectedEmploye, setSelectedValues] = useState(employeeData[0]);

  const handleSubmit = () => {
  
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        Edit Employee {selectedEmploye.employeeId}
      </div>
      <div className={styles.content}>
        <div className={styles.group}>
          <div className={styles.group_label}>
            Name
          </div>
          <div className={styles.group_textfields}>
            <TextField name="employeeFirstName" label="Last" defaultValue={selectedEmploye.employeeLastName} />
            <TextField name="employeeFirstName" label="First" defaultValue={selectedEmploye.employeeFirstName} />
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.group_label}>
            Personal Details
          </div>
          <div className={styles.group_textfields}>
            <TextField name="employeeAddress" label="Last" defaultValue={selectedEmploye.employeeLastName} />
            <TextField name="employeeContactNumber" label="First" defaultValue={selectedEmploye.employeeFirstName} />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <button onClick={handleSubmit}>
          <MediumButton label="Submit" />
        </button>
      </div>
    </div>
  )
}
