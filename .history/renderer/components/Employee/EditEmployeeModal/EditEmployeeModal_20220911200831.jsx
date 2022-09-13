import React, { useState } from 'react';
import styles from './EditEmployeeModal.module.scss';

import Employee from '../../../model/Employee.tsx';
import Rest from '../../../rest/Rest.tsx';
import { TextField } from '@mui/material';

export default function EditEmployeeModal({ employeeData }) {
  const rest = new Rest();

  const [selectedEmployee, setSelectedValues] = useState(employeeData[0]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        Edit Employee {selectedEmployee.employeeId}
      </div>
      <div className={styles.content}>
        <TextField name="employeeFirstName" label="First Name" defaultvariant='standard' />
      </div>
      <div className={styles.footer}>

      </div>
    </div>
  )
}
