import { AnimeList } from '@/components/AnimeList/AnimeList';
import { SearchField } from '@/components/SearchField/SearchField';
import { Filter } from '@/components/Filter/Filter';
import { getAnimeList } from '@/services/jikanAPI';
import { AnimeListPage } from '@/types/AnimePage';

export const dynamic = 'force-dynamic';

type HomeProps = {
  searchParams?: Record<string, string | string[]>;
};

export default async function Home({ searchParams }: HomeProps) {
  let error = '';
  let animePage: AnimeListPage = {
    pagination: {
      current_page: 0,
      last_visible_page: 0,
      has_next_page: false,
      items: {
        count: 0,
        total: 0,
        per_page: 0,
      },
    },
    data: [],
  };

  const queryObject: Record<string, string> = Object.fromEntries(
    Object.entries(searchParams || {}).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );

  const queryString = new URLSearchParams(queryObject).toString();

  try {
    animePage = await getAnimeList(queryString);
  } catch (e) {
    error = (e as Error).message;
  }

  return (
    <div>
      <SearchField />
      <div className="container">
        <AnimeList initialPage={animePage} searchParams={queryString} initialError={error} />
        <Filter />
      </div>
    </div>
  );
}
