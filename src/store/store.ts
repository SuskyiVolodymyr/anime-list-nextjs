import { create } from 'zustand';
import { Anime } from '@/types/Anime';
import { getAnimeList } from '@/services/jikanAPI';

interface AnimeStore {
  animeList: Anime[];
  error: string;
  isLoading: boolean;
  fetchAnimeList: () => void;
}

export const useAnimeList = create<AnimeStore>((set) => ({
  animeList: [],
  error: '',
  isLoading: false,
  fetchAnimeList: async () => {
    set({ isLoading: true, error: '' });
    try {
      const page = await getAnimeList();
      set({ animeList: page.data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
