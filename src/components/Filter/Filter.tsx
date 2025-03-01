'use client' // eslint-disable-line prettier/prettier
import React, { useState } from 'react';
import { OrderBy } from '@/types/OrderBy';
import { useAnimeList } from '@/store/store';

export const Filter = () => {
  const [orderBy, setOrderBy] = useState(OrderBy.Rating);
  const [isASC, setIsASC] = useState(false);
  const setOrder = useAnimeList((state) => state.setOrder);

  const handleOrderSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newOrder, newIsAsc] = e.target.value.split(' ');
    switch (newOrder) {
      case 'Rating':
      default:
        setOrderBy(OrderBy.Rating);
    }
    setIsASC(newIsAsc === '⬆');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrder([orderBy, isASC]);
  };

  return (
    <div className="filter">
      <form className="filter-form" onSubmit={handleSubmit}>
        <label htmlFor="sort-by" className="filter-label">
          Order by
        </label>
        <select id="sort-by" onChange={handleOrderSelect}>
          <option>Rating ⬇</option>
          <option>Rating ⬆</option>
        </select>
        <button className="filter-button" type="submit">
          Filter
        </button>
      </form>
    </div>
  );
};
