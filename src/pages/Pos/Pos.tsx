import React from 'react';
import Cat_Slicer from './category_slider/Cat_Slider';
import PosTabs from './pos_tabs/services_tabs/Services_tabs';
import OrderCartTabs from './orderCart/orderCartTabs/OrderCartTabs';

const Pos = () => {
    return (
        <div className="grid grid-cols-12 h-[100Vh] gap-9">
            <div className="flex col-span-9 h-min">
                <PosTabs />
            </div>
            <div className="flex flex-col col-span-3 bg-white p-3 rounded-[12px] w-full">
                <div className="flex w-full">
                    <OrderCartTabs />
                </div>
            </div>
        </div>
    );
};

export default Pos;
