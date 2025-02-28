import { Anime } from '@/types/Anime';

type AnimeListPage = {
  pagination: {
    current_page: number;
  };
  data: Anime[];
};

export async function getAnimeList(): Promise<AnimeListPage> {
  const response = await fetch('https://api.jikan.moe/v4/anime');
  if (response.ok) {
    return response.json();
  }
  throw new Error('Unable to load data');
}
