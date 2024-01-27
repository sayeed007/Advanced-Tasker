import React, { useEffect } from 'react';
import HeroSection from './HeroSection';
import SearchWhite from '../../assets/icons/SearchWhite.svg';
import FavoriteIcon from '../../assets/icons/FavoriteIcon.svg';
import NonFavoriteIcon from '../../assets/icons/NonFavoriteIcon.svg';


import EmptyScreenView from '../common/emptyScreen/EmptyScreenView';
import ConfirmDelete from '../common/deleteConfirmationModal/ConfirmDelete';
import CommonSuccessModal from '../common/commonSuccessModal/CommonSuccessModal';
import CreateAndEditTask from '../taskCreation/CreateAndEditTask';

import { useTaskContext } from '../../components/context/TaskContext';


const predefinedColors = ['#00D991A1', '#1C92FFB0', '#FE1A1AB5', '#BD560BB2', '#8407E6A8', '#00B2D9CC', '#2F43F8BF', '#10FBEDB2']

const MainBodyComponentAdvanced = () => {

    const { state, dispatch } = useTaskContext();

    useEffect(() => {

        if (state?.searchKeyWord.length > 0) {
            // Case-insensitive search
            const searchedTasks = [...state?.taskData].filter((tasks) =>
                tasks.Title.toLowerCase().includes(state?.searchKeyWord.toLowerCase())
            );

            // Update the displayed books based on the search result
            dispatch({ type: 'SET_FILTERED_TASK_DATA', payload: [...searchedTasks] });
        } else {
            dispatch({ type: 'SET_FILTERED_TASK_DATA', payload: [...state?.taskData] });
        }

    }, [state?.searchKeyWord]);


    const getBackgroundColor = (tagName) => {

        // Convert the text to a numeric value
        const numericValue = tagName
            .toLowerCase()
            .split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);

        // Calculate the index to select a color from the array
        const colorIndex = numericValue % predefinedColors.length;

        // Get the hex color from the array
        const hexColor = predefinedColors[colorIndex];

        return hexColor;
    };


    const actionOnSuccessModal = () => {
        dispatch({
            type: 'SUCCESS_MODAL_CLEANING_UP',
            payload: {
                message: '',
                successModalVisible: false,
            },
        });
    };


    return (
        <div>

            <HeroSection />

            {state?.deleteModalVisible &&
                <ConfirmDelete />
            }

            {state?.successModalVisible &&
                <CommonSuccessModal
                    actionOnSuccessModal={actionOnSuccessModal}
                />
            }

            {state?.createOrEditTaskModalVisible &&
                <CreateAndEditTask />
            }


            {/* Begin Table */}
            <section className="mb-20" id="tasks">

                <div className="container">

                    {/* Search Box Ends */}
                    <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                        <div className="mb-14 items-center justify-between sm:flex">
                            <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
                            <div className="flex items-center space-x-5">
                                <form onSubmit={(e) => e?.preventDefault()}>
                                    <div className="flex">
                                        <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
                                            <input
                                                type="search"
                                                id="search-dropdown"
                                                className="z-20 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none"
                                                placeholder="Search Task"
                                                required
                                                value={state?.searchKeyWord ? state?.searchKeyWord : ''}
                                                onChange={(e) => dispatch({ type: 'SET_SEARCH_KEYWORD', payload: e.target.value })}
                                            />
                                            <button type="submit" className="absolute right-2 top-0 h-full rounded-e-lg text-white md:right-4">
                                                <img
                                                    className='h-[16px] w-[16px]'
                                                    src={SearchWhite}
                                                    alt={'search'}
                                                />
                                                <span className="sr-only">Search</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>


                                <button
                                    className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
                                    onClick={() => {
                                        dispatch({
                                            type: 'SET_CREATE_EDIT_MODAL_VISIBLE', payload: {
                                                createOrEditTaskModalVisible: true,
                                                formValues: {},
                                                editTaskID: ''
                                            }
                                        });
                                    }}
                                >
                                    Add Task
                                </button>

                                <button
                                    className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
                                    onClick={() => {
                                        dispatch({
                                            type: 'SET_DELETE_MODAL_VISIBLE',
                                            payload: {
                                                message: 'Are you sure , you want to delete all tasks?',
                                                deleteModalVisible: true
                                            }
                                        });
                                    }}
                                >
                                    Delete All
                                </button>
                            </div>
                        </div>
                        <div className="overflow-auto">
                            {state?.filteredTaskData?.length > 0 ?

                                <table className="table-fixed overflow-auto xl:w-full">
                                    <thead>
                                        <tr>
                                            <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
                                            <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]"> Title </th>
                                            <th className="p-4 pb-8 text-sm font-semibold capitalize w-full"> Description </th>
                                            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]"> Tags </th>
                                            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Priority </th>
                                            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Options </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {state?.filteredTaskData?.map((eachTask, taskIndex) => {
                                            return (
                                                <tr
                                                    className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2"
                                                    key={eachTask?.id}
                                                >

                                                    {/* FAVORITE / NOT FAVORITE */}
                                                    <td
                                                        className='cursor-pointer'
                                                        onClick={() => {
                                                            let dummyTaskData = [...state?.taskData];
                                                            dummyTaskData[taskIndex].isFavorite = !dummyTaskData[taskIndex].isFavorite;

                                                            dispatch({
                                                                type: 'MODIFY_TASK_DATA',
                                                                payload: {
                                                                    taskData: [...dummyTaskData],
                                                                    filteredTaskData: [...dummyTaskData]
                                                                }
                                                            });
                                                        }}
                                                    >
                                                        <img
                                                            className='h-[24px] max-w-[24px]'
                                                            src={eachTask?.isFavorite ? FavoriteIcon : NonFavoriteIcon}
                                                            alt={eachTask?.isFavorite ? "favorite" : "not-favorite"}
                                                        />
                                                    </td>

                                                    {/* TITLE */}
                                                    <td>
                                                        {eachTask?.Title}
                                                    </td>

                                                    {/* DESCRIPTION */}
                                                    <td>
                                                        <div>
                                                            {eachTask?.Description}
                                                        </div>
                                                    </td>

                                                    {/* TAGS */}
                                                    <td>
                                                        <ul className="flex justify-center gap-1.5 flex-wrap">
                                                            {eachTask?.Tags?.map((eachTag, tagIndex) => (
                                                                eachTag &&
                                                                <li key={`${eachTag}-${tagIndex}`}>
                                                                    <span
                                                                        className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#00D991A1] px-2.5 text-sm capitalize text-[#F4F5F6]"
                                                                        style={{ background: getBackgroundColor(eachTag) }}
                                                                    >
                                                                        {eachTag}
                                                                    </span>
                                                                </li>
                                                            ))
                                                            }
                                                        </ul>
                                                    </td>

                                                    {/* PRIORITY */}
                                                    <td className="text-center">
                                                        {eachTask?.Priority}
                                                    </td>

                                                    {/* ACTION */}
                                                    <td>
                                                        <div className="flex items-center justify-center space-x-3">

                                                            <button
                                                                className="text-red-500"
                                                                onClick={() => {
                                                                    dispatch({
                                                                        type: 'SET_SPECIFIC_TASK_TO_DELETE',
                                                                        payload: {
                                                                            message: 'Are you sure , you want to delete this task?',
                                                                            deleteModalVisible: true,
                                                                            specificTaskDeleteID: eachTask?.id
                                                                        }
                                                                    });
                                                                }}
                                                            >
                                                                Delete
                                                            </button>

                                                            <button className="text-blue-500"
                                                                onClick={() => {
                                                                    dispatch({
                                                                        type: 'SET_SPECIFIC_TASK_TO_EDIT',
                                                                        payload: {
                                                                            createOrEditTaskModalVisible: true,
                                                                            editTaskID: eachTask?.id
                                                                        }
                                                                    });
                                                                }}
                                                            >
                                                                Edit
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>

                                :

                                <EmptyScreenView
                                    message={state?.taskData?.length > 0 ? 'No Task found using the search keyword.' : 'Task List is empty.'}
                                    detailedMessage={state?.taskData?.length > 0 ? 'Change the search keyword to view the searched task list.' : 'Task list will appear here once they are added.'}
                                />

                            }


                        </div>
                    </div>
                </div>
            </section>
            {/* End Table */}


        </div>
    );
}

export default MainBodyComponentAdvanced;
