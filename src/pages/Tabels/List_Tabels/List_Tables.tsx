import MainPageCard from '../../../components/reusableComponents/MainPageCard';
import Main_list from '../../../components/reusableComponents/Main_list';
import ColumnChooser from '../../../components/reusableComponents/tabels';
import CustomModal from '../../../components/reusableComponents/CustomModal';
import Add_Tables from '../Add_Tabels/Add_Tables';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

import { showAlert } from '../../../components/Error';
import { useDeletetableMutation, useGetAlltableQuery } from '../../../api/Resturants/Table';

export default function List_Tables() {
    const [editData, setEditData] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const { refetch, data, isSuccess, isError } = useGetAlltableQuery({ page });
    useEffect(() => { 
        refetch();
    }, [page]);
    const [deletetable, { isLoading }] = useDeletetableMutation();
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
    console.log();
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
    const deleteSubmitHandler = async (id: string) => {
        swal({
            title: 'Are you sure you want to delete Tabel?',
            icon: 'error',
            buttons: ['Cancel', 'Delete'],
            dangerMode: true,
        }).then(async (willDelete: any) => {
            if (willDelete) {
                const data = await deletetable(id);
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

    const deleteHander = (id: string) => {
        console.log('id form index deleteHander', id);
    };
    const viewHander = (id: string) => {
        console.log('id form index viewHander', id);
    };
    const EditHandelr = (data: any) => {
        setEditData(data);
    };

    const updateHander = async (id: string, status: boolean) => {
        console.log('id form index updateHander', id, !status);
    };

    const updateDeliveryHander = async (id: string, status: boolean) => {
        console.log('updateDeliveryHander', status);
    };

    return (
        <Main_list title="Tables">
            <MainPageCard>
                {open && (
                    <CustomModal openCloseModal={setOpen} title="Add Tables">
                        <Add_Tables />
                    </CustomModal>
                )}
                {open && editData.id && (
                    <CustomModal openCloseModal={setOpen} resetEditData={setEditData} title="Edit Tables">
                        <Add_Tables data={editData} />
                    </CustomModal>
                )}

                <ColumnChooser
                    isLoading={loadingStatus}
                    isLoadingDelivery={loadingDelivery}
                    setPage={setPage}
                    page={page}
                    openCloseModal={setOpen}
                    pagination={data?.response?.data}
                    onUpdateDelivery={updateHander}
                    Enabel_edit={true}
                    showAddButton={true}
                    TableBody={data?.response?.data?.data ? data?.response?.data?.data : []}
                    tabelHead={finslColsKeys}
                    Chcekbox={false}
                    Page_Add={false}
                    Link_Navigation="Categories"
                    onDelete={deleteSubmitHandler}
                    onView={viewHander}
                    onUpdate={updateHander}
                    onEdit={EditHandelr}
                />
            </MainPageCard>
        </Main_list>
    );
}
