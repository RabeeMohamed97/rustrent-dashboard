import React from 'react';
import Cat_Slicer from './category_slider/Cat_Slider';
import PosTabs from './pos_tabs/services_tabs/Services_tabs';

const Pos = () => {
    return (
        <div className="grid grid-cols-12 h-[100Vh] gap-9">
            <div className="flex col-span-9 h-min">
                <PosTabs />
            </div>
            <div className="flex col-span-3 bg-red-800">right</div>
        </div>
    );
};

export default Pos;
