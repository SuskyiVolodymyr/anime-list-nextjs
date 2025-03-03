import React from 'react';

type Props = {
  minScore: string;
  maxScore: string;
  setMinScore: (value: string) => void;
  setMaxScore: (value: string) => void;
};

export const MinMaxScore = ({ minScore, maxScore, setMinScore, setMaxScore }: Props) => {
  return (
    <>
      <div className="filter-item">
        <label className="filter-label" htmlFor="min-score">
          Min rating:
        </label>
        <input
          type="number"
          id="min-score"
          className="filter-input"
          value={minScore}
          onChange={(e) => setMinScore(e.target.value)}
        />
      </div>
      <div className="filter-item">
        <label className="filter-label" htmlFor="max-score">
          Max rating:
        </label>
        <input
          type="number"
          id="max-score"
          className="filter-input"
          value={maxScore}
          onChange={(e) => setMaxScore(e.target.value)}
        />
      </div>
    </>
  );
};
