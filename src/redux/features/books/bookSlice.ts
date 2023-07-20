import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../../types/globalTypes";

interface IBookState {
    books: IBook[];
  }

const initialState : IBookState = {
    books : []
}

const bookSlice = createSlice({
    name : 'book',
    initialState,
    reducers : {
        setBooks : (state, action : PayloadAction<IBook[]>) => {
            state.books.push(...action.payload)
        },
    }
})

export const {setBooks} = bookSlice.actions

export default bookSlice.reducer