import { api } from "../../api/apiSlice";


const userApi = api.injectEndpoints({
    endpoints : (builder) => ({
        postUser : builder.mutation({
            query : ( data) => ({
                url : `/user/sign-up`,
                method : 'POST',
                body : data
            }),
        }),
        loginUser : builder.mutation({
            query : (data) => ({
                url : `/user/login`,
                method : 'POST',
                body : data
            }),
        }),

    })
})

export const {usePostUserMutation, useLoginUserMutation} = userApi