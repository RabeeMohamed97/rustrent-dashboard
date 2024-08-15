import React, { useEffect, useRef, useState } from 'react';
import uploadImg from '../../../public/assets/images/upload-img.png';
import uploadUser from '../../../public/assets/images/upload-user.png';
import { modalActions } from '../../store/modelSlice';
import { useDispatch } from 'react-redux';
type UploadImageProps = {
    user?: boolean;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    editImgUrl: string | null;
};
const Upload = (props: UploadImageProps) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleButtonClick = () => {
        // Programmatically click the hidden file input

        if (fileInputRef.current) {
            dispatch(modalActions.openModal());
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event?.target?.files;
        if (files && files.length > 0) {
            const file = files[0];
            props.setFile(file);
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setImageSrc(fileReader.result as string);
            };
            fileReader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        setImageSrc(props?.editImgUrl);
    }, [imageSrc]);

    return (
        <div className="flex bg-[#F5F5F5] p-4 border-dashed border-2 rounded-3xl border-[#B7B7B7] flex-col items-center gap-[10px]">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
            <div onClick={handleButtonClick} className="flex cursor-pointer  w-[120px] h-[120px] rounded-full border-[2px] border-[#F23F39] border-solid justify-center items-center ">
                {imageSrc ? <img src={imageSrc} alt="Uploaded" className="w-full h-full rounded-full object-cover" /> : <img src={props.user ? uploadUser : uploadImg} alt="" />}
            </div>
            <button type="button" onClick={handleButtonClick} className="flex justify-between items-center  gap-[2px] text-[#373837]">
                <h5>
                    Drag & Drop Files OR <span className="text-[#F23F39]"> Browse </span>Files
                </h5>
            </button>
        </div>
    );
};

export default Upload;
