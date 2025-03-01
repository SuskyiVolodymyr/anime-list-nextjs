import { create } from 'zustand';
import { Anime } from '@/types/Anime';
import { getAnimeList } from '@/services/jikanAPI';
import { OrderBy } from '@/types/OrderBy';

type Order = [OrderBy, boolean];

interface AnimeStore {
  animeList: Anime[];
  query: string;
  error: string;
  isLoading: boolean;
  orderBy: Order;
  fetchAnimeList: () => void;
  setQuery: (query: string) => void;
  setOrder: (value: Order) => void;
}

export const useAnimeList = create<AnimeStore>((set) => ({
  animeList: [],
  error: '',
  query: '',
  orderBy: [OrderBy.Rating, false],
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
  setQuery: (query: string) => set({ query }),
  setOrder: (value) => set({ orderBy: value }),
}));
