import { defineStore } from "pinia";
import { AxiosError, isAxiosError } from "axios";
import { axiosPrivate } from "../api/axios";
import { ref } from "vue";

export const useMangaEntryStore = defineStore("mangaEntries", () => {
  interface MangaEntry {
    mangaId: string;
    userId?: string;
    title: string;
    imageURL: string;
    genres: string;
    rating: number;
    category: string;
  }

  const listEntries = ref<MangaEntry[]>([]);

  async function fetchMangaEntries() {
    try {
      const response = await axiosPrivate.get("/api/mangaentries", {
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

  async function addMangaEntry(entry: MangaEntry) {
    try {
      const response = await axiosPrivate.post(
        "/api/mangaentries",
        JSON.stringify(entry),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        fetchMangaEntries();
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

  return { listEntries, fetchMangaEntries, addMangaEntry };
});
