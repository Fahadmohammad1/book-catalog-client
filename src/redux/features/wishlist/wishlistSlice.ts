import { createSlice } from "@reduxjs/toolkit";


interface IToggle {
    status : boolean;
}

const initialState : IToggle = {
    status : false,
}

const wishlistSlice = createSlice({
    name : 'wishlist',
    initialState,
    reducers : {
        toggleModal : (state) => {
            state.status = !state.status;
        }
    }
})

export const {toggleModal} = wishlistSlice.actions

export default wishlistSlice.reducer