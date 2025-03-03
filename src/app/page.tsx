import { AnimeList } from '@/components/AnimeList/AnimeList';
import { SearchField } from '@/components/SearchField/SearchField';
import { Filter } from '@/components/Filter/Filter';
import { getAnimeList } from '@/services/jikanAPI';
import { AnimeListPage } from '@/types/AnimePage';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Home() {
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

  const headerList = await headers();
  const referer = headerList.get('referer') || '';
  const searchParams = new URLSearchParams(referer.split('?')[1] || '');
  const queryString = searchParams.toString();

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
