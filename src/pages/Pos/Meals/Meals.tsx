import React, { useState } from 'react';
import { useGetAnySelectOptionsQuery } from '../../../api/Resturants/Categories';
import { useGetItemBySubCategoryIdQuery } from '../../../api/Resturants/Meals';


export const Meals = ({SubCategoryId}:any) => {
    const { data, isSuccess, isError } = useGetItemBySubCategoryIdQuery({ id:SubCategoryId });
    console.log(data?.response?.data);
    
    const [count, setCount] = useState(2);

    const handleDecrement = () => {
      if (count > 0) {
        setCount(count - 1);
      }
    };
  
    const handleIncrement = () => {
      setCount(count + 1);
    };
    return (
        <div className='grid grid-cols-12 gap-4 py-10'>
            
            {data?.response?.data?.map((item: any) => (
            
         <div key={item.id} className="col-span-3 py-5 w-full h-[250px]  bg-white rounded-[16px] text-[#A098AE] gap-4 ">
            <div className="relative py-5   ">
            <div className="absolute  rounded-full      -top-20 z-30 left-20">

              <img
                src={item?.image}
                className="rounded-full w-28 h-28   "
              />
                          </div>

            </div>
            <div className='p-4'>

            <div className=" py-4">
              <div className=" mb-2 flex flex-col  mt-[10px]  gap-4">
                <h4 className="text-left font-bold text-black ">{item?.name}</h4>
                <p className="text-left text-[#5C5C5C] ">Buffalo Chicken Mac & Cheese Plate </p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="">
                <p className="font-semibold text-[20px] text-[#D92726]" >${item?.price}</p>
              </div>
              <div className="flex items-center justify-between bg-[#e4e4ec] px-[10px] p-[5px] w-[auto] h-[30px] rounded-full">
      <button onClick={handleDecrement} className="text-[#BD0600]">
      <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_10_1601)">
<rect width="21" height="19" rx="9.5" fill="#BD0600"/>
<path d="M15.6667 8H5.66667C5.22464 8 4.80072 8.1756 4.48816 8.48816C4.17559 8.80072 4 9.22464 4 9.66667C4 10.1087 4.17559 10.5326 4.48816 10.8452C4.80072 11.1577 5.22464 11.3333 5.66667 11.3333H15.6667C16.1087 11.3333 16.5326 11.1577 16.8452 10.8452C17.1577 10.5326 17.3333 10.1087 17.3333 9.66667C17.3333 9.22464 17.1577 8.80072 16.8452 8.48816C16.5326 8.1756 16.1087 8 15.6667 8Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_10_1601">
<rect width="21" height="19" rx="9.5" fill="white"/>
</clipPath>
</defs>
</svg>


      </button>
      <p className="text-Poppins text-[20px] text-[#BD0600] m-[10px]">{count}</p>
      <button onClick={handleIncrement} className="text-[#BD0600]">
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="21" rx="10.5" fill="#BD0600"/>
<g clip-path="url(#clip0_10_1604)">
<path d="M15.8051 9.81601H11.3453V5.19492C11.3453 4.53321 10.8094 3.99727 10.1477 3.99727C9.48594 3.99727 8.95 4.53321 8.95 5.19492V9.81601H4.19219C3.53594 9.81601 3 10.352 3 11.0137C3 11.6754 3.53594 12.2113 4.19766 12.2113H8.95547V16.8051C8.95547 17.4668 9.49141 18.0027 10.1531 18.0027C10.8148 18.0027 11.3508 17.4668 11.3508 16.8051V12.2113H15.8105C16.4723 12.2113 17.0082 11.6754 17.0082 11.0137C17 10.352 16.4668 9.81601 15.8051 9.81601Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_10_1604">
<rect width="14" height="14" fill="white" transform="translate(3 4)"/>
</clipPath>
</defs>
</svg>

      </button>
    </div>
          </div>
          </div>

        </div>

                ))}
         
          
          
        </div>
    );
};
