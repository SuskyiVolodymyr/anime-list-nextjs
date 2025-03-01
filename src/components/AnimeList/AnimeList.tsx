import { AnimeItem } from '@/components/AnimeItem/AnimeItem';
import { Anime } from '@/types/Anime';

type Props = {
  animeList: Anime[];
  error: string;
};

export const AnimeList = ({ animeList, error }: Props) => {
  return (
    <div className="anime-list">
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
