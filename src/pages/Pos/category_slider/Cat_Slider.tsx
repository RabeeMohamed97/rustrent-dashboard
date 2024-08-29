import React, { ReactNode, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './cat_slider.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { Sub_Cat } from '../sub_category/Sub_Cat';
import { useGetAllCategoriesWithoutPaginationQuery } from '../../../api/Resturants/Categories';

export default function Custom_slider() {
    const { data } = useGetAllCategoriesWithoutPaginationQuery();
    console.log(data);
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
                {data?.response?.data?.map((item: any) => (
                    <SwiperSlide>
                        <div className="flex px-6 py-2 border-[1px] rounded-[100px] text-primary hover:text-white  hover:bg-custom-gradient border-primary border-solid">
                            <span className="   ">{item?.name}</span>
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
