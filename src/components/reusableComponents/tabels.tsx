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
import { modalActions } from '../../store/modelSlice';

const ColumnChooser = (props: tabelProps) => {
    console.log(props.TableBody);
    // const [props.TableBody, setprops.TableBody] = useState(props.TableBody);
    const [cols, setcols] = useState(props.tabelHead);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Checkbox Table'));
        setcols(props.tabelHead);
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // show/hide
    // const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(props.TableBody, cols[0]?.accessor));
    const [recordsData, setRecordsData] = useState(initialRecords);
    console.log(recordsData);
    console.log(initialRecords);
    useEffect(() => {
        setInitialRecords(props.TableBody);
    }, [initialRecords, props.TableBody, props.page]);

    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [selectedId, setSelectedId] = useState(null);

    const handleClick = (props: any) => {
        setSelectedId(props);
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
            setHideCols((col: any) => hideCols?.filter((d: any) => d !== col));
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
                  return <div onClick={() => handleClick(props)}>{render(props)}</div>;
              }
            : accessor === 'dob'
            ? ({ id, dob }: any) => <div onClick={() => handleClick(id)}>{formatDate(dob)}</div>
            : accessor === 'is_active'
            ? ({ id, is_active }: any) => (
                  <>
                      {props?.isLoading !== undefined && props?.isLoading[id] ? (
                          <>
                              <div className=" ">
                                  <div role="status">
                                      <svg
                                          aria-hidden="true"
                                          className="inline w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                                          viewBox="0 0 100 101"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                      >
                                          <path
                                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                              fill="currentColor"
                                          />
                                          <path
                                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                              fill="currentFill"
                                          />
                                      </svg>
                                  </div>
                              </div>
                          </>
                      ) : (
                          <>
                              <label className="inline-flex items-center me-5 cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" onChange={(e) => props.onUpdate(id, e.target.checked)} 
       checked={is_active} />
                                  <div className="relative w-11 h-6 bg-gray-200 rounded-full  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r from-[#F23F39] to-[#FF9C99]"></div>
                              </label>
                          </>
                      )}
                  </>
              )
            : accessor === 'has_delivery'
            ? ({ id, has_delivery }: any) => (
                  <>
                      {props?.isLoadingDelivery !== undefined && props?.isLoadingDelivery[id] ? (
                          <>
                              <div className=" ">
                                  <div role="status">
                                      <svg
                                          aria-hidden="true"
                                          className="inline w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                                          viewBox="0 0 100 101"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                      >
                                          <path
                                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                              fill="currentColor"
                                          />
                                          <path
                                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                              fill="currentFill"
                                          />
                                      </svg>
                                  </div>
                              </div>
                          </>
                      ) : (
                          <>
                              <label className="inline-flex items-center me-5 cursor-pointer">
                                  <input type="checkbox" className="sr-only peer"  onChange={(e) => {
        if (props.onUpdateDelivery) {
          props.onUpdateDelivery(id, e.target.checked);
        }
      }}
                                  
                        checked={has_delivery} />
                                  <div className="relative w-11 h-6 bg-gray-200 rounded-full  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r from-[#F23F39] to-[#FF9C99]"></div>
                              </label>
                          </>
                      )}
                  </>
              )
           
            : accessor === 'action'
            ? ({ id }: any) => (
                  <div className="flex  justify-between w-max mx-auto gap-3">
                
{props.Enabel_edit?<>
    <button type="button" onClick={() => props.onEdit(id)}>
                          <IconPencil />
                      </button>
</>:<>

</>}
<button type="button" onClick={() => props.onView(id)}>
                          <IconEye />
                      </button>
               
                      <button type="button" onClick={() => props.onDelete(id)}>
                          <IconTrashLines />
                      </button>
                  </div>
              )
            : accessor === 'image'
            ? ({ attachments }: any) => (
                  <div className="flex  justify-between w-max mx-auto gap-3">
                      <img src={attachments[0]?.original} alt="" className="w-[50px] h-[50px] rounded-full" />
                  </div>
              )
            : accessor === 'image_cover'
            ? ({ attachments }: any) => (
                  <div className="flex  justify-between w-max mx-auto gap-3">
                      <img src={attachments[1]?.original} alt="" className="w-[50px] h-[50px] rounded-full" />
                  </div>
              )
            : undefined,
    }));

    // useEffect(() => {
    //     props.setPage(1);
    // }, [pageSize]);

    useEffect(() => {
        console.log(recordsData);
        const from = props?.page - 1 * pageSize; // 10

        const to = from + pageSize;

        console.log(from, to);
        setRecordsData([...initialRecords?.slice()]);
    }, [props.page, pageSize, initialRecords]);


    const openModal = ()=>{
        dispatch(modalActions.openModal())
    }
    useEffect(() => {
        console.log(props.TableBody);
        setRecordsData(() => {
            return props?.TableBody?.filter((item) => {
                if (props?.allCols) {
                    return props?.allCols.some((key) => {
                        const itemValue = item[key]?.toString().toLowerCase();
                        return itemValue?.includes(search.toLowerCase());
                    });
                }
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, props.TableBody]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);

        setRecordsData(sortStatus.direction === 'desc' ? data.reverse() : data);
        // props.setPage(1);
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
                                btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                button={
                                    <>
                                        <span className="ltr:mr-1 rtl:ml-1">Columns</span>
                                        <IconCaretDown className="w-5 h-5" />
                                    </>
                                }
                            >
                                <ul className="!min-w-[180px] z-0">
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
                        {selectedRecords?.length > 0 && selectedRecords ? (
                            <>
                                <button className="btn bg-[#E7515A] rounded-xl shadow-none text-white">
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
{props.Page_Add?<>

<Link to={`${props.Link_Navigation}/Add`} className='btn bg-gradient-to-r from-[#F23F39] to-[#BD0600] rounded-full shadow-none text-white'>
                            <span className='mr-2'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 3.33331V12.6666" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.33325 8H12.6666" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                            </span>






                            Add New</Link>
</>:<>


<button onClick={openModal} className='btn bg-gradient-to-r from-[#F23F39] to-[#BD0600] rounded-full shadow-none text-white'>
                            <span className='mr-2'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 3.33331V12.6666" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.33325 8H12.6666" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                            </span>






                            Add New</button>
</>}
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
                        totalRecords={props?.pagination?.total}
                        recordsPerPage={pageSize}
                        page={props?.pagination?.currentPage}
                        onPageChange={(p) => props.setPage(p)}
                        // recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to }) => `Showing  ${from} to ${to} of ${props?.pagination?.total} entries`}
                        {...(props.Chcekbox && { selectedRecords, onSelectedRecordsChange: setSelectedRecords })}
                    />
                </div>
            </div>
        </div>
    );
};

export default ColumnChooser;
