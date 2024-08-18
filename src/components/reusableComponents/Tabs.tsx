import React, { useState } from 'react';
import CustomTextAria from './CustomTextAria';
import InputComponent from './InputComponent';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('General');

    const handleTabClick = (tab: any) => {
        setActiveTab(tab);
    };

    return (
        <div className="w-full">
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-styled-tab" role="tablist">
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                activeTab === 'General' ? 'text-primary border-primary' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                            }`}
                            id="profile-styled-tab"
                            onClick={() => handleTabClick('General')}
                            type="button"
                            role="tab"
                            aria-controls="styled-profile"
                            aria-selected={activeTab === 'General'}
                        >
                            General
                        </button>
                    </li>
                    <li className="me-2" role="Edit Connection settitgs">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                activeTab === 'Connection' ? 'text-primary border-primary' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                            }`}
                            id="profile-styled-tab"
                            onClick={() => handleTabClick('Connection')}
                            type="button"
                            role="tab"
                            aria-controls="styled-profile"
                            aria-selected={activeTab === 'Connection'}
                        >
                            Connection
                        </button>
                    </li>
                </ul>
            </div>
            <div id="default-styled-tab-content w-full">
                <div className={`p-4 rounded-lg bg-white dark:bg-gray-800 ${activeTab !== 'General' ? 'hidden' : ''}`} id="styled-profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div className="flex flex-col gap-[28px] w-full ">
                        <InputComponent label="Value added tax" type="text" onChange={() => console.log('first')} placeholder="hello" />
                        <InputComponent label="Value added tax" type="text" onChange={() => console.log('first')} placeholder="hello" />
                        <CustomTextAria label="Meal Description" name="details" onChange={() => console.log('change')} value="changing" placeholder="Type Here" />
                        <CustomTextAria label="Meal Description" name="details" onChange={() => console.log('change')} value="changing" placeholder="Type Here" />
                        <CustomTextAria label="Meal Description" name="details" onChange={() => console.log('change')} value="changing" placeholder="Type Here" />
                        <CustomTextAria label="Meal Description" name="details" onChange={() => console.log('change')} value="changing" placeholder="Type Here" />
                        <CustomTextAria label="Meal Description" name="details" onChange={() => console.log('change')} value="changing" placeholder="Type Here" />
                        <CustomTextAria label="Meal Description" name="details" onChange={() => console.log('change')} value="changing" placeholder="Type Here" />
                        <CustomTextAria label="Meal Description" name="details" onChange={() => console.log('change')} value="changing" placeholder="Type Here" />
                        <CustomTextAria label="Meal Description" name="details" onChange={() => console.log('change')} value="changing" placeholder="Type Here" />
                        <CustomTextAria label="Meal Description" name="details" onChange={() => console.log('change')} value="changing" placeholder="Type Here" />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="text-white flex    bg-gradient-to-r from-[#F23F39] to-[#BD0600]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab !== 'Connection' ? 'hidden' : ''}`} id="styled-dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        This is some placeholder content for the <strong className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
