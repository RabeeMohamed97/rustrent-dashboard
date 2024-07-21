import React, { useState } from 'react'
import FormLayout from '../../../components/reusableComponents/FormLayout'
import InputComponent from '../../../components/reusableComponents/InputComponent'
import MainPageCard from '../../../components/reusableComponents/MainPageCard'
import CustomSelect from '../../../components/reusableComponents/CustomSelect';
import Upload from '../../../components/reusableComponents/Upload';
import { Link } from 'react-router-dom';
  
    
  
export default function Add_Category() {
    const [file, setFile] = useState<File | null>(null);


    const options = [
        { value: '', label: 'Burger' },
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
    ];
    
    
 
  return <> 

  <MainPageCard>
  <div className="flex flex-col p-5   gap-[20px] ">
      <FormLayout title="Add Category">
          <div className="grid-cols-12 lg:p-5   p-2  grid gap-4 ">
            
              <div className="lg:col-span-2 md:col-span-4 col-span-12">

              <Upload   setFile={setFile} />
              </div>
              <div className="lg:col-span-10 md:col-span-8 col-span-12 ">



                  <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-5">

                 <InputComponent type="text" placeholder="Burger" onChange={(e) => console.log(e)} label="Category Name"  />
                  <CustomSelect options={options} label="Sub Category" />





</div>

</div>

         </div>
    </FormLayout>

</div>





</MainPageCard>
<div className='flex py-16 capitalize  justify-between'>

<Link to={'/Categories/List'} className="btn text-[20px] hover:bg-black hover:text-white shadow-sm rounded-full px-10 py-3  mt-6">
    back
</Link>
<button type="submit" className="btn rounded-full text-[18px] btn-primary shadow-md px-10 py-3  mt-6">
    Save
</button>
</div>  

</>
}
