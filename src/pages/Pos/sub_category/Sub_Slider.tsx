import React, { ReactNode, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '../category_slider/cat_slider.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { Sub_Cat } from '../sub_category/Sub_Cat';
import { useGetAllCategoriesWithoutPaginationQuery, useGetAllSubCategoriesByMainQuery } from '../../../api/Resturants/Categories';

export default function Sub_slider() {
    const { data } = useGetAllSubCategoriesByMainQuery();
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
                {data?.response?.data?.data?.map((item: any) => (
                    <SwiperSlide>
                        <Sub_Cat imgUrl={item?.image} title={item.name} />
                    </SwiperSlide>
                ))}

                {/* <SwiperSlide>
                   
                </SwiperSlide> */}
            </Swiper>
        </>
    );
}
