import React from 'react'

export default function TableCard() {
  return <>
  <div>

  <div className="grid pt-5 gap-5 grid-cols-12">

      <div className='bg-white hover:bg-custom-gradient cursor-pointer  p-1 rounded-xl col-span-2'>
        <div className="flex p-5 flex-col gap-3 justify-center items-center">
            <h1 className='bg-[#F4F4F4] text-red-500 font-semibold p-1 px-6  rounded-full'>T-01</h1>
            <p className='font-semibold'>Guests: 2:5</p>
            <p className='bg-[#b5e4d9] capitalize  text-[#009F79] font-medium text-[12px] p-1 px-6  rounded-full'>available</p>
        </div>
    </div>
      <div className='bg-white hover:bg-custom-gradient cursor-pointer  p-1 rounded-xl col-span-2'>
        <div className="flex p-5 flex-col gap-3 justify-center items-center">
            <h1 className='bg-[#F4F4F4] text-red-500 font-semibold p-1 px-6  rounded-full'>T-01</h1>
            <p className='font-semibold'>Guests: 2:5</p>
            <p className='bg-red-100 capitalize  text-red-500  font-medium text-[12px] p-1 px-6  rounded-full'>Not Available</p>
        </div>
    </div>
      <div className='bg-white hover:bg-custom-gradient cursor-pointer  p-1 rounded-xl col-span-2'>
        <div className="flex p-5 flex-col gap-3 justify-center items-center">
            <h1 className='bg-[#F4F4F4] text-red-500 font-semibold p-1 px-6  rounded-full'>T-01</h1>
            <p className='font-semibold'>Guests: 2:5</p>
            <p className='bg-[#b5e4d9] capitalize  text-[#009F79] font-medium text-[12px] p-1 px-6  rounded-full'>available</p>
        </div>
    </div>
      <div className='bg-white hover:bg-custom-gradient cursor-pointer  p-1 rounded-xl col-span-2'>
        <div className="flex p-5 flex-col gap-3 justify-center items-center">
            <h1 className='bg-[#F4F4F4] text-red-500 font-semibold p-1 px-6  rounded-full'>T-01</h1>
            <p className='font-semibold'>Guests: 2:5</p>
            <p className='bg-[#b5e4d9] capitalize  text-[#009F79] font-medium text-[12px] p-1 px-6  rounded-full'>available</p>
        </div>
    </div>
      <div className='bg-white hover:bg-custom-gradient cursor-pointer  p-1 rounded-xl col-span-2'>
        <div className="flex p-5 flex-col gap-3 justify-center items-center">
            <h1 className='bg-[#F4F4F4] text-red-500 font-semibold p-1 px-6  rounded-full'>T-01</h1>
            <p className='font-semibold'>Guests: 2:5</p>
            <p className='bg-[#b5e4d9] capitalize  text-[#009F79] font-medium text-[12px] p-1 px-6  rounded-full'>available</p>
        </div>
    </div>
      <div className='bg-white hover:bg-custom-gradient cursor-pointer  p-1 rounded-xl col-span-2'>
        <div className="flex p-5 flex-col gap-3 justify-center items-center">
            <h1 className='bg-[#F4F4F4] text-red-500 font-semibold p-1 px-6  rounded-full'>T-01</h1>
            <p className='font-semibold'>Guests: 2:5</p>
            <p className='bg-[#b5e4d9] capitalize  text-[#009F79] font-medium text-[12px] p-1 px-6  rounded-full'>available</p>
        </div>
    </div>
      <div className='bg-white hover:bg-custom-gradient cursor-pointer  p-1 rounded-xl col-span-2'>
        <div className="flex p-5 flex-col gap-3 justify-center items-center">
            <h1 className='bg-[#F4F4F4] text-red-500 font-semibold p-1 px-6  rounded-full'>T-01</h1>
            <p className='font-semibold'>Guests: 2:5</p>
            <p className='bg-[#b5e4d9] capitalize  text-[#009F79] font-medium text-[12px] p-1 px-6  rounded-full'>available</p>
        </div>
    </div>
    </div>


  <div className="flex  justify-end pt-5">
    <button className='bg-custom-gradient text-xl px-10 py-2 text-white rounded-2xl'>Save</button>
 
  </div> 
  <div className='flex pt-10 font-medium gap-10 flex-row justify-end'>
    <div className='flex gap-2 items-center'>
        <p className='w-3 h-3 rounded-full bg-green-500'></p>
    <span>  Available</span>
    </div>
    <div className='flex gap-2 items-center'>
        <p className='w-3 h-3 rounded-full bg-red-500'></p>
        <span> Not Available</span>
        </div>
    </div>
    
       </div>

  </>
}
