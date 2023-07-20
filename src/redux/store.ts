import {configureStore} from '@reduxjs/toolkit'
import { api } from './api/apiSlice';
import bookReducer from './features/books/bookSlice'
import userReducer from './features/user/userSlice'
import wishlistReducer from './features/wishlist/wishlistSlice'

const store = configureStore({
    reducer : {
        book : bookReducer,
        user : userReducer,
        wishlist : wishlistReducer,
        [api.reducerPath] : api.reducer,
    },
    middleware : (getDefauldMiddleware) => getDefauldMiddleware().concat(api.middleware) 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store