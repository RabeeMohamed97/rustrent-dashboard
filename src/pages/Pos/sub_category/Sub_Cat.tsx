import React from 'react';
import img from '../../../../public/assets/images/profile-16.jpeg';

type Sub_CatProps = {
    imgUrl: string;
    title: string;
};
export const Sub_Cat = (props: Sub_CatProps) => {
    return (
        <div>
            <div className="flex flex-col hover:bg-custom-gradient bg-white rounded-[16px] text-[#A098AE] hover:text-white p-8 gap-4">
                <img src={props?.imgUrl} alt="" className="h-[56] w-[56] rounded-full" />
                <span className="text-6  "> {props?.title} </span>
            </div>
        </div>
    );
};
