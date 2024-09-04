import React from 'react'
import { Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
import IconSearch from '../../../components/Icon/IconSearch';

import Custom_slider from '../category_slider/Cat_Slider';
import { useGetAllCategoriesWithoutPaginationQuery } from '../../../api/Resturants/Categories';
import Sub_slider from '../sub_category/Sub_Slider';
import { Meals } from '../Meals/Meals';
import OrderCard from '../Order/OrderCard';
import TableCard from './TableVip/TableCard';

export default function Tabel() {
    const [search, setSearch] = useState(false);

    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(null);

  return <>
  <div className='pt-10'>

    <h1 className='text-xl font-semibold'>Tables</h1>
    <div className="mb-5 flex flex-col sm:flex-row w-full">
      
    <Tab.Group className="w-full">
        <div className=" w-auto mb-5 sm:mb-0">
            <Tab.List className="mt-3  grid grid-cols-12 gap-2 w-full mx-auto  rounded-xl bg-white dark:border-[#191e3a]">
               
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button
                            className={`${
                                selected ? 'bg-custom-gradient text-white !outline-none' : ''
                            } -mb-[1px] hover:bg-custom-gradient text-red-600 font-semibold text-lg hover:text-white  rounded-lg p-3 col-span-6  before:inline-block    `}
                            >
                           VIP Table
                        </button>
                    )}
                </Tab>
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button
                            className={`${
                                selected ? 'bg-custom-gradient text-white !outline-none' : ''
                            } -mb-[1px] hover:bg-custom-gradient text-red-600 font-semibold text-lg hover:text-white  rounded-lg p-3 col-span-6  before:inline-block    `}
                        >
                          Public Table
                        </button>
                    )}
                </Tab>
            </Tab.List>
        </div>

        <Tab.Panels className="w-full">
        
            <Tab.Panel><TableCard/></Tab.Panel>
            <Tab.Panel>track</Tab.Panel>
        </Tab.Panels>
    </Tab.Group>
</div>
</div>

</>
}
