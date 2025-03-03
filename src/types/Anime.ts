import { AnimeTvType } from '@/types/AnimeTvType';

type Genre = {
  name: string;
};

export type Anime = {
  mal_id: number;
  title: string;
  title_english: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  score: number;
  scored_by: number;
  synopsis: string;
  type: AnimeTvType;
  episodes: number;
  status: string;
  year: number;
  genres: Genre[];
};
