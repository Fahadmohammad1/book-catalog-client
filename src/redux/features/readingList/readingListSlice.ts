import { createSlice } from "@reduxjs/toolkit";

interface IWishlist {
   open : boolean
}

const initialState : IWishlist = {
    open : false
}

const readingListSlice = createSlice({
    name : 'readingList',
    initialState,
    reducers : {
        toggleReadingModal : (state) => {
            state.open= !state.open
        }
    }
})

export const {toggleReadingModal} = readingListSlice.actions

export default readingListSlice.reducer