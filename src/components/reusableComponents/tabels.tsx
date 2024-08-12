import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { tabelProps } from '../../types/types';
import { Link } from 'react-router-dom';
import IconPencil from '../Icon/IconPencil';
import IconEye from '../Icon/IconEye';
import IconTrashLines from '../Icon/IconTrashLines';
import CustomModal from './CustomModal';
import { modalActions } from '../../store/modelSlice';

const ColumnChooser = (props: tabelProps) => {
    console.log(props);

    const [rowData, setrowData] = useState(props.TableBody);
    const [cols, setcols] = useState(props.tabelHead);

    useEffect(() => {
        setrowData(props.TableBody);
        setcols(props.tabelHead);
    }, [props.TableBody, props.tabelHead]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Checkbox Table'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // show/hide
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [check, setcheck] = useState();
    const handleCheckboxChange = (id: number, status: boolean) => {
        console.log('hello', id, status);
    };
    const [selectedId, setSelectedId] = useState(null);
    console.log('This is id', selectedId);

    const handleClick = (id: any) => {
        setSelectedId(id);
        console.log('Selected ID:', id);
    };
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [hideCols, setHideCols] = useState<any>(['age', 'dob']);

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };

    const columns = cols.map(({ accessor, title, render, titleClassName }) => ({
        accessor,
        title,
        sortable: true,
        hidden: hideCols.includes(accessor),
        titleClassName: titleClassName || '',
        render: render
            ? (props: any) => {
                  return <div onClick={() => handleClick(props.id)}>{render(props)}</div>;
              }
            : accessor === 'dob'
            ? ({ id, dob }: any) => <div onClick={() => handleClick(id)}>{formatDate(dob)}</div>
            : accessor === 'status'
            ? ({ id, status }: any) => (
                  <label className="inline-flex items-center me-5 cursor-pointer" onClick={() => props.onUpdate(id, status)}>
                      <input type="checkbox" className="sr-only peer" checked={status} />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r from-[#F23F39] to-[#BD0600]"></div>
                  </label>
              )
            : accessor === 'action'
            ? ({ id }: any) => (
                  <div className="flex  justify-between w-max  gap-3">
                      <button type="button" onClick={() => props.onEdit(id)}>
                          <IconPencil />
                      </button>

                      <button type="button" onClick={() => props.onView(id)}>
                          <IconEye />
                      </button>
                      <button type="button" onClick={() => props.onDelete(id)}>
                          <IconTrashLines />
                      </button>
                  </div>
              )
            : undefined,
    }));

    const openModal = () => {
        dispatch(modalActions.openModal());
    };

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.firstName.toLowerCase().includes(search.toLowerCase()) ||
                    item.lastName.toLowerCase().includes(search.toLowerCase()) ||
                    item.company.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.age.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.dob.toLowerCase().includes(search.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    return (
        <div>
            <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <div className="text-left">
                    <input type="text" className="form-input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
                    <div className="flex md:items-center md:flex-row flex-col gap-5">
                        <div className="dropdown">
                            <Dropdown
                                placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                btnClassName="!flex items-center text-[#BD0600] border border-[#BD0600] font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                button={
                                    <>
                                        <span className="ltr:mr-1 rtl:ml-1">Columns</span>
                                        <IconCaretDown className="w-5 h-5" />
                                    </>
                                }
                            >
                                <ul className="!min-w-[180px] z-10">
                                    {cols.map((col, i) => {
                                        return (
                                            <li
                                                key={i}
                                                className="flex flex-col"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <div className="flex items-center px-4 py-1">
                                                    <label className="cursor-pointer mb-0">
                                                        <input
                                                            type="checkbox"
                                                            checked={!hideCols.includes(col.accessor)}
                                                            className="form-checkbox"
                                                            defaultValue={col.accessor}
                                                            onChange={(event: any) => {
                                                                setHideCols(event.target.value);
                                                                showHideColumns(col.accessor, event.target.checked);
                                                            }}
                                                        />
                                                        <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                                    </label>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="text-right flex gap-2">
                        {selectedRecords.length > 0 && selectedRecords ? (
                            <>
                                <button className="btn bg-gradient-to-r from-[#F23F39] to-[#BD0600] rounded-full shadow-none text-white">
                                    <span className="mr-1">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 4H3.33333H14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path
                                                d="M12.6666 3.99998V13.3333C12.6666 13.6869 12.5261 14.0261 12.2761 14.2761C12.026 14.5262 11.6869 14.6666 11.3333 14.6666H4.66659C4.31296 14.6666 3.97382 14.5262 3.72378 14.2761C3.47373 14.0261 3.33325 13.6869 3.33325 13.3333V3.99998M5.33325 3.99998V2.66665C5.33325 2.31302 5.47373 1.97389 5.72378 1.72384C5.97383 1.47379 6.31296 1.33331 6.66659 1.33331H9.33325C9.68687 1.33331 10.026 1.47379 10.2761 1.72384C10.5261 1.97389 10.6666 2.31302 10.6666 2.66665V3.99998"
                                                stroke="white"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path d="M6.66675 7.33331V11.3333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.33325 7.33331V11.3333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                    Delete
                                </button>
                            </>
                        ) : (
                            <></>
                        )}

                        {props.Page_Add ? (
                            <>
                                <Link to={`/${props.Link_Navigation}/Add`} className="btn bg-gradient-to-r from-[#F23F39] to-[#BD0600] rounded-full shadow-none text-white">
                                    <span className="mr-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 3.33331V12.6666" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M3.33325 8H12.6666" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                    Add New
                                </Link>
                            </>
                        ) : (
                            <>
                                <button onClick={openModal} className="btn bg-gradient-to-r from-[#F23F39] to-[#BD0600] rounded-full shadow-none text-white">
                                    <span className="mr-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 3.33331V12.6666" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M3.33325 8H12.6666" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                    Add New
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="panel mt-6">
                <div className="datatables z-10">
                    <DataTable
                        className="whitespace-nowrap   table-hover"
                        records={recordsData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        {...(props.Chcekbox && { selectedRecords, onSelectedRecordsChange: setSelectedRecords })}
                    />
                </div>
            </div>
        </div>
    );
};

export default ColumnChooser;
