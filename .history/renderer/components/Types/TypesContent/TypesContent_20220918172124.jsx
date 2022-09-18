import React, { useState, useEffect } from 'react';
import styles from './TypesContent.module.scss';
import Toast from '../../Shared/Toast/Toast';
import Rest from '../../../rest/Rest.tsx';
import { Modal } from '@mui/material';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import ActiveTypesTable from '../ActiveTypesTable/ActiveTypesTable';
import InactivePositionsTable from '../../Positions/InactivePositionsTable/InactivePositionsTable';

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function TypesContent() {
    const rest =  new Rest();
    //get active types
    const [activeTypes, setActiveTypes] = useState([]);
    const handleActiveTypes = (data) => {
        setActiveTypes(data)
    }
    const getActiveTypes = () => {
        rest.get(`${INITIAL_URL}/employee-types/active`, handleActiveTypes)
    }
    //get inactive types
    const [inactiveTypes, setInactiveTypes] = useState([]);
    const handleInactiveTypes = (data) => {
        setInactiveTypes(data)
    }
    const getInactiveTypes = () => {
        rest.get(`${INITIAL_URL}/employee-types/inactive`, handleInactiveTypes)
    }
    //add modal
    const [openAddModal, setOpenAddModal] = useState(false);

    useEffect(() => {
        getActiveTypes();
        getInactiveTypes();
    }, [])

    return (
        <div className={styles.container}>
        <Toast />
        <div className={styles.content}>
            <div className={styles.header}>
            <button onClick={handleOpenAddModal}>
                <MediumButton label="Add Expense Category" />
            </button>
            </div>
            <div className={styles.tables}>
            <div className={styles.active_table}>
                <ActiveTypesTable
                />
            </div>
            <div className={styles.inactive_table}>
                <InactivePositionsTable
                />
            </div>
            </div>
        </div>
        <Modal open={openAddModal} onClose={handleCloseAddModal}>
            <div className={styles.modal}>
                {/* <AddExpenseCategory
                reload={reload}
                addSuccessAction={addSuccessAction}
                /> */}
            </div>
        </Modal>
        </div>
    )
}