import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMinus from '../Icon/IconMinus';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
import IconMenuResturant from '../Icon/Menu/IconMenuRestuarants';
import Logo from '../../assets/Artboard 2 2.png';
import IconMenuCategory from '../Icon/Menu/IconMenuCategory';
import IconMenuStore from '../Icon/Menu/IconMenuStore';
import IconMenuExpenses from '../Icon/Menu/IconMenuExpenses';
const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [CategorySubMenu, setCategorySubMenu] = useState(false);
    const [ItemSubMenu, setItemSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    console.log(currentMenu);

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full ">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center ">
                            <img className="w-[75%]  " src={Logo} alt="logo" />
                            {/* <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('VRISTO')}</span> */}
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>

                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative pt-[0px]">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden " />
                                <span>{t('apps')}</span>
                            </h2>

                            {/* Restaurant */}

                            {/* <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'Restaurant' ? 'active' : ''} nav-link group w-full `} onClick={() => toggleMenu('Restaurant')}>
                                    <div className="flex items-center hover:text-white">
                                        <IconMenuResturant className=" shrink-0 " />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black  dark:text-[#506690] dark:group-hover:text-white-dark     ">{t('Restaurant')}</span>
                                    </div>

                                    <div className={currentMenu !== 'Restaurant' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'Restaurant' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/Restaurant/Add">{t('Add Restaurant')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Restaurant/List">{t('Restaurants List')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li> */}

                            {/* Users */}
                            {/* <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'users' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('users')}>
                                    <div className="flex items-center">
                                        <IconMenuUsers className=" shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark group-hover:text-white">{t('users')}</span>
                                    </div>

                                    <div className={currentMenu !== 'users' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'users' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/users/Add">{t('Add Users')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/users/List">{t('List Users')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li> */}

                            {/* Categories */}
                          
                                <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/Categories/List" className="group">
                                            <div className="flex items-center">
                                            <IconMenuCategory className=" shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark group-hover:text-white">{t('Categories')}</span>
                                                </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/Sub_Categories/List" className="group">
                                            <div className="flex items-center">
                                            <IconMenuCategory className=" shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark group-hover:text-white">{t('Sub_Categories')}</span>
                                                </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/Tables/List" className="group">
                                            <div className="flex items-center">
                                            <IconMenuCategory className=" shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark group-hover:text-white">{t('Tables')}</span>
                                                </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                              
                                <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/Meals/List" className="group">
                                            <div className="flex items-center">
                                            <IconMenuCategory className=" shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark group-hover:text-white">{t('Meals')}</span>
                                                </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                             
                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/Coupons/List" className="group">
                                            <div className="flex items-center">
                                            <IconMenuCategory className=" shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark group-hover:text-white">{t('Coupons')}</span>
                                                </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/Coupons/List" className="group">
                                            <div className="flex items-center">
                                            <IconMenuCategory className=" shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark group-hover:text-white">{t('Offers')}</span>
                                                </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/Coupons/List" className="group">
                                            <div className="flex items-center">
                                            <IconMenuCategory className=" shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark group-hover:text-white">{t('Permission')}</span>
                                                </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                              
{/* 
                                <AnimateHeight duration={300} height={currentMenu === 'Categories' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <button
                                                type="button"
                                                className={`${
                                                    CategorySubMenu ? 'open' : ''
                                                } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setCategorySubMenu(!CategorySubMenu)}
                                            >
                                                {t('Category')}
                                                <div className={`${CategorySubMenu ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={CategorySubMenu ? 'auto' : 0}>
                                                <ul className="sub-menu px-2 text-gray-500">
                                                    <li>
                                                        <NavLink to="/Categories/Category/Add">{t('Add Categories')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/Categories/List">{t('List Categories')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                className={`${
                                                    ItemSubMenu ? 'open' : ''
                                                } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setItemSubMenu(!ItemSubMenu)}
                                            >
                                                {t('Item')}
                                                <div className={`${ItemSubMenu ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={ItemSubMenu ? 'auto' : 0}>
                                                <ul className="sub-menu px-2 text-gray-500">
                                                    <li>
                                                        <NavLink to="/Categories/item/Add">{t('Add Item')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/Item/List">{t('List Item')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    </ul>
                                </AnimateHeight> */}

                            {/* Store */}
                            {/* <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'Store' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Store')}>
                                    <div className="flex items-center">
                                        <IconMenuStore className=" shrink-0" />

                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark group-hover:text-white">{t('Store')}</span>
                                    </div>

                                    <div className={currentMenu !== 'Store' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'Store' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/Store/Add">{t('Add Store')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Store/List">{t('Store List')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li> */}

                            {/* Expenses */}
                            {/* <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'Expenses' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Expenses')}>
                                    <div className="flex items-center">
                                        <IconMenuExpenses className=" shrink-0" />

                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark group-hover:text-white">{t('Expenses')}</span>
                                    </div>

                                    <div className={currentMenu !== 'Expenses' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'Expenses' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/Expenses/Add">{t('Add Expenses')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Expenses/List">{t('Expenses List')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li> */}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
