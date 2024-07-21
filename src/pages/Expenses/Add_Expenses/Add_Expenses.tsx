import React, { useState } from 'react'
import FormLayout from '../../../components/reusableComponents/FormLayout'
import InputComponent from '../../../components/reusableComponents/InputComponent'
import MainPageCard from '../../../components/reusableComponents/MainPageCard'
import CustomSelect from '../../../components/reusableComponents/CustomSelect';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import NubmerInput from '../../../components/reusableComponents/NubmerInput';
import ReactQuill from 'react-quill';
import Upload from '../../../components/reusableComponents/Upload';
import { Link } from 'react-router-dom';



export default function Add_Expenses() {

    const [value, setValue] = useState('');
    const [editorData, setEditorData] = useState('');














    const countCharactersBetweenTags = (value:any) => {
        const strippedHtml = value.replace(/(<([^>]+)>)/gi, '');
        return strippedHtml.length;
    };
    const characterCount = countCharactersBetweenTags(value);
    

    

const options = [
    { value: '', label: 'Select one' },
    { value: 'orange', label: 'Orange' },
    { value: 'white', label: 'White' },
    { value: 'purple', label: 'Purple' },
];




const  modules  = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        ["link", "image"],
        ["clean"],
    ],
};




return <>
<MainPageCard>
        <div className="flex flex-col p-5 gap-[20px]">
            <FormLayout title="Add Expenses">
                <div className="grid-cols-12 lg:p-5 p-2  grid gap-4 ">
            
                    <div className="lg:col-span-12 md:col-span-12 col-span-12">
                        <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-5">
          
                        <CustomSelect options={options} label="Employee" />

<InputComponent type="number" placeholder="0" onChange={(e) => console.log(e)} label="Amount"  />

<CustomSelect options={options} label="Employee" />
<InputComponent type="date" placeholder="Register Date" onChange={(e) => console.log(e)} label="Register Date"  />




</div>

</div>

                </div>
            </FormLayout>

        </div>

        <div className="flex  p-5 flex-col gap-[20px] ">
            <FormLayout title="Add Notice">
            <div className='md:mb-10 mb-1'>
                <ReactQuill   modules={modules} theme="snow" value={value} placeholder="type here" onChange={setValue}  className="h-auto md:h-[150px]" />

                </div>

                <h2>
                Number of characters <span className='text-red-500'>{characterCount}</span> 

                </h2>

            </FormLayout>

        </div>

  
      

    </MainPageCard>
    <div className='flex capitalize justify-between'>

<Link to={'/Restaurant/List'} className="btn text-[20px] hover:bg-black hover:text-white shadow-sm rounded-full px-10 py-3  mt-6">
          back
      </Link>
<button type="submit" className="btn rounded-full text-[18px] btn-primary shadow-md px-10 py-3  mt-6">
          Save
      </button>
</div>
</>
}
