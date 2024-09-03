import React, { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './cat_slider.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { useGetAllCategoriesWithoutPaginationQuery } from '../../../api/Resturants/Categories';

interface CustomSliderProps {
    onSelectCategory: Dispatch<SetStateAction<number |null>>
  }
export default function Custom_slider({ onSelectCategory }: CustomSliderProps) {
    const { data } = useGetAllCategoriesWithoutPaginationQuery();
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    useEffect(() => {
      if (data?.response?.data?.length > 0) {
        const defaultId = data.response.data[0].id;
        setSelectedCategoryId(defaultId);
        onSelectCategory(defaultId);
      }
    }, [data, onSelectCategory]);
  
    const handleCategorySelect = (id: number) => {
      setSelectedCategoryId(id);
      onSelectCategory(id);
    };
    return (
        <>
            <Swiper
                slidesPerView={'auto'}
                // centeredSlides={true}
                // spaceBetween={30}
                // pagination={{
                //     clickable: true,
                // }}
                // modules={[Pagination]}
                className="mySwiper"
            >
          {data?.response?.data?.map((item:any) => (
    <SwiperSlide key={item.id} onClick={() => handleCategorySelect(item.id)}>
      <div
        className={`flex cursor-pointer px-6 py-2 border-[1px] rounded-[100px] text-primary border-primary border-solid ${
          selectedCategoryId === item.id ? 'bg-custom-gradient text-white' : 'hover:text-white hover:bg-custom-gradient'
        }`}
      >
        <span>{item?.name}</span>
      </div>
    </SwiperSlide>
  ))}

                {/* <SwiperSlide>
                    <Sub_Cat />
                </SwiperSlide> */}
            </Swiper>
        </>
    );
}
