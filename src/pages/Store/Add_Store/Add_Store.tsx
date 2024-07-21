
import { Link } from 'react-router-dom';
import MainPageCard from '../../../components/reusableComponents/MainPageCard';
import FormLayout from '../../../components/reusableComponents/FormLayout';
import InputComponent from '../../../components/reusableComponents/InputComponent';

export default function Add_Store() {
    const boxStyle = {
        boxShadow: '0px 2px 12px 0px rgba(33, 34, 39, 0.12)',
    };
    return (
        <div>
            <MainPageCard>
            <div className="flex flex-col p-5  gap-[20px] ">
            <FormLayout title="Add Store">
                    <div className="grid sm:grid-cols-3 grid-cols-1 gap-[16px] mt-[16px]">
                        <InputComponent type="text" placeholder="type here..." onChange={(e) => console.log(e)} label="Store Name"  />
                        <InputComponent type="number" placeholder="0" onChange={(e) => console.log(e)} label="Balance" />
                    </div>
                </FormLayout>
</div>
          
            </MainPageCard>
            <div className="mt-[40px] flex justify-between">
                <div className="w-[120px] h-[50px] border border-current rounded-[50px] flex justify-center items-center" style={boxStyle}>
                    <Link to={'/'}>Back</Link>
                </div>
                <div className="w-[120px] h-[50px]  bg-[#F23F39] border-current rounded-[50px] flex justify-center items-center text-[white]" style={boxStyle}>
                    <Link to={'/'}>Save</Link>
                </div>
            </div>
        </div>
    );
}
