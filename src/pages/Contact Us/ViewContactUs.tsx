import React, { useState } from 'react';
import MainPageCard from '../../components/reusableComponents/MainPageCard';
import { AiOutlineUser } from 'react-icons/ai';
import { IoCallOutline } from 'react-icons/io5';
import { CiMail } from 'react-icons/ci';
import { MdOutlineSms } from 'react-icons/md';
import { RxCalendar } from 'react-icons/rx';
import { BsToggleOff } from 'react-icons/bs';
import ReusableButton from '../../components/reusableComponents/Reusablebutton';
import { useGetAllContactsQuery, useGetSingleContactQuery } from '../../api/Resturants/SettingSlice';
import { useParams } from 'react-router-dom';
import CustomModal from '../../components/reusableComponents/CustomModal';
import Add_Response from './AddResponse';

const ViewContactUs = () => {
    const { id } = useParams();
    const { data } = useGetSingleContactQuery({ id: id ? +id : null });
    const [open, setOpen] = useState(false);
    console.log(data);
    const handleOpenModal = () => {
        setOpen(true);
    };
    return (
        <div className="flex flex-col gap-[54px]">
            {open && (
                <CustomModal openCloseModal={setOpen} title="Add Category">
                    <Add_Response id={id} />
                </CustomModal>
            )}
            <MainPageCard>
                <div className="flex flex-col  gap-10 w-full">
                    <div className="flex w-full justify-between">
                        <div className="flex col-span-4 items-center gap-0.5">
                            <AiOutlineUser className="w-4.5 h-4.5" />
                            <span className="text-[16px]"> Customer Name : {data?.response?.data?.name}</span>
                        </div>
                        <div className="flex col-span-4 items-center gap-0.5">
                            <IoCallOutline className="w-4.5 h-4.5" />
                            <span className="text-[16px]"> Mobile Number : {data?.response?.data?.phone}</span>
                        </div>
                        <div className="flex col-span-4 items-center gap-0.5">
                            <CiMail className="w-4.5 h-4.5" />
                            <span className="text-[16px]"> Email : {data?.response?.data?.email}</span>
                        </div>
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="flex col-span-4 items-center gap-0.5">
                            <MdOutlineSms className="w-4.5 h-4.5" />
                            <span className="text-[16px]"> Message Type : {data?.response?.data?.msg_type}</span>
                        </div>
                        <div className="flex col-span-4 items-center gap-0.5">
                            <RxCalendar className="w-4.5 h-4.5" />
                            <span className="text-[16px]"> Start Date : {data?.response?.data?.msg_type}</span>
                        </div>
                        <div className="flex col-span-4 items-center gap-0.5">
                            <BsToggleOff className="w-4.5 h-4.5" />
                            <span className="text-[16px]">
                                {' '}
                                Message Status: {data?.response?.data?.response_msg === null ? <span className="text-[red]"> Not Answered </span> : <span className="text-[#009F79]"> Answered </span>}
                            </span>
                        </div>
                    </div>
                    <div className="flex min-h-[183px] bg-[#F5F5F5] px-[20px] py-[24px] text-[12px] rounded-[15px] ">{data?.response?.data?.msg}</div>
                </div>
            </MainPageCard>
            <div className="flex justify-end">
                <ReusableButton label="Respond" onClick={handleOpenModal} />
            </div>
        </div>
    );
};

export default ViewContactUs;
