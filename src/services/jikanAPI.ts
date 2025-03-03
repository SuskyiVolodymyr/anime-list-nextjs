import { jikanURL } from '@/constants/jikanURL';
import { AnimeListPage } from '@/types/AnimePage';
import { Anime } from '@/types/Anime';
import { AnimeImage } from '@/types/AnimeImages';

export async function getAnimeList(searchParams?: string): Promise<AnimeListPage> {
  const url = new URL(jikanURL + 'anime');
  if (searchParams) {
    url.search = searchParams.replace('anime_status', 'status');
    const endDate = url.searchParams.get('end_date');
    if (endDate) {
      const [year, month, day] = endDate.split('-');
      url.searchParams.set('end_date', `${+year + 1}-${month}-${day}`);
    }
  }

  const response = await fetch(url.toString(), { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Unable to load data');
  }

  return response.json();
}

type AnimeByIdResponse = {
  data: Anime;
};

export async function getAnimeById(id: number): Promise<AnimeByIdResponse> {
  const url = new URL(jikanURL + `anime/${id}`);
  const response = await fetch(url.toString(), { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Unable to load data');
  }

  return response.json();
}

export type AnimeImages = {
  data: AnimeImage[];
};

export async function getAnimeImages(id: number): Promise<AnimeImages> {
  const url = new URL(jikanURL + `anime/${id}/pictures`);
  const response = await fetch(url.toString(), { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Unable to load data');
  }

  return response.json();
}
