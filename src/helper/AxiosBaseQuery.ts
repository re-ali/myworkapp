import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./AxiosService";

export interface rewData{
url:string,
method:string,
data:any,
params:any,
headers:any
}


//  const axiosBaseQuery =
//   ({ baseUrl } = { baseUrl: "" }) =>
//     async ({ url, method, data, params, headers }: rewData) => {
//       try {
//         const isFormData = data instanceof FormData;

//         // Get dynamic base URL based on user role
//         // const dynamicBaseUrl = "https://jsonplaceholder.typicode.com/"
//         const dynamicBaseUrl = "https://dummyjson.com/"


//         // Fetch token
//         const token = await AsyncStorage.getItem("authToken");

//         // Build headers
//         const configHeaders = {
//           ...headers,
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         ...(isFormData ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" }),
//         };

//         const result: any = await axiosInstance({
//           url: dynamicBaseUrl + url, // Use dynamic base URL instead of static
//           method,
//           data,
//           params,
//           headers: configHeaders,
//         });
        
//         // console.log("result----------====----", result);

//         // API returns: { status_code, status, message, data }
//         if (result?.status !== 200) {
//           return {
//             error: {
//               status: result?.status,
//               data: result,
//             },
//           };
//         }
//         if (result?.status_code === 401) {
//           console.log("CHAL BHAHAR")
//         }

//         return { data: result.data };
//       } catch (err: any) {
//         console.log("AXIOS BASE QUERY ERROR >>>>>>", err);

//         // Show toast if server sends message
//         if (err?.response?.data?.message) {
//         }

//         return {
//           error: {
//             status: err?.response?.status,
//             data: err?.response?.data || err.message,
//           },
//         };
//       }
//     };


const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, data, params, headers }: rewData) => {

    try {
      const isFormData = data instanceof FormData;
      // const dynamicBaseUrl = "https://dummyjson.com/";
      const dynamicBaseUrl = "https://api.pexels.com/";
      
      const token = await AsyncStorage.getItem("authToken");

      const configHeaders = {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(isFormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" }),
      };

      const response = await axiosInstance({
        url: dynamicBaseUrl + url,
        method,
        data,
        params,
        headers: configHeaders,
      });

      // ✅ THIS IS THE FIX
      if (response.status !== 200) {
        return {
          error: {
            status: response.status,
            data: response.data,
          },
        };
      }

      // ✅ return actual API data
      return { data: response.data };
    } catch (err) {
      return {
        error: {
          status: err?.response?.status,
          data: err?.response?.data || err.message,
        },
      };
    }
  };


export default axiosBaseQuery;