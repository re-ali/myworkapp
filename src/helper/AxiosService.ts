import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import { showCustomToast } from '../componets/showCustomToast';

export const isInternetConnected = async () => {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
        return true
    } else {
        false
    }
};


const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        const connected = await isInternetConnected();
        if (!connected) {
            return Promise.reject({ message: "No Internet" }); // FIXED
        }
        console.log(
            "%c API CALL >>>>>>> ",
            "color: orange; font-size: 14px;",
            config?.url,
            config
        );

        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
 axiosInstance.interceptors.response.use(
  (response) => {
    console.log(
      '%cAPI RESPONSE ----------',
      'color: green; font-size: 14px;',
      response?.config?.url,
      response,
    );

    // console.log("RESPONSE >>>>>>>", JSON.stringify(response.data));
    return response; // ALWAYS RETURN response.data
  },
  async (error) => {
    console.log("AXIOS ERROR >>>>>", error?.response?.data);

    if (error.response?.data?.status_code === 401) {
       console.log("force logout")
    }

    console.log(
      "%cAPI ERROR ----------",
      "color: red; font-size: 14px;",
      error?._response,
      error,
    );

           showCustomToast(
  'error',
   error?._response,
);
    return Promise.reject(error);
  }
);


export default axiosInstance;