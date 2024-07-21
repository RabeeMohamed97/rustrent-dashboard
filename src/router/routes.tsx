import { lazy } from 'react';
import List_Category from '../pages/Categories/List_Category/List_Category';
import List_SubCategory from '../pages/SubCategories/List_SubCategory/List_SubCategory';

const Index = lazy(() => import('../pages/Index'));
// const Add_Restaurant = lazy(() => import('../pages/Restaurant/Add_Restaurant/Add_Restaurant'));
// const List_Restaurant = lazy(() => import('../pages/Restaurant/List_Restaurant/List_Restaurant'));
// const Add_Users = lazy(() => import('../pages/Users/Add_User/Add_Users'));
// const List_Users = lazy(() => import('../pages/Users/List_Users/List_Users'));
const Add_Category = lazy(() => import('../pages/Categories/Add_Category/Add_Category'));
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
    {
        path: '/Categories/Add',
        element: <Add_Category />,
    },
    {
        path: '/Categories/List',
        element: <List_Category />,
    },
    {
        path: '/Sub_Categories/List',
        element: <List_SubCategory />,
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
