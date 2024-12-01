import { defineStore } from "pinia";
import { AxiosError, isAxiosError } from "axios";
import axios, { axiosPrivate } from "../api/axios";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const auth = ref<{ isLoggedIn: Boolean; isAdmin: Boolean }>({
    isLoggedIn: false,
    isAdmin: false,
  });

  const refresh = ref<{ loadedOnce: Boolean; loading: Boolean }>({
    loadedOnce: false,
    loading: false,
  });

  async function loginUser(formDetails: { email: String; password: String }) {
    try {
      const response = await axios.post(
        "/api/users/login",
        JSON.stringify({
          email: formDetails.email,
          password: formDetails.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        axiosPrivate.defaults.headers.common[
          "Authorization"
        ] = `BEARER ${response.data.accessToken}`;

        auth.value.isLoggedIn = true;
        return { success: true };
      }
      throw response;
    } catch (error: unknown | AxiosError) {
      if (isAxiosError(error)) {
        return { success: false, errors: error.response?.data };
      } else {
        return { success: false, errors: error };
      }
    }
  }

  async function logoutUser() {
    try {
      const response = await axiosPrivate.get("/api/users/logout");
      axiosPrivate.defaults.headers.common["Authorization"] = "";
      console.log("logged out", response);
      auth.value.isLoggedIn = false;
    } catch (error: unknown | AxiosError) {
      if (isAxiosError(error)) {
        return { success: false, errors: error.response?.data };
      } else {
        return { success: false, errors: error };
      }
    }
  }

  async function refreshTokenOnStart() {
    refresh.value.loading = true;
    try {
      const refRes = await axios.get("/api/users/refresh", {
        withCredentials: true,
      });

      if (refRes.status === 200) {
        axiosPrivate.defaults.headers.common[
          "Authorization"
        ] = `BEARER ${refRes.data.accessToken}`;

        console.log(`access token refreshed ${refRes.data.accessToken}`);
        auth.value.isLoggedIn = true;
        refresh.value.loading = false;
        return { success: true };
      }
      throw refRes;
    } catch (error: unknown | AxiosError) {
      auth.value.isLoggedIn = false;
      refresh.value.loading = false;
      if (isAxiosError(error)) {
        return { success: false, errors: error.response?.data };
      } else {
        return { success: false, errors: error };
      }
    }
  }

  return { auth, refresh, loginUser, logoutUser, refreshTokenOnStart };
});
