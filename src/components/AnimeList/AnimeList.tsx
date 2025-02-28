'use client' // eslint-disable-line prettier/prettier

import { useAnimeList } from '@/store/store';
import { useEffect } from 'react';
import { AnimeItem } from '@/components/AnimeItem/AnimeItem';
import { PropagateLoader } from 'react-spinners';

export const AnimeList = () => {
  const { animeList, fetchAnimeList, error, isLoading } = useAnimeList();

  useEffect(() => {
    fetchAnimeList();
  }, [fetchAnimeList]);

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
          {animeList.map((anime) => (
            <AnimeItem anime={anime} key={anime.mal_id} />
          ))}
        </div>
      )}
    </div>
  );
};
