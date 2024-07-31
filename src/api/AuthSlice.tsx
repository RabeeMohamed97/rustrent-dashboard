import { createSlice } from "@reduxjs/toolkit";
type AuthState = {
    adminLogin: string | null;
};

const initialState: AuthState = {
    adminLogin: localStorage.getItem('admintoken'),
};

const LoginActions = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SetToken: (state: AuthState, action: any) => {
            if (action.payload)
                localStorage.setItem('admintoken', action.payload)
            state.adminLogin = action.payload;
        }
    },
});

export const loginActions = LoginActions.actions;
export default LoginActions.reducer;
