import React, { useState, useEffect } from 'react';
import styles from './EditAccount.module.scss';
import Rest from '../../../rest/Rest.tsx';
import Account from '../../../model/Account.tsx'
import { TextField } from '@mui/material';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import Select from 'react-select';
import Checkbox from '@mui/material/Checkbox';

const INITIAL_URL = "http://localhost:8080/api/v1";

function capitalizeData(data){
    data = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
    return data;
}

export default function EditAccount({ 
    activeEmployees,
    editSuccessAction,
    // accountId,
    // accountUsername,
    // accountPassword,
    // employeeName,
    // accessInventoryManagementSystem,
    // accessEmployeeManagementSystem,
    // accessIncomeAndExpenseSystem,
    // accessOrderingSystem,
    // isActive
    selectedValues
 }) {
    console.log(selectedValues)
    const rest = new Rest();
    const [newAccount, setNewAccount] = useState(
        new Account (
            selectedValues.accountId,
            selectedValues.accountUsername,
            selectedValues.accountPassword,
            selectedValues.employeeName,
            selectedValues.accessInventoryManagementSystem,
            selectedValues.accessEmployeeManagementSystem,
            selectedValues.accessIncomeAndExpenseSystem,
            selectedValues.accessOrderingSystem,
            selectedValues.isActive
        )
    )
    const handleChange = (e) => {
        console.log(e.value)
        // console.log(employeeName)
        // console.log(accessInventoryManagementSystem)
        if(e.target == undefined){
            setNewAccount({...newAccount, [e.key]:e.value})
        }else if(e.target.name == 'accessInventoryManagementSystem' || e.target.name == 'accessEmployeeManagementSystem' || e.target.name == 'accessIncomeAndExpenseSystem' || e.target.name == 'accessOrderingSystem'){
            setNewAccount({...newAccount, [e.target.name]:e.target.checked})
        }else{
            setNewAccount({...newAccount, [e.target.name]:capitalizeData(e.target.value)})
        }
      }
    const handleSubmit = () => {
        console.log(newAccount)
        // rest.update(
        //     `${INITIAL_URL}/account/update/${newAccount.accountId}`,
        //     newAccount,
        //     editSuccessAction,
        //     `Successfully edited ${newAccount.accountId}`
        // )
    }

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            Editing Account {newAccount.accountId}
        </div>
        <div className={styles.content_outer}>
            <div className={styles.content_inner}>
                <div className={styles.content_inner_left}>
                    <div className={styles.content_inner_label}>
                        Personal Details
                    </div>
                    <div className={styles.content_inner_row}>
                        <TextField onChange={handleChange} name="accountUsername" label="Account Username" defaultValue={newAccount.accountUsername} variant="standard" fullWidth />
                    </div>
                    <div className={styles.content_inner_row}>
                        <div className={styles.group_textfields_select}>
                            <div className={styles.group_textfields_select_label}>Employee Name</div>
                            <Select
                                defaultValue={activeEmployees.map((item) => {
                                    if(`${item.employeeLastName}, ${item.employeeFirstName}` == newAccount.employeeName){
                                        return {
                                            key: 'employeeName',
                                            value: `${item.employeeLastName}, ${item.employeeFirstName}`,
                                            label: `${item.employeeLastName}, ${item.employeeFirstName}`
                                        }
                                    }
                                })}
                                options={activeEmployees.map((item) => {
                                    return {
                                        key: 'employeeName',
                                        value: `${item.employeeLastName}, ${item.employeeFirstName}`,
                                        label: `${item.employeeLastName}, ${item.employeeFirstName}`
                                    }
                                })}
                                handleChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.content_inner_right}>
                    <div className={styles.content_inner_label}>
                        Accessible Systems
                    </div>
                    <div className={styles.content_inner_row}>
                        Inventory Management System:&nbsp;
                        <Checkbox onChange={handleChange} name='accessInventoryManagementSystem' defaultChecked={newAccount.accessInventoryManagementSystem} />
                    </div>
                    <div className={styles.content_inner_row}>
                        Employee Management System:&nbsp;
                        <Checkbox onChange={handleChange} name='accessEmployeeManagementSystem' defaultChecked={newAccount.accessEmployeeManagementSystem}  />
                    </div>
                    <div className={styles.content_inner_row}>
                        Income & Expense System:&nbsp;
                        <Checkbox onChange={handleChange} name='accessIncomeAndExpenseSystem' defaultChecked={newAccount.accessIncomeAndExpenseSystem} />
                    </div>
                    <div className={styles.content_inner_row}>
                        Ordering System:&nbsp;
                        <Checkbox onChange={handleChange} name='accessOrderingSystem' defaultChecked={newAccount.accessOrderingSystem} />
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
