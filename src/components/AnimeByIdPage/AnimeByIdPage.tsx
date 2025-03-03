import { Anime } from '@/types/Anime';
import Image from 'next/image';
import { AnimeImage } from '@/types/AnimeImages';
import Link from 'next/link';

type Props = {
  anime: Anime | null;
  error: string;
  images: AnimeImage[];
};

export const AnimeByIdPage = ({ anime, error, images }: Props) => {
  if (!anime || error) {
    return <h1>{error || 'Something went wrong...'}</h1>;
  }
  return (
    <div className="anime-page">
      <div className="anime-image-and-info">
        <Image src={anime.images.jpg.large_image_url} alt="cover" width={250} height={400} />
        <div className="anime-info">
          <h1 className="anime-title">
            {anime.title_english || anime.title} ({anime.year})
          </h1>
          <p className="synopsis">{anime.synopsis || ''}</p>
          <div className="anime-images">
            {images.slice(0, 5).map((image) => (
              <Link href={image.jpg.image_url} key={image.jpg.image_url}>
                <Image src={image.jpg.image_url} alt="image" width={150} height={200} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="anime-types">
        <p className="anime-type">
          <strong>Rating:</strong> {anime.score}⭐({anime.scored_by})
        </p>
        <p className="anime-type">
          <strong>Type:</strong> {anime.type}
        </p>
        <p className="anime-type">
          <strong>Episodes:</strong> {anime.episodes}
        </p>
        <p className="anime-type">
          <strong>Status:</strong> {anime.status}
        </p>
        <p className="anime-type">
          <strong>Genres:</strong> {anime.genres.map((genre) => genre.name).join(', ')}
        </p>
      </div>
    </div>
  );
};
