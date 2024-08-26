import React, { useEffect, useState } from 'react';
import MainPageCard from '../../../components/reusableComponents/MainPageCard';
import Main_list from '../../../components/reusableComponents/Main_list';
import ColumnChooser from '../../../components/reusableComponents/tabels';
import CustomModal from '../../../components/reusableComponents/CustomModal';
import Upload from '../../../components/reusableComponents/Upload';
import Add_City from '../Add_City/Add_City';
import { showAlert } from '../../../components/Error';
import { useDeleteCityMutation, useGetAllcityQuery } from '../../../api/Resturants/Country_City_Region';

export default function List_City() {
    const [page, setPage] = useState(1);

    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<any>([]);
    const { refetch, data, isSuccess, isError } = useGetAllcityQuery({ page });
    console.log(data);

    useEffect(() => {
        refetch();
    }, [page]);

    const [deleteCity, { isLoading }] = useDeleteCityMutation();
    const [toastData, setToastData] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const [colKeys, setColKeys] = useState<string[]>([]);
    const [finslColsKeys, setFinalKeys] = useState<{ accessor: string; title: string }[]>([]);
    const [loadingDelivery, setLoadingDelivery] = useState<{ [key: string]: boolean }>({});

    const [loadingStatus, setLoadingStatus] = useState<{ [key: string]: boolean }>({});
    let keys: string[] = [];
    useEffect(() => {
        if (isSuccess && data?.response?.data?.data?.length) {
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

    const deleteSubmitHandler = async (id: string) => {
        //@ts-ignore
        swal({
            title: 'Are you sure you want to delete city?',
            icon: 'error',
            buttons: ['Cancel', 'Delete'],
            dangerMode: true,
        }).then(async (willDelete: any) => {
            if (willDelete) {
                const data = await deleteCity(id);
                console.log(data);
                //@ts-ignore
                if (data?.error?.data?.status === 400) {
                    //@ts-ignore
                    toast.error(data?.error?.data?.message, {});
                    setToastData({});
                }
                //@ts-ignore
                if (data?.data.status === 200) {
                    //@ts-ignore
                    showAlert('Added', data?.data.response?.message);
                    setToastData({});
                }
                // setToastData(data);
            } else {
                //@ts-ignore
                swal('Not deleted');
            }
        });

        if (data?.error) setToastData(data);
        setErrors({});
    };
    const viewHander = (id: string) => {
        console.log('id form index viewHander', id);
    };

    const updateHander = async (id: string, status: boolean) => {
        console.log('id form index updateHander', id, !status);
    };

    const EditHandelr = (data: any) => {
        setEditData(data);
    };
    const [isTrue, setisTrue] = useState(false);
    const [isTrueFrommoale, setisTrueFrommoale] = useState(false);

    const updateDeliveryHander = async (id: string, status: boolean) => {
        console.log('updateDeliveryHander', status);
    };

    return (
        <Main_list title="Cities">
            <MainPageCard>
                {open && (
                    <CustomModal openCloseModal={setOpen} title="Add City">
                        <Add_City />
                    </CustomModal>
                )}
                {open && editData.id && (
                    <CustomModal openCloseModal={setOpen} resetEditData={setEditData} title="Edit City">
                        <Add_City data={editData} />
                    </CustomModal>
                )}

                <ColumnChooser
                    isLoading={loadingStatus}
                    isLoadingDelivery={loadingDelivery}
                    setPage={setPage}
                    page={page}
                    pagination={data?.response?.data}
                    onUpdateDelivery={updateDeliveryHander}
                    Enabel_edit={true}
                    TableBody={data?.response?.data?.data ? data?.response?.data?.data : []}
                    tabelHead={finslColsKeys}
                    Chcekbox={false}
                    Page_Add={false}
                    Link_Navigation="City"
                    onDelete={deleteSubmitHandler}
                    onView={viewHander}
                    onUpdate={updateHander}
                    onEdit={EditHandelr}
                    openCloseModal={setOpen}
                    showAddButton={true}
                />
            </MainPageCard>
        </Main_list>
    );
}
