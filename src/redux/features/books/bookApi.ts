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
        }),
        addNewBook : builder.mutation({
            query : (data) => ({
                url : `/book/add-book`,
                method : 'POST',
                body : data
            }),
        }),
    })
})

export const {useGetBooksQuery, useFilterBooksQuery, useGetSearchedBooksQuery, useAddNewBookMutation} = bookApi