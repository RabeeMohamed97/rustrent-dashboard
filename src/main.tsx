import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-phone-input-2/lib/style.css';
import 'react-toastify/dist/ReactToastify.css';
// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import store from './store/index';

// Text_editor Css
import 'react-quill/dist/quill.snow.css';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import { MantineProvider } from '@mantine/core';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense>
            <MantineProvider>
                <ToastContainer position='bottom-right'/>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </MantineProvider>
        </Suspense>
    </React.StrictMode>
);
