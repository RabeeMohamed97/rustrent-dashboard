import { lazy } from 'react';
import Login from '../pages/Auth/Login';
import ChangePpassword from '../pages/Auth/changePassword/ChangePassword';
import { AuthProvider } from '../components/AuthProvider';
import CheckCode_Login from '../pages/Auth/CheckCode_Login';


const Index = lazy(() => import('../pages/Index'));
const List_Tables = lazy(() => import('../pages/Tabels/List_Tabels/List_Tables'));
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

    {
        path: '/change-password',
        element: (
            <AuthProvider>
                <ChangePpassword />
            </AuthProvider>
        ),
    },

    // {
    //     path: '/offers/List',
    //     element: (
    //         <AuthProvider>
    //             <List_Offers/>
    //         </AuthProvider>
    //     ),
    // },
    {
        path: '/Categories/List',
        element: (
            <AuthProvider>
        <List_Category />
        </AuthProvider>
        ),

    },
    {
        path: '/Sub_Categories/List',
        element: (
            <AuthProvider>
<List_SubCategory />        </AuthProvider>
        ),
    },
    {
        path: '/Tables/List',
        element: (
            <AuthProvider>
 <List_Tables />
      </AuthProvider>
        ),
    },
    {
        path: '/Meals/List',
        element: (
            <AuthProvider>
<List_Meals/>      </AuthProvider>
        ),
  
    },
    {
        path: '/Permsion/List',
        element: (
            <AuthProvider>
<List_Permsion/>
  </AuthProvider>
        ),
    },
    {
        path: '/Coupons/List',
        element: (
            <AuthProvider>
<List_Coupons/>
  </AuthProvider>
        ),
    },
    {
        path: '/City/List',
        element: (
            <AuthProvider>
<List_City />
  </AuthProvider>
        ),
    },
    {
        path: '/region/List',
        element: (
            <AuthProvider>
 <List_Region/>
   </AuthProvider>
        ),
    },


];

export { routes };
