import React, { useState } from 'react';
import './dilaveryTap.css';
import CustomDataInput from '../../../../components/reusableComponents/DateInput';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import orderImg from '../../../../assets/pizza-2021-08-26-17-02-26-utc.png';

const DilaveryTab = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [timeOptions, setTimeOptions] = useState('now');

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleTimeOptions = (value: string) => {
        setTimeOptions(value);
    };

    return (
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

                    <input type="text" id="UserEmail" placeholder="EL Giza Street, Nasar City, Cairo, Egypt" className="w-full ps-8 rounded-[12px] p-3 border-gray-200 pe-10 shadow-sm sm:text-sm" />
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
                            checked={timeOptions === 'now'}
                            onClick={() => handleTimeOptions('now')}
                            type="radio"
                            value=""
                            name="bordered-radio"
                            className="w-4 h-4 text-red-600 bg-red-100 border-red-300"
                        />
                    </div>
                    <div className="flex justify-between content-center items-center w-full  p-3  border border-gray-200 rounded dark:border-gray-700">
                        <div className="flex justify-center items-center    gap-2  w-full">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.66797 4.79199C6.3263 4.79199 6.04297 4.50866 6.04297 4.16699V1.66699C6.04297 1.32533 6.3263 1.04199 6.66797 1.04199C7.00964 1.04199 7.29297 1.32533 7.29297 1.66699V4.16699C7.29297 4.50866 7.00964 4.79199 6.66797 4.79199Z"
                                    fill="url(#paint0_linear_3592_5022)"
                                />
                                <path
                                    d="M13.332 4.79199C12.9904 4.79199 12.707 4.50866 12.707 4.16699V1.66699C12.707 1.32533 12.9904 1.04199 13.332 1.04199C13.6737 1.04199 13.957 1.32533 13.957 1.66699V4.16699C13.957 4.50866 13.6737 4.79199 13.332 4.79199Z"
                                    fill="url(#paint1_linear_3592_5022)"
                                />
                                <path
                                    d="M7.08333 12.0829C6.975 12.0829 6.86667 12.058 6.76667 12.0163C6.65833 11.9746 6.575 11.9163 6.49167 11.8413C6.34167 11.6829 6.25 11.4746 6.25 11.2496C6.25 11.1413 6.275 11.0329 6.31667 10.9329C6.35833 10.8329 6.41667 10.7413 6.49167 10.6579C6.575 10.5829 6.65833 10.5246 6.76667 10.4829C7.06667 10.3579 7.44167 10.4246 7.675 10.6579C7.825 10.8163 7.91667 11.0329 7.91667 11.2496C7.91667 11.2996 7.90833 11.358 7.9 11.4163C7.89167 11.4663 7.875 11.5163 7.85 11.5663C7.83333 11.6163 7.80833 11.6663 7.775 11.7163C7.75 11.7579 7.70833 11.7996 7.675 11.8413C7.51667 11.9913 7.3 12.0829 7.08333 12.0829Z"
                                    fill="url(#paint2_linear_3592_5022)"
                                />
                                <path
                                    d="M10.0013 12.0837C9.89297 12.0837 9.78463 12.0587 9.68463 12.0171C9.5763 11.9754 9.49297 11.917 9.40964 11.842C9.25964 11.6837 9.16797 11.4754 9.16797 11.2504C9.16797 11.142 9.19297 11.0337 9.23464 10.9337C9.2763 10.8337 9.33464 10.7421 9.40964 10.6587C9.49297 10.5837 9.5763 10.5254 9.68463 10.4837C9.98463 10.3504 10.3596 10.4254 10.593 10.6587C10.743 10.8171 10.8346 11.0337 10.8346 11.2504C10.8346 11.3004 10.8263 11.3587 10.818 11.4171C10.8096 11.4671 10.793 11.5171 10.768 11.5671C10.7513 11.6171 10.7263 11.667 10.693 11.717C10.668 11.7587 10.6263 11.8004 10.593 11.842C10.4346 11.992 10.218 12.0837 10.0013 12.0837Z"
                                    fill="url(#paint3_linear_3592_5022)"
                                />
                                <path
                                    d="M12.9154 12.0837C12.807 12.0837 12.6987 12.0587 12.5987 12.0171C12.4904 11.9754 12.407 11.917 12.3237 11.842C12.2904 11.8004 12.257 11.7587 12.2237 11.717C12.1904 11.667 12.1654 11.6171 12.1487 11.5671C12.1237 11.5171 12.107 11.4671 12.0987 11.4171C12.0904 11.3587 12.082 11.3004 12.082 11.2504C12.082 11.0337 12.1737 10.8171 12.3237 10.6587C12.407 10.5837 12.4904 10.5254 12.5987 10.4837C12.907 10.3504 13.2737 10.4254 13.507 10.6587C13.657 10.8171 13.7487 11.0337 13.7487 11.2504C13.7487 11.3004 13.7404 11.3587 13.732 11.4171C13.7237 11.4671 13.707 11.5171 13.682 11.5671C13.6654 11.6171 13.6404 11.667 13.607 11.717C13.582 11.7587 13.5404 11.8004 13.507 11.842C13.3487 11.992 13.132 12.0837 12.9154 12.0837Z"
                                    fill="url(#paint4_linear_3592_5022)"
                                />
                                <path
                                    d="M7.08333 15C6.975 15 6.86667 14.975 6.76667 14.9333C6.66667 14.8917 6.575 14.8333 6.49167 14.7583C6.34167 14.6 6.25 14.3833 6.25 14.1667C6.25 14.0583 6.275 13.95 6.31667 13.85C6.35833 13.7417 6.41667 13.65 6.49167 13.575C6.8 13.2667 7.36667 13.2667 7.675 13.575C7.825 13.7333 7.91667 13.95 7.91667 14.1667C7.91667 14.3833 7.825 14.6 7.675 14.7583C7.51667 14.9083 7.3 15 7.08333 15Z"
                                    fill="url(#paint5_linear_3592_5022)"
                                />
                                <path
                                    d="M10.0013 15C9.78464 15 9.56797 14.9083 9.40964 14.7583C9.25964 14.6 9.16797 14.3833 9.16797 14.1667C9.16797 14.0583 9.19297 13.95 9.23464 13.85C9.2763 13.7417 9.33464 13.65 9.40964 13.575C9.71797 13.2667 10.2846 13.2667 10.593 13.575C10.668 13.65 10.7263 13.7417 10.768 13.85C10.8096 13.95 10.8346 14.0583 10.8346 14.1667C10.8346 14.3833 10.743 14.6 10.593 14.7583C10.4346 14.9083 10.218 15 10.0013 15Z"
                                    fill="url(#paint6_linear_3592_5022)"
                                />
                                <path
                                    d="M12.9154 15.0004C12.6987 15.0004 12.482 14.9087 12.3237 14.7587C12.2487 14.6837 12.1904 14.5921 12.1487 14.4838C12.107 14.3838 12.082 14.2754 12.082 14.1671C12.082 14.0587 12.107 13.9504 12.1487 13.8504C12.1904 13.7421 12.2487 13.6504 12.3237 13.5754C12.5154 13.3838 12.807 13.2921 13.0737 13.3504C13.132 13.3587 13.182 13.3754 13.232 13.4004C13.282 13.4171 13.332 13.4421 13.382 13.4754C13.4237 13.5004 13.4654 13.5421 13.507 13.5754C13.657 13.7338 13.7487 13.9504 13.7487 14.1671C13.7487 14.3837 13.657 14.6004 13.507 14.7587C13.3487 14.9087 13.132 15.0004 12.9154 15.0004Z"
                                    fill="url(#paint7_linear_3592_5022)"
                                />
                                <path
                                    d="M17.0846 8.20019H2.91797C2.5763 8.20019 2.29297 7.91686 2.29297 7.5752C2.29297 7.23353 2.5763 6.9502 2.91797 6.9502H17.0846C17.4263 6.9502 17.7096 7.23353 17.7096 7.5752C17.7096 7.91686 17.4263 8.20019 17.0846 8.20019Z"
                                    fill="url(#paint8_linear_3592_5022)"
                                />
                                <path
                                    d="M13.3333 18.9587H6.66667C3.625 18.9587 1.875 17.2087 1.875 14.167V7.08366C1.875 4.04199 3.625 2.29199 6.66667 2.29199H13.3333C16.375 2.29199 18.125 4.04199 18.125 7.08366V14.167C18.125 17.2087 16.375 18.9587 13.3333 18.9587ZM6.66667 3.54199C4.28333 3.54199 3.125 4.70033 3.125 7.08366V14.167C3.125 16.5503 4.28333 17.7087 6.66667 17.7087H13.3333C15.7167 17.7087 16.875 16.5503 16.875 14.167V7.08366C16.875 4.70033 15.7167 3.54199 13.3333 3.54199H6.66667Z"
                                    fill="url(#paint9_linear_3592_5022)"
                                />
                                <defs>
                                    <linearGradient id="paint0_linear_3592_5022" x1="6.04155" y1="1.90744" x2="7.29981" y2="1.91016" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#F23F39" />
                                        <stop offset="1" stop-color="#BD0600" />
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_3592_5022" x1="12.7056" y1="1.90744" x2="13.9639" y2="1.91016" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#F23F39" />
                                        <stop offset="1" stop-color="#BD0600" />
                                    </linearGradient>
                                    <linearGradient id="paint2_linear_3592_5022" x1="6.24811" y1="10.8045" x2="7.92573" y2="10.8154" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#F23F39" />
                                        <stop offset="1" stop-color="#BD0600" />
                                    </linearGradient>
                                    <linearGradient id="paint3_linear_3592_5022" x1="9.16608" y1="10.8024" x2="10.8437" y2="10.8133" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#F23F39" />
                                        <stop offset="1" stop-color="#BD0600" />
                                    </linearGradient>
                                    <linearGradient id="paint4_linear_3592_5022" x1="12.0801" y1="10.8024" x2="13.7578" y2="10.8133" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#F23F39" />
                                        <stop offset="1" stop-color="#BD0600" />
                                    </linearGradient>
                                    <linearGradient id="paint5_linear_3592_5022" x1="6.24811" y1="13.726" x2="7.92573" y2="13.7369" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#F23F39" />
                                        <stop offset="1" stop-color="#BD0600" />
                                    </linearGradient>
                                    <linearGradient id="paint6_linear_3592_5022" x1="9.16608" y1="13.726" x2="10.8437" y2="13.7369" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#F23F39" />
                                        <stop offset="1" stop-color="#BD0600" />
                                    </linearGradient>
                                    <linearGradient id="paint7_linear_3592_5022" x1="12.0801" y1="13.7178" x2="13.7578" y2="13.7287" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#F23F39" />
                                        <stop offset="1" stop-color="#BD0600" />
                                    </linearGradient>
                                    <linearGradient id="paint8_linear_3592_5022" x1="2.27551" y1="7.23868" x2="17.6952" y2="8.47342" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#F23F39" />
                                        <stop offset="1" stop-color="#BD0600" />
                                    </linearGradient>
                                    <linearGradient id="paint9_linear_3592_5022" x1="1.8566" y1="6.13842" x2="18.2134" y2="6.24197" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#F23F39" />
                                        <stop offset="1" stop-color="#BD0600" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            <label htmlFor="bordered-radio-1" className="w-full mb-0  text-sm font-medium text-gray-900 dark:text-gray-300">
                                Selected Time
                            </label>
                        </div>

                        <input
                            id="bordered-radio-1"
                            checked={timeOptions === 'later'}
                            onClick={() => handleTimeOptions('later')}
                            type="radio"
                            value=""
                            name="bordered-radio"
                            className="w-4 h-4 text-red-600 bg-red-100 border-red-300"
                        />
                    </div>

                    <div className={`${timeOptions === 'now' ? 'hidden' : 'flex'} flex-col gap-2 w-full`}>
                        <CustomDataInput color={true} value={selectedDate} onChange={handleDateChange} />

                        <DatePicker
                            selected={selectedTime}
                            onChange={(time: any) => setSelectedTime(time)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            className="appearance-none border p-2.5 border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholderText="Select a time"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-between w-full">
                <span className="font-medium text-[18px]">Order Summary</span>
                <span className="text-[18px] text-[#5C5C5C]">#1234567</span>
            </div>

            <hr />

            <div className="flex flex-col gap-[22px]">
                <div className="flex flex-col gap-[6px]">
                    <span className="text-[24px] font-medium">Order Menu</span>
                    <div className="flex justify-between  items-center">
                        <div className="flex gap-4 items-center">
                            <img src={orderImg} alt="" className="rounded-full" />
                            <div className="flex flex-col">
                                <span className="text-[18px] font-medium">Fries</span>
                                <span className="text-[12px] text-[#5C5C5C]">$8.00</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[18px] font-medium">Burger</span>
                            <span className="text-[12px] text-[#5C5C5C]">$12.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DilaveryTab;
