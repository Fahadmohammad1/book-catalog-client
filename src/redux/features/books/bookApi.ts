import { api } from "../../api/apiSlice";


const bookApi = api.injectEndpoints({
    endpoints : (builder) => ({
        getBooks : builder.query({
            query : () => '/book'
        }),
        getFilterdBooks : builder.query({
            query : (query) => `/book/?${query}`
        })
    })
})

export const {useGetBooksQuery, useGetFilterdBooksQuery} = bookApi