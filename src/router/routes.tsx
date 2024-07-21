import { lazy } from 'react';

const Index = lazy(() => import('../pages/Index'));
const List_Tables = lazy(() => import('../pages/Tabels/List_Tabels/List_SubCategory'));
const List_SubCategory = lazy(() => import('../pages/SubCategories/List_SubCategory/List_SubCategory'));
const List_Category = lazy(() => import('../pages/Categories/List_Category/List_Category'));
const List_Coupons = lazy(() => import('../pages/Coupons/List_Coupons/List_Coupons'));
const List_Meals = lazy(() => import('../pages/Meals/List_Meals/List_Meals'));
// const Add_item = lazy(() => import('../pages/Categories/Item/Add_Item'));
// const Add_Store = lazy(() => import('../pages/Store/Add_Store/Add_Store'));
// const Add_Expenses = lazy(() => import('../pages/Expenses/Add_Expenses/Add_Expenses'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
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
    // {
    //     path: '/Categories/Add',
    //     element: <Add_Category />,
    // },
    {
        path: '/Categories/List',
        element: <List_Category />,
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
        path: '/Coupons/List',
        element: <List_Coupons/>,
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
