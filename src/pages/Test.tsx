import React, { useState } from 'react';
import CustomDataInput from '../components/reusableComponents/DateInput';

const Test: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    return (
        <div className="p-4">
            <h1 className="text-lg font-bold mb-4">Select a Date</h1>
            <CustomDataInput label="Date of Birth" value={selectedDate} onChange={handleDateChange} />
        </div>
    );
};

export default Test;
