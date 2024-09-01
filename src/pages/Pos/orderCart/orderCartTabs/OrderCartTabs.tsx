import { Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
import IconSearch from '../../../../components/Icon/IconSearch';

import Custom_slider from '../../category_slider/Cat_Slider';
import { useGetAllCategoriesWithoutPaginationQuery } from '../../../../api/Resturants/Categories';
import { Sub_Cat } from '../../sub_category/Sub_Cat';
import Sub_slider from '../../sub_category/Sub_Slider';
import DilaveryTab from '../dilaveryTab/DilaveryTab';

export default function OrderCartTabs() {
    const [search, setSearch] = useState(false);
    const { data } = useGetAllCategoriesWithoutPaginationQuery();
    console.log(data);
    return (
        <div className="mb-5 flex flex-col sm:flex-row   w-full">
            <Tab.Group className="w-full ">
                <div className=" w-full mb-5 sm:mb-0 flex justify-center items-center">
                    <Tab.List className="mt-3  grid grid-cols-12 gap-2 w-full mx-auto  rounded-2xl bg-[#F4F4F4] dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'bg-custom-gradient text-white !outline-none' : ''
                                    } -mb-[1px] hover:bg-custom-gradient text-primary  hover:text-white  rounded-lg p-3 col-span-4  before:inline-block    `}
                                >
                                    Dine In
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'bg-custom-gradient text-white !outline-none' : ''
                                    } -mb-[1px] hover:bg-custom-gradient text-primary  hover:text-white  rounded-lg p-3 col-span-4  before:inline-block    `}
                                >
                                    Delivery
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'bg-custom-gradient text-white !outline-none' : ''
                                    } -mb-[1px] hover:bg-custom-gradient  text-primary hover:text-white  rounded-lg p-3 col-span-4 before:inline-block    `}
                                >
                                    Pick Up
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                </div>

                <Tab.Panels className="w-full">
                    <Tab.Panel>
                        <div className="active flex flex-col gap-7 w-full mt-[40px]">orders</div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <DilaveryTab />
                    </Tab.Panel>
                    <Tab.Panel>track</Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
