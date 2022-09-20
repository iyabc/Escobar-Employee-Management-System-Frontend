import React, { useState, useEffect } from 'react';
import styles from './AccountsTable.module.scss';
import SearchBar from 'material-ui-search-bar';
import Rest from "../../../rest/Rest.tsx";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { IconButton, Modal, Tooltip } from '@mui/material';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import { DataGrid } from '@mui/x-data-grid';
import Toast from '../../Shared/Toast/Toast.jsx';

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function AccountsTable() {
    const headCells = [
        { field: 'employeeFirstName', headerName: 'First Name', flex: 1, align: 'left' },
        { field: 'employeeLastName', headerName: 'Last Name', flex: 1, align: 'left' },
        { field: 'employeePositionName', headerName: 'Position', flex: 1, align: 'left' }
    ]
    const rest = new Rest();
    //get active employees
    const [activeEmployees, setActiveEmployees] = useState([]);
    const handleActiveEmployees = (data) => {
      setActiveEmployees(data);
    }
    const getActiveEmployees = () => {
        rest.get(`${INITIAL_URL}/employee/active`, handleActiveEmployees);
    }
    const [rows, setRows] = useState([]);
    //selected rows
  const [selected, setSelected] = useState("");
  const handleSelect = (ids) => {
    setSelected(ids);
  }
  const [selectedValues, setSelectedValues] = useState([]);
  const handleSelectedValues = () => {
    const arr = [];
    for(let i=0; i < selected.length; i++){
      rows.map((item) => {
        if(item.employeeId == selected[i]){
          arr.push(item);
        }
      })
    }
    setSelectedValues(arr);
  }
     //  search
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
    //edit modal
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => {
    handleSelectedValues();
    setOpenEditModal(true);
  }
  const handleCloseEditModal = () => {setOpenEditModal(false);}
  const editSuccessAction = () => {
    handleCloseEditModal();
    getActiveEmployees();
    setRows(activeEmployees);
  }
    //show buttons
  function showButtons() {
    if(selected.length == 1 ){
      return (
        <>
          <Tooltip title="Edit Employee">
            <IconButton onClick={handleOpenEditModal}>
              <MediumButton label="Edit" />
            </IconButton>
          </Tooltip>
        </>
      )
    }else if(selected.length > 1){
      return (
        <>
          <Tooltip title="Edit Employee">
            <IconButton onClick={handleOpenEditModal}>
              <MediumButton label="Edit" />
            </IconButton>
          </Tooltip>
        </>
      )
    }else if(selected.length == 0){
      return (
        <>
          <Tooltip title="Edit Employee">
            <IconButton onClick={handleOpenEditModal}>
              <MediumButton label="Edit" />
            </IconButton>
          </Tooltip>
        </>
      )
    }
  };

  useEffect(() => {
    getActiveEmployees();
  }, [])

  useEffect(() => {
    setRows(activeEmployees);
  }, [activeEmployees]);

  return (
    <div className={styles.container}>
       <div className={styles.header}>
          <div className={styles.header_right}>
          </div>
        </div>
        <div className={styles.sub_header}>
          <div className={styles.left}>
              <SearchBar 
                placeholder="Search Employee Table"
                  value={searched}
                  onChange={(searchValue) => requestSearch(searchValue)}
                onCancelSearch={() => cancelSearch()}
              />
              <div className={styles.print_btn}>
                  <LocalPrintshopIcon />
              </div>
          </div>
          <div className={styles.right}>
            {showButtons()}
          </div>
        </div>
        <div className={styles.table}>
          <DataGrid
          getRowId={(row) => row.employeeId}
          rows={rows}
          columns={headCells}
          pageSize={20}
          onSelectionModelChange={handleSelect}
          checkboxSelection
          />
        </div>
      </div>
  )
}
