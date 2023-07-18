import { api } from "../../api/apiSlice";


const bookApi = api.injectEndpoints({
    endpoints : (builder) => ({
        getBooks : builder.query({
            query : () => '/book',
            providesTags : ['books']
        }),
        getSearchedBooks : builder.query({
            query : (query) => `/book/?${query}`
        }),
        singleBook : builder.query({
            query : (id) => `/book/${id}`
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
            invalidatesTags : ['books']
        }),
        updateBook : builder.mutation({
            query : ({id, data}) => ({
                url : `/book/${id}`,
                method : 'PATCH',
                body : data
            }),
            invalidatesTags : ['books']
        }),
        DeletBook : builder.mutation({
            query : (id) => ({
                url : `/book/${id}`,
                method : 'DELETE',
            }),
            invalidatesTags : ['books']
        }),
        postReview : builder.mutation({
            query : (data) => ({
                url : `/review`,
                method : 'POST',
                body : data
            }),
            invalidatesTags : ['review']
        }),
        getReview : builder.query({
            query : (id) => `/review/${id}`,
            providesTags : ['review']
        }),
    })
})

export const {useGetBooksQuery, useFilterBooksQuery, useGetSearchedBooksQuery, useAddNewBookMutation, useSingleBookQuery, usePostReviewMutation, useGetReviewQuery, useUpdateBookMutation, useDeletBookMutation} = bookApi