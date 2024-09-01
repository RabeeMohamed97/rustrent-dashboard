import React, { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '../category_slider/cat_slider.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { useGetSubcategoriesByCategoryIdQuery } from '../../../api/Resturants/Categories';
interface SubSliderProps {
    categoryId: number | null;
    onSelectSubCategory: Dispatch<SetStateAction<number |null>>
}
export default function Sub_slider({ categoryId ,onSelectSubCategory }:SubSliderProps) {
    const { data } = useGetSubcategoriesByCategoryIdQuery({ id: categoryId });
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(null);
    console.log(data);
    
    useEffect(() => {
        
      if (data?.response?.data?.data?.length > 0) {
        const defaultId = data?.response?.data?.data[0].id;
        
        setSelectedSubCategoryId(defaultId);
        onSelectSubCategory(defaultId);
      }
      console.log(111);

    }, [data, onSelectSubCategory,categoryId]);
  
    const handleCategorySelect = (id: number) => {
        setSelectedSubCategoryId(id);
      onSelectSubCategory(id);
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
                 className="mySwiper "
            >


                    {data?.response?.data?.data?.map((item: any) => (
                  <SwiperSlide key={item.id} onClick={() => handleCategorySelect(item.id)}>
                        <div className='w-[300px]  cursor-pointer'>

                          
            <div className={`${
          selectedSubCategoryId === item.id ? 'bg-custom-gradient text-white' : 'hover:text-white hover:bg-custom-gradient'
        } "flex flex-col   border-primary  hover:bg-custom-gradient bg-white rounded-[16px] text-[#A098AE] hover:text-white p-4 gap-4"`}>
                <img src={item?.image}  style={{ width: '50%' ,margin:'auto' }} alt="" className="h-[8] w-[8] rounded-full" />
                <span className="text-6" title={item?.name}>
  { item?.name}
</span>            </div>
        </div>
                    </SwiperSlide>

                ))}
         



                {/* <SwiperSlide>
                   
                </SwiperSlide> */}
            </Swiper>

        </>
    );
}
