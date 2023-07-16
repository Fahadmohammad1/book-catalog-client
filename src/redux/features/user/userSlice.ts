import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUserState {
    user : {
    name : string | null
     email : string | null
    };
 }
 
 interface ICredential {
    name : string
     email : string;
     password : string
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
            state.user.name = action.payload.name
            state.user.email = action.payload.email
        },
        
    }

})

export default userSlice.reducer