import React, { useState } from 'react'

import Upload from '../../../components/reusableComponents/Upload';
  
    
  
export default function Add_Coupons() {
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
 
  return <> 
    <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-12">
                  <div className="col-span-4">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Category Name"  />
                  </div>
                  <div className="col-span-4 ">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                    <Upload  setFile={setFile} />
                    </div>
                  <div className="col-span-4 ">
                                        <h2 className="text-[#373837] text-[18px] font-semibold pb-5">Delivery</h2>

                                        <div className="inline-flex gap-4 capitalize items-center">
                                            <span className={!isChecked ? 'text-red-500 font-semibold text-[16px]' : 'text-[16px]'}>No</span>

                                            <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                                                <input
                                                    id="switch-2"
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={handleCheckboxChange}
                                                    className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-red-500 peer-checked:border-red-500 peer-checked:before:bg-red-500"
                                                />
                                                <label
                                                    htmlFor="switch-2"
                                                    className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-red-500 peer-checked:before:bg-red-500"
                                                >
                                                    <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" data-ripple-dark="true"></div>
                                                </label>
                                            </div>
                                            <span className={isChecked ? 'text-red-500 font-semibold text-[16px]' : 'text-[16px]'}>Yes</span>
                                        </div>
                  </div>
             
                </div>
                <div className='w-full  flex justify-end'>
                <button type="submit" className="text-white flex    bg-gradient-to-r from-[#F23F39] to-[#BD0600] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                  Add new Coupons
                </button>
                </div>
              
              </form> 

</>
}
