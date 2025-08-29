import axios, { Axios } from "axios";
const BASE_URL = "https://anime-abyss-backend.vercel.app";

export default axios.create({
  baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

function addInstanceInterceptors(axiosInstance: Axios) {
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response.status === 403) {
        try {
          const refRes = await axios.get(BASE_URL + "/api/users/refresh", {
            withCredentials: true,
          });

          if (refRes.status === 200) {
            axiosPrivate.defaults.headers.common[
              "Authorization"
            ] = `BEARER ${refRes.data.accessToken}`;

            error.config.headers[
              "Authorization"
            ] = `Bearer ${refRes.data.accessToken}`;

            console.log(refRes);
            console.log(`token refreshed ${refRes.data.accessToken}`);

            return axiosPrivate(error.config);
          }
        } catch (error) {
          console.log("token invalid", error);
        }
      }
      return error;
    }
  );
}

addInstanceInterceptors(axiosPrivate);

export { axiosPrivate };
