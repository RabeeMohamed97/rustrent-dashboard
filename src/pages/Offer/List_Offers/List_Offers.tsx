import React, { useEffect, useState } from 'react';
import MainPageCard from '../../../components/reusableComponents/MainPageCard';
import Main_list from '../../../components/reusableComponents/Main_list';
import ColumnChooser from '../../../components/reusableComponents/tabels';
import CustomModal from '../../../components/reusableComponents/CustomModal';
import Upload from '../../../components/reusableComponents/Upload';
import Add_Offers from '../Add_Offers/Add_Offers';
import { useDeleteofferMutation, useGetAllofferQuery } from '../../../api/Resturants/Offer';
import { useDispatch } from 'react-redux';
import Add_Meals from '../../Advertisement/Add_Advertisement/Add_Advertisement';

export default function List_Offers() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<any>([]);

    const { refetch, data, isSuccess, isError } = useGetAllofferQuery({ page });
    useEffect(() => {
        console.log(data);
    }, [isSuccess]);
    useEffect(() => {
        refetch();
    }, [page]);

    const [deleteMeal, { isLoading }] = useDeleteofferMutation();
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
            if (key === 'attachments') {
                colss.splice(11, 1);
                colss.splice(3, 2);
                colss.splice(1, 2);

                colss?.push({ accessor: 'image', title: 'Image' });
                colss?.push({ accessor: 'image_cover', title: 'Image Cover' });
            } else if (key === 'category_id') {
                return;
            } else if (key === 'sub_category_id') {
                return;
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
        swal({
            title: 'Are you sure you want to delete offer?',
            icon: 'error',
            buttons: ['Cancel', 'Delete'],
            dangerMode: true,
        }).then(async (willDelete: any) => {
            if (willDelete) {
                const data = await deleteMeal(id);
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
                swal('Not deleted');
            }
        });

        if (data?.error) setToastData(data);
        setErrors({});
    };
    const viewHander = (id: string) => {
        console.log('id form index viewHander', id);
    };

    const EditHandelr = (data: any) => {
        setEditData(data);
    };

    const [isTrue, setisTrue] = useState(false);
    const [isTrueFrommoale, setisTrueFrommoale] = useState(false);

    const updateHander = async (id: string, status: boolean) => {
        console.log('id form index updateHander', id, !status);
    };

    const updateDeliveryHander = async (id: string, status: boolean) => {
        console.log('updateDeliveryHander', status);
    };
    console.log(editData);
    return (
        <Main_list title="Offer">
            <MainPageCard>
                {open && (
                    <CustomModal openCloseModal={setOpen} title="Add offer">
                        <Add_Offers />
                    </CustomModal>
                )}
                {open && editData.id && (
                    <CustomModal openCloseModal={setOpen} resetEditData={setEditData} title="Edit offer">
                        <Add_Offers data={editData} />
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
                    showAddButton={true}
                    Link_Navigation="Categories"
                    onDelete={deleteSubmitHandler}
                    onView={viewHander}
                    onUpdate={updateHander}
                    onEdit={EditHandelr}
                    openCloseModal={setOpen}
                    // resetEditData={setEditData}
                />
            </MainPageCard>
        </Main_list>
    );
}
