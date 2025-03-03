import { AnimeStatus } from '@/types/AnimeStatus';
import React from 'react';

type Props = {
  animeStatus: string;
  setAnimeStatus: (value: AnimeStatus) => void;
};

export const AnimeStatusFilter = ({ setAnimeStatus, animeStatus }: Props) => {
  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setAnimeStatus(e.target.value as AnimeStatus);
  };

  return (
    <div className="filter-item">
      <label htmlFor="anime-status" className="filter-label">
        Status:
      </label>
      <select
        id="anime-status"
        onChange={handleStatus}
        className="filter-select"
        value={animeStatus}
      >
        {Object.entries(AnimeStatus).map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};
