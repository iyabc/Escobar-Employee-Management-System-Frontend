import React, { useState, useEffect } from 'react';
import styles from './AddEmployeeModal.module.scss';
import Select from 'react-select';
import Employee from '../../../model/Employee.tsx';
import Rest from '../../../rest/Rest.tsx';
import { TextField } from '@mui/material';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import dateFormat from 'dateformat';

const INITIAL_URL = "http://localhost:8080/api/v1";

function onlyLetters(data){
  return (/^[a-zA-Z\s]+$/).test(data);
}

function superiorNameValid(data){ //last, first
  return (/^[a-zA-Z\s]+\,\s[a-zA-Z\s]+$/).test(data);
}

function onlyLettersNumbers(data){
  return (/^[a-zA-Z0-9\s]+$/).test(data);
}

function validNumber(data){
  return (/^0\d{10}$/).test(data);
}

function capitalizeData(data){
  data = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
  return data;
}

export default function EditEmployeeModal({ addSuccessAction, dateTime, activeEmployees,  inactiveEmployees }) {
  const rest = new Rest();
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);
  const [superiorNameError, setSuperiorNameError] = useState(false);
  //set superior employees select option
  const [superiorOptions, setSuperiorOptions] = useState([
    {key: 'superiorEmployeeName', value: null, label: 'None'}
  ]);

  const handleSuperiorOptions = () => {
    activeEmployees.map((item) => {
      superiorOptions.push(
        {
          key: 'superiorEmployeeName',
          value: `${item.employeeLastName}, ${item.employeeFirstName}`,
          label: `${item.employeeLastName}, ${item.employeeFirstName}`
        }
      )
    })
  }
  //get active positions data
  const [activePositions, setActivePositions] = useState([]);
  const handleActivePositions = (data) => {
    setActivePositions(data);
  }
  const getActivePositions = () => {
    rest.get(`${INITIAL_URL}/employee-position`, handleActivePositions);
  }
  //get active types data
  const [activeTypes, setActiveTypes] = useState([]);
  const handleActiveTypes = (data) => {
    setActiveTypes(data);
  }
  const getActiveTypes = () => {
    rest.get(`${INITIAL_URL}/employee-type`, handleActiveTypes);
  }
   //input values
   const dateEmployed = dateFormat(dateTime, "yyyy-mm-dd") + "T" + dateFormat(dateTime, "HH:MM:ss")
   const [values, setValues] = useState(
    new Employee(
      1, 
      '',
      '',
      '',
      '',
      dateEmployed,
      '',
      '',
      '',
      true
    )
  )
  //onChange for all inputs
  const onChange = (e) => {
    if(e.target == undefined){
      setValues({...values, [e.key]:e.value})

    }else{
      setValues({...values, [e.target.name]:capitalizeData(e.target.value)})
    }
  }
  //submit
  const handleSubmit = () => {
    rest.add(
      `${INITIAL_URL}/employee/add`,
      values,
      addSuccessAction,
      `Successfully added employee: ${values.employeeLastName}, ${values.employeeFirstName}`
    )
  }

  useEffect(() => {
    getActivePositions();
    getActiveTypes();
    handleSuperiorOptions();
    // setValues({...values, employeePositionName: activePositions[0], employeeTypeName: activeTypes[0]});
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        Add Employee
      </div>
      <div className={styles.content}>
        <div className={styles.group}>
          <div className={styles.group_label}>
            Name
          </div>
          <div className={styles.group_textfields}>
            <div className={styles.group_textfields_row}>
              <TextField onChange={onChange} name="employeeLastName" label="Last" variant='standard' fullWidth />
              <div className={[lastNameError && styles.error_show, styles.error].join(" ")}>Must be letters only.</div>
            </div>
            <div className={styles.group_textfields_row}>
              <TextField onChange={onChange} name="employeeFirstName" label="First" variant='standard' fullWidth />
              <div className={[firstNameError && styles.error_show, styles.error].join(" ")}>Must be letters only.</div>
            </div>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.group_label}>
            Personal Details
          </div>
          <div className={styles.group_textfields}>
            <div className={styles.group_textfields_row}>
              <TextField onChange={onChange} name="employeeAddress" label="Address" variant='standard' fullWidth />
              <div className={[addressError && styles.error_show, styles.error].join(" ")}>Must be letters and numbers only.</div>
            </div>
            <div className={styles.group_textfields_row}>
              <TextField onChange={onChange} name="employeeContactNumber" label="Contact Number" variant='standard' fullWidth />
              <div className={[contactNumberError && styles.error_show, styles.error].join(" ")}>Must be 11 digits and starts with 0.</div>
            </div>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.group_label}>
            Work Details
          </div>
          <div className={styles.group_textfields}>
            <div className={styles.group_textfields_row}>
                {/* {showSuperiorTextfield()} */}
              {/* <TextField onChange={onChange} name="superiorEmployeeName" variant='standard' label="Superior" sx={{ flex: 1 }} /> */}
              <div className={styles.group_textfields_select}>
                <div className={styles.group_textfields_select_label}>Superior Employee</div>
                <Select
                  defaultValue={superiorOptions[0]}
                  // placeholder='Superior Employee'
                  options=
                    {superiorOptions}
                    // {activeEmployees.map((item) => {
                    //   return {
                    //     key: 'superiorEmployeeName',
                    //     value: `${item.employeeLastName}, ${item.employeeFirstName}`,
                    //     label: `${item.employeeLastName}, ${item.employeeFirstName}`
                    //   }
                    // })}
                  onChange={onChange}
                />
              </div>
              <div className={[superiorNameError && styles.error_show, styles.error].join(" ")}>Format: Last, First</div>
              <div className={styles.group_textfields_select}>
                <div className={styles.group_textfields_select_label}>Position</div>
                <Select
                  defaultValue={superiorOptions[0]}
                  options={activePositions.map((item) => {
                    return {
                      key: 'employeePositionName',
                      value: item,
                      label: item
                    }
                  })}
                  onChange={onChange}
                />
              </div>
              <div className={styles.group_textfields_select}>
                <div className={styles.group_textfields_select_label}>Type</div>
                <Select
                  placeholder='Type'
                  options={activeTypes.map((item) => {
                    return {
                      key: 'employeeTypeName',
                      value: item,
                      label: item
                    }
                  })}
                  onChange={onChange}
                />
              </div>
            </div>
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
