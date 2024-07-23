import React, { useState } from 'react'

import Upload from '../../../components/reusableComponents/Upload';
import CustomSelect from '../../../components/reusableComponents/CustomSelect';
  
    
  
export default function Add_Meals() {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
      });
    
    
    
      
      const [file, setFile] = useState<File | null>(null);
  const [isChecked, setIsChecked] = useState(true);
  const handleCheckboxChange = (event: any) => {
      setIsChecked(event.target.checked);
  };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // dispatch(modalActions.closeModal())
    
        // Perform your form submission logic here, such as making an API call.
        // After submission, you can close the modal and clear the form
    
        setFormData({
          name: '',
          price: '',
          category: '',
          description: '',
        });
      };
      const options = [
        { value: '', label: 'Write your table Category' },
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
    ];

  return <> 
 <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-12">

                <div className="col-span-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Meal Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write your Table name"  />
                  </div>

                  <div className="col-span-6">
                  <CustomSelect options={options} label=" Category Name" />
                </div>

                
                  <div className="col-span-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sub Category Name</label>
                    <input type="number" name="name" id="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write your Minimum number of people "  />
                  </div>
                  <div className="col-span-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input type="number" name="name" id="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write your Maximum number of people"  />
                  </div>
                  <div className="col-span-12 ">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">image</label>
                    <Upload   setFile={setFile} />
                  </div>
                  <div className="col-span-12">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Meal Description</label>
                    <textarea  rows={4}  name="name" id="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Here"  />
                  </div>
                  
               




            
             
                </div>
                <div className='w-full  flex justify-end'>
                <button type="submit" className="text-white flex    bg-gradient-to-r from-[#F23F39] to-[#BD0600] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Save
                </button>
                </div>
              
              </form>

</>
}
