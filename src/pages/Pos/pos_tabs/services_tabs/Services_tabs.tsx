import { Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
import IconSearch from '../../../../components/Icon/IconSearch';

import Custom_slider from '../../category_slider/Cat_Slider';
import { useGetAllCategoriesWithoutPaginationQuery } from '../../../../api/Resturants/Categories';
import { Sub_Cat } from '../../sub_category/Sub_Cat';
import Sub_slider from '../../sub_category/Sub_Slider';

export default function PosTabs() {
    const [search, setSearch] = useState(false);
    const { data } = useGetAllCategoriesWithoutPaginationQuery();
    console.log(data);
    return (
        <div className="mb-5 flex flex-col sm:flex-row w-full">
            <Tab.Group className="w-full">
                <div className=" w-auto mb-5 sm:mb-0">
                    <Tab.List className="mt-3  grid grid-cols-12 gap-2 w-full mx-auto  rounded-xl bg-white dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'bg-custom-gradient text-white !outline-none' : ''
                                    } -mb-[1px] hover:bg-custom-gradient  hover:text-white  rounded-lg p-3 col-span-3   before:inline-block    `}
                                >
                                    New
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'bg-custom-gradient text-white !outline-none' : ''
                                    } -mb-[1px] hover:bg-custom-gradient  hover:text-white  rounded-lg p-3 col-span-3  before:inline-block    `}
                                >
                                    Open Order
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'bg-custom-gradient text-white !outline-none' : ''
                                    } -mb-[1px] hover:bg-custom-gradient  hover:text-white  rounded-lg p-3 col-span-3  before:inline-block    `}
                                >
                                    Hold Bill
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'bg-custom-gradient text-white !outline-none' : ''
                                    } -mb-[1px] hover:bg-custom-gradient hover:text-white  rounded-lg p-3 col-span-3  before:inline-block    `}
                                >
                                    Table
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                </div>

                <Tab.Panels className="w-full">
                    <Tab.Panel>
                        <div className="active flex flex-col gap-7 w-full mt-[40px]">
                            <form
                                className={`${
                                    search && '!block'
                                } sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden  bg-white rounded-[50px]   `}
                                onSubmit={() => setSearch(false)}
                            >
                                <div className="relative ">
                                    <div className="flex items-center justify-center gap-2   ">
                                        <input
                                            type="text"
                                            className="form-input  ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-white rounded-[12px] placeholder:tracking-widest placeholder-gray-400  "
                                            placeholder="Search with category,sub category, meal name..."
                                        />
                                        <button type="button" className="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                                            <IconSearch className="mx-auto" />
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <div className="flex flex-col gap-6">
                                <h4>Category</h4>
                                <Custom_slider />
                            </div>
                            <div className="flex flex-col gap-6">
                                <h4> Sub Category</h4>
                                <Sub_slider />
                            </div>
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>orders</Tab.Panel>
                    <Tab.Panel>track</Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
