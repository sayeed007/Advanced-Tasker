
import React from 'react';
import { CustomModal, CustomModalBody } from '../modal/CustomModal';
import { useTaskContext } from '../../context/TaskContext';


const styles = {
    motherDiv: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
    },
    header: {
        fontWeight: '600',
        fontSize: '20px',
        color: '#2C3C51',
        marginBottom: '20px',
    },
    message: {
        fontWeight: '600',
        fontSize: '16px',
        color: '#2C3C51',
        marginBottom: '10px',
    },
    buttonHolder: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        marginTop: '25px'
    },
    back: {
        fontWeight: '600',
        fontSize: '16px',
        color: '#EB5757',
        border: '2px solid #EB5757',
        borderRadius: '4px',
        cursor: 'pointer',
        padding: '5px 10px',
    },
    delete: {
        fontWeight: '600',
        fontSize: '16px',
        color: '#FFFFFF',
        background: '#EB5757',
        borderRadius: '4px',
        marginRight: '15px',
        cursor: 'pointer',
        padding: '5px 10px',
    },


};



const ConfirmDelete = () => {
    const { state, dispatch } = useTaskContext();

    const handleCloseModal = () => {
        dispatch({
            type: 'SET_DELETE_MODAL_VISIBLE',
            payload: {
                message: '',
                deleteModalVisible: false
            }
        });
    };

    const deleteButtonAction = () => {
        if (state?.specificTaskDeleteID) {
            const remainingTasks = [...state?.taskData].filter((tasks) => (tasks.id !== state?.specificTaskDeleteID));

            dispatch({
                type: 'SET_DELETE_SINGLE_TASK_DATA_AND_CLEANING_UP',
                payload: {
                    deleteModalVisible: false,
                    specificTaskDeleteID: '',
                    message: 'Task is successfully deleted',
                    successModalVisible: true,
                    taskData: [...remainingTasks],
                    filteredTaskData: [...remainingTasks],
                },
            });
        } else {

            dispatch({
                type: 'SET_DELETE_ALL_TASK_DATA_AND_CLEANING_UP',
                payload: {
                    deleteModalVisible: false,
                    message: 'All Tasks are successfully deleted',
                    successModalVisible: true,
                    taskData: [],
                    filteredTaskData: [],
                },
            });
        }
    };


    return (
        <CustomModal
            alignment="center"
            visible={state?.deleteModalVisible}
            closeOnBackdrop={false}
        >
            <CustomModalBody
                style={{ marginTop: '35%' }}
            >
                <div style={styles.motherDiv}>

                    <div style={styles.header}>
                        Delete Task
                    </div>

                    <div style={styles.message}>
                        {state?.message}
                    </div>


                    {/* Buttons */}
                    <div style={styles.buttonHolder}>
                        {/* DELETE */}
                        <div style={styles.delete}
                            onClick={() => { deleteButtonAction() }}
                        >
                            Delete
                        </div>

                        {/* BACK */}
                        <div style={styles.back}
                            onClick={() => { handleCloseModal() }}
                        >
                            Back
                        </div>
                    </div>

                </div>
            </CustomModalBody>
        </CustomModal>
    )

}
export default ConfirmDelete