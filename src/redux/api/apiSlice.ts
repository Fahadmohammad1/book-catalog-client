import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath : 'api',
    baseQuery : fetchBaseQuery(
        // {baseUrl : 'https://book-catalog-server-psi.vercel.app/api/v1'}
        {baseUrl : 'http://localhost:5000/api/v1' , 
        prepareHeaders : (headers) => {
            const availableToken = localStorage.getItem('accessToken');
            
            if(availableToken){
                const token = JSON.parse(availableToken)
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }
        ),
        tagTypes : ['books', 'review'],
        
    endpoints : () => ({})
})