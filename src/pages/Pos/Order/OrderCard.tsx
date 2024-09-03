import React, { useState } from 'react';

const OrderCard = () => {
  const [selectedTable, setSelectedTable] = useState('');
  
  const data = [
    {
      tableName: "Table One",
      meals: [
        { mealName: "pizza cheese", quantity: 2, status: "Preparing" },
        { mealName: "pizza cheese", quantity: 2, status: "Ready" },
        { mealName: "pizza cheese", quantity: 2, status: "Delivered" },
      ],
    },
    {
      tableName: "Table Two",
      meals: [
        { mealName: "burger", quantity: 1, status: "Preparing" },
        { mealName: "burger", quantity: 1, status: "Delivered" },
      ],
    },
    {
      tableName: "Table Three",
      meals: [
        { mealName: "pasta", quantity: 3, status: "Ready" },
      ],
    },
  ];

  const getSelectedTableMeals = (selectedTable:any) => {
    const table = data.find((item) => item.tableName === selectedTable);
    return table ? table.meals : [];
  };

  const getStatusColor = (status:any) => {
    switch (status) {
      case "Preparing":
        return "text-yellow-500";
      case "Ready":
        return "text-blue-500";
      case "Delivered":
        return "text-green-500";
      default:
        return "";
    }
  };


  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-5  mx-auto">
       <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <div className="relative w-full">
          <select
             value={selectedTable}
             onChange={(e) => setSelectedTable(e.target.value)}
            className="block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none"
          >
               <option value="" disabled>Choose Table</option>
      <option value="Table One">Table One</option>
      <option value="Table Two">Table Two</option>
      <option value="Table Three">Table Three</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pt-1 px-2 pointer-events-none">
            <svg className="h-4 w-4 text-gray-700 pb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex  items-center gap-2 mt-4">
        <span className="text-gray-500 font-bold">Total Price:</span>
        <span className="bg-custom-gradient text-white px-2 py-[2px] rounded-md ">
          200$
        </span>
      </div>



      <hr className="my-4 border-gray-200" />

      {selectedTable!==''?<>
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-300">
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-custom-gradient">
          <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-white tracking-wider border-r ">
              Meal Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  border-r text-white uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  border-r text-white uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getSelectedTableMeals(selectedTable).map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-r  border-gray-300">{item.mealName}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-r  border-gray-300">{item.quantity}</td>
                <td className={`px-6 py-4 whitespace-nowrap border-b border-r  border-gray-300 ${getStatusColor(item.status)}`}>
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></>:<></>}
  
  
      <div className="flex my-2 justify-between items-center text-gray-600 text-sm">
      <div>
  <span className="text-[#144043]">Order Date:</span> 
  <span className="font-bold"> 2/12/2024</span>
</div>
<div>
  <span className="text-[#144043]">Order Time:</span> 
  <span className="font-bold"> 2:30 AM</span>
</div>
        <div className="flex items-center space-x-4">
  <span className="text-[#144043]  ">Expire Time:</span>
  <div className="flex items-center bg-white shadow-lg rounded-full px-4 py-2 space-x-2">
    <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 11.375C3.035 11.375 0.625 8.965 0.625 6C0.625 3.035 3.035 0.625 6 0.625C8.965 0.625 11.375 3.035 11.375 6C11.375 8.965 8.965 11.375 6 11.375ZM6 1.375C3.45 1.375 1.375 3.45 1.375 6C1.375 8.55 3.45 10.625 6 10.625C8.55 10.625 10.625 8.55 10.625 6C10.625 3.45 8.55 1.375 6 1.375Z" fill="url(#paint0_linear_3615_8735)"/>
      <path d="M7.85531 7.965C7.79031 7.965 7.72531 7.95 7.66531 7.91L6.11531 6.985C5.73031 6.755 5.44531 6.25 5.44531 5.805V3.755C5.44531 3.55 5.61531 3.38 5.82031 3.38C6.02531 3.38 6.19531 3.55 6.19531 3.755V5.805C6.19531 5.985 6.34531 6.25001 6.50031 6.34L8.05031 7.265C8.23031 7.37 8.28531 7.60001 8.18031 7.78C8.10531 7.9 7.98031 7.965 7.85531 7.965Z" fill="url(#paint1_linear_3615_8735)"/>
      <defs>
        <linearGradient id="paint0_linear_3615_8735" x1="0.612825" y1="3.10595" x2="11.4335" y2="3.1762" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F23F39"/>
          <stop offset="1" stopColor="#BD0600"/>
        </linearGradient>
        <linearGradient id="paint1_linear_3615_8735" x1="5.44215" y1="4.43816" x2="8.24853" y2="4.44924" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F23F39"/>
          <stop offset="1" stopColor="#BD0600"/>
        </linearGradient>
      </defs>
    </svg>
    <span className="text-red-500 font-semibold text-lg">00:30:28</span>
  </div>
</div>

      </div>

      {selectedTable!==''?<>
        <div className="flex justify-end space-x-4 mt-4">
        <button className="bg-white border border-red-500 text-red-500 font-semibold py-1 px-10 rounded-md hover:bg-red-50">
          Print
        </button>

        <button className="bg-custom-gradient text-white font-semibold py-1 px-10 rounded-md hover:bg-red-600">
          View
        </button>
      </div>
      </>:<></>}
   
    </div>
  );
};

export default OrderCard;
