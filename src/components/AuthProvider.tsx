// AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }: any) => {
    // const adminlogin = useSelector((state: any) => state.auth.adminLogin);

    //     const [isLogedIn, setIsLogenIn ]= useState('')
    // useEffect(() =>{

    // }, [])

    if (!localStorage.getItem('deliToken')) {
        return <Navigate to="/" replace={true} />;
    } else {
        return children;
    }
};
