import { Anime } from '@/types/Anime';

export type AnimeListPage = {
  pagination: {
    current_page: number;
    last_visible_page: number;
    has_next_page: boolean;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
  data: Anime[];
};
