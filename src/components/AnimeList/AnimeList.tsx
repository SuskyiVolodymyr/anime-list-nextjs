// eslint-disable-next-line
'use client'
import { AnimeItem } from '@/components/AnimeItem/AnimeItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AnimeListPage } from '@/types/AnimePage';
import { getAnimeList } from '@/services/jikanAPI';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { DotLoader } from 'react-spinners';

type Props = {
  initialPage: AnimeListPage;
  searchParams: string;
  initialError: string;
};

export const AnimeList = ({ initialPage, searchParams, initialError }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<AnimeListPage>({
      queryKey: ['anime', searchParams],
      queryFn: ({ pageParam = 2 }) => getAnimeList(`${searchParams}&page=${pageParam}`),
      initialPageParam: 2,
      getNextPageParam: (lastPage) =>
        lastPage.pagination.has_next_page ? lastPage.pagination.current_page + 1 : undefined,
      initialData: { pages: [initialPage], pageParams: [1] },
    });

  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage().catch((error) => console.error('Error fetching next page:', error));
    }
  }, [fetchNextPage, inView, hasNextPage]);

  const animeList = data?.pages.flatMap((page) => page.data) || [];
  const uniqueAnimeList = animeList.filter(
    (anime, index, self) => index === self.findIndex((a) => a.mal_id === anime.mal_id),
  );

  if (status === 'error' || initialError) return <h2>Error loading anime</h2>;

  return (
    <div className="anime-list">
      {uniqueAnimeList.map((anime) => (
        <AnimeItem anime={anime} key={anime.mal_id} />
      ))}

      {hasNextPage && <div ref={ref}>{isFetchingNextPage && <DotLoader color={'#626587'} />}</div>}
    </div>
  );
};
