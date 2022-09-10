import React, { useState, useEffect } from 'react';
import styles from './InactivePositionsTable.module.scss';
import { DataGrid } from '@mui/x-data-grid';
import SearchBar from 'material-ui-search-bar';

import Rest from "../../rest/Rest.tsx";
import { Modal } from '@mui/material';
import MediumButton from '../MediumButton/MediumButton';

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function InactivePositionsTable() { 
    const rest = new Rest();
    const [rows, setRows] = useState([]);
    // get data
    const [inactivePositions, setInactivePositions] = useState([]);
    const handleInactivePositions = (data) => {
      setInactivePositions(data);
    }
    const getInactivePositions = () => {
      rest.get(`${INITIAL_URL}/employee-position/inactive`, handleInactivePositions)
    }
    //  search
    const [searched, setSearched] = useState("");
    const requestSearch = (searchValue) => {
      const filteredRows = inactivePositions.filter((row) => {
        return String(row.employeePositionId).includes(searchValue) || row.employeePositionName.toLowerCase().includes(searchValue.toLowerCase());
        });
        setRows(filteredRows);
      };
    const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
    }
    //columns
    const headCells = [
      { feild: 'employeePositionId', headerName: 'ID', flex: 1, align: 'right'},
      { feild: 'employeePositionName', headerName: 'Position Name', flex: 1, align: 'right'}
    ];
    //set shown rows
    const setShownRows = () => {
      if(rows == 0){
        setRows(inactivePositions);
      }
    }

    useEffect(() => {
      getInactivePositions();
      setShownRows()
    })

  return (
    <div className={styles.container}>
      {console.log(rows)}
      <div className={styles.table}>
        {/* <DataGrid
          getRowId={(row) => row.employeePositionId}
          rows={rows}
          columns={headCells}
          pageSize={20}
          disableSelectionOnClick
          // onSelectionModelChange={handleSelect}
          // checkboxSelection
        /> */}
      </div>
    </div>
  )
}
