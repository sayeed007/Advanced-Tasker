// TaskContext.js
import React, { createContext, useReducer, useContext } from 'react';
import DemoData from '../../assets/data/DemoData';



const TaskContext = createContext();

const initialState = {
    taskData: [...DemoData?.taskData],
    filteredTaskData: [...DemoData?.taskData],
    searchKeyWord: '',
    deleteModalVisible: false,
    specificTaskDeleteID: '',
    message: '',
    successModalVisible: false,
    errorModalVisible: false,
    createOrEditTaskModalVisible: false,
    editTaskID: '',

    formValues: { ...DemoData?.formData },
    errors: {}
};

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FILTERED_TASK_DATA':
            return { ...state, filteredTaskData: action.payload };
        case 'SET_DELETE_SINGLE_TASK_DATA_AND_CLEANING_UP':
            return {
                ...state,
                deleteModalVisible: action.payload.deleteModalVisible,
                specificTaskDeleteID: action.payload.specificTaskDeleteID,
                message: action.payload.message,
                successModalVisible: action.payload.successModalVisible,
                taskData: action.payload.taskData,
                filteredTaskData: action.payload.filteredTaskData,
            };
        case 'SET_DELETE_ALL_TASK_DATA_AND_CLEANING_UP':
            return {
                ...state,
                deleteModalVisible: action.payload.deleteModalVisible,
                message: action.payload.message,
                successModalVisible: action.payload.successModalVisible,
                taskData: action.payload.taskData,
                filteredTaskData: action.payload.filteredTaskData,
            };
        case 'SUCCESS_MODAL_CLEANING_UP':
            return {
                ...state,
                message: action.payload.message,
                successModalVisible: action.payload.successModalVisible,
            };
        case 'ERROR_MODAL_CLEANING_UP':
            return {
                ...state,
                message: action.payload.message,
                errorModalVisible: action.payload.errorModalVisible,
            };
        case 'UPDATE_TASK':
            return {
                ...state,
                createOrEditTaskModalVisible: action.payload.createOrEditTaskModalVisible,
                editTaskID: action.payload.editTaskID,
                message: action.payload.message,
                successModalVisible: action.payload.successModalVisible,
                taskData: action.payload.taskData,
                filteredTaskData: action.payload.filteredTaskData,
            };
        case 'CREATE_NEW_TASK':
            return {
                ...state,
                createOrEditTaskModalVisible: action.payload.createOrEditTaskModalVisible,
                message: action.payload.message,
                successModalVisible: action.payload.successModalVisible,
                taskData: action.payload.taskData,
                filteredTaskData: action.payload.filteredTaskData,
            };
        case 'SET_SEARCH_KEYWORD':
            return { ...state, searchKeyWord: action.payload };
        case 'SET_CREATE_EDIT_MODAL_VISIBLE':

            return {
                ...state,
                createOrEditTaskModalVisible: action.payload.createOrEditTaskModalVisible,

                formValues: Object.keys(action.payload?.formValues)?.length > 0 ? action.payload?.formValues : { ...DemoData?.formData },
                editTaskID: action.payload?.editTaskID
            };
        case 'SET_DELETE_MODAL_VISIBLE':
            return {
                ...state,
                message: action.payload.message,
                deleteModalVisible: action.payload.deleteModalVisible
            };
        case 'SET_SPECIFIC_TASK_TO_DELETE':
            return {
                ...state,
                message: action.payload.message,
                deleteModalVisible: action.payload.deleteModalVisible,
                specificTaskDeleteID: action.payload.specificTaskDeleteID
            };
        case 'SET_SPECIFIC_TASK_TO_EDIT':
            return {
                ...state,
                createOrEditTaskModalVisible: action.payload.createOrEditTaskModalVisible,
                editTaskID: action.payload.editTaskID
            };
        case 'MODIFY_TASK_DATA':
            return {
                ...state,
                taskData: action.payload.taskData,
                filteredTaskData: action.payload.filteredTaskData,
            };

        // FORM DATA PART
        case 'SET_CREATE_EDIT_FORM_DATA':
            return {
                ...state,
                formValues: Object.keys(action.payload)?.length > 0 ? action.payload : { ...DemoData?.formData },
            };
        case 'SET_ERROR_AFTER_FORM_VALIDATION':
            return {
                ...state,
                errors: action.payload,
            };



        default:
            return state;
    }
};

const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>
    );
};

const useTaskContext = () => {
    return useContext(TaskContext);
};

export { TaskProvider, useTaskContext };
