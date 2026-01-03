import { BaseQueryFn, createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../helper/AxiosBaseQuery";

export const getHomeData = `quotes`;
export const auth = `auth/me`;
const videos = "videos/search"



export const VideoSlice = createApi({
    reducerPath: 'VideoSlice',
    baseQuery: axiosBaseQuery() as BaseQueryFn,
    tagTypes:['Home'],
    endpoints:(builder) => ({
        getVideoList:builder.query({
            query:() =>({
                url:videos,
                method:'GET',
                params:{}
            })
        })
        
    }),

});


export const {
    useLazyGetVideoListQuery,
} = VideoSlice