import {configureStore} from '@reduxjs/toolkit'


const store = configureStore({
    reducer : {
        
        // [api.reducerPath] : api.reducer,
    },
    // middleware : (getDefauldMiddleware) => getDefauldMiddleware().concat(api.middleware) 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store