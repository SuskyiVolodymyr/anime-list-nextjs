import { Anime } from '@/types/Anime';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  anime: Anime;
};

export const AnimeItem = ({ anime }: Props) => {
  const title = anime.title_english || anime.title;
  return (
    <div className="anime">
      <div className="anime-image-container">
        <Link href={`/${anime.mal_id}`} prefetch={false}>
          <Image
            src={anime.images.jpg.image_url}
            alt="cover"
            width={190}
            height={280}
            priority={false}
          />
        </Link>
        <p className="anime-score">
          ⭐{anime.score}({anime.scored_by})
        </p>
      </div>
      <div className="description">
        <h4>{title.length > 49 ? title.slice(0, 50) + '...' : title}</h4>
        <p>{anime.synopsis ? anime.synopsis.slice(0, 40) : ''}...</p>
        <Link href={`/${anime.mal_id}`} prefetch={false}>
          More
        </Link>
      </div>
    </div>
  );
};
