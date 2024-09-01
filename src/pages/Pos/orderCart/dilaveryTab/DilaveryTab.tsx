import React from 'react';
import './dilaveryTap.css';

const DilaveryTab = () => {
    return (
        <div>
            <div className="flex flex-col gap-6 pt-6  ">
                <div className="flex   items-center gap-3 w-full ">
                    <div className="relative custom-shadow rounded-[12px] w-full ">
                        <span className="pointer-events-none absolute inset-y-0 start-[-4px] grid w-10 place-content-center text-primary">
                            <svg width="20" height="20" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.00141 7.58473C4.93641 7.58473 4.06641 6.71973 4.06641 5.64973C4.06641 4.57973 4.93641 3.71973 6.00141 3.71973C7.06641 3.71973 7.93641 4.58473 7.93641 5.65473C7.93641 6.72473 7.06641 7.58473 6.00141 7.58473ZM6.00141 4.46973C5.35141 4.46973 4.81641 4.99973 4.81641 5.65473C4.81641 6.30973 5.34641 6.83973 6.00141 6.83973C6.65641 6.83973 7.18641 6.30973 7.18641 5.65473C7.18641 4.99973 6.65141 4.46973 6.00141 4.46973Z"
                                    fill="url(#paint0_linear_3575_3527)"
                                />
                                <path
                                    d="M6.00082 11.88C5.26082 11.88 4.51582 11.6 3.93582 11.045C2.46082 9.625 0.830821 7.36 1.44582 4.665C2.00082 2.22 4.13582 1.125 6.00082 1.125C6.00082 1.125 6.00082 1.125 6.00582 1.125C7.87082 1.125 10.0058 2.22 10.5608 4.67C11.1708 7.365 9.54082 9.625 8.06582 11.045C7.48582 11.6 6.74082 11.88 6.00082 11.88ZM6.00082 1.875C4.54582 1.875 2.67582 2.65 2.18082 4.83C1.64082 7.185 3.12082 9.215 4.46082 10.5C5.32582 11.335 6.68082 11.335 7.54582 10.5C8.88082 9.215 10.3608 7.185 9.83082 4.83C9.33082 2.65 7.45582 1.875 6.00082 1.875Z"
                                    fill="url(#paint1_linear_3575_3527)"
                                />
                                <defs>
                                    <linearGradient id="paint0_linear_3575_3527" x1="4.06202" y1="4.61171" x2="7.95745" y2="4.63704" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#F23F39" />
                                        <stop offset="1" stop-color="#BD0600" />
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_3575_3527" x1="1.30188" y1="3.6071" x2="10.7433" y2="3.66056" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#F23F39" />
                                        <stop offset="1" stop-color="#BD0600" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>

                        <input
                            type="text"
                            id="UserEmail"
                            placeholder="EL Giza Street, Nasar City, Cairo, Egypt"
                            className="w-full ps-8 rounded-[12px] p-3 border-gray-200 pe-10 shadow-sm sm:text-sm"
                        />
                    </div>

                    <button className="bg-custom-gradient  p-[12px] text-[32px] text-white rounded-[12px]">+</button>
                </div>
                <div className="flex justify-between w-full  gap-3">
                    <div className="relative rounded-[12px] w-full custom-shadow">
                        <span className="pointer-events-none absolute inset-y-0 start-[-4px] grid w-10 place-content-center text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </span>
                        <input type="email" id="UserEmail" placeholder="Search For User..." className="w-full ps-8 rounded-[12px] p-3 border-gray-200 pe-10 shadow-sm sm:text-sm" />
                    </div>

                    <button className="bg-custom-gradient  p-[12px] text-[32px] text-white rounded-[12px]">+</button>
                </div>

                <div className="flex flex-col gap-6 bg-white custom-shadow p-3 rounded-xl">
                    <h4 className="text-[24px] font-medium">Time Options</h4>

                    <div className="flex flex-col gap-6 rounded-[12px] bg-white">
                        <div className="flex justify-between content-center items-center w-full  p-3  border border-gray-200 rounded dark:border-gray-700">
                            <div className="flex justify-center items-center    gap-2  w-full">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.0013 18.9587C5.05964 18.9587 1.04297 14.942 1.04297 10.0003C1.04297 5.05866 5.05964 1.04199 10.0013 1.04199C14.943 1.04199 18.9596 5.05866 18.9596 10.0003C18.9596 14.942 14.943 18.9587 10.0013 18.9587ZM10.0013 2.29199C5.7513 2.29199 2.29297 5.75033 2.29297 10.0003C2.29297 14.2503 5.7513 17.7087 10.0013 17.7087C14.2513 17.7087 17.7096 14.2503 17.7096 10.0003C17.7096 5.75033 14.2513 2.29199 10.0013 2.29199Z"
                                        fill="url(#paint0_linear_3394_5628)"
                                    />
                                    <path
                                        d="M13.0909 13.2755C12.9826 13.2755 12.8742 13.2505 12.7742 13.1838L10.1909 11.6421C9.54922 11.2588 9.07422 10.4171 9.07422 9.67546V6.25879C9.07422 5.91712 9.35755 5.63379 9.69922 5.63379C10.0409 5.63379 10.3242 5.91712 10.3242 6.25879V9.67546C10.3242 9.97546 10.5742 10.4171 10.8326 10.5671L13.4159 12.1088C13.7159 12.2838 13.8076 12.6671 13.6326 12.9671C13.5076 13.1671 13.2992 13.2755 13.0909 13.2755Z"
                                        fill="url(#paint1_linear_3394_5628)"
                                    />
                                    <defs>
                                        <linearGradient id="paint0_linear_3394_5628" x1="1.02268" y1="5.17691" x2="19.0571" y2="5.294" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#F23F39" />
                                            <stop offset="1" stop-color="#BD0600" />
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_3394_5628" x1="9.06896" y1="7.39738" x2="13.7463" y2="7.41584" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#F23F39" />
                                            <stop offset="1" stop-color="#BD0600" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                <label htmlFor="bordered-radio-1" className="w-full mb-0  text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Now
                                </label>
                            </div>

                            <input
                                id="bordered-radio-1"
                                type="radio"
                                value=""
                                name="bordered-radio"
                                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 checked:bg-red-600 checked:border-red-600"
                            />
                        </div>

                        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                                checked
                                id="bordered-radio-2"
                                type="radio"
                                value=""
                                name="bordered-radio"
                                className="p-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor="bordered-radio-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Checked state
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DilaveryTab;
