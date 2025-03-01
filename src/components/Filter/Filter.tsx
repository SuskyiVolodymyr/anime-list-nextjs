'use client' // eslint-disable-line prettier/prettier
import React, { useState } from 'react';
import { OrderBy } from '@/types/OrderBy';
import { useRouter } from 'next/navigation';

export const Filter = () => {
  const [orderBy, setOrderBy] = useState(OrderBy.Score);
  const [isASC, setIsASC] = useState(false);
  const router = useRouter();

  const handleOrderSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newOrder, newIsAsc] = e.target.value.split(' ');
    switch (newOrder) {
      case 'Title':
        setOrderBy(OrderBy.Title);
        break;
      case 'StartDate':
        setOrderBy(OrderBy.StartDate);
        break;
      case 'EndDate':
        setOrderBy(OrderBy.EndDate);
        break;
      case 'Rating':
      default:
        setOrderBy(OrderBy.Score);
    }
    setIsASC(newIsAsc === '⬆');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('order_by', orderBy);
    currentParams.set('sort', isASC ? 'asc' : 'desc');

    router.push(`?${currentParams.toString()}`);
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
          <option>Title ⬇</option>
          <option>Title ⬆</option>
          <option>StartDate ⬇</option>
          <option>StartDate ⬆</option>
          <option>EndDate ⬇</option>
          <option>EndDate ⬆</option>
        </select>
        <button className="filter-button" type="submit">
          Filter
        </button>
      </form>
    </div>
  );
};
