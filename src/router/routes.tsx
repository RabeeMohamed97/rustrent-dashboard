import { lazy } from 'react';
import Login from '../pages/Auth/Login';
import ChangePpassword from '../pages/Auth/changePassword/ChangePassword';
import { AuthProvider } from '../components/AuthProvider';
import CheckCode_Login from '../pages/Auth/CheckCode_Login';


const Index = lazy(() => import('../pages/Index'));
const List_Tables = lazy(() => import('../pages/Tabels/List_Tabels/List_SubCategory'));
const List_SubCategory = lazy(() => import('../pages/SubCategories/List_SubCategory/List_SubCategory'));
const List_Category = lazy(() => import('../pages/Categories/List_Category/List_Category'));
const List_Offers = lazy(() => import('../pages/Offer/List_Offers/List_Offers'));
const List_Permsion = lazy(() => import('../pages/Permesion/List_Permsion/List_Permsion'));
const List_Meals = lazy(() => import('../pages/Meals/List_Meals/List_Meals'));
const List_Coupons = lazy(() => import('../pages/Coupons/List_Coupons/List_Coupons'));
const List_Region = lazy(() => import('../pages/Region/List_Region/List_Region'));
const List_City = lazy(() => import('../pages/City/List_City/List_City'));
// const Add_Expenses = lazy(() => import('../pages/Expenses/Add_Expenses/Add_Expenses'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <CheckCode_Login />,
        layout: 'blank',
    },
    {
        path: '/Login',
        element: <Login />,
        layout: 'blank',
    },


    //Resturants
    // {
    //     path: '/Restaurant/Add',
    //     element: <Add_Restaurant />,
    // },
    // {
    //     path: '/Restaurant/List',
    //     element: <List_Restaurant />,
    // },

    //users
    // {
    //     path: '/users/Add',
    //     element: <Add_Users />,
    // },
    // {
    //     path: '/users/List',
    //     element: <List_Users />,
    // },


    //Categories , Items

    {
        path: '/change-password',
        element: (
            <AuthProvider>
                <ChangePpassword />
            </AuthProvider>
        ),
    },

    {
        path: '/offers/List',
        element: <List_Offers/>,
    },
    {
        path: '/Categories/List',
        element:
        // <AuthProvider>
        <List_Category />
        // </AuthProvider>
,
    },
    {
        path: '/Sub_Categories/List',
        element: <List_SubCategory />,
    },
    {
        path: '/Tables/List',
        element: <List_Tables />,
    },
    {
        path: '/Meals/List',
        element: <List_Meals/>,
    },
    {
        path: '/Permsion/List',
        element: <List_Permsion/>,
    },
    {
        path: '/Coupons/List',
        element: <List_Coupons/>,
    },
    {
        path: '/City/List',
        element: <List_City />,
    },
    {
        path: '/region/List',
        element: <List_Region/>,
    },
    // {
    //     path: '/Categories/item/Add',
    //     element: <Add_item />,
    // },


    // Store
    // {

    //         path: '/Store/Add',
    //         element: <Add_Store/>,
    // },
    // Expenses
    // {

    //         path: '/Expenses/Add',
    //         element: <Add_Expenses/>,
    // }

];

export { routes };
