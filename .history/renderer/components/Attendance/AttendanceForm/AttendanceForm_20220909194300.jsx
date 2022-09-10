import { Select, FormControl, InputLabel, MenuItem, Modal, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddAttendanceModal from '../AddAttendanceModal/AddAttendanceModal';
import BigButton from '../../Shared/Buttons/BigButton/BigButton';
import styles from './AttendanceForm.module.scss';

import Attendance from "../../../model/Attendance";
import { ToastContainer, toast } from 'react-toastify';
import Rest from "../../rest/Rest.tsx";

const INITIAL_URL = "http://localhost:8080/api/v1";

//NO ATTENDANCE ID YET

function AttendanceForm() {
  const rest = new Rest();
  //select
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const handleChange = (e) => {
    setSelectedEmployee(e.target.value);
    setValues({ ...values, [e.target.name] : e.target.value })
  };
  //get input values
  const [values, setValues] = useState({
    employeeFullName: selectedEmployee,
    attendanceType: ""
  })
  //confirm add attendance modal
  const [openAddAttendanceModal, setOpenAddAttendanceModal] = useState(false);
  const handleOpenAddAttendanceModal = () => { setOpenAddAttendanceModal(true) };
  const handleCloseAddAttendanceModal = () => { setOpenAddAttendanceModal(false) };
  //get employee data
  const [employeeData, setEmployeeData] = useState([]);
  const handleEmployeeData = (data) => {
    setEmployeeData(data)
  }
  const getEmployeeData = () => {
    rest.get(`${INITIAL_URL}/employee/active`, handleEmployeeData);
  }
  //post check in
  const postCheckIn = () => {
    if(selectedEmployee == ""){
      alert("aaaaaaaaaaa in");
    }else {
      setValues({
        ...values,
        attendanceType: "CHECK_IN"
      });
      handleOpenAddAttendanceModal();
    }
  }
  //post check out
  const postCheckOut = () => {
    if(selectedEmployee == ""){
      alert("aaaaaaaaaaa out");
    }else {
      setValues({
        ...values,
        attendanceType: "CHECK_OUT"
      });
      handleOpenAddAttendanceModal();
    }
  }
  const addSuccessAction = () => {
    handleCloseAddAttendanceModal();
  }

  useEffect(() => {
    getEmployeeData();
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>ATTENDANCE</div>
      <div className={styles.form}>
        <div className={styles.row}>
        <FormControl fullWidth>
          <InputLabel>Select Employee</InputLabel>
          <Select
            className={styles.select}
            name="employeeFullName"
            value={selectedEmployee}
            label="Select Employee"
            onChange={handleChange}
            required
          >
            {employeeData.map((item) => {
              const employeeFullName = item.employeeLastName.concat(", ").concat(item.employeeFirstName);
              return (
                <MenuItem key={item.employeeId} value={employeeFullName}> {item.employeeLastName}, {item.employeeFirstName}</MenuItem>
              )
            })}
            </Select>
        </FormControl>
        </div>
       <div className={styles.row}>
        <div className={styles.btn_container} onClick={postCheckIn}><BigButton label="IN" link=""/></div>
        <div className={styles.btn_container} onClick={postCheckOut}><BigButton label="OUT" link=""/></div>
       </div>
      </div>

      {/* confirm add attendance modal */}
      <Modal open={openAddAttendanceModal} onClose={handleCloseAddAttendanceModal}>
          <Box className={styles.modal}>
            <AddAttendanceModal 
              addSuccessAction={addSuccessAction}
              employeeName={values.employeeFullName} 
              attendanceType={values.attendanceType}
            />
          </Box>
        </Modal>
      <ToastContainer />
    </div>
  )
}

export default AttendanceForm