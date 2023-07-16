import { api } from "../../api/apiSlice";


const userApi = api.injectEndpoints({
    endpoints : (builder) => ({
        postUser : builder.mutation({
            query : () => '/user/sign-up'
        })
    })
})

export const {usePostUserMutation} = userApi