import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICredential } from "../../../types/globalTypes";

interface IUserState {
    user : {
    name : string | null
     email : string | null
    };
 }
 
 const initialState : IUserState = {
    user : {
        name : null,
        email : null
    },
 }

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser : (state, action  : PayloadAction<ICredential>) => {
            state.user.name = action.payload?.name
            state.user.email = action.payload?.email
        },
        
    }

})

export const {setUser} = userSlice.actions

export default userSlice.reducer