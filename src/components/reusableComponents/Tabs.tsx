import React, { useState } from 'react';

import CustomConnection from './ConnectionDetails';
import GeneralSettings from '../../pages/Settings/Genral/GeneralSettings';

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
                    <GeneralSettings />
                </div>
                <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab !== 'Connection' ? 'hidden' : ''}`} id="styled-dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                    <CustomConnection />
                </div>
            </div>
        </div>
    );
};

export default Tabs;
