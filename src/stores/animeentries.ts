import { defineStore } from "pinia";
import { AxiosError, isAxiosError } from "axios";
import { axiosPrivate } from "../api/axios";
import { ref } from "vue";

export const useAnimeEntryStore = defineStore("animeEntries", () => {
  interface AnimeEntry {
    animeId: string;
    userId?: string;
    title: string;
    imageURL: string;
    genres: string;
    rating: number;
    category: string;
  }

  const listEntries = ref<AnimeEntry[]>([]);

  async function fetchAnimeEntries() {
    try {
      const response = await axiosPrivate.get("/api/animeentries", {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        listEntries.value = response.data;
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

  async function addAnimeEntry(entry: AnimeEntry) {
    try {
      const response = await axiosPrivate.post(
        "/api/animeentries",
        JSON.stringify(entry),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        fetchAnimeEntries();
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

  return { listEntries, fetchAnimeEntries, addAnimeEntry };
});
