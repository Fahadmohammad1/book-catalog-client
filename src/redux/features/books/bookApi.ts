import { api } from "../../api/apiSlice";


const bookApi = api.injectEndpoints({
    endpoints : (builder) => ({
        getBooks : builder.query({
            query : () => '/book'
        }),
        getSearchedBooks : builder.query({
            query : (query) => `/book/?${query}`
        }),
        filterBooks : builder.query({
            query : (query) => `/book/?${query}`
        })
    })
})

export const {useGetBooksQuery, useFilterBooksQuery, useGetSearchedBooksQuery} = bookApi