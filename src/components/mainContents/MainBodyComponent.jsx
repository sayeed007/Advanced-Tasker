import React, { useEffect, useState } from 'react';
import DemoData from '../../assets/data/DemoData';
import HeroSection from './HeroSection';
import SearchWhite from '../../assets/icons/SearchWhite.svg';
import FavoriteIcon from '../../assets/icons/FavoriteIcon.svg';
import NonFavoriteIcon from '../../assets/icons/NonFavoriteIcon.svg';


import EmptyScreenView from '../common/emptyScreen/EmptyScreenView';
import ConfirmDelete from '../common/deleteConfirmationModal/ConfirmDelete';
import CommonSuccessModal from '../common/commonSuccessModal/CommonSuccessModal';
import CommonErrorModal from '../common/commonErrorModal/CommonErrorModal';
import CreateAndEditTask from '../taskCreation/CreateAndEditTask';




const predefinedColors = ['#00D991A1', '#1C92FFB0', '#FE1A1AB5', '#BD560BB2', '#8407E6A8', '#00B2D9CC', '#2F43F8BF', '#10FBEDB2']

const MainBodyComponent = () => {

    const [taskData, setTaskData] = useState([...DemoData?.taskData]);
    const [filteredTaskData, setFilteredTaskData] = useState([...DemoData?.taskData]);

    const [searchKeyWord, setSearchKeyWord] = useState('');

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [specificTaskDeleteID, setSpecificTaskDeleteID] = useState('');

    const [message, setMessage] = useState('');
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    const [createOrEditTaskModalVisible, setCreateOrEditTaskModalVisible] = useState(false);
    const [editTaskID, setEditTaskID] = useState('');

    useEffect(() => {

        if (searchKeyWord.length > 0) {
            // Case-insensitive search
            const searchedTasks = [...taskData].filter((tasks) =>
                tasks.Title.toLowerCase().includes(searchKeyWord.toLowerCase())
            );

            // Update the displayed books based on the search result
            setFilteredTaskData([...searchedTasks]);
        } else {
            setFilteredTaskData([...taskData]);
        }


    }, [searchKeyWord]);







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


    // DELETE SINGLE TASK
    const deleteSpecificTask = () => {

        if (specificTaskDeleteID) {
            const remainingTasks = [...taskData].filter((tasks) => (tasks.id !== specificTaskDeleteID));

            setDeleteModalVisible(false);
            setSpecificTaskDeleteID('');

            setMessage('Task is successfully deleted');
            setSuccessModalVisible(true);

            setTaskData([...remainingTasks]);
            setFilteredTaskData([...remainingTasks]);
        } else {

            setDeleteModalVisible(false);

            setMessage('All Tasks are successfully deleted');
            setSuccessModalVisible(true);

            setTaskData([]);
            setFilteredTaskData([]);
        }


        // setDeleteModalVisible(false);

        // setMessage('Task not found');
        // setErrorModalVisible(true);
    };



    const actionOnSuccessModal = () => {
        setMessage('');
        setSuccessModalVisible(false);
    };

    const actionOnErrorModal = () => {
        setMessage('');
        setErrorModalVisible(false);
    };


    const handleSubmit = (value) => {

        // EDIT TASK DATA
        if (value?.id) {

            const dummyAllTasks = [...taskData];

            // Find the index where id matched
            const index = dummyAllTasks.findIndex(task => task.id === value?.id);

            dummyAllTasks[index] = value;

            setCreateOrEditTaskModalVisible(false);
            setEditTaskID('');

            setMessage('Task is successfully updated');
            setSuccessModalVisible(true);

            setTaskData([...dummyAllTasks]);
            setFilteredTaskData([...dummyAllTasks]);

        }
        // CREATE NEW TASK
        else {

            const dummyAllTasks = [...taskData];

            // GENERATE ID AND SAVE
            dummyAllTasks.push({
                ...value,
                id: new Date().getTime()
            });

            setCreateOrEditTaskModalVisible(false);

            setMessage('Task is successfully added');
            setSuccessModalVisible(true);

            setTaskData([...dummyAllTasks]);
            setFilteredTaskData([...dummyAllTasks]);
        }

    }

    return (
        <div>

            <HeroSection />

            {deleteModalVisible &&
                <ConfirmDelete
                    visible={deleteModalVisible}
                    confirmDelete={deleteSpecificTask}
                    message={message}
                    setDeleteModalVisible={setDeleteModalVisible}
                />
            }

            {successModalVisible &&
                <CommonSuccessModal
                    message={message}
                    visible={successModalVisible}
                    actionOnSuccessModal={actionOnSuccessModal}
                />

            }

            {errorModalVisible &&
                <CommonErrorModal
                    message={message}
                    visible={errorModalVisible}
                    actionOnErrorModal={actionOnErrorModal}
                />
            }

            {createOrEditTaskModalVisible &&
                <CreateAndEditTask
                    visible={createOrEditTaskModalVisible}
                    editTaskID={editTaskID}
                    setCreateOrEditTaskModalVisible={setCreateOrEditTaskModalVisible}
                    handleSubmit={handleSubmit}
                />
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
                                                onChange={(e) => setSearchKeyWord(e.target.value)}
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
                                        setCreateOrEditTaskModalVisible(true);
                                    }}
                                >
                                    Add Task
                                </button>

                                <button
                                    className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
                                    onClick={() => {
                                        setMessage('Are you sure , you want to delete all tasks?');
                                        setDeleteModalVisible(true);
                                    }}
                                >
                                    Delete All
                                </button>
                            </div>
                        </div>
                        <div className="overflow-auto">
                            {filteredTaskData?.length > 0 ?

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
                                        {filteredTaskData?.map((eachTask, taskIndex) => {
                                            return (
                                                <tr
                                                    className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2"
                                                    key={eachTask?.id}
                                                >

                                                    {/* FAVORITE / NOT FAVORITE */}
                                                    <td
                                                        className='cursor-pointer'
                                                        onClick={() => {
                                                            let dummyTaskData = [...taskData];
                                                            dummyTaskData[taskIndex].isFavorite = !dummyTaskData[taskIndex].isFavorite;

                                                            setTaskData([...dummyTaskData]);
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

                                                            {eachTask?.Tags?.map((eachTag) => (
                                                                <li>
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
                                                                    setMessage('Are you sure , you want to delete this task?');
                                                                    setDeleteModalVisible(true);
                                                                    setSpecificTaskDeleteID(eachTask?.id);
                                                                }}
                                                            >
                                                                Delete
                                                            </button>

                                                            <button className="text-blue-500"
                                                                onClick={() => {
                                                                    setCreateOrEditTaskModalVisible(true);
                                                                    setEditTaskID(eachTask?.id);
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
                                    message={taskData?.length > 0 ? 'No Task found using the search keyword.' : 'Task List is empty.'}
                                    detailedMessage={taskData?.length > 0 ? 'Change the search keyword to view the required task list.' : 'Task list will appear here once they are added.'}
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

export default MainBodyComponent;
