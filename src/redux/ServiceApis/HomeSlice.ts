import { BaseQueryFn, createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../helper/AxiosBaseQuery";

export const getHomeData = `quotes`;
export const auth = `auth/me`;



export const HomeSlice = createApi({
    reducerPath: 'HomeSlice',
    baseQuery: axiosBaseQuery() as BaseQueryFn,
    tagTypes:['Home'],
    endpoints:(builder) => ({
        getHomeList: builder.query({
            query:({limit, skip}) => ({
                url:getHomeData,
                method: 'GET',
                params:{limit,skip}
            }),
            providesTags:['Home']
        }),
        getProfile:builder.query({
            query:() =>({
                url:auth,
                method:"GET",
            }),
            providesTags:['Home']
        })
        
    }),

});


export const {
    useLazyGetHomeListQuery,
    useLazyGetProfileQuery
} = HomeSlice