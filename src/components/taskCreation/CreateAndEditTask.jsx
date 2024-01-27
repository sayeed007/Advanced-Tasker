
import React, { useEffect } from 'react';
import { CustomModal, CustomModalBody, CustomModalHeader } from '../common/modal/CustomModal';
import { useTaskContext } from '../context/TaskContext';


const CreateAndEditTask = () => {
    const { state, dispatch } = useTaskContext();

    useEffect(() => {
        if (state?.editTaskID) {
            let specificTask = state?.taskData?.filter((eachTask) => eachTask?.id === state?.editTaskID)?.[0];

            dispatch({
                type: 'SET_CREATE_EDIT_FORM_DATA',
                payload: { ...specificTask },
            });
        }

    }, [state?.editTaskID]);

    const validateForm = () => {
        let formIsValid = true;
        let newErrors = {};

        // Validate Title
        if (!state?.formValues?.Title) {
            formIsValid = false;
            newErrors.Title = 'Title is required';
        }

        // Validate Description
        if (!state?.formValues?.Description) {
            formIsValid = false;
            newErrors.Description = 'Description is required';
        }

        // Validate Tags
        if (state?.formValues?.Tags.length < 1) {
            formIsValid = false;
            newErrors.Tags = 'At least one tag is required';
        }

        // Validate Priority
        if (!state?.formValues?.Priority) {
            formIsValid = false;
            newErrors.Priority = 'Priority is required';
        }

        // setErrors(newErrors);
        dispatch({
            type: 'SET_ERROR_AFTER_FORM_VALIDATION',
            payload: newErrors,
        });
        return formIsValid;
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Proceed with form submission
            // EDIT TASK DATA
            if (state?.formValues?.id) {

                const dummyAllTasks = [...state?.taskData];

                // Find the index where id matched
                const index = dummyAllTasks.findIndex(task => task.id === state?.formValues?.id);

                dummyAllTasks[index] = state?.formValues;

                dispatch({
                    type: 'UPDATE_TASK',
                    payload: {
                        createOrEditTaskModalVisible: false,
                        editTaskID: '',
                        message: 'Task is successfully updated',
                        successModalVisible: true,
                        taskData: [...dummyAllTasks],
                        filteredTaskData: [...dummyAllTasks],
                    },
                });

            }
            // CREATE NEW TASK
            else {

                const dummyAllTasks = [...state?.taskData];

                // GENERATE ID AND SAVE
                dummyAllTasks.push({
                    ...state?.formValues,
                    id: new Date().getTime()
                });

                dispatch({
                    type: 'CREATE_NEW_TASK',
                    payload: {
                        createOrEditTaskModalVisible: false,
                        message: 'Task is successfully updated',
                        successModalVisible: true,
                        taskData: [...dummyAllTasks],
                        filteredTaskData: [...dummyAllTasks],
                    },
                });
            }
        }
    };


    return (
        <CustomModal
            alignment="center"
            visible={state?.createOrEditTaskModalVisible}
            style={{
                borderRadius: '12px',
                border: '1px solid',
                borderColor: `rgb(254 251 251 / 36%)`,
                padding: '20px',
                background: '#191D26'
            }}
        >

            <CustomModalHeader
                style={{ background: '#191D26', padding: '0px' }}
                onClose={() => {
                    dispatch({
                        type: 'SET_CREATE_EDIT_MODAL_VISIBLE', payload: {
                            createOrEditTaskModalVisible: false,
                            formValues: {},
                            editTaskID: ''
                        }
                    });
                }}
            >
                <h2
                    className="mb-1 text-center text-2xl font-bold text-white lg:text-[28px]"
                >
                    {state?.formValues?.id ? "Update Existing Task" : "Add New Task"}
                </h2>

            </CustomModalHeader>
            <CustomModalBody
                style={{ background: '#191D26', padding: '0px' }}
            >
                {/* Add Task Form */}

                <form
                    className="w-full max-w-[740px] bg-[#191D26] max-md:px-4 lg:p-4"
                    onSubmit={handleSubmit}
                >


                    {/* inputs */}
                    <div className="text-white space-y-3">
                        {/* title */}
                        <div>
                            <label htmlFor="title">Title</label>
                            <input
                                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                                type="text"
                                name="title"
                                id="title"

                                value={state?.formValues?.Title ? state?.formValues?.Title : ''}
                                onChange={(e) => {

                                    dispatch({
                                        type: 'SET_CREATE_EDIT_FORM_DATA',
                                        payload: {
                                            ...state?.formValues,
                                            Title: e.target.value
                                        },
                                    });
                                }}
                            />
                            {state?.errors?.Title && <p className="text-red-500 text-xs">{state?.errors?.Title}</p>}
                        </div>

                        {/* description */}
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="block min-h-[100px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[100px]"
                                type="text"
                                name="description"
                                id="description"

                                value={state?.formValues?.Description ? state?.formValues?.Description : ''}
                                onChange={(e) => {
                                    dispatch({
                                        type: 'SET_CREATE_EDIT_FORM_DATA',
                                        payload: {
                                            ...state?.formValues,
                                            Description: e.target.value
                                        },
                                    });
                                }}
                            />
                            {state?.errors?.Description && <p className="text-red-500 text-xs">{state?.errors?.Description}</p>}
                        </div>
                        {/* input group */}
                        <div
                            className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20"
                        >

                            {/* tags */}
                            <div>
                                <label htmlFor="tags">Tags <small>(Comma Separated)</small></label>
                                <input
                                    className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                                    type="text"
                                    name="tags"
                                    id="tags"

                                    value={state?.formValues?.Tags ? state?.formValues?.Tags.join(',') : ''}
                                    onChange={(e) => {
                                        dispatch({
                                            type: 'SET_CREATE_EDIT_FORM_DATA',
                                            payload: {
                                                ...state?.formValues,
                                                Tags: e.target.value.trim() ? e.target.value.split(',') : [],
                                            },
                                        });
                                    }}
                                />
                                {state?.errors?.Tags && <p className="text-red-500 text-xs">{state?.errors?.Tags}</p>}
                            </div>

                            {/* priority */}
                            <div>
                                <label htmlFor="priority">Priority</label>
                                <select
                                    className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                                    name="priority"
                                    id="priority"

                                    value={state?.formValues?.Priority ? state?.formValues?.Priority : ''}
                                    onChange={(e) => {
                                        dispatch({
                                            type: 'SET_CREATE_EDIT_FORM_DATA',
                                            payload: {
                                                ...state?.formValues,
                                                Priority: e.target.value
                                            },
                                        });
                                    }}
                                >
                                    <option value="">Select Priority</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                                {state?.errors?.Priority && <p className="text-red-500 text-xs">{state?.errors?.Priority}</p>}
                            </div>
                        </div>
                    </div>
                    {/* inputs ends */}


                    <div className="mt-5 flex justify-center lg:mt-5">
                        <button
                            type="submit"
                            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
                        >
                            {state?.formValues?.id ? "Update Existing" : 'Create New'}
                        </button>
                    </div>
                </form>
                {/* Add Task Form Ends */}
            </CustomModalBody>
        </CustomModal>
    )

}
export default CreateAndEditTask