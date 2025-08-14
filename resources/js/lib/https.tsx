import axios, { AxiosHeaders, AxiosInstance } from "axios";


export function HTTPClient () : AxiosInstance {

    const headers = AxiosHeaders.from({
        Accept: "application/json",
        withCredentials: true,
    });


    const instance = axios.create({
        headers,
        baseURL: "http://127.0.0.1:8000",
        timeout: 10000,
    });

    instance.interceptors.request.use((config) => {
        console.info(`REQUEST (${config.url}) => `, config);
        return config;
    })

    instance.interceptors.response.use(
        (res) => {
          console.info(`RESPONSE (${res.config.url}) => `, res);
    
          return res;
        },
        (error) => {
          console.info(`RESPONSE-ERROR (${error.config.url}) => `, error);
    
          throw error;
        }
      );

    return instance;
} 