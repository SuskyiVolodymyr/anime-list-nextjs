import React from 'react';
import { AnimeTvType } from '@/types/AnimeTvType';

type Props = {
  animeType: AnimeTvType;
  setAnimeType: (value: AnimeTvType) => void;
};

export const TvTypeSelect = ({ setAnimeType, animeType }: Props) => {
  const handleTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setAnimeType(e.target.value as AnimeTvType);
  };
  return (
    <div className="filter-item">
      <label htmlFor="anime-type" className="filter-label">
        Type:
      </label>
      <select
        id="anime-type"
        onChange={handleTypeSelect}
        className="filter-select"
        value={animeType}
      >
        {Object.entries(AnimeTvType).map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};
