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
         
<div className={`${
          selectedSubCategoryId === item.id ? 'bg-custom-gradient text-white' : 'hover:text-white hover:bg-custom-gradient'
        } "flex flex-col items-center  w-[160px] h-[160px]    rounded-lg shadow     hover:bg-custom-gradient bg-white  text-[#A098AE] hover:text-white  py-4 gap-4"`}>
    <div className="flex flex-col items-center  content-center">
    <img src={item?.image} alt={item?.name} className="min-w-16 w-[160px] min-h-16 h-[160px] mb-3 rounded-full " />

        <h5 className="mb-1 text-md font-medium "  title={item?.name}>  { item?.name}
        </h5>     
    </div>
</div>
                        {/* <div classNameName='card w-[150px]  cursor-pointer'>

                          
            <div classNameName={`${
          selectedSubCategoryId === item.id ? 'bg-custom-gradient text-white' : 'hover:text-white hover:bg-custom-gradient'
        } "flex flex-col   border-primary  hover:bg-custom-gradient bg-white rounded-[16px] text-[#A098AE] hover:text-white  p-4 gap-4"`}>
          <div>
                <span classNameName="text-6">

</span>     
          </div>
       </div>
        </div> */}
                    </SwiperSlide>

                ))}
         



                {/* <SwiperSlide>
                   
                </SwiperSlide> */}
            </Swiper>

        </>
    );
}
