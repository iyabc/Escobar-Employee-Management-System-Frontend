import React, { useState, useEffect } from 'react';
import styles from './EmployeeTable.module.scss';
import SearchBar from 'material-ui-search-bar';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

import Rest from "../../../rest/Rest.tsx";
import { Modal } from '@mui/material';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import { DataGrid } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import Test from '../../test';

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function EmployeeTable() {
  //headers
  const headCells = [
    { field: 'employeeId', headerName: 'ID', flex: 1, align: 'left'},
    { field: 'employeeFirstName', headerName: 'First', flex: 1, align: 'left'},
    { field: 'employeeLastName', headerName: 'Last', flex: 1, align: 'left'},
    { field: 'employeeAddress', headerName: 'Address', flex: 1, align: 'left'},
    { field: 'employeeContactNumber', headerName: 'Contact', flex: 1, align: 'left'},
    { field: 'dateEmployed', headerName: 'Date Employed', flex: 1, align: 'left'},
    { field: 'employeePositionName', headerName: 'Position', flex: 1, align: 'left'},
    { field: 'employeeTypeName', headerName: 'Type', flex: 1, align: 'left'},
    { field: 'superiorEmployeeName', headerName: 'Superior', flex: 1, align: 'left'}
  ]

  //get data
  const [activeEmployees, setActiveEmployees] = useState([]);
  const rest = new Rest();
  const handleActiveEmployees = (data) => {
    setActiveEmployees(data)
  }
  const getActiveEmployees = () => {
    rest.get(`${INITIAL_URL}/employee/active`, handleActiveEmployees)
  }
  //  search
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const requestSearch = (searchValue) => {
    const filteredRows = activeEmployees.filter((row) => {
      return String(row.employeeId).includes(searchValue) || row.employeeFirstName.toLowerCase().includes(searchValue.toLowerCase()) ||  row.employeeLastName.toLowerCase().includes(searchValue.toLowerCase()) || row.employeeContactNumber.includes(searchValue) || row.employeeAddress.toLowerCase().includes(searchValue.toLowerCase);
      });
      setRows(filteredRows);
    };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  }

   //show buttons
  function showButtons() {
    if(selected.length > 0 ){
      return (
        <>
        <Tooltip title="Delete Attendance">
          <IconButton onClick={handleOpenDeleteModal}>
            <MediumButton label="Delete" />
          </IconButton>
        </Tooltip>
        </>
      )
    }
  };
  //selected rows
  const [selected, setSelected] = useState("");
  const handleSelect = (ids) => {
    setSelected(ids);
  }
  const [selectedValues, setSelectedValues] = useState([]);
  const handleSelectedValues = () => {
    const arr = [];
    if(selected.length == 1){
      rows.map((item) => {
        if(item.employeePositionId == selected[0]){
          arr.push(item);
        }
      })
    }else if(selected.length > 1){
      for(let i=0; i < selected.length; i++){
        rows.map((item) => {
          if(item.employeePositionId == selected[i]){
            arr.push(item);
          }
        })
      }
    }
    setSelectedValues(arr);
  }
  //show rows
  const setShownRows = () => {
    if(rows.length == 0){
      setRows(activeEmployees);
    }
  };

  useEffect(() => {
    getActiveEmployees();
  }, [activeEmployees]);

  useEffect(() => {
    setShownRows();
  }, [rows]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
            <SearchBar 
              placeholder="Search Attendance Table"
                value={searched}
                onChange={(searchValue) => requestSearch(searchValue)}
              onCancelSearch={() => cancelSearch()}
            />
            <div className={styles.print_btn}>
                <LocalPrintshopIcon />
            </div>
        </div>
        <div className={styles.right}>
          {/* {showButtons()} */}
        </div>
      </div>
      <div className={styles.table}>
        {/* <DataGrid
          treeData
          getTreeDataPath={(row) => row.path}
          getRowId={(row) => row.employeeId}
          rows={rows}
          columns={headCells}
          pageSize={20}
          onSelectionModelChange={handleSelect}
          checkboxSelection
        /> */}
        <DataGridPro
          treeData
          getTreeDataPath={(row) => row.path}
          rows={rows}
          columns={columns}
        />;
      </div>
    </div>
  )
}
