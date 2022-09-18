import React from 'react';
import EmployeeTable from '../../components/Employee/EmployeeTable/EmployeeTable';
import SideMenu from '../../components/Shared/SideMenu/SideMenu';
import styles from'./EmployeePage.module.scss';
import Toast from '../../components/Shared/Toast/Toast';

function EmployeePage() {
  return (
    <div className={styles.section}>
      <Toast />
      <SideMenu homeState="" viewattendanceState="" viewemployeeState="active" viewpositionsState="" viewtypesState="" />
      <div className={styles.content}>
        <EmployeeTable />
      </div>
    </div>
  )
}

export default EmployeePage