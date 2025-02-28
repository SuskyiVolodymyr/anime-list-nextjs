import { Anime } from '@/types/Anime';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  anime: Anime;
};

export const AnimeItem = ({ anime }: Props) => {
  return (
    <div className="anime">
      <div className="anime-image-container">
        <Image src={anime.images.jpg.image_url} alt="cover" width={190} height={280} />
        <p className="anime-score">
          ⭐{anime.score}({anime.scored_by})
        </p>
      </div>
      <div className="description">
        <h4>{anime.title}</h4>
        <p>{anime.synopsis.slice(0, 40)}...</p>
        <Link href="/">More</Link>
      </div>
    </div>
  );
};
