import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './cat_slider.css';

// import required modules
import { Pagination } from 'swiper/modules';

export default function App() {
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
                className="mySwiper "
            >
                <SwiperSlide>
                    <div className="flex px-6 py-2 border-[1px] border-primary border-solid rounded-[100px] text-primary text-[16px]"> pizza</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex px-6 py-2 border-[1px] border-primary border-solid rounded-[100px] text-primary"> burger</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex px-6 py-2 border-[1px] border-primary border-solid rounded-[100px] text-primary"> burger</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex px-6 py-2 border-[1px] border-primary border-solid rounded-[100px] text-primary"> burger</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex px-6 py-2 border-[1px] border-primary border-solid rounded-[100px] text-primary"> burger</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex px-6 py-2 border-[1px] border-primary border-solid rounded-[100px] text-primary"> burger</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex px-6 py-2 border-[1px] border-primary border-solid rounded-[100px] text-primary"> burger</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex px-6 py-2 border-[1px] border-primary border-solid rounded-[100px] text-primary"> burger</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex px-6 py-2 border-[1px] border-primary border-solid rounded-[100px] text-primary"> burger</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex px-6 py-2 border-[1px] border-primary border-solid rounded-[100px] text-primary"> burger</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex px-6 py-2 border-[1px] border-primary border-solid rounded-[100px] text-primary"> burger</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex px-6 py-2 border-[1px] border-primary border-solid rounded-[100px] text-primary"> burger</div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
