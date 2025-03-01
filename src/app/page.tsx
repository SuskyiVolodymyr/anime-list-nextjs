import { AnimeList } from '@/components/AnimeList/AnimeList';
import { SearchField } from '@/components/SearchField/SearchField';
import { Filter } from '@/components/Filter/Filter';
import { Anime } from '@/types/Anime';
import { jikanURL } from '@/constants/jikanURL';

export const dynamic = 'force-dynamic';

type AnimeListPage = {
  pagination: {
    current_page: number;
  };
  data: Anime[];
};

export async function getAnimeList(searchParams?: string): Promise<AnimeListPage> {
  const url = new URL(jikanURL + 'anime');
  if (searchParams) {
    url.search = searchParams;
  }

  const response = await fetch(url.toString(), { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Unable to load data');
  }

  return response.json();
}

type HomeProps = {
  searchParams?: Record<string, string | string[]>;
};

export default async function Home({ searchParams }: HomeProps) {
  let error = '';
  let animeList: Anime[] = [];

  try {
    const queryObject: Record<string, string> = Object.fromEntries(
      Object.entries(searchParams || {}).map(([key, value]) => [
        key,
        Array.isArray(value) ? value[0] : value,
      ]),
    );

    const queryString = new URLSearchParams(queryObject).toString();

    const animePage = await getAnimeList(queryString);
    animeList = animePage.data;
    console.log(
      'Fetched animeList:',
      animeList.map((a) => a.title),
    );
  } catch (e) {
    error = (e as Error).message;
  }

  const uniqueAnimeList = animeList.filter(
    (anime, index, self) => index === self.findIndex((a) => a.mal_id === anime.mal_id),
  );

  return (
    <div>
      <SearchField />
      <div className="container">
        <AnimeList animeList={uniqueAnimeList} error={error} />
        <Filter />
      </div>
    </div>
  );
}
