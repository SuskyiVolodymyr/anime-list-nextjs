'use client' // eslint-disable-line prettier/prettier

import { useAnimeList } from '@/store/store';
import { useEffect, useMemo } from 'react';
import { AnimeItem } from '@/components/AnimeItem/AnimeItem';
import { PropagateLoader } from 'react-spinners';
import { OrderBy } from '@/types/OrderBy';

export const AnimeList = () => {
  const {
    animeList,
    fetchAnimeList,
    error,
    isLoading,
    query,
    orderBy: [order, isASC],
  } = useAnimeList();

  useEffect(() => {
    fetchAnimeList();
  }, [fetchAnimeList]);

  const visibleAnime = useMemo(() => {
    let newAnime = [...animeList];
    newAnime = newAnime.filter((anime) => anime.title.toLowerCase().includes(query.toLowerCase()));
    newAnime = newAnime.sort((anime1, anime2) => {
      const isASCMultiplier = isASC ? 1 : -1;
      switch (order) {
        case OrderBy.Rating:
        default:
          return isASCMultiplier * (anime1.score - anime2.score);
      }
    });

    return newAnime;
  }, [animeList, isASC, order, query]);

  return (
    <div className="anime-list">
      {isLoading && (
        <div className="Loader">
          <PropagateLoader loading={isLoading} color="gray" size={20} />
        </div>
      )}
      {error ? (
        <h2>{error}</h2>
      ) : (
        <div className="anime-list">
          {visibleAnime.map((anime) => (
            <AnimeItem anime={anime} key={anime.mal_id} />
          ))}
        </div>
      )}
    </div>
  );
};
