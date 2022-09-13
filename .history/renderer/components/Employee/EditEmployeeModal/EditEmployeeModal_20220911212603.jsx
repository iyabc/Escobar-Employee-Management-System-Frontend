import React, { useState, useEffect } from 'react';
import styles from './EditEmployeeModal.module.scss';

import shortid from 'shortid';
import Employee from '../../../model/Employee.tsx';
import Rest from '../../../rest/Rest.tsx';
import { TextField, MenuItem } from '@mui/material';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function EditEmployeeModal({ editSuccessAction, employeeData }) {
  const rest = new Rest();
  //positions
  const [activePositions, setActivePositions] = useState([]);
  const handleActivePositions = (data) => {
    setActivePositions(data);
  }
  const getActivePositions = () => {
    rest.get(`${INITIAL_URL}/employee-position`, handleActivePositions);
  }

  const [selectedEmployee, setSelectedValues] = useState(employeeData[0]);

  const handleSubmit = () => {
  
  }

  useEffect(() => {
    getActivePositions();
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        Edit Employee {selectedEmployee.employeeId}
      </div>
      <div className={styles.content}>
        <div className={styles.group}>
          <div className={styles.group_label}>
            Name
          </div>
          <div className={styles.group_textfields}>
            <TextField name="employeeFirstName" label="Last" defaultValue={selectedEmployee.employeeLastName} />
            <TextField name="employeeFirstName" label="First" defaultValue={selectedEmployee.employeeFirstName} />
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.group_label}>
            Personal Details
          </div>
          <div className={styles.group_textfields}>
            <TextField name="employeeAddress" label="Address" defaultValue={selectedEmployee.employeeAddress} />
            <TextField name="employeeContactNumber" label="Contact Number" defaultValue={selectedEmployee.employeeContactNumber} />
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.group_label}>
            Work Details
          </div>
          <div className={styles.group_textfields}>
            <TextField 
              select 
              name="employeePositionName" 
              label="Position" 
              defaultValue={selectedEmployee.employeePositionName}
              fullWidth
            >
              {activePositions.forEach((item) => {
                return (
                  <MenuItem key={shortid.generate()} >{item}</MenuItem>
                )
              })}
            </TextField>
            <TextField 
              select 
              name="employeeTypeName" 
              label="Type" 
              defaultValue={selectedEmployee.employeeTypeName}
              fullWidth
            >
              {activePositions.forEach((item) => {
                return (
                  <MenuItem key={shortid.generate()} >{item}</MenuItem>
                )
              })}
            </ TextField>
            <TextField name="superiorEmployeeName" label="Superior" defaultValue={selectedEmployee.superiorEmployeeName} />
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
