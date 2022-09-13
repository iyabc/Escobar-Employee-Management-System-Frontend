import React, { useState, useEffect } from 'react';
import styles from './InactiveEmployeeModal.module.scss';

import Rest from "../../../rest/Rest.tsx";
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function InactiveEmployeeModal({ inactiveEmployees }) {
  const rest = new Rest();

  const [rows, setRows] = useState([]);
  const columns = [
    { field: 'employeeId', headerName: 'ID', minWidth: 100 },
    { field: 'employeeFirstName', headerName: 'First Name', minWidth: 160 },
    { field: 'employeeLastName', headerName: 'Last Name', minWidth: 120 },
    { field: 'employeeAddress', headerName: 'Address', minWidth: 160, align: 'right' },
    { field: 'employeeContactNumber', headerName: 'Contact', minWidth: 100, align: 'right' },
    { field: 'dateEmployed', headerName: 'Position', minWidth: 110, align: 'right' },
    { field: 'employeePositionName', headerName: 'Position', minWidth: 110, align: 'right' },
    { field: 'employeeTypeName', headerName: 'Type', minWidth: 110, align: 'right' },
    { field: 'superiorEmployeeName', headerName: 'Type', minWidth: 110, align: 'right' },
  ];
  useEffect(() => {
    setRows(inactiveEmployees);
  })


  return (
    <div className={styles.container}>
      <div className={styles.header}>Inactive Employees</div>
      {/* <Box sx={{ height: 400, width: '100%' }}> */}
        <div className={styles.table_container}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => {row.employeeId}}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </div>
      {/* </Box> */}
    </div>
  )
}
