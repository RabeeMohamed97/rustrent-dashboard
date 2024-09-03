import { Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
import IconSearch from '../../../../components/Icon/IconSearch';

import Custom_slider from '../../category_slider/Cat_Slider';
import { useGetAllCategoriesWithoutPaginationQuery } from '../../../../api/Resturants/Categories';
import Sub_slider from '../../sub_category/Sub_Slider';
import { Meals } from '../../Meals/Meals';
import OrderCard from '../../Order/OrderCard';

export default function PosTabs() {
    const [search, setSearch] = useState(false);

    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(null);

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
                                <h4 className='text-2xl font-semibold'>Category</h4>
                          
                                <Custom_slider  onSelectCategory={setSelectedCategoryId}/>
                            </div>
                            <div className="flex flex-col gap-6">
                            <h4 className='text-2xl font-semibold'> Sub Category</h4>
               
                           

                                <Sub_slider categoryId={selectedCategoryId}  onSelectSubCategory={setSelectedSubCategoryId} />
                            </div>
                            <div className="flex flex-col gap-6">
                            <div className="flex justify-between">
                            <h4 className='text-2xl font-semibold'>Meals</h4>
                            <div className="flex items-center">
                                <p className='text-[#F23F39] text-xl font-semibold'>View all
                           
                           </p>
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0771 11.9998C15.0779 12.1314 15.0529 12.2619 15.0035 12.3837C14.9542 12.5056 14.8815 12.6164 14.7896 12.7098L10.8243 16.7098C10.6376 16.8981 10.3844 17.0039 10.1204 17.0039C9.8564 17.0039 9.60322 16.8981 9.41655 16.7098C9.22987 16.5215 9.125 16.2661 9.125 15.9998C9.125 15.7335 9.22987 15.4781 9.41655 15.2898L12.688 11.9998L9.42646 8.70982C9.26405 8.51851 9.17919 8.27244 9.18882 8.02076C9.19846 7.76909 9.30189 7.53035 9.47844 7.35225C9.655 7.17416 9.89167 7.06983 10.1412 7.06011C10.3907 7.05038 10.6346 7.13599 10.8243 7.29982L14.7896 11.2998C14.9728 11.4861 15.076 11.7375 15.0771 11.9998Z" fill="url(#paint0_linear_2978_13346)"/>
<defs>
<linearGradient id="paint0_linear_2978_13346" x1="10.4987" y1="17.0152" x2="10.6072" y2="7.00604" gradientUnits="userSpaceOnUse">
<stop stop-color="#F23F39"/>
<stop offset="1" stop-color="#BD0600"/>
</linearGradient>
</defs>
</svg>

                                </div>
                           
                                </div>
                                <Meals SubCategoryId={selectedSubCategoryId} />
                            </div>
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <OrderCard/>
                    </Tab.Panel>
                    <Tab.Panel>track</Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
