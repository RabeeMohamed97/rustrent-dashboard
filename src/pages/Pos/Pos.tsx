import React from 'react';
import Cat_Slicer from './category_slider/Cat_Slider';

const Pos = () => {
    return (
        <div className="grid grid-cols-12 h-[100Vh]">
            <div className="flex col-span-9 h-min">
                <Cat_Slicer />
            </div>
            <div className="flex col-span-3 bg-red-800">right</div>
        </div>
    );
};

export default Pos;
