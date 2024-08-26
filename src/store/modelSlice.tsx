import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    openModal: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        closeModal(state) {
            state.openModal = false;
        },
        openModal(state) {
            state.openModal = true;
        },
    },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
