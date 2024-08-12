import React, { useEffect, useState } from 'react'
import MainPageCard from '../../../components/reusableComponents/MainPageCard';
import Main_list from '../../../components/reusableComponents/Main_list';
import ColumnChooser from '../../../components/reusableComponents/tabels';
import CustomModal from '../../../components/reusableComponents/CustomModal';
import Upload from '../../../components/reusableComponents/Upload';
import Add_Category from '../Add_Category/Add_Category';
import { useDeleteResturantMutation, useGetAllResturantQuery, useUpdateRestaurantDeliveryMutation, useUpdateRestaurantStatusMutation } from '../../../api/Resturants/resturant';


export default function List_Category() {
    const [page, setPage] = useState(1);
    const { refetch, data, isSuccess, isError } = useGetAllResturantQuery({ page });
    useEffect(() => {
        refetch();
    }, [page]);
    const [updateRestaurantStatus] = useUpdateRestaurantStatusMutation();
    const [updateRestaurantDelivery] = useUpdateRestaurantDeliveryMutation();

    const [deleteResturant, { isLoading }] = useDeleteResturantMutation();
    const [toastData, setToastData] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const [colKeys, setColKeys] = useState<string[]>([]);
    const [finslColsKeys, setFinalKeys] = useState<{ accessor: string; title: string }[]>([]);
    const [loadingDelivery, setLoadingDelivery] = useState<{ [key: string]: boolean }>({});

    const [loadingStatus, setLoadingStatus] = useState<{ [key: string]: boolean }>({});

    let keys: string[] = [];
    useEffect(() => {
        if (isSuccess) {
            keys = Object?.keys(data?.response?.data?.data[0]);
            setColKeys(keys);
        }
    }, [isSuccess]);

    let colss: { accessor: string; title: string }[] = [];
    useEffect(() => {
        colKeys?.map((key: any) => {
            console.log(key);
            if (key === 'attachments') {
                colss.splice(11, 1);
                colss.splice(3, 2);
                colss.splice(1, 2);
                // colss.splice(4, 2);

                // colss?.push({ accessor: 'image cover', title: 'Image Cover' });
                // colss?.push({ accessor: 'image', title: 'Image' });
                colss?.push({ accessor: 'image', title: 'Image' });
                colss?.push({ accessor: 'image_cover', title: 'Image Cover' });
            } else {
                const formattedKey = key
                    .replace(/_/g, ' ')
                    .split(' ')
                    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                colss?.push({ accessor: key, title: formattedKey });
            }
        });
        if (colss?.length > 0) {
            colss?.push({ accessor: 'action', title: 'Action' });
        }
        setFinalKeys(colss);
        console.log(colss);
    }, [colKeys, isSuccess]);



const deleteHander=(id:string)=> {
    console.log( "id form index deleteHander" ,id)
}
const viewHander=(id:string)=> {
    console.log( "id form index viewHander" ,id)
}
const EditHandelr=(id:string)=> {
    console.log( "id form index EditHandelr" ,id)
}

const [isTrue, setisTrue] = useState(false)
const [isTrueFrommoale, setisTrueFrommoale] = useState(false)

const updateHander = async(id:string,status:boolean)=> {
    console.log( "id form index updateHander" ,id ,!status)
}


const updateDeliveryHander = async (id: string, status: boolean) => {
    console.log("updateDeliveryHander",status);



};




  return (
    <Main_list  title='Categeories'>
    <MainPageCard>

    <CustomModal  title='Add Category' >
    <Add_Category/>

    </CustomModal>



    <ColumnChooser     isLoading={loadingStatus}
                    isLoadingDelivery={loadingDelivery}            setPage={setPage}
                    page={page}
                    pagination={data?.response?.data?.pagination}

                    onUpdateDelivery={updateDeliveryHander}
                    Enabel_edit={false}
                    TableBody={data?.response?.data?.data ? data?.response?.data?.data : []}
                    tabelHead={finslColsKeys} Chcekbox={false} Page_Add={false}  Link_Navigation='Categories' onDelete={deleteHander} onView={viewHander} onUpdate={updateHander}   onEdit={EditHandelr} />

    </MainPageCard>

    </Main_list>
     )
}
