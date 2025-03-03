import { getAnimeById, getAnimeImages } from '@/services/jikanAPI';
import { Anime } from '@/types/Anime';
import { AnimeByIdPage } from '@/components/AnimeByIdPage/AnimeByIdPage';
import { AnimeImage } from '@/types/AnimeImages';

type Props = {
  params: Promise<{ id: number }>;
};
export default async function AnimePage({ params }: Props) {
  const { id: animeId } = await params;
  let anime: Anime | null = null;
  let images: AnimeImage[] = [];
  let error = '';
  try {
    const animeData = await getAnimeById(animeId);
    anime = animeData.data;
  } catch (e) {
    error = (e as Error).message;
  }

  try {
    const data = await getAnimeImages(animeId);
    images = data.data;
  } catch (e) {
    images = [];
  }

  return <AnimeByIdPage anime={anime} error={error} images={images} />;
}
